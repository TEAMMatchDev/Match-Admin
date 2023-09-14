import React, {Dispatch, SetStateAction, useState} from 'react'
import {CButton, CCarousel, CCarouselItem} from '@coreui/react'
import ImageModal from './ImageModal'
import * as S from './ImageCarousel.styled'
import PresentImageModal from './PresentImageModal'

interface IProps {
  presentFile: File | null
  setPresentFile: Dispatch<SetStateAction<File | null>>
}

function ImagePresent({presentFile, setPresentFile}: IProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Update the imageFile state with the selected image file (replace the previous one)
      setPresentFile(e.target.files[0])
    }
  }

  return (
    <S.CarouselWrap>
      {presentFile ? (
        <CCarousel indicators>
          <CCarouselItem>
            <img src={URL.createObjectURL(presentFile)} alt={`slide`} />
          </CCarouselItem>
        </CCarousel>
      ) : (
        <S.ImagePlaceholder>
          <h2>썸네일 사진 첨부하기</h2>
          <ul>
            <li>1장</li>
            <li>jpeg / jpg / png / svg 가능</li>
            <li>각 이미지당 최대 5mb</li>
          </ul>
        </S.ImagePlaceholder>
      )}
      <S.ButtonWrap>
        {/* Use an input element to allow users to select an image */}
        <input type='file' accept='image/*' onChange={handleImageChange} />
        <CButton onClick={openModal}>Edit Image</CButton>
      </S.ButtonWrap>
      <PresentImageModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        imageFile={presentFile}
        setImageFile={setPresentFile}
      />
    </S.CarouselWrap>
  )
}

export default ImagePresent
