const paddingZero =  (num:number, length:number) =>{
  return (Array(length).join("0") + num).slice(-length)
}
const duration = (value:number):string=>{
  const hour = Math.floor(value/3600)
  const min = Math.floor(value%3600/60)
  const sec = Math.floor(value%3600%60)
  return paddingZero(hour,2)+':'+paddingZero(min,2)+':'+paddingZero(sec,2)
}

export default duration;