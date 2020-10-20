import Theme from "src/components/theme";
import React from "react";
import { View } from "@tarojs/components";

import './index.scss'
import Waterflow from "./components/waterflow";

const Home = ()=>{
  return <Theme>
    <View className="home-container">
      <Waterflow></Waterflow>
    </View>
  </Theme>
}

export default Home;