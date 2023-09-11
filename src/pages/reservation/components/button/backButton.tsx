import React from 'react'
import {CButton} from '@coreui/react'
import {useNavigate} from 'react-router'

const BackButton = () => {
  const navigate = useNavigate()
  return (
    <React.Fragment>
      <CButton className='menu_btn_back' color='primary' onClick={() => navigate(-1)}>
        뒤로가기
      </CButton>
    </React.Fragment>
  )
}

export default BackButton
