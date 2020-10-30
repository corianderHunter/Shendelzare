import { useState, Dispatch, useCallback, useEffect } from "react"
import createRubickHook from "src/components/rubick"
import wxp from "src/helper/promisify"
import { FAVORITE } from "src/const/storageKey"

interface HomeHookType {
  searchOpen:boolean;
  setSearchOpen:Dispatch<boolean>;
  selectedSubjects:string[];
  setSelectedSubjects:Dispatch<string[]>;
  favImages:(string|number)[];
  setFavImages:Dispatch<(string|number)[]>;
  updateFavImages:(v:string)=>void;
}

const homeHook = ():HomeHookType=>{
  const [searchOpen, setSearchOpen] = useState(false)
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [favImages,setFavImages] = useState<(string|number)[]>([])

  const updateFavImages = useCallback((name)=>{
    if(favImages.includes(name)){
      setFavImages(v=>{
        const rst = v.filter(v=>v!==name)
        wxp.setStorage({key:FAVORITE,data:rst})
        return rst
      })
    }else{
      setFavImages(v=>{
       const rst = [...v,name]
       wxp.setStorage({key:FAVORITE,data:rst})
       return rst
      })
    }
    
  },[favImages])

  return {
    searchOpen, setSearchOpen,selectedSubjects, setSelectedSubjects,
    favImages,
    setFavImages,
    updateFavImages
  }
}

export default createRubickHook(homeHook)