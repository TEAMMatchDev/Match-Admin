import axios, {AxiosInstance, AxiosInterceptorManager, AxiosRequestConfig, AxiosResponse} from 'axios'
import {JWT_KEY} from '../../config/constant'

class customError extends Error {
  constructor(public code: number, message: string) {
    super(message)
    this.code = code
  }

  getCode() {
    return this.code
  }
}

type BaseResponse<T = any> = {
  isSuccess: boolean
  code: number
  message: string
  result: T
}

interface CustomInstance extends AxiosInstance {
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse<BaseResponse>>
  }
  getUri(config?: AxiosRequestConfig): string
  request<T>(config: AxiosRequestConfig): Promise<T>
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>
  head<T>(url: string, config?: AxiosRequestConfig): Promise<T>
  options<T>(url: string, config?: AxiosRequestConfig): Promise<T>
  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
  patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
}

const request: CustomInstance = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 2500,
  headers: {
    accept: 'application/json',
    'X-AUTH-TOKEN': `${window.localStorage.getItem(JWT_KEY)}`,
  },
})

request.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  },
)

request.interceptors.response.use(
  response => {
    if (response.data.isSuccess) {
      return response.data.result
    } else {
      return Promise.reject(new customError(response.data.code, response.data.message))
    }
  },
  error => {
    return Promise.reject(error)
  },
)

export default request
