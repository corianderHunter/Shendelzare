import React, { useCallback } from 'react'
import { View, Image, CommonEventFunction } from "@tarojs/components"

import './index.scss'
import { ImageProps } from '@tarojs/components/types/Image'

export interface ImageType {
  name:string|number;
  src:string;
  isFav?:boolean;
  toggleFav?:(name:string|number)=>void;
}

export interface FlowImagePropsType extends ImageType{

}

const FlowImage:React.FC<FlowImagePropsType> = ({name='',src='',isFav=false,toggleFav=()=>{}})=>{
  const onImageLoad: CommonEventFunction<ImageProps.onLoadEventDetail> = useCallback((event) => {
  }, [])

  return <View className="flow-image">
    <Image mode='widthFix' src={src}></Image>
    <View className={`iconfont fav-icon ${isFav?' iconheart-fill':' iconheart'}`} onClick={(e)=>{toggleFav(name);
    e.stopPropagation()}}></View>
  </View>
}

export default FlowImage