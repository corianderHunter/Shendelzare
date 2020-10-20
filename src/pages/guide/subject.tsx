import { View, Text, Image, Button } from "@tarojs/components"
import React, { useCallback, useState, useMemo } from "react"
import subjectsData from '../../assets/mocks/subjects'

import './subject.scss'
import Theme from "src/components/theme";
import wxp from "src/helper/promisify";

const MAX_SELECTED_SUBJECTS = 5;
const MIN_SELECTED_SUBJECTS = 3;

const Subject = () => {

  const [refresh, setRefresh] = useState(0)
  const [allSubjects, setSubjects] = useState(subjectsData)

  const selectedCount = allSubjects.filter(v => (v as any).selected).length

  const submit = ()=>{
    wxp.redirectTo({url:'/pages/home/index'})
  }

  const buttonText = useMemo(() => {
    if (selectedCount < MIN_SELECTED_SUBJECTS) {
      return `至少再选${MIN_SELECTED_SUBJECTS - selectedCount}个`
    }
    return `完成${selectedCount}/${MAX_SELECTED_SUBJECTS}`
  }, [selectedCount])

  return <Theme><View className="subject-container">
    <View className="title1">选择您偏好的主题</View>
    <View className="title2">您主页看到的推荐图集，将基于您选的主题。</View>
    <View className="subjects">
      {allSubjects.map((v) => {
        const { name, src } = v
        return <View className="subject" onClick={() => {
          const value = (v as any).selected
          if (value) {
            (v as any).selected = false;
          } else {
            if (selectedCount >= MAX_SELECTED_SUBJECTS) return;
            (v as any).selected = true;
          };
          setRefresh(refresh + 1);
        }}>
          <View className={`subject-main${(v as any).selected ? ' selected' : ''}`} >
            <View className="subject-name">{name}</View>
            <Image src={src}></Image>
          </View>
        </View>
      })}
    </View>
    <Button onClick={submit} className="subject-submit" disabled={selectedCount < MIN_SELECTED_SUBJECTS || selectedCount > MAX_SELECTED_SUBJECTS}>{buttonText}</Button>
  </View></Theme>
}

export default Subject;