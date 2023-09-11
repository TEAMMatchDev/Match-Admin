import React, {useState} from 'react'
import {CFormInput, CButton, CCollapse} from '@coreui/react'
import {Container} from './style'
import axios from 'axios'

const RecommendEdit = ({details, item, getFlag, setGetFlag, toggleDetails}: any) => {
  const [value, setValue] = useState(item.recommendWord)
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleEdit = async () => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_API}/app/recommends`,
        {
          recommendWordIdx: item.recommendWordIdx,
          recommendWord: value,
        },
        {
          headers: {'X-AUTH-TOKEN': localStorage.getItem('jwt') || ''},
        },
      )
      setGetFlag(!getFlag)
      toggleDetails(item._id)
    } catch (e) {
      console.log(e)
    }
  }

  const handleCancel = () => {
    toggleDetails(item._id)
    setValue(item.recommendWord)
  }
  return (
    <CCollapse visible={details.includes(item._id)}>
      <Container>
        <CFormInput value={value} onChange={onChangeInput} />
        <CButton size='sm' color='info' onClick={handleEdit}>
          저장
        </CButton>
        <CButton size='sm' color='danger' onClick={handleCancel}>
          취소
        </CButton>
      </Container>
    </CCollapse>
  )
}

export default RecommendEdit
