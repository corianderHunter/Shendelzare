import { View } from "@tarojs/components"
import React, { useEffect, useState, useCallback } from "react"
import wxp from "src/helper/promisify"
import { THEME } from "src/const/storageKey"

import './index.scss'

enum Themes {
  LIGHT = 'theme--light',
  DARK = 'theme--dark'
}

interface ThemePropsType {
  control?: boolean
}

const Theme: React.FC<ThemePropsType> = ({ control = false, children }) => {

  const [theme, setTheme] = useState(Themes.DARK)



  useEffect(() => {
    (async () => {
      const {data:storageTheme} = await wxp.getStorage({ key: THEME })
      if (storageTheme) {
        setTheme(storageTheme as any)
      }
    })()
  }, [])

  const toggleTheme= useCallback(()=>{
      setTheme(v=>{
        const theme =  Themes.LIGHT===v?Themes.DARK:Themes.LIGHT
        wxp.setStorage({key:THEME,data:theme})
        return theme
      })
  },[])

  return <View style={{ width: '100%', height: '100%' }} className={`theme ${theme}`}>
   {control? <View onClick={toggleTheme} className="iconfont iconjinggao"></View>:null}{children}</View>
}

export default Theme