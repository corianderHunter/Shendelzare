import Theme from "src/components/theme";
import React, { useState } from "react";
import { View, Input } from "@tarojs/components";
import images from '../../assets/mocks/subjects'

import './index.scss'
import Waterflow from "./components/waterflow";
import FlowImage from "./components/flowImage";
import SearchMode from "./components/searchMode";

const Home = ()=>{


  return <Theme>
    <View className="home-container">
      <View className="waterflow-container">
      <Waterflow space={15} dataSet={images} renderSlot={(v=><FlowImage {...v}></FlowImage>)}></Waterflow>
      </View>
     <SearchMode></SearchMode>
      <View className="action-btns">
      </View>
    </View>
  </Theme>
}

export default Home;