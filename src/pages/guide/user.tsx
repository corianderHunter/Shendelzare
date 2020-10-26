import React, { useState, useCallback } from 'react'
import { OpenData, Button } from '@tarojs/components'
import './user.scss'
import wxp from '../../helper/promisify'
import { USERINFO } from 'src/const/storageKey'
import Theme from 'src/components/theme'
const User = () => {
  const [canIUse, setCanIUse] = useState(() => wx.canIUse('button.open-type.getUserInfo'))
  const getUserInfo = useCallback((data) => {
    const { detail: info } = data
    const { userInfo } = info
    wxp.setStorage({ key: USERINFO, data: userInfo })
    wxp.redirectTo({ url: '/pages/index/index' })
  }, [])
  return <Theme>


    <view className="user-container center-container">
      <view className="avatar block">
        <OpenData type="userAvatarUrl"></OpenData>
      </view>
      <view className="nick-name">
        <OpenData type="userNickName"></OpenData>
      </view>
      {canIUse ? <Button size="mini" openType="getUserInfo" onGetUserInfo={getUserInfo}>授权登录</Button> : <view>请升级微信版本</view>}
    </view>
  </Theme>
}

export default User;