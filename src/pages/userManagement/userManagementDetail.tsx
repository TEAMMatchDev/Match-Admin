import {CButton, CCol, CContainer, CFormSelect, CRow} from '@coreui/react'
import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {
  getUserDetail,
  updateBirth,
  updateEmail,
  updateGender,
  updateNickname,
  updatePhone,
  updateUserDetail,
} from '../../apis/userManagement'
import {InfoBox, InfoBoxContent, InfoBoxTitle, Title} from './styles'
import EditModal from './userEditModal'

const INFOBOXTITLE = {
  userId: '번호',
  name: '이름',
  email: '이메일',
  nickname: '닉네임',
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
  const [showEditModal, setShowEditModal] = useState(false)
  const [userDetail, setUserDetail] = useState({})
  const [fieldToEdit, setFieldToEdit] = useState('')
  const [editValue, setEditValue] = useState('')
  const [title, setTitle] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  useEffect(() => {
    const userDetailApi = async () => {
      try {
        if (typeof userId === 'undefined') {
          alert('없는 유저입니다.')
          navigate(-1)
        } else {
          const response = await getUserDetail<UserDetailInfo>(userId)
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

  const handleEditButtonClick = (title: string, field: string, value: string) => {
    setTitle(title)
    console.log(field)
    setFieldToEdit(field)
    setEditValue(value)
    setShowEditModal(true)
  }

  // 모달을 열고 닫는 함수
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleSaveEdit = async () => {
    if (!userId) return // userId 가 없다면 함수를 종료합니다.
    console.log('저장 ' + editValue)
    const id = Number(userId)
    try {
      let response: any
      switch (fieldToEdit) {
        case 'birth':
          response = await updateBirth(id, editValue)
          break
        case 'email':
          response = await updateEmail(id, editValue)
          break
        case 'phoneNumber':
          response = await updatePhone(id, editValue)
          break
        case 'gender':
          let genderParam: string
          if (editValue === '여성') genderParam = 'FEMALE'
          else if (editValue === '남성') genderParam = 'MALE'
          else genderParam = 'UNKNOWN'
          response = await updateGender(id, genderParam)
          break
        case 'nickname':
          response = await updateNickname(id, editValue)
          break
        default:
          throw new Error('Invalid field to edit')
      }
      alert('성공적으로 업데이트 되었습니다.')
    } catch (error) {
      alert(error.response.data.message)
    } finally {
      setShowEditModal(false)
      window.location.reload()
    }
  }

  return (
    <>
      <CContainer>
        <CRow className='my-3'>
          <CCol className='d-flex justify-content-between'>
            <Title>유저 상세 정보</Title>
          </CCol>
        </CRow>
        <CRow>
          {typeof userDetailInfo !== 'undefined' &&
            Object.entries(userDetailInfo).map(([key, value]) => {
              const isEditable = ['birth', 'email', 'gender', 'phoneNumber', 'nickname'].includes(key)
              return (
                <InfoBox
                  key={`infoBox-${key}-${mode}`}
                  className='my-1 d-flex justify-content-between align-items-center'
                >
                  <div className='d-flex align-items-center'>
                    <InfoBoxTitle>{INFOBOXTITLE[key as keyof typeof INFOBOXTITLE]}</InfoBoxTitle>
                    <InfoBoxContent>
                      {key === 'status' || key === 'card' ? AccountStatus[value as keyof typeof AccountStatus] : value}
                    </InfoBoxContent>
                  </div>

                  {/* 버튼을 오른쪽 끝에 위치시킵니다. */}
                  {isEditable && (
                    <CButton
                      size='sm'
                      color='dark'
                      onClick={() => handleEditButtonClick(INFOBOXTITLE[key as keyof typeof INFOBOXTITLE], key, value)}
                    >
                      수정
                    </CButton>
                  )}
                </InfoBox>
              )
            })}
        </CRow>
        {showEditModal && (
          <EditModal
            visible={showEditModal}
            title={`${title} 수정`}
            fieldToEdit={fieldToEdit}
            initialValue={editValue}
            onClose={() => setShowEditModal(false)}
            userId={userId}
          />
        )}
      </CContainer>
    </>
  )
}

export default UserManagementDetail
