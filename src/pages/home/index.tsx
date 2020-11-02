import Theme from "src/components/theme";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { View, Input } from "@tarojs/components";
import images from '../../assets/mocks/subjects'

import './index.scss'
import Waterflow from "./components/waterflow";
import FlowImage from "./components/flowImage";
import SearchMode from "./components/searchMode";

import homeHook from './hook'
import Badge from "src/components/badge";
import wxp from "src/helper/promisify";
import { FAVORITE } from "src/const/storageKey";
import { useDidShow, useReady } from "@tarojs/taro";

const Home = () => {

  const { searchOpen, selectedSubjects, setSelectedSubjects,updateFavImages,favImages,setFavImages} = homeHook()

  useDidShow(() => {
    (async ()=>{
      const {data:favs} = await wxp.getStorage({key:FAVORITE})
      setFavImages(favs)
    })()
  })

  return <Theme>
    <View className="home-container">
      <View className="waterflow-container">
        <Waterflow space={15} dataSet={images} renderSlot={(v => <FlowImage isFav={favImages.includes(v.src)} toggleFav={updateFavImages} {...v}></FlowImage>)}></Waterflow>
      </View>
      <SearchMode></SearchMode>
      {!searchOpen ? <View className="selected-subjects">
        {
          selectedSubjects.map(v => <View className="tag" onClick={() => {
            setSelectedSubjects(selectedSubjects.filter(_v => _v !== v))
          }}>{v}</View>)
        }
      </View> : null}
      <View className="action-btns">
        <Badge overflowCount={favImages.length} inputClass={`float-btn iconfont iconfavorite`} onClick={()=>{
          wx.navigateTo({url:`/pages/gallery/index`})
        }}></Badge>
        <Badge inputClass="float-btn iconfont iconuser" onClick={() => { wxp.redirectTo({ url: '/pages/setting/index' }) }}></Badge>
      </View>
    </View>
  </Theme>
}

export default Home;