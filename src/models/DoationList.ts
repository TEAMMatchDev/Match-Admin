type DoationList = {
  donationRequestId: number
  username: string
  phoneNumber: string
  email: string
  alarmMethod: boolean
  donationKind: number
  deposit: DepositStatus | string
  createdAt: string
}

type DepositStatus = 'EXISTENCE' | 'NONEXISTENCE'

type getDonationListResponse = {
  isLast: boolean
  totalCnt: number
  contents: DoationList[]
}

type DonationRequest = {
  donationRequestId: number
  name: string
  amount: string
}
