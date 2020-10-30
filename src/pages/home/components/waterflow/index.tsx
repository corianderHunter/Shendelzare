import Taro, { useRouter, useReady } from '@tarojs/taro';
import { Image, View } from "@tarojs/components"
import { CommonEventFunction } from "@tarojs/components/types/common";
import { ImageProps } from "@tarojs/components/types/Image";
import React, { useCallback, useEffect, useRef, ReactElement, Component, ComponentType } from "react";

import images from '../../../../assets/mocks/subjects'
import './index.scss'
import { ImageType } from '../flowImage';

const COLUMN_ID = 'first-column'

interface WaterflowPropsType<T> {
  columnNum?: number,
  space?: number,
  dataSet: T[],
  renderSlot: (v: T) => ReactElement<T>;
}


const Waterflow: React.FC<WaterflowPropsType<ImageType>> = ({ columnNum = 3, space = 20, renderSlot }) => {
  const toGallery = useCallback(({src})=>{
    wx.navigateTo({url:`/pages/gallery/index?src=${src}`})
  },[])

  return <View className="waterflow">
    {Array(columnNum).fill(null)
      .map((v, idx) =>
        <View
          id={`${idx == 0 ? COLUMN_ID : ''}`}
          key={idx}
          style={{ marginRight: columnNum - 1 === idx ? 0 : space }}
          className="flow-column">
          {images
            .filter((v, _idx) => _idx % columnNum === idx)
            .map(({ src, name }, __idx) => <View key={__idx} className="flow-item" onClick={()=>toGallery({src})}>
              {renderSlot({ src, name })}
            </View>)}
        </View>
      )}
  </View>
}

export default Waterflow