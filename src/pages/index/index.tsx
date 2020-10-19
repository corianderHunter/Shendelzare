import React, { useEffect } from "react";
import { View, Image, Text } from "@tarojs/components";

import "./index.scss";
import { checkPermissions } from "src/helper/permission";

import wxp from "src/helper/promisify";
import { SUBJECTS } from "src/const/storageKey";

const home = () => {
  useEffect(() => {
    (async () => {
      //检查权限
      await checkPermissions();
      
      //检查用户主题
      const subjects = await wxp.getStorage({key:SUBJECTS}).catch(e=>{
        return null
      });
      if(!subjects){
        await wxp.redirectTo({ url: "/pages/guide/subject" });  
      }
      // await wxp.redirectTo({ url: "/pages/home/index" });
    })();
  }, []);
  return (
    <View className="theme theme--light loading-container center-container">
      <View className="loading">
        <Text className="iconfont iconbasicprofile"></Text>
      </View>
    </View>
  );
};

export default home;
