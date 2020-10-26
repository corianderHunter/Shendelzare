import React, { useState, useMemo } from 'react'
import { View, Input } from '@tarojs/components';
import subjects from '../../../../assets/mocks/subjects';
import homeHook from '../../hook'

import './index.scss';

const SearchMode = () => {

  const [filterText, setFilterText] = useState('')
  const {searchOpen, setSearchOpen,selectedSubjects, setSelectedSubjects}  = homeHook()


  const shownSubjects = useMemo(() => {
    const subs = subjects.filter(({ name }) => {
      return !selectedSubjects.includes(name)
    }).map(({ name }) => name)
    if (filterText) {
      return subs.filter((name) => {
        return filterText ? name.includes(filterText) : true
      })
    }
    return subs
  }, [selectedSubjects, filterText])
  return <View className={`search-mode${searchOpen ? ' open' : ''}`}>
    <View className="full-cover"></View>
    <View className="seacrh-content">
      <Input value={filterText} className="search-input full-show" onInput={value => setFilterText(value.detail.value)}></Input>
      <View className="iconfont iconsearch" onClick={() => setSearchOpen(!searchOpen)}>
      </View>
    </View>
    <View className="shown-subjects">
      {shownSubjects.length ? <View className="shown-subjects-left">
        {shownSubjects.map(v => <View className="tag" onClick={() => {
          if (selectedSubjects.includes(v)) {
            setSelectedSubjects(selectedSubjects.filter(_v => { v !== v }))
          } else {
            if(selectedSubjects.length>4) return;
            setSelectedSubjects([...selectedSubjects, v])
          }
        }}>{v}</View>)}
      </View> : null}
      <View className="shown-subjects-right">
        {
          selectedSubjects.map(v => <View className="tag" onClick={() => {
            setSelectedSubjects(selectedSubjects.filter(_v => _v !== v))
          }}>{v}</View>)
        }
      </View>
    </View> 
  </View>
}

export default SearchMode;