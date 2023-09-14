import {cilMoney, cilUserPlus} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {CButton, CCard, CCardBody, CCardText, CCardTitle, CContainer, CRow} from '@coreui/react'
import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {getDashboard, getDonationDashboard} from '../../apis/dashboard'

const Dashboard = () => {
  const [dashboardInfo, setDashboardInfo] = useState<dashboardInfo>({
    totalUserCnt: 0,
    oneDayUserCnt: 0,
    weekUserCnt: 0,
    monthUserCnt: 0,
  })
  const [donationDashboardInfo, setDonationDashboardInfo] = useState<donationDashboardInfo>({
    oneDayDonation: 0,
    weekDonation: 0,
    monthDonation: 0,
  })

  const navigate = useNavigate()

  useEffect(() => {
    const dashboardApi = async () => {
      try {
        const {totalUserCnt, oneDayUserCnt, weekUserCnt, monthUserCnt} = await getDashboard<getDashboardResponse>()
        const {oneDayDonation, weekDonation, monthDonation} = await getDonationDashboard<getDonationDashboardResponse>()
        setDashboardInfo({totalUserCnt, oneDayUserCnt, weekUserCnt, monthUserCnt})
        setDonationDashboardInfo({oneDayDonation, weekDonation, monthDonation})
      } catch (error) {
        alert(`${error.message}`)
        navigate('/login')
      }
    }
    dashboardApi()
  }, [])

  const handleGa4BtnClick = () => {
    window.open(
      'https://analytics.google.com/analytics/web/provision/?authuser=1&pli=1#/p360600939/reports/reportinghub?params=_u..nav%3Dmaui',
    )
  }

  return (
    <CContainer className='my3'>
      {/*<CButton onClick={handleGa4BtnClick} className='my-3'>
        GA4로 이동
      </CButton>*/}
      <CRow className='d-flex gap-4 my-3'>
        <CCard style={{width: '15rem'}}>
          <CCardBody>
            <CCardTitle className='d-flex justify-content-end'>
              <CIcon icon={cilUserPlus} size='xxl' className=''></CIcon>
            </CCardTitle>
            <CCardTitle className='h4'>{dashboardInfo.totalUserCnt.toLocaleString()}</CCardTitle>
            <CCardText>회원 가입수</CCardText>
          </CCardBody>
        </CCard>
        <CCard style={{width: '15rem'}}>
          <CCardBody>
            <CCardTitle className='d-flex justify-content-end'>
              <CIcon icon={cilUserPlus} size='xxl' className=''></CIcon>
            </CCardTitle>
            <CCardTitle className='h4'>{dashboardInfo.oneDayUserCnt.toLocaleString()}</CCardTitle>
            <CCardText>하루 회원가입 수</CCardText>
          </CCardBody>
        </CCard>
        <CCard style={{width: '15rem'}}>
          <CCardBody>
            <CCardTitle className='d-flex justify-content-end'>
              <CIcon icon={cilUserPlus} size='xxl' className=''></CIcon>
            </CCardTitle>
            <CCardTitle className='h4'>{dashboardInfo.weekUserCnt.toLocaleString()}</CCardTitle>
            <CCardText>일주일 회원가입 수</CCardText>
          </CCardBody>
        </CCard>
        <CCard style={{width: '15rem'}}>
          <CCardBody>
            <CCardTitle className='d-flex justify-content-end'>
              <CIcon icon={cilUserPlus} size='xxl' className=''></CIcon>
            </CCardTitle>
            <CCardTitle className='h4'>{dashboardInfo.monthUserCnt.toLocaleString()}</CCardTitle>
            <CCardText>한 달 회원가입 수</CCardText>
          </CCardBody>
        </CCard>
      </CRow>
      <CRow className='d-flex gap-4'>
        <CCard style={{width: '15rem'}}>
          <CCardBody>
            <CCardTitle className='d-flex justify-content-end'>
              <CIcon icon={cilMoney} size='xxl' className=''></CIcon>
            </CCardTitle>
            <CCardTitle className='h4'>{donationDashboardInfo.oneDayDonation.toLocaleString()}</CCardTitle>
            <CCardText>하루 기부 금액</CCardText>
          </CCardBody>
        </CCard>
        <CCard style={{width: '15rem'}}>
          <CCardBody>
            <CCardTitle className='d-flex justify-content-end'>
              <CIcon icon={cilMoney} size='xxl' className=''></CIcon>
            </CCardTitle>
            <CCardTitle className='h4'>{donationDashboardInfo.weekDonation.toLocaleString()}</CCardTitle>
            <CCardText>일주일 기부 금액</CCardText>
          </CCardBody>
        </CCard>
        <CCard style={{width: '15rem'}}>
          <CCardBody>
            <CCardTitle className='d-flex justify-content-end'>
              <CIcon icon={cilMoney} size='xxl' className=''></CIcon>
            </CCardTitle>
            <CCardTitle className='h4'>{donationDashboardInfo.monthDonation.toLocaleString()}</CCardTitle>
            <CCardText>한 달 기부 금액</CCardText>
          </CCardBody>
        </CCard>
      </CRow>
    </CContainer>
  )
}

export default Dashboard
