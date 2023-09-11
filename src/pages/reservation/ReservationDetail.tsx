import React, {useEffect, useState} from 'react'
import {
  ReservationDetailMenuContainerStyle,
  ReservationDetailContentContainerStyle,
  ReservationDetailImgContainerStyle,
  ReservationDetailInfoContainerStyle,
} from './ReservationDetailStyle'
import {CCarousel, CCarouselItem, CImage} from '@coreui/react'
import BackButton from './components/button/backButton'
import CancelButton from './components/button/cancelButton'
import PaymentButton from './components/button/paymentButton'
import {useLocation} from 'react-router'
import {RouteState, ReservationInfo} from './reservation.contstants'
import CancelModal from './components/cancelModal'
import Content from './components/content'
import {getReservationDetailInfo} from '../../apis/reservation'

const ReservationDetail = () => {
  const {state} = useLocation() as RouteState
  const [paymentDate, setPaymentDate] = useState<string>('')
  const [reservationDetailInfo, setReservationDetailInfo] = useState<ReservationInfo>()
  const onChangeDateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentDate(e.target.value)
  }

  useEffect(() => {
    getReservationDetailInfo(state.reservationIdx).then((res: ReservationInfo) => {
      setReservationDetailInfo(res)
    })
  }, [])

  return (
    <div>
      <ReservationDetailMenuContainerStyle>
        <div className='menu_btn_container'>
          <BackButton />
          {state.state === 'cancel_admin' || state.state === 'cancel_user' ? null : state.state === 'finish' ? (
            <CancelButton status={state} testReservationInfo={reservationDetailInfo} />
          ) : (
            <React.Fragment>
              <PaymentButton reservationIdx={state.reservationIdx} paymentDate={paymentDate} />
              <CancelButton status={state} testReservationInfo={reservationDetailInfo} />
            </React.Fragment>
          )}
        </div>
      </ReservationDetailMenuContainerStyle>
      <CancelModal />
      <ReservationDetailContentContainerStyle>
        <ReservationDetailImgContainerStyle>
          <CCarousel controls indicators dark>
            {reservationDetailInfo?.photoList.map(e => (
              <CCarouselItem key={e}>
                <CImage className='d-block w-100' src={e} alt='slide 1' />
              </CCarouselItem>
            ))}
          </CCarousel>
        </ReservationDetailImgContainerStyle>
        <ReservationDetailInfoContainerStyle>
          {reservationDetailInfo !== undefined ? (
            <Content info={reservationDetailInfo} paymentDate={paymentDate} onChangeDateValue={onChangeDateValue} />
          ) : null}
        </ReservationDetailInfoContainerStyle>
      </ReservationDetailContentContainerStyle>
    </div>
  )
}

export default ReservationDetail
