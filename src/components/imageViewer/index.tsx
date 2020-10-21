import React, { useCallback } from 'react'
import { View, Image } from '@tarojs/components'

import './index.scss'

import iphone11 from './images/iPhone_11_black.png';
import wxp from 'src/helper/promisify';

interface ImageViewerPropsType {
  src: string
}

const ImageViewer: React.FC<ImageViewerPropsType> = ({ src }) => {

  const onDownAndSaveImage = useCallback((src) => {
    wxp.downloadFile({
      url: 'https://hbimg.huabanimg.com/11a9aa46122050ffbdcc1682c9fc10d5590c76e620b01-cruWtc_fw236/format/webp', timeout: 10000, success: async (res) => {
        const {filePath} = res
        await wxp.saveImageToPhotosAlbum({filePath}).catch(e=>{
          wxp.showToast({title:'保存失败',icon:'none'})
        })
        wxp.showToast({title:'保存成功',icon:'success'})
      }, fail: (err) => {
          wxp.showToast({title:'下载失败',icon:'none'})
       }
    })

  }, [])

  return <View className="image-viewer" style={{ backgroundImage: `url(${src || 'https://hbimg.huabanimg.com/11a9aa46122050ffbdcc1682c9fc10d5590c76e620b01-cruWtc_fw236/format/webp'})` }}>
    <View className="fake-info">
      <View className="fake-time">00:00</View>
      <View className="fake-date">3月14日 星期日</View>
    </View>
    <View className="action-btns">
      <View onClick={onDownAndSaveImage} className="iconfont float-btn iconClouddownload"></View>
    </View>
  </View>
}

export default ImageViewer