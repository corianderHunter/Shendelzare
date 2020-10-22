import React, { useEffect, useState } from 'react'
import ImageViewer from 'src/components/imageViewer'
import { View } from '@tarojs/components'

import './index.scss'
import Theme from 'src/components/theme'
import { useRouter, useReady } from '@tarojs/taro'

const Gallery = ()=>{

  const [imageSrc,setImageSrc] = useState(()=>{
    const router = useRouter()
    const {src}= router.params||{}
    return src
  })

  return <Theme><View className="gallery-container">
      <View className="iconfont iconback float-btn" onClick={()=>wx.navigateBack()}></View>
     <View className="full-paper">
       <ImageViewer src={imageSrc}></ImageViewer>
     </View>
  </View>
  </Theme>
}

export default Gallery