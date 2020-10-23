import React, { useState } from 'react'
import { View, Input } from '@tarojs/components';
import subjects from '../../../../assets/mocks/subjects';

import './index.scss';

const SearchMode = ()=>{

  const [searchOpen,setSearchOpen] = useState(false)
  const [filterText,setFilterText] = useState('')

  return  <View className={`search-mode${searchOpen?'':' open'}`}>
  <View className="full-cover"></View>
  <View className="seacrh-content">
    <Input value={filterText} className="search-input full-show" onInput={value=>setFilterText(value.detail.value)}></Input>
    <View className="iconfont iconsearch" onClick={()=>setSearchOpen(!searchOpen)}>
    </View>
  </View>
  <View className="shown-subjects">
    <View className="tag">打发的撒</View>
  </View>
</View>
}

export default SearchMode;