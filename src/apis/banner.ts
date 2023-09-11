import {IImageResponse} from '../models/Exhibition'
import {IBannerCreateResponse, IBannerItem} from './../models/Banner'
import request from './core'

export const getBannerList = async (): Promise<IBannerItem[]> => {
  const url = 'app/admin/banners'
  return request.get<IBannerItem[]>(url)
}

export const getBannerItem = async (bannerIdx: number): Promise<IBannerItem> => {
  const url = `app/admin/banners/${bannerIdx}`
  return request.get<IBannerItem>(url)
}

export const getBannerImage = async (fileString: string): Promise<IImageResponse> => {
  const url = `app/admin/banners/images?file=${fileString}`
  return request.get<IImageResponse>(url)
}

export const createBanner = async (data: FormData): Promise<IBannerCreateResponse> => {
  const url = 'app/admin/banners'
  return request.post<IBannerCreateResponse>(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const updateBanner = async (bannerIdx: number, data: FormData): Promise<number> => {
  const url = `app/admin/banners/${bannerIdx}`
  return request.patch<number>(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const deleteBanner = async (bannerIdx: number): Promise<number> => {
  const url = `app/admin/banners/${bannerIdx}`
  return request.delete<number>(url)
}
