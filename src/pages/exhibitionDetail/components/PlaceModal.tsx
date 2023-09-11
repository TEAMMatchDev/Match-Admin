import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react'
import {CButton, CContainer, CFormInput, CModal} from '@coreui/react'
import {cilX} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {getSpaceList} from '../../../apis/space'
import {IExhibitionItem, TExhibitionPlaceItem} from '../../../models/Exhibition'
import {ISpaceListItem} from '../../../models/Space'
import {space_columns} from '../../space/Space'
import {CSmartTable} from '../../../components/custom/smart-table/CSmartTable'
import {CSmartPagination} from '../../../components/custom/pagination/CSmartPagination'
import * as S from './PlaceModal.styled'

interface IProps {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  exhibitionData: IExhibitionItem
  setExhibitionData: Dispatch<SetStateAction<IExhibitionItem>>
}

function PlaceModal({isModalOpen, setIsModalOpen, exhibitionData, setExhibitionData}: IProps) {
  const [selectedPlaceList, setSelectedPlaceList] = useState<TExhibitionPlaceItem[]>([])
  const [searchList, setSearchList] = useState<ISpaceListItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      const {getPlaceListRes, totalPageCnt} = await getSpaceList(null, currentPage)
      setSearchList(getPlaceListRes)
      setTotalPages(totalPageCnt)
    }

    fetchData()
  }, [currentPage])

  useEffect(() => {
    setSelectedPlaceList(exhibitionData.placeList)
  }, [exhibitionData])

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchRef && searchRef.current) {
      const searchWord = searchRef.current.value
      const updatedSearchList = searchList.filter(space => space.placeName.includes(searchWord))

      setSearchList(updatedSearchList)
    }
  }

  const addPlace = (placeName: string) => {
    const idx = selectedPlaceList.findIndex(place => place.placeName === placeName)
    if (idx !== -1) return

    const newSpace = searchList.find(space => space.placeName === placeName)

    newSpace &&
      setSelectedPlaceList(prev => {
        return [...prev, newSpace]
      })
  }

  const deletePlace = (placeName: string) => {
    const upatedSelectedPlaceList = selectedPlaceList.filter(place => place.placeName !== placeName)
    setSelectedPlaceList(upatedSelectedPlaceList)
  }

  const updatePlaceList = () => {
    setExhibitionData(prev => {
      return {
        ...prev,
        placeList: selectedPlaceList,
      }
    })

    closeModal()
  }

  const handleCancel = () => {
    setSelectedPlaceList(exhibitionData.placeList)
    closeModal()
  }

  const changeCurrentPage = (page: number) => {
    if (page === currentPage) return
    setCurrentPage(page)
  }

  return (
    <CModal size='xl' visible={isModalOpen} onClose={closeModal}>
      <S.ModalContent>
        <S.PlaceList>
          {selectedPlaceList?.map(place => (
            <S.PlaceItem key={place.placeIdx}>
              <span>{place.placeName}</span>
              <button onClick={() => deletePlace(place.placeName)}>
                <CIcon icon={cilX} size='sm' />
              </button>
            </S.PlaceItem>
          ))}
        </S.PlaceList>
        <S.Searchbar onSubmit={handleSearch}>
          <CFormInput type='text' placeholder='키워드를 검색해보세요' ref={searchRef} />
          <CButton type='submit'>검색</CButton>
        </S.Searchbar>
        <CContainer>
          <CSmartTable
            style={{width: '100%'}}
            columns={space_columns}
            items={searchList}
            clickableRows={true}
            onRowClick={item => addPlace(`${item.placeName}`)}
            tableHeadProps={{color: 'primary'}}
            tableProps={{
              hover: true,
              responsive: true,
              bgcolor: 'white',
            }}
            scopedColumns={{
              display: (item: ISpaceListItem) => {
                return <td>{item.display ? '노출' : '숨김'}</td>
              },
            }}
          />
          <CSmartPagination
            align='center'
            pages={totalPages}
            onActivePageChange={page => changeCurrentPage(page)}
            activePage={currentPage}
          />
        </CContainer>
        <S.ButtonList>
          <CButton onClick={updatePlaceList}>적용</CButton>
          <CButton onClick={handleCancel}>취소</CButton>
        </S.ButtonList>
      </S.ModalContent>
    </CModal>
  )
}

export default PlaceModal
