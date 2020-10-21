import React, { useCallback } from 'react'
import { View, Image, CommonEventFunction } from "@tarojs/components"

import './index.scss'
import { ImageProps } from '@tarojs/components/types/Image'

export interface ImageType {
  name:string|number;
  src:string;
}

export interface FlowImagePropsType extends ImageType{

}

const FlowImage:React.FC<FlowImagePropsType> = ({name='',src=''})=>{
  const onImageLoad: CommonEventFunction<ImageProps.onLoadEventDetail> = useCallback((event) => {
  }, [])

  return <View className="flow-image">
    <Image mode='widthFix' src={src}></Image>
  </View>
}

export default FlowImage