import { View, Text, Image, Button } from "@tarojs/components"
import React, { useCallback, useState, useMemo } from "react"
import subjectsData from '../../assets/mocks/subjects'

import './subject.scss'

const MAX_SELECTED_SUBJECTS = 5;
const MIN_SELECTED_SUBJECTS = 3;

const Subject = () => {

  const [refresh, setRefresh] = useState(0)
  const [allSubjects, setSubjects] = useState(subjectsData)

  const selectedCount = allSubjects.filter(v => (v as any).selected).length

  const buttonText = useMemo(() => {
    if (selectedCount < MIN_SELECTED_SUBJECTS) {
      return `至少再选${MIN_SELECTED_SUBJECTS - selectedCount}个`
    }
    return `完成${selectedCount}/${MAX_SELECTED_SUBJECTS}`
  }, [selectedCount])

  return <View className="theme theme--light subject-container">
    <View className="title1">选择您偏好的主题</View>
    <View className="title2">您主页看到的推荐图集，将基于您选的主题。</View>
    <View className="subjects">
      {allSubjects.map((v) => {
        const { name, src } = v
        return <View className="subject" onClick={() => {
          const value = (v as any).selected
          if (value) {
            (v as any).selected = false;
          }else{
            if (selectedCount >= MAX_SELECTED_SUBJECTS) return;
            (v as any).selected = true; 
          };
          setRefresh(refresh + 1);
        }}>
          <View className={`subject-main${(v as any).selected ? ' selected' : ''}`} >
            <View className="subject-name">{name}</View>
            <Image src={'https://6972-iron-ass-3o370-1302837071.tcb.qcloud.la/1601017306254.png?sign=aef5c310543701134888d764b26dd1dd&t=1603093629'}></Image>
          </View>
        </View>
      })}
    </View>

      <Button className="subject-submit" disabled={selectedCount < MIN_SELECTED_SUBJECTS || selectedCount > MAX_SELECTED_SUBJECTS}>{buttonText}</Button>

  </View>
}

export default Subject 