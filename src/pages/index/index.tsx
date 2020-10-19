import React, { useEffect } from "react";
import { View, Image, Text } from "@tarojs/components";

import "./index.scss";
import { checkPermissions } from "src/helper/permission";

import wxp from "src/helper/promisify";

const home = () => {
  useEffect(() => {
    (async () => {
      await checkPermissions();
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
