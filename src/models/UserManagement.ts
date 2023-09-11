type UserInfo = {
  userId: number
  name: string
  birth: string
  socialType: string
  gender: string
  phoneNumber: string
  email: string
  card: boolean
  donationTotalCnt: number
  totalAmount: number
  status: UserStatus | string
  createdAt: any
}

type UserDetailInfo = {
  userId: number
  name: string
  birth: string
  socialType: string
  gender: string
  phoneNumber: string
  email: string
  card: boolean
  totalCnt: number
  totalAmount: number
  status: UserStatus | string
  createdAt: any
}

type UserCard = {
  id: number
  cardCode: string
  cardName: string
  cardNo: string
  cardAbleStatus: string
}

type UserStatus = 'ACTIVE' | 'INACTIVE'

type getUserListResponse = {
  isLast: boolean
  totalCnt: number
  contents: UserInfo[]
}
