import React, {useEffect, useState} from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {CButton, CCol, CContainer, CImage, CModal, CModalBody} from '@coreui/react'
import {deleteBanner, getBannerList} from '../../apis/banner'
import {IBannerItem, IBannerListResponse} from '../../models/Banner'
import {CSmartTable} from '../../components/custom/smart-table/CSmartTable'
import * as S from './Banner.styled'
import {IParams} from '../projectManagement/projectDetail'
import {CSmartPagination} from '../../components/custom/pagination/CSmartPagination'

export const ITEMS_PER_PAGE = 10

const columns = [
  {
    label: '번호',
    key: 'bannerId',
    _style: {width: '5%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '사진',
    key: 'bannerImg',
    _style: {width: '30%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '이름',
    key: 'name',
    _style: {width: '5%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '노출 기간',
    key: 'date',
    _style: {width: '35%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '설정',
    key: 'setting',
    _style: {width: '30%'},
    _props: {className: 'fw-semibold'},
  },
]

function Banner() {
  const navigate = useNavigate()
  const [bannerList, setBannerList] = useState<IBannerItem[]>()
  const [searchParams, setSearchParams] = useSearchParams()
  const [filter, setFilter] = useState<IParams>({page: 1, size: ITEMS_PER_PAGE})
  const [pageNum, setPageNum] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl)
    setShowModal(true)
  }

  useEffect(() => {
    const fetchData = async () => {
      const size = Number(searchParams.get('size'))
      const currentFilter = {
        page: Number(searchParams.get('page')) < 1 ? 1 : Number(searchParams.get('page')),
        size: calibratedPageSize(size),
      }
      setFilter(currentFilter)
      getBannerListApi(currentFilter)
    }

    fetchData()
  }, [])
  const getBannerListApi = async ({page, size}: IParams) => {
    try {
      const response = await getBannerList<IBannerListResponse>(size, page - 1)
      setBannerList(response.contents)
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  const deleteBannerApi = async (bannerId: number | undefined) => {
    try {
      if (bannerId === undefined) {
        alert('삭제할 배너가 없습니다.')
        return // 함수 실행 중지
      }
      const response: any = await deleteBanner(bannerId) // 동적으로 받은 bannerId 사용
      alert('배너가 삭제 되었습니다.')
      window.location.reload()
    } catch (error) {
      // 오류 응답이 있는지 확인
      if (error.response && error.response.data) {
        alert(error.response.data.message)
      } else {
        alert('알 수 없는 오류가 발생했습니다.')
      }
    }
  }

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation()
  }

  const calibratedPageSize = (size: number) => {
    if (size < 10) return 10
    else if (size > 1000) return 1000
    return size
  }
  return (
    <S.Wrap>
      <S.Header>
        <CButton component='a' href='/banner/new' disabled={bannerList && bannerList.length > 9 ? true : false}>
          배너 추가하기
        </CButton>
      </S.Header>
      <CContainer>
        <CCol>
          <CSmartTable
            columns={columns}
            itemsPerPage={ITEMS_PER_PAGE}
            items={bannerList}
            clickableRows={true}
            tableHeadProps={{color: 'dark'}}
            tableProps={{
              hover: true,
              responsive: true,
              bgcolor: 'white',
            }}
            scopedColumns={{
              bannerImg: (item: IBannerItem) => {
                return (
                  <td onClick={() => handleImageClick(item.bannerImg)}>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                      <img src={item.bannerImg} style={{maxWidth: '100%', height: 'auto'}} />
                    </div>
                  </td>
                )
              },
              setting: (item: IBannerItem) => {
                // 수정과 삭제 기능을 위한 핸들러 (여기서는 예시로 빈 함수를 사용)
                const handleEdit = () => {
                  console.log('수정:', item)
                  // 수정 로직 구현
                }
                const handleDelete = () => {
                  deleteBannerApi(item.bannerId)
                  console.log('삭제:', item.bannerId)
                  console.log('삭제:', item)
                  // 삭제 로직 구
                }

                return (
                  <td style={{textAlign: 'center'}}>
                    <CButton color='dark' size='sm' onClick={handleEdit}>
                      수정
                    </CButton>{' '}
                    <CButton color='dark' size='sm' onClick={handleDelete}>
                      삭제
                    </CButton>
                  </td>
                )
              },
              bannerLinkUrl: (item: IBannerItem) => {
                return (
                  <td>
                    <a href={item.contentsUrl} onClick={handleLinkClick}>
                      {item.bannerLinkUrl}
                    </a>
                  </td>
                )
              },
              date: (item: IBannerItem) => {
                const startDate = item.startDate // 가정: startDate는 item 객체의 속성
                const endDate = item.endDate // 가정: endDate는 item 객체의 속성
                return (
                  <td>
                    {startDate} ~ {endDate}
                  </td>
                )
              },
            }}
          />
          <CModal visible={showModal} onClose={() => setShowModal(false)} size='lg'>
            <CModalBody>
              <CImage src={selectedImage} style={{width: '100%'}} />
            </CModalBody>
          </CModal>
          <CSmartPagination
            align='center'
            size='sm'
            limit={11}
            pages={pageNum}
            onActivePageChange={page => {
              searchParams.set('page', String(page))
              setSearchParams(searchParams)
            }}
            activePage={filter.page}
          ></CSmartPagination>
        </CCol>
      </CContainer>
    </S.Wrap>
  )
}

export default Banner
