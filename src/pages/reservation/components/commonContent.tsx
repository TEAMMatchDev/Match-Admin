import React from 'react'
import ReservationInfoBox from './InfoBox'
import {Info} from './content'

const CommonContent = ({info}: Info) => {
  return (
    <React.Fragment>
      <ReservationInfoBox title={'사용자명'} content={info?.nickName} />
      <ReservationInfoBox title={'이메일'} content={info?.email} />
      <ReservationInfoBox title={'전화번호'} content={info?.phoneNumber} />
      <ReservationInfoBox title={'전시 날짜'} content={info?.exhibitionDate} />
      <ReservationInfoBox title={'전시작품 수'} content={info?.productNum} />
      <ReservationInfoBox title={'작품 크기'} content={info?.productSize} />
      <ReservationInfoBox title={'프로젝트 내용'} content={info?.productDetail} />
      <ReservationInfoBox title={'포트폴리오 URL'} content={info?.portfolioUrl} />
      <ReservationInfoBox title={'대여 공간'} content={info?.placeName} />
    </React.Fragment>
  )
}

export default CommonContent
