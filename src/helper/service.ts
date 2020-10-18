import { db } from "./cloud"

const MAX_LIMIT = 20

export interface GetBigListResult {
result:{  data: {
    total: number;
    list: Promise<DB.IQueryResult>[]
  },
  errMsg: string}
}

export const getBigList = async (collectionName: string, query: object = {}): Promise<GetBigListResult> => {
  // 先取出集合记录总数
  const { total } = await db.collection(collectionName).where(query).count()
  // 计算需分几次取
  const batchTimes = Math.ceil(total / MAX_LIMIT)
  // 承载所有读操作的 promise 的数组
  const tasks: Promise<DB.IQueryResult>[] = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = db.collection(collectionName).where(query).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }


  // 等待所有
  return (await Promise.all(tasks)).reduce((acc, cur) => {
    return {
      data: {
        total,
        list: acc.data.list.concat(cur.data),
      },
      errMsg: acc.errMsg,
    }
  }, { data: { total: 0, list: [] }, errMsg: '' } as any)
}