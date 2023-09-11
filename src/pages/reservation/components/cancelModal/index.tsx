import React, {useState} from 'react'
import {CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton} from '@coreui/react'
import {useDispatch} from 'react-redux'
import {useTypedSelector} from '../../../../store'
import {CModalTextarea} from './style'
import {useParams} from 'react-router'
import axios from 'axios'
import {useNavigate} from 'react-router'
const CancelModal = () => {
  const dispatch = useDispatch()
  const cancelModalShow = useTypedSelector(state => state.cancelModalShow)
  const [textareaValue, setTextareaValue] = useState<string>('')
  const onChangeValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value)
  }

  const {id: reservationIdx} = useParams()
  const navigate = useNavigate()

  const onClickCancel = () => {
    // 결제완료 API
    const cancel = async () => {
      try {
        const {data: response} = await axios.patch(
          `${process.env.REACT_APP_API}/admin/reservations/${reservationIdx}/cancel?cancelReason=${textareaValue}`,
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
    <CModal
      alignment='center'
      visible={cancelModalShow}
      onClose={() => dispatch({type: 'set', cancelModalShow: false})}
    >
      <CModalHeader>
        <CModalTitle>예약 취소 사유</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CModalTextarea placeholder='취소 사유를 입력해 주세요' onChange={onChangeValue} value={textareaValue} />
      </CModalBody>
      <CModalFooter>
        <CButton color='secondary' onClick={() => dispatch({type: 'set', cancelModalShow: false})}>
          닫기
        </CButton>
        <CButton
          color='primary'
          onClick={() => {
            dispatch({type: 'set', cancelModalShow: false})
            onClickCancel()
          }}
        >
          예약 취소
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default CancelModal
