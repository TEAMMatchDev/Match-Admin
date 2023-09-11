import React from 'react'
import {ReservationDetailInfoWrapperStyle} from '../ReservationDetailStyle'
import CommonContent from './commonContent'
export interface Info {
  info: InfoType
}

interface InfoType {
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
// {setTestReservationInfo}: any, {onChangeDateValue}: any
const Content = ({info, paymentDate, onChangeDateValue}: any) => {
  console.log(info)

  if (info.state === 'review') {
    return (
      <React.Fragment>
        <CommonContent info={info} />
        <ReservationDetailInfoWrapperStyle>
          <div className='info_container'>
            <div className='info_title'>결제 날짜</div>
            <input
              className='info_element'
              placeholder='yyyy-mm-dd 형식으로 작성'
              value={paymentDate}
              onChange={onChangeDateValue}
            />
          </div>
        </ReservationDetailInfoWrapperStyle>
      </React.Fragment>
    )
  }

  if (info.state === 'finish') {
    const paymentDate = `${info.paymentDate[0]}/ ${info.paymentDate[1]}/ ${info.paymentDate[2]}`
    return (
      <React.Fragment>
        <CommonContent info={info} />
        <ReservationDetailInfoWrapperStyle>
          <div className='info_container'>
            <div className='info_title'>결제 날짜</div>
            <div className='info_element'>{paymentDate}</div>
          </div>
        </ReservationDetailInfoWrapperStyle>
      </React.Fragment>
    )
  }

  if (info.state === 'cancel_admin') {
    return (
      <React.Fragment>
        <CommonContent info={info} />
        <ReservationDetailInfoWrapperStyle>
          <div className='info_container'>
            <div className='info_title'>취소 사유</div>
            <div className='info_element'>{info.cancelReason}</div>
          </div>
        </ReservationDetailInfoWrapperStyle>
      </React.Fragment>
    )
  }

  if (info.state === 'cancel_user') {
    return (
      <React.Fragment>
        <CommonContent info={info} />
        <ReservationDetailInfoWrapperStyle>
          <div className='info_container'>
            <div className='info_title'>취소 사유</div>
            <div className='info_element'>{info.cancelReason}</div>
          </div>
        </ReservationDetailInfoWrapperStyle>
      </React.Fragment>
    )
  }
  return null
}

export default Content
