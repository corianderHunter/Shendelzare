import Taro from '@tarojs/taro';
import { Image, View } from "@tarojs/components"
import { CommonEventFunction } from "@tarojs/components/types/common";
import { ImageProps } from "@tarojs/components/types/Image";
import React, { useCallback, useEffect, useRef } from "react";

import images from '../../../../assets/mocks/subjects'
import './index.scss'

const COLUMN_ID = 'first-column'

interface WaterflowPropsType {
  columnNum?: number,
  space?: number,
  slots?: any[];
}

// images.length = 10;

const Waterflow: React.FC<WaterflowPropsType> = ({ columnNum = 3, space = 20 }) => {

  const onImageLoad: CommonEventFunction<ImageProps.onLoadEventDetail> = useCallback((event) => {
  }, [])
  return <View className="waterflow">
    {Array(columnNum).fill(null)
      .map((v, idx) =>
        <View id={`${idx == 0 ? COLUMN_ID : ''}`} key={idx} style={{ marginRight: columnNum - 1 === idx ? 0 : space }} className="flow-column">
          {images.filter((v, _idx) => _idx % columnNum === idx).map(({ src, name }, __idx) => <View className="flow-item"> <Image key={__idx} mode='widthFix' onLoad={onImageLoad} src={src}></Image></View>)}
          )
        </View>
      )}
  </View>
}

export default Waterflow