import React, { useEffect, useState, useMemo } from 'react'
import ImageViewer, { ImageViewMode } from 'src/components/imageViewer'
import { View } from '@tarojs/components'

import './index.scss'
import Theme from 'src/components/theme'
import { useRouter, useReady } from '@tarojs/taro'

const Gallery = () => {

  const [imageSrc, setImageSrc] = useState(() => {
    const router = useRouter()
    const { src } = router.params || {}
    return src
  })

  const isSwiperMode:ImageViewMode = useMemo(()=>{
    if(imageSrc){
      return ImageViewMode.SINGLE
    }
    return ImageViewMode.MULTIPLE
  },[imageSrc])

  return <Theme><View className="gallery-container">
    <View className="iconfont iconback float-btn" onClick={() => wx.navigateBack()}></View>
    <View className="full-paper">
      <ImageViewer mode={isSwiperMode} src={imageSrc}></ImageViewer>
    </View>
  </View>
  </Theme>
}

export default Gallery