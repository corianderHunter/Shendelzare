import date from 'date-and-time';
const {format} = date;

const commonTemplate = 'YYYY-MM-DD HH:mm:ss'

export const dateTimeString = (time:Date,template:string=commonTemplate):string=>{
  return format(time,template)
}

export const currentTimeString = ()=>{
  return dateTimeString(new Date())
}