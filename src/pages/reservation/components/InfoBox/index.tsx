import React from 'react'
import {ReservationDetailInfoWrapperStyle} from '../../ReservationDetailStyle'

interface Info {
  title: string
  content: string | number
}

const ReservationInfoBox = (props: Info) => {
  return (
    <ReservationDetailInfoWrapperStyle>
      <div className='info_container'>
        <div className='info_title'>{props.title}</div>
        <div className='info_element'>{props.content}</div>
      </div>
    </ReservationDetailInfoWrapperStyle>
  )
}

export default ReservationInfoBox
