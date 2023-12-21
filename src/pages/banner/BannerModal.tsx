// BannerModal.tsx
import React, {useEffect, useState} from 'react'
import {CModal, CModalBody, CModalFooter, CModalHeader, CButton, CImage} from '@coreui/react'
import {IBannerItem} from '../../models/Banner'
import * as S from './Banner.styled'
import {createBanner, updateBanner} from '../../apis/banner'
import ImagePresent from './components/ImagePresent'

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
  const [imageFile, setImageFile] = useState<File | string | null>(null)
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = e.target
    console.log(`Updating state for ${name}: ${value}`)
    setBannerInfo(prevInfo => ({...prevInfo, [name]: value}))
  }

  const handleAddOrUpdateBanner = async () => {
    if (isEditMode) {
      let isEditImage = false
      console.log(bannerInfo)
      const formData = new FormData()
      if (imageFile != null) {
        isEditImage = true
        formData.append('bannerImage', imageFile as File)
      }
      formData.append(
        'bannerPatchDto',
        new Blob(
          [
            JSON.stringify({
              ...bannerInfo,
              editImage: isEditImage,
              startDate: bannerInfo.startDate.replace(' ', 'T'),
              endDate: bannerInfo.endDate.replace(' ', 'T'),
            }),
          ],
          {
            type: 'application/json',
          },
        ),
      )
      console.log(formData.get('bannerPatchDto'))
      await updateBanner(bannerId, formData)
    } else {
      const formData = new FormData()
      console.log(bannerInfo)
      formData.append(
        'bannerUploadDto',
        new Blob(
          [
            JSON.stringify({
              ...bannerInfo,
            }),
          ],
          {
            type: 'application/json',
          },
        ),
      )
      formData.append('bannerImage', imageFile as File)

      console.log('formData' + formData)

      await createBanner(formData)
    }
    window.location.reload()
    onClose()
  }
  const handleImageChange = () => {
    onClose()
  }

  useEffect(() => {
    console.log(isEditMode)
    if (isEditMode) {
      setBannerInfo(item)
      console.log('editMode')
    } else {
      console.log('addMode')
    }
  }, [isEditMode, bannerId])

  return (
    <CModal visible={showModal} onClose={onClose} size='lg'>
      <CModalHeader closeButton> {isEditMode ? '배너 수정' : '배너 추가'} </CModalHeader>
      <S.ModalWrap>
        <div>
          <S.InputItemWrap>
            <label>배너 명</label>
            <textarea
              name='name'
              value={bannerInfo.name}
              onChange={handleInputChange}
              placeholder='배너 이름을 입력해주세요.'
              style={{width: '100%', minHeight: '20px'}}
            />
          </S.InputItemWrap>
          <S.InputItemWrap>
            <label>노출 기간</label>
            <S.InputDateWrap>
              <input
                type='datetime-local'
                name='startDate'
                value={bannerInfo.startDate}
                onChange={handleInputChange}
                placeholder='배너 시작일을 입력해주세요.'
              />
            </S.InputDateWrap>
            <span style={{margin: '0 5px', textAlign: 'center'}}>~</span>
            <S.InputEndDateWrap>
              <input
                type='datetime-local'
                name='endDate'
                value={bannerInfo.endDate}
                onChange={handleInputChange}
                placeholder='배너 종료일을 입력해주세요.'
              />
            </S.InputEndDateWrap>
          </S.InputItemWrap>
          <S.InputItemWrap>
            <label>배너 이미지</label>
            {isEditMode && bannerInfo.bannerImg && (
              <ImagePresent
                presentFile={bannerInfo.bannerImg || null}
                title={'배너 이미지'}
                setPresentFile={setImageFile}
                isEditMode={isEditMode}
              />
            )}
            {!isEditMode && (
              <ImagePresent
                presentFile={imageFile || null}
                setPresentFile={setImageFile}
                title={'배너 이미지'}
                isEditMode={isEditMode}
              />
            )}
          </S.InputItemWrap>
          <S.InputItemWrap>
            <label>랜딩 페이지</label>
            <textarea
              name='contentsUrl'
              value={bannerInfo.contentsUrl}
              onChange={handleInputChange}
              placeholder='랜딩 페이지를 입력해주세요.'
              style={{width: '100%', minHeight: '20px'}}
            />
          </S.InputItemWrap>
        </div>
      </S.ModalWrap>
      <CModalFooter>
        <CButton color='dark' onClick={handleAddOrUpdateBanner}>
          {isEditMode ? '수정 저장' : '배너 추가'}
        </CButton>{' '}
        <CButton color='secondary' onClick={onClose}>
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default BannerModal
