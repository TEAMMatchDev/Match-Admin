import React from 'react'
import {CButton} from '@coreui/react'
import {useDispatch} from 'react-redux'
import {useTypedSelector} from '../../../../store'
import {useNavigate} from 'react-router'
import axios from 'axios'

const CancelButton = (props: any) => {
  console.log(props)
  const {status} = props
  const {testReservationInfo} = props

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cancelModalShow = useTypedSelector(state => state.cancelModalShow)

  const onClickCancel = () => {
    // 결제완료 API
    const cancel = async () => {
      try {
        const {data: response} = await axios.patch(
          `${process.env.REACT_APP_API}/admin/reservations/${testReservationInfo.reservationIdx}/cancel?cancelReason=${testReservationInfo.cancelReason}`,
          null,
          {
            headers: {'X-AUTH-TOKEN': localStorage.getItem('jwt') || ''},
          },
        )
        navigate('/reservation')
      } catch (e) {
        alert('취소 사유를 입력해 주세요.')
      }
    }
    cancel()
  }
  return (
    <React.Fragment>
      {status.state === 'cancel_user' ? (
        <CButton className='menu_btn' color='primary' onClick={onClickCancel}>
          예약취소
        </CButton>
      ) : (
        <CButton
          className='menu_btn'
          color='primary'
          onClick={() => dispatch({type: 'set', cancelModalShow: !cancelModalShow})}
        >
          예약취소
        </CButton>
      )}
    </React.Fragment>
  )
}

export default CancelButton
