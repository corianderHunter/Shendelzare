import React, { useEffect } from "react";
import { View, Image, Text } from "@tarojs/components";

import "./index.scss";
import { checkPermissions } from "src/helper/permission";

import wxp from "src/helper/promisify";
import { SUBJECTS } from "src/const/storageKey";
import Theme from "src/components/theme";

import iconImage from '../../assets/images/budapest.jpg'

const home = () => {
  useEffect(() => {
    (async () => {
      //检查权限
      await checkPermissions();
      
      //检查用户主题
      const {data:subjects} = await wxp.getStorage({key:SUBJECTS}).catch(e=>{
        return {data:null}
      });
      if(!subjects){
        await wxp.redirectTo({ url: "/pages/guide/subject" });  
      }
      wxp.redirectTo({url:'/pages/home/index'});
    })();
  }, []);
  return (
    <Theme>
      <View className="loading-container center-container">
        <View className="loading">
          <Image mode="widthFix" src={iconImage}></Image>
        </View>
      </View>
    </Theme>
  );
};

export default home;
