import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { View, Image, Swiper, SwiperItem } from '@tarojs/components'

import './index.scss'

import iphone11 from './images/iPhone_11_black.png';
import wxp from 'src/helper/promisify';
import { FAVORITE } from 'src/const/storageKey';

export enum ImageViewMode {
  SINGLE, MULTIPLE
}

export interface ImageViewerPropsType {
  src?: string,
  mode: ImageViewMode
}

const images = ['https://hbimg-other.huabanimg.com/c3a5f9d2d9be2f636ef79ff729fed21cb28e9dc66877f_fw236/format/webp', 'https://hbimg.huabanimg.com/24f8eaf0053766b79a6a6e2f374db6e43f278b1c4fa7b-tHRyMk_fw236/format/webp', 'https://hbimg.huabanimg.com/74190000cf2986790160662ff67ef714d592335d31235-Oao5yG_fw236/format/webp', 'https://hbimg.huabanimg.com/9c57a14ad592e7ea7b525ac19ab287b4f5bb5c2913873-pNXu4I_fw236/format/webp', 'https://hbimg.huabanimg.com/6af39e94a227609414ecc0c2625201e161b305211243e8-4uIV6x_fw236/format/webp', 'https://hbimg.huabanimg.com/31a07e044ef783d855d9aa7165653803a72dc51268f21-fJ7SW1_fw236/format/webp', 'https://hbimg.huabanimg.com/ba6f8804d8a14ddc2a2f120a1c18a7ee1eb601d6da17a-SFuprr_fw236/format/webp']

const SWIPER_ITEM_MAX_NUMBER = 4
const PRE_LOAD_NUMBER = 1

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
      const newImages = v.filter(_v => _v !== images)
      wxp.setStorage({ key: FAVORITE, data: newImages })
      return newImages
    })
  }, [renderImages, currentIndex])

  return <View className="image-viewer" >
    {mode === ImageViewMode.SINGLE ? <View className="image-viewer-image" style={{ backgroundImage: `url(${src})` }}>
    </View> : null}
    {mode === ImageViewMode.MULTIPLE ? <Swiper onAnimationFinish={onBindanimationfinish} circular={true} current={currentIndex} onChange={(e) => {
      const { current, source } = e.detail;
      setCurrentIndex(current)
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
    <View className="action-btns">{
      mode === ImageViewMode.MULTIPLE ? <View className="multiple-btns">
        <View onClick={() => { if (currentIndex === 0) { return } setCurrentIndex(currentIndex - 1) }} className="iconfont float-btn iconcs-jt-xz-1-1"></View>
        <View onClick={() => { if (currentIndex === renderImages.length - 1) { return } setCurrentIndex(currentIndex + 1) }} className="iconfont float-btn iconcs-jt-xy-1-1"></View>
        <View onClick={onDeleteFav} className="iconfont float-btn icon15qingkong-1"></View></View> : null}
      <View onClick={onDownAndSaveImage} className="iconfont float-btn iconClouddownload"></View>
    </View>
  </View>
}

export default ImageViewer