import {IExhibitionCreateResponse, IImageResponse, IExhibitionItem, IExhibitionListResponse} from '../models/Exhibition'
import request from './core'

export const getExhibitionList = async (
  size: number | null = null,
  page: number | null = null,
): Promise<IExhibitionListResponse> => {
  const url = `/app/admin/exhibitions?size=${size}&page=${page}`
  return request.get<IExhibitionListResponse>(url)
}

export const getExhibitionItem = async (exhibitionIdx: number): Promise<IExhibitionItem> => {
  const url = `app/admin/exhibitions/${exhibitionIdx}`
  return request.get<IExhibitionItem>(url)
}

export const getExhibitionImage = async (fileString: string): Promise<IImageResponse> => {
  const url = `app/admin/exhibitions/images?file=${fileString}`
  return request.get<IImageResponse>(url)
}

export const createExhibition = async (data: FormData): Promise<IExhibitionCreateResponse> => {
  const url = '/app/admin/exhibitions'
  return request.post<IExhibitionCreateResponse>(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const updateExhibiton = async (exhibitionIdx: number, data: FormData): Promise<number> => {
  const url = `app/admin/exhibitions/${exhibitionIdx}`
  return request.put<number>(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const deleteExhibition = async (exhibitionIdx: number): Promise<string> => {
  const url = `app/admin/exhibitions/${exhibitionIdx}`
  return request.delete<string>(url)
}
