import {JWT_KEY} from '../config/constant'
import request from './core'

export const getReservationList: any = async <T>(status: string): Promise<T> => {
  const url = `/admin/reservations?state=${status}`
  const response = await request.get<T>(url, {headers: {'X-AUTH-TOKEN': `${window.localStorage.getItem(JWT_KEY)}`}})
  return response
}

export const getReservationDetailInfo: any = async <T>(reservationIdx: number): Promise<T> => {
  const url = `/admin/reservations/detail?reservationIdx=${reservationIdx}`
  return await request.get<T>(url, {headers: {'X-AUTH-TOKEN': `${window.localStorage.getItem(JWT_KEY)}`}})
}

export const getReservationSearchList: any = async <T>(status: string): Promise<T> => {
  const url = `/admin/reservations`
  console.log(status)
  return await request.get<T>(url, {headers: {'X-AUTH-TOKEN': `${window.localStorage.getItem(JWT_KEY)}`}})
}

export const handlePayment: any = async <T>(reservationIdx: number, paymentDate: string): Promise<T> => {
  const url = `/admin/reservations/payment`
  const response = await request
    .patch<T>(url, {
      body: {reservationIdx: reservationIdx, paymentDate: paymentDate},
      headers: {'X-AUTH-TOKEN': `${window.localStorage.getItem(JWT_KEY)}`},
    })
    .then((res: any) => {
      try {
        console.log(res)
      } catch (error) {
        console.log(error)
      }
      return res
    })
  return response
}
