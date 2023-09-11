import request from './core'

export const getRequesterBusinessModelAll = async <T>(): Promise<T> => {
  // 유효성검사
  const url = `/requester/business-model/all`
  return await request.get<T>(url)
}
