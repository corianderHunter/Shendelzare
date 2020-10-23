import wxp from './promisify'
import permissions from '../permission.config'


const permissionsMap = permissions.reduce((s,v)=>{
  s[v.key] = v
  return s;
},{})

const checkPermissions = async ()=>{
  const {authSetting} = await wxp.getSetting({})
  for(let value in permissionsMap){
    if(permissionsMap[value].abled===false) continue;
    if(!authSetting[value]){
      await wxp.redirectTo({url:permissionsMap[value].guidePage})
      return;
    }
  }
}

export { checkPermissions}