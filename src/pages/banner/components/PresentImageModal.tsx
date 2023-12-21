import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import CIcon from '@coreui/icons-react'
import {cilX} from '@coreui/icons'
import * as S from './ImageModal.styled'

interface IProps {
  imageFile: File | string | null
  setImageFile: Dispatch<SetStateAction<File | string | null>>
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  isEditMode: boolean
}

function ImageModal({isModalOpen, setIsModalOpen, imageFile, setImageFile, isEditMode}: IProps) {
  useEffect(() => {
    // 이미지 파일이 변경될 때 선택한 이미지 파일이 업데이트되도록 합니다.
    console.log('이미지 변경')
    setSelectedImageFile(imageFile)
  }, [imageFile])

  const [selectedImageFile, setSelectedImageFile] = useState<File | string | null>(imageFile)

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0]

    if (!selectedFile) return

    // 파일 크기 확인 (5MB 제한)
    const MAX_FILE_SIZE = 5000000 // 5MB
    if (selectedFile.size > MAX_FILE_SIZE) {
      // 큰 파일 처리 (예: 메시지 표시)
      console.log('선택한 이미지가 너무 큽니다.')
      return
    }

    // 선택한 이미지 파일 상태 업데이트
    setSelectedImageFile(selectedFile)
  }

  const handleApply = () => {
    setImageFile(selectedImageFile)
    console.log('선택한 이미지 파일을 새 이미지 파일로 설정합니다.')
    closeModal()
  }

  const handleCancel = () => {
    // 선택한 이미지 파일을 원래 이미지 파일로 재설정합니다.
    setSelectedImageFile(imageFile)

    // 모달을 닫습니다.
    closeModal()
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <S.Modal visible={isModalOpen} onClose={closeModal}>
      <h2>이미지</h2>
      {selectedImageFile ? (
        <S.ImageWrap>
          <S.ImageItem>
            {typeof selectedImageFile === 'string' ? (
              <img src={selectedImageFile} alt='space' />
            ) : (
              <>
                <img src={URL.createObjectURL(selectedImageFile)} alt='space' />
                <button onClick={() => setSelectedImageFile(null)}>
                  <CIcon icon={cilX} size='sm' />
                </button>
              </>
            )}
          </S.ImageItem>
        </S.ImageWrap>
      ) : (
        <p>선택된 이미지가 없습니다.</p>
      )}
      <S.Controllers>
        <S.Button as='label' htmlFor='myFile' isLabel>
          이미지 선택
          <input onChange={addImage} type='file' id='myFile' name='filename' accept='.jpg,.jpeg,.png,.svg' />
        </S.Button>
        <S.ButtonsWrap>
          <S.Button onClick={handleApply} disabled={!selectedImageFile}>
            적용
          </S.Button>
          <S.Button onClick={handleCancel}>취소</S.Button>
        </S.ButtonsWrap>
      </S.Controllers>
    </S.Modal>
  )
}

export default ImageModal
