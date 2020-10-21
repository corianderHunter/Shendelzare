import React, { useEffect } from 'react'
import ImageViewer from 'src/components/imageViewer'
import { View } from '@tarojs/components'

import './index.scss'
import Theme from 'src/components/theme'
import { useRouter, useReady } from '@tarojs/taro'

const Gallery = ()=>{


  useReady(() => {
    console.log(1111)
    const router = useRouter()
    console.log(router)
  })

  return <Theme><View className="gallery-container">
      <View className="iconfont iconback float-btn" onClick={()=>wx.navigateBack()}></View>
     <View className="full-paper">
       <ImageViewer src={''}></ImageViewer>
     </View>
  </View>
  </Theme>
}

export default Gallery