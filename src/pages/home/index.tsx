import Theme from "src/components/theme";
import React from "react";
import { View } from "@tarojs/components";
import images from '../../assets/mocks/subjects'

import './index.scss'
import Waterflow from "./components/waterflow";
import FlowImage from "./components/flowImage";

images.length = 24

const Home = ()=>{
  return <Theme>
    <View className="home-container">
      <Waterflow space={15} dataSet={images} renderSlot={(v=><FlowImage {...v}></FlowImage>)}></Waterflow>
    </View>
  </Theme>
}

export default Home;