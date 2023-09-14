type dashboardInfo = {
  totalUserCnt: number

  oneDayUserCnt: number

  weekUserCnt: number

  monthUserCnt: number
}

type donationDashboardInfo = {
  oneDayDonation: number
  weekDonation: number
  monthDonation: number
}
type getDashboardResponse = dashboardInfo

type getDonationDashboardResponse = donationDashboardInfo
