import React, {Dispatch, SetStateAction, useState} from 'react'
import * as S from './PlaceList.styled'
import PlaceModal from './PlaceModal'
import {IExhibitionItem} from '../../../models/Exhibition'

interface IProps {
  exhibitionData: IExhibitionItem
  setExhibitionData: Dispatch<SetStateAction<IExhibitionItem>>
  isEditMode: boolean
}

function PlaceList({exhibitionData, setExhibitionData, isEditMode}: IProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <S.InputItemWrap>
      <label>공간 목록</label>
      <S.SpaceList>
        {exhibitionData.placeList.map(place => (
          <li key={place.placeIdx}>{place.placeName}</li>
        ))}
      </S.SpaceList>
      <S.PlaceEditButton disabled={!isEditMode} onClick={() => setIsModalOpen(true)}>
        Edit Place
      </S.PlaceEditButton>
      <PlaceModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        exhibitionData={exhibitionData}
        setExhibitionData={setExhibitionData}
      />
    </S.InputItemWrap>
  )
}

export default PlaceList
