import React, {useEffect, useState} from 'react'
import {CSmartTable} from '../../components/custom/smart-table/CSmartTable'
import {ReservationSearchFormContainerStyle} from '../reservation/ReservationStyle'
import {CFormInput, CButton} from '@coreui/react'
import {CreateContainer, Button} from './RecommendStyle'
import axios from 'axios'
import RecommendEdit from './components/recommendEdit/recommendEdit'
const columns = [
  {
    label: '추천 검색어',
    key: 'recommendWord',
    _style: {width: '10%'},
    _props: {className: 'fw-semibold'},
  },
  {
    key: 'show_details',
    label: '',
    _style: {width: '1%'},
    filter: false,
    sorter: false,
    _props: {color: 'primary', className: 'fw-semibold'},
  },
]

const Recommend = () => {
  const [recommends, setRecommends] = useState([])
  const [details, setDetails] = useState<any>([])
  const [getFlag, setGetFlag] = useState<boolean>(false)
  const [recommendValue, setRecommendValue] = useState<string>('')

  const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecommendValue(e.target.value)
  }
  const toggleDetails = (index: any) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }

  const handleCreate = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API}/app/recommends`,
        {
          recommendWord: recommendValue,
        },
        {
          headers: {'X-AUTH-TOKEN': localStorage.getItem('jwt') || ''},
        },
      )
      setGetFlag(!getFlag)
      setRecommendValue('')
    } catch (e) {
      console.log(e)
    }
  }

  const handleRemove = async (idx: number) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API}/app/recommends/${idx}`, {
        headers: {'X-AUTH-TOKEN': localStorage.getItem('jwt') || ''},
      })
      setGetFlag(!getFlag)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    const getRecommend = async () => {
      try {
        const {data: response} = await axios.get(`${process.env.REACT_APP_API}/app/recommends`, {
          headers: {'X-AUTH-TOKEN': localStorage.getItem('jwt') || ''},
        })
        setRecommends(response.result)
      } catch (e) {
        console.log(e)
      }
    }
    getRecommend()
  }, [getFlag])
  return (
    <React.Fragment>
      <CreateContainer>
        <ReservationSearchFormContainerStyle>
          <CFormInput
            style={{width: '45%'}}
            type='text'
            size='lg'
            placeholder='추천 검색어를 입력해 주세요'
            aria-label='lg input example'
            value={recommendValue}
            onChange={handleValue}
          />
          <CButton style={{marginLeft: '30px'}} onClick={handleCreate}>
            생성하기
          </CButton>
        </ReservationSearchFormContainerStyle>
      </CreateContainer>
      <CSmartTable
        columns={columns}
        itemsPerPage={5}
        items={recommends}
        pagination
        clickableRows={true}
        tableHeadProps={{color: 'primary'}}
        tableProps={{
          hover: true,
          responsive: true,
          bgcolor: 'white',
        }}
        scopedColumns={{
          show_details: (item: any) => {
            return (
              <td className='py-2'>
                <CButton
                  color='primary'
                  variant='outline'
                  shape='square'
                  size='sm'
                  onClick={() => {
                    toggleDetails(item._id)
                  }}
                >
                  수정
                </CButton>
                <Button
                  color='danger'
                  variant='outline'
                  shape='square'
                  size='sm'
                  onClick={() => {
                    handleRemove(item.recommendWordIdx)
                  }}
                  style={{marginLeft: '10px'}}
                >
                  삭제
                </Button>
              </td>
            )
          },
          details: item => {
            return (
              <RecommendEdit
                details={details}
                item={item}
                setGetFlag={setGetFlag}
                getFlag={getFlag}
                toggleDetails={toggleDetails}
              />
            )
          },
        }}
      />
    </React.Fragment>
  )
}

export default Recommend
