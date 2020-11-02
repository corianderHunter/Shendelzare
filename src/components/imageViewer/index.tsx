import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { View, Image, Swiper, SwiperItem } from '@tarojs/components'

import './index.scss'

import wxp from 'src/helper/promisify';
import { FAVORITE } from 'src/const/storageKey';

export enum ImageViewMode {
  SINGLE, MULTIPLE
}

export interface ImageViewerPropsType {
  src?: string,
  mode: ImageViewMode
}

const SWIPER_ITEM_MAX_NUMBER = 6
const PRE_LOAD_NUMBER = 2

const ImageViewer: React.FC<ImageViewerPropsType> = ({ mode = ImageViewMode.SINGLE, src }) => {

  const [currentIndex, setCurrentIndex] = useState(0)
  const [favImages, setFavImages] = useState([])
  const [renderImages, setRenderImages] = useState([])

  const appendFlag = useRef<number[]>([])

  useEffect(() => {
    (async () => {
      const { data: images } = await wxp.getStorage({ key: FAVORITE }).catch(() => {
        return { data: [] }
      })
      setFavImages(images)
      if (images.length <= SWIPER_ITEM_MAX_NUMBER) {
        setRenderImages(images)
      } else {
        setRenderImages(images.slice(0, SWIPER_ITEM_MAX_NUMBER))
      }
    })()
  }, [])

  const onBindanimationfinish = useCallback(() => {
    if (favImages.length <= SWIPER_ITEM_MAX_NUMBER) {
      return;
    }
    const nextRate = Math.ceil(currentIndex / SWIPER_ITEM_MAX_NUMBER);
    if (((currentIndex + 1) % SWIPER_ITEM_MAX_NUMBER) === (SWIPER_ITEM_MAX_NUMBER - PRE_LOAD_NUMBER) && !appendFlag.current.includes(nextRate)) {
      appendFlag.current.push(nextRate)
      setRenderImages((v) => {
        const addImages = favImages.slice(v.length, v.length + SWIPER_ITEM_MAX_NUMBER)
        return [...v, ...addImages]
      })
    }
  }, [currentIndex, favImages])

  const onDownAndSaveImage = useCallback((src) => {
    wxp.downloadFile({
      url: src, timeout: 10000, success: async (res) => {
        const { filePath } = res
        await wxp.saveImageToPhotosAlbum({ filePath }).catch(e => {
          wxp.showToast({ title: '保存失败', icon: 'none' })
          return Promise.reject()
        })
        wxp.showToast({ title: '保存成功', icon: 'success' })
      }, fail: (err) => {
        wxp.showToast({ title: '下载失败', icon: 'none' })
      }
    })
  }, [])

  const onDeleteFav = useCallback(() => {
    const image = renderImages[currentIndex]
    if (currentIndex !== 0) setCurrentIndex(currentIndex - 1)
    setRenderImages(v => v.filter(_v => _v !== image))
    setFavImages(v => {
      const newImages = v.filter(_v => _v !== image)
      wxp.setStorage({ key: FAVORITE, data: newImages })
      return newImages
    })
  }, [renderImages, currentIndex])

  return <View className="image-viewer" >
    {mode === ImageViewMode.SINGLE ? <View className="image-viewer-image" style={{ backgroundImage: `url(${src})` }}>
    </View> : null}
    {mode === ImageViewMode.MULTIPLE ? <Swiper current={currentIndex} onChange={(e) => {
      const { current, source } = e.detail;
      setCurrentIndex(current)
      setTimeout(()=>{
        onBindanimationfinish()
      })
    }}>
      {renderImages.map((v, idx) => <SwiperItem key
        ={idx}>
        <View style={{ backgroundImage: `url(${v})` }}></View>
      </SwiperItem>)}
    </Swiper> : null}
    <View className="fake-info">
      <View className="fake-time">00:00</View>
      <View className="fake-date">3月14日 星期日</View>
    </View>
    {mode===ImageViewMode.MULTIPLE?<View className="index-text">{currentIndex+1}/{favImages.length}</View>:null}
    <View className="action-btns">{
      mode === ImageViewMode.MULTIPLE ? <View className="multiple-btns">
        <View onClick={() => { if (currentIndex === 0) { return } setCurrentIndex(currentIndex - 1) }} className={`iconfont float-btn iconcs-jt-xz-1-1${currentIndex === 0 ? ' disabled-color' : ''}`}></View>
        <View onClick={() => { if (currentIndex === renderImages.length - 1) { return } setCurrentIndex(currentIndex + 1) }} className={`iconfont float-btn iconcs-jt-xy-1-1${currentIndex === renderImages.length - 1 ? ' disabled-color' : ''}`}></View>
        <View onClick={onDeleteFav} className="iconfont float-btn icon15qingkong-1"></View></View> : null}
      <View onClick={onDownAndSaveImage} className="iconfont float-btn iconClouddownload"></View>
    </View>
  </View>
}

export default ImageViewer