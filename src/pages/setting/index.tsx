import React, { useEffect } from "react";
import { View, Image, Text, OpenData, Button } from "@tarojs/components";

import "./index.scss";
import Theme from "src/components/theme";
import wxp from "src/helper/promisify";

const Setting = () => {
  return (
    <Theme control={true}>
      <View className="setting">
        <view className="avatar block">
          <OpenData type="userAvatarUrl"></OpenData>
        </view>
        <View className="setting-block block">
          <Button className="setting-item block" onClick={()=>{
            wxp.redirectTo({url:'/pages/guide/subject'})
          }}>
            更新主题
          </Button>
          <Button className="setting-item block">
            下载历史
          </Button>
        </View>
        <View className="setting-block block">
          <Button className="setting-item block">
            关于我们
          </Button>
          <Button className="setting-item block">
            意见反馈
          </Button>
        </View>

      </View>
    </Theme>
  );
};

export default Setting;
