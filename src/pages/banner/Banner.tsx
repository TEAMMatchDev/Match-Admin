import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {CButton, CContainer} from '@coreui/react'
import {getBannerList} from '../../apis/banner'
import {IBannerItem} from '../../models/Banner'
import {CSmartTable} from '../../components/custom/smart-table/CSmartTable'
import * as S from './Banner.styled'

const ITEMS_PER_PAGE = 10

const columns = [
  {
    label: '번호',
    key: 'bannerIdx',
    _style: {width: '5%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '사진',
    key: 'bannerImgUrl',
    _style: {width: '15%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '이름',
    key: 'bannerTitle',
    _style: {width: '20%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '설명',
    key: 'bannerContent',
    _style: {width: '30%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '링크',
    key: 'bannerLinkUrl',
    _style: {width: '30%'},
    _props: {className: 'fw-semibold'},
  },
]

function Banner() {
  const navigate = useNavigate()
  const [bannerList, setBannerList] = useState<IBannerItem[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBannerList()
      setBannerList(data)
    }

    fetchData()
  }, [])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation()
  }

  return (
    <S.Wrap>
      <S.Header>
        <CButton component='a' href='/banner/new' disabled={bannerList && bannerList.length > 9 ? true : false}>
          배너 추가하기
        </CButton>
      </S.Header>
      <CContainer>
        <CSmartTable
          columns={columns}
          itemsPerPage={ITEMS_PER_PAGE}
          items={bannerList}
          clickableRows={true}
          onRowClick={item => navigate(`${item.bannerIdx}`)}
          tableHeadProps={{color: 'primary'}}
          tableProps={{
            hover: true,
            responsive: true,
            bgcolor: 'white',
          }}
          scopedColumns={{
            bannerImgUrl: (item: IBannerItem) => {
              return (
                <td>
                  <img
                    src={item.bannerImgUrl}
                    alt={item.bannerTitle}
                    style={{width: '100%', aspectRatio: '1/1', objectFit: 'cover'}}
                  />
                </td>
              )
            },
            bannerLinkUrl: (item: IBannerItem) => {
              return (
                <td>
                  <a href={item.bannerLinkUrl} onClick={handleLinkClick}>
                    {item.bannerLinkUrl}
                  </a>
                </td>
              )
            },
          }}
        />
      </CContainer>
    </S.Wrap>
  )
}

export default Banner
