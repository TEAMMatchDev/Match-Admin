// BannerModal.tsx
import React, {useEffect, useState} from 'react'
import {CModal, CModalBody, CModalFooter, CModalHeader, CButton, CImage} from '@coreui/react'
import {IBannerItem} from '../../models/Banner'
import * as S from './Banner.styled'

interface BannerModalProps {
  showModal: boolean
  title: string
  bannerId: number
  onClose: () => void
  isEditMode: boolean
  item: IBannerItem
  // Add other necessary props
}

const BannerModal: React.FC<BannerModalProps> = ({showModal, onClose, title, bannerId, isEditMode, item}) => {
  const [bannerInfo, setBannerInfo] = useState<IBannerItem>({
    name: '',
    bannerId: 0,
    bannerImg: '',
    bannerName: '',
    bannerType: '',
    contentsUrl: '',
    display: true,
    endDate: '',
    startDate: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setBannerInfo(prevState => ({...prevState, [name]: value}))
  }

  const handleAddOrUpdateBanner = () => {
    if (isEditMode) {
      // Add logic to handle updating banner
    } else {
      // Add logic to handle creating banner
    }
    // Close the modal
    onClose()
  }

  const handleImageChange = () => {
    onClose()
  }

  useEffect(() => {
    console.log(isEditMode)
    if (isEditMode) {
      // Load existing data (e.g., fetch from API based on bannerId)
      // Example:
      // const existingData = fetchData(bannerId);
      // setBannerInfo(existingData);
      setBannerInfo(item)
      console.log('editMode')
      console.log()
    } else {
      console.log('addMode')
    }
  }, [isEditMode, bannerId])

  return (
    <CModal visible={showModal} onClose={onClose} size='lg'>
      <CModalHeader closeButton> {isEditMode ? '배너 수정하기' : '배너 추가하기'} </CModalHeader>
      <CModalBody>
        <S.Form>
          <S.ContentWrap>
            <div>
              <S.InputItemWrap>
                <label>배너 이름</label>
                <input
                  type='text'
                  name='bannerName'
                  value={bannerInfo.name}
                  onChange={handleInputChange}
                  placeholder='배너 이름을 입력해주세요.'
                />
              </S.InputItemWrap>
              <S.InputItemWrap>
                <label>배너 시작일</label>
                <input
                  type='datetime-local'
                  name='startDate'
                  value={bannerInfo.startDate}
                  onChange={handleInputChange}
                  placeholder='배너 시작일을 입력해주세요.'
                />
              </S.InputItemWrap>
              <S.InputItemWrap>
                <label>배너 종료일</label>
                <input
                  type='datetime-local'
                  name='endDate'
                  value={bannerInfo.endDate}
                  onChange={handleInputChange}
                  placeholder='배너 종료일을 입력해주세요.'
                />
              </S.InputItemWrap>
            </div>
            <div>
              <S.InputItemWrap className='display'>
                <label>배너 이미지</label>
                <CImage
                  src={bannerInfo.bannerImg}
                  thumbnail
                  onClick={() => {
                    handleImageChange()
                  }}
                />
              </S.InputItemWrap>
              <S.InputItemWrap>
                <label>배너 이미지 URL</label>
                <input
                  type='text'
                  name='bannerImg'
                  value={bannerInfo.bannerImg}
                  onChange={handleInputChange}
                  placeholder='배너 이미지 URL을 입력해주세요.'
                />
              </S.InputItemWrap>
            </div>
          </S.ContentWrap>
        </S.Form>
      </CModalBody>
      <CModalFooter>
        <CButton color='primary' onClick={handleAddOrUpdateBanner}>
          {isEditMode ? '배너 수정하기' : '배너 추가하기'}
        </CButton>{' '}
        <CButton color='secondary' onClick={onClose}>
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default BannerModal
