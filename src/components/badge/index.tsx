import React, { useMemo } from 'react'


import './index.scss'
import { View } from '@tarojs/components'

interface BadgePropsType {
  className: string[] | string;
  overflowCount?: number;
}

const COMMON_CLASS="badge"
const WITHCOUNT_CLASS="with-count"

const Badge: React.FC<BadgePropsType> = ({ className, overflowCount }) => {
  const classNames = useMemo(() => {
    let rst=''
    if (Array.isArray(className)) {
      rst = [...className,COMMON_CLASS].join(' ')
    }else{
      rst = COMMON_CLASS+' '+className
    }
    if(overflowCount){
      rst = rst+' '+ WITHCOUNT_CLASS 
    }
    return rst
  }, [className])
  return overflowCount ? <View hoverClass={String(overflowCount)} className={classNames}></View> : <View className={classNames}></View>
}

export default Badge