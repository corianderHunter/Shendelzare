import wxp from "./promisify";

const STORAGE_KEYS = {
  SYSTEM_INFO: 'systemInfo'
}

export const getSystemInfo = async () => {
  const systemInfoCache = await wxp.getStorage({ key: STORAGE_KEYS.SYSTEM_INFO })
    .catch((error) => {
      console.log(error.errMsg)
    })
  if (systemInfoCache) return systemInfoCache
  const systemInfo = await wxp.getSystemInfo()
  await wxp.setStorage({ key: STORAGE_KEYS.SYSTEM_INFO, data: systemInfo })
  return systemInfo
}