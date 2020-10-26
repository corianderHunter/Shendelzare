import { View } from "@tarojs/components"
import React, { useEffect, useState } from "react"
import wxp from "src/helper/promisify"
import { THEME } from "src/const/storageKey"



enum Themes {
  LIGHT='theme--light',
  DARK='theme--dark'
}

interface ThemePropsType {
}

const Theme:React.FC<ThemePropsType> = ({children})=>{

  const [theme,setTheme] = useState(Themes.DARK)


  useEffect(()=>{
    (async ()=>{
      const storageTheme = await wxp.getStorage({key:THEME})
      if(storageTheme){
        setTheme(storageTheme as any)
      }
    })()
  },[])

  return <View style={{width:'100%',height:'100%'}} className={`theme ${theme}`}>{children}</View>
}

export default Theme