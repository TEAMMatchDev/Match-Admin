export interface RouteState {
  state: UserInfo
}

export interface ReservationInfo {
  cancelReason: string
  email: string
  exhibitionDate: string
  nickName: string
  paymentDate: string
  phoneNumber: string
  photoList: []
  placeName: string
  portfolioUrl: string
  productDetail: string
  productNum: string
  productSize: string
  reservationIdx: number
  state: 'review' | 'finish' | 'cancel_admin' | 'cancel_user'
}

export interface UserInfo {
  number: number
  name: string
  email: string
  phoneNumber: string
  state: string
  reservationIdx: string
}
