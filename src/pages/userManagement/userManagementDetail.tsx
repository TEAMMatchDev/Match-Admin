import {CButton, CCol, CContainer, CFormSelect, CRow} from '@coreui/react'
import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {getUserDetail, updateUserDetail} from '../../apis/userManagement'
import {InfoBox, InfoBoxContent, InfoBoxTitle, Title} from './styles'

const INFOBOXTITLE = {
  userId: '번호',
  name: '이름',
  email: '이메일',
  birth: '생일 정보',
  socialType: '가입 유형',
  phoneNumber: '전화번호',
  card: '카드 등록 유무',
  donationCnt: '총 기부 횟수',
  totalAmount: '총 기부 금액',
  gender: '성별',
  status: '계정 상태',
  createdAt: '가입 날짜',
}

const AccountStatus = {
  ACTIVE: '활성화',
  INACTIVE: '비활성화',
  true: '등록 됨',
  false: '등록 안됨',
}

const UserManagementDetail = (): JSX.Element => {
  const [editStatus, setEditStatus] = useState<UserStatus | string>('ACTIVE')
  const [mode, setMode] = useState('detail')
  const [userDetailInfo, setUserDetailInfo] = useState<UserDetailInfo | undefined>()
  const params = useParams()
  const userId = params.id
  const navigate = useNavigate()

  useEffect(() => {
    const userDetailApi = async () => {
      try {
        if (typeof userId === 'undefined') {
          alert('없는 유저입니다.')
          navigate(-1)
        } else {
          const response = await getUserDetail<UserDetailInfo>(userId)
          console.log(response.card)
          setUserDetailInfo(response)
          setEditStatus(response.status)
        }
      } catch (error) {
        alert(`${error.message}`)
      }
    }
    userDetailApi()
  }, [userId])

  const handleEditCompleteButton = async () => {
    if (userDetailInfo !== undefined && editStatus !== userDetailInfo.status) {
      await updateUserDetail(Number(userId))
      setUserDetailInfo(prev => {
        return typeof prev !== 'undefined' ? {...prev, status: editStatus} : prev
      })
    }
    alert('수정되었습니다.')
    setMode('detail')
  }

  const handleEditStatusChange = (value: string) => {
    if (value === 'INACTIVE' || value === 'ACTIVE') {
      setEditStatus(value)
    }
  }

  return (
    <>
      <CContainer>
        <CRow className='my-3'>
          <CCol className='d-flex justify-content-between'>
            <Title>유저 상세 정보</Title>
            {mode === 'edit' ? (
              <div className='d-flex gap-2'>
                <CButton color='dark' onClick={() => setMode('detail')}>
                  뒤로 가기
                </CButton>
                <CButton onClick={handleEditCompleteButton}>수정 완료</CButton>
              </div>
            ) : (
              <CButton onClick={() => setMode('edit')}>수정 시작</CButton>
            )}
          </CCol>
        </CRow>
        <CRow>
          {typeof userDetailInfo !== 'undefined' ? (
            Object.entries(userDetailInfo).map(([key, value]) => {
              return mode === 'edit' && key === 'status' ? (
                <InfoBox key={`infoBox-${key}-${mode}`} className='my-1'>
                  <InfoBoxTitle>{INFOBOXTITLE[key as keyof typeof INFOBOXTITLE]}</InfoBoxTitle>
                  <CFormSelect
                    className='select'
                    aria-label='account-status'
                    defaultValue={editStatus}
                    onChange={e => {
                      handleEditStatusChange(e.target.value)
                    }}
                  >
                    <option value='ACTIVE'>활성화</option>
                    <option value='INACTIVE'>비활성화</option>
                  </CFormSelect>
                </InfoBox>
              ) : (
                <InfoBox key={`infoBox-${key}-${mode}`} className='my-1'>
                  <InfoBoxTitle>{INFOBOXTITLE[key as keyof typeof INFOBOXTITLE]}</InfoBoxTitle>
                  <InfoBoxContent>
                    {key === 'status' || key === 'card' ? AccountStatus[value as keyof typeof AccountStatus] : value}
                  </InfoBoxContent>
                </InfoBox>
              )
            })
          ) : (
            <></>
          )}
        </CRow>
      </CContainer>
    </>
  )
}

export default UserManagementDetail
