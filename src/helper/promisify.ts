import { promisifyAll, promisify } from 'miniprogram-api-promise';

//@ts-ignore
const wxp:Wxp = {}

promisifyAll(wx, wxp)

export default wxp