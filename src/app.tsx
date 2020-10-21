/*
 * @Author: donghua.wei
 * @Date: 2020-10-17 14:02:41
 * @Description:
 */
import { Component } from "react";
import "./app.scss";
import "src/assets/styles/common.scss";
import "src/assets/iconfont/iconfont.css";

import { getSystemInfo } from "./helper/systemInfo";
import wxp from "./helper/promisify";

import "./helper/permission";

class App extends Component {
  componentDidMount = async () => {
    await getSystemInfo();

    const { data: openidCache } = await wxp
      .getStorage({ key: "openid" })
      .catch((err) => {
        console.info("无登录记录...");
        return { data: null };
      });
    if (!openidCache) {
    }
  };

  componentWillUnmount = () => {};

  componentDidHide() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children;
  }
}

export default App;
