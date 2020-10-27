import React, { useMemo } from 'react'


import './index.scss'
import { View } from '@tarojs/components'
import { ViewProps } from '@tarojs/components/types/View'

interface BadgePropsType extends ViewProps {
  inputClass: string[] | string;
  overflowCount?: number;
}

const COMMON_CLASS="badge"
const WITHCOUNT_CLASS="with-count"

const Badge: React.FC<BadgePropsType> = ({ inputClass, overflowCount,...rest }) => {
  const classNames = useMemo(() => {
    let rst=''
    if (Array.isArray(inputClass)) {
      rst = [...inputClass,COMMON_CLASS].join(' ')
    }else{
      rst = COMMON_CLASS+' '+inputClass
    }
    if(overflowCount){
      rst = rst+' '+ WITHCOUNT_CLASS 
    }
    return rst
  }, [inputClass,overflowCount])
  return overflowCount ? <View {...rest} hoverClass={String(overflowCount)} className={classNames}></View> : <View {...rest} className={classNames}></View>
}

export default Badge