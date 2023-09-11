import React from 'react'
import {CButton} from '@coreui/react'
import axios from 'axios'
import {useNavigate} from 'react-router'
interface Props {
  reservationIdx: string
  paymentDate: string
}

const PaymentButton = (props: Props) => {
  const navigate = useNavigate()

  const onClickPayment = () => {
    // 결제완료 API
    const payment = async () => {
      try {
        const {data: response} = await axios.patch(
          `${process.env.REACT_APP_API}/admin/reservations/payment`,
          {
            reservationIdx: props.reservationIdx,
            paymentDate: props.paymentDate,
          },
          {
            headers: {'X-AUTH-TOKEN': localStorage.getItem('jwt') || ''},
          },
        )
        if (response.isSuccess === false) {
          alert('형식에 맞는 결제일을 입력해 주세요')
        } else {
          navigate('/reservation')
        }
      } catch (e) {
        alert('형식에 맞는 결제일을 입력해 주세요')
      }
    }

    payment()
  }
  return (
    <React.Fragment>
      <CButton className='menu_btn' color='primary' onClick={() => onClickPayment()}>
        결제완료
      </CButton>
    </React.Fragment>
  )
}

export default PaymentButton
