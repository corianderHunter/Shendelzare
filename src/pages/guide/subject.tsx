import { View, Text, Image } from "@tarojs/components"
import React, { useCallback, useState } from "react"
import subjectsData from '../../assets/mocks/subjects'

import './subject.scss'

const Subject = () => {

  const [allSubjects,setSubjects] = useState(subjectsData)
  const [selected,setSelected] = useState([])

  const isSelected = useCallback((value)=>{
    for(let v of selected as any){
      if(v.name===value.name){
        return true
      }
      return false;
    }
  },[selected,allSubjects])

  return <View className="theme theme--light subject-container">
    <View className="title1">选择您偏好的主题</View>
    <View className="title2">您主页看到的推荐图集，将基于您选的主题。</View>
    <View className="subjects">
      {allSubjects.map(({ name, src }) => {
        return <View className="subject">
          <View className="subject-main">
            <View className="subject-name">{name}</View>
            <Image src={'https://6972-iron-ass-3o370-1302837071.tcb.qcloud.la/1601017306254.png?sign=aef5c310543701134888d764b26dd1dd&t=1603093629'}></Image>
          </View>
        </View>

      })}
    </View>
  </View>
}

export default Subject 