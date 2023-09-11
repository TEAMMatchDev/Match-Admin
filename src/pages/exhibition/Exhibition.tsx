import React, {useEffect, useState} from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {CButton, CContainer} from '@coreui/react'
import {IExhibitionListItem} from '../../models/Exhibition'
import {getExhibitionList} from '../../apis/exhibition'
import {CSmartPagination} from '../../components/custom/pagination/CSmartPagination'
import {CSmartTable} from '../../components/custom/smart-table/CSmartTable'
import * as S from './Exhibition.styled'

export const ITEMS_PER_PAGE = 20

const columns = [
  {
    label: '번호',
    key: 'exhibitionIdx',
    _style: {width: '5%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '사진',
    key: 'imageUrl',
    _style: {width: '15%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '이름',
    key: 'exhibitionName',
    _style: {width: '20%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '공간',
    key: 'placeList',
    _style: {width: '60%'},
    _props: {className: 'fw-semibold'},
  },
]

function Exhibition() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [exhibitionList, setExhibitionList] = useState<IExhibitionListItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    searchParams.set('page', String(currentPage))
    setSearchParams(searchParams)
    setCurrentPage(parseInt(searchParams.get('page') as string))
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const {totalPagesCnt, getExhibitionAdminListRes} = await getExhibitionList(ITEMS_PER_PAGE, currentPage - 1)
      setExhibitionList(getExhibitionAdminListRes)
      setTotalPages(totalPagesCnt)
    }

    fetchData()
  }, [currentPage])

  const changeCurrentPage = (pageNum: number) => {
    setCurrentPage(pageNum)
    searchParams.set('page', String(pageNum))
    setSearchParams(searchParams)
  }

  return (
    <S.Wrap>
      <S.Header>
        <CButton component='a' href='/exhibition/new'>
          플레이스 추가하기
        </CButton>
      </S.Header>
      <CContainer>
        <CSmartTable
          columns={columns}
          itemsPerPage={ITEMS_PER_PAGE}
          items={exhibitionList}
          clickableRows={true}
          onRowClick={item => navigate(`${item.exhibitionIdx}`)}
          tableHeadProps={{color: 'primary'}}
          tableProps={{
            hover: true,
            responsive: true,
            bgcolor: 'white',
          }}
          scopedColumns={{
            imageUrl: (item: IExhibitionListItem) => {
              return (
                <td>
                  <img
                    src={item.imageUrl}
                    alt={item.exhibitionName}
                    style={{width: '100%', aspectRatio: '1/1', objectFit: 'cover'}}
                  />
                </td>
              )
            },
            placeList: (item: IExhibitionListItem) => {
              return (
                <td>
                  <S.TagWrap>
                    {item.placeList.map(place => (
                      <span key={place.placeIdx}>{place.placeName}</span>
                    ))}
                  </S.TagWrap>
                </td>
              )
            },
          }}
        />
        <CSmartPagination
          align='center'
          pages={totalPages}
          onActivePageChange={page => {
            changeCurrentPage(page)
          }}
          activePage={currentPage}
        />
      </CContainer>
    </S.Wrap>
  )
}

export default Exhibition
