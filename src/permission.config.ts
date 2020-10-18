import wxp from "./helper/promisify";

export default [
  {
    key: "scope.userInfo",
    title: "获取用户信息",
    description: "为提供更好的定制化服务",
    guidePage: "/pages/guide/user",
    missCallback: () => {
      wxp.redirectTo({ url: "/guide/user" });
    },
  },
];
