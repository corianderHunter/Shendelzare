import { useState, Dispatch } from "react"
import createRubickHook from "src/components/rubick"

interface HomeHookType {
  searchOpen:boolean;
  setSearchOpen:Dispatch<boolean>;
  selectedSubjects:string[];
  setSelectedSubjects:Dispatch<string[]>
}

const homeHook = ():HomeHookType=>{
  const [searchOpen, setSearchOpen] = useState(true)
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])

  return {
    searchOpen, setSearchOpen,selectedSubjects, setSelectedSubjects
  }
}

export default createRubickHook(homeHook)