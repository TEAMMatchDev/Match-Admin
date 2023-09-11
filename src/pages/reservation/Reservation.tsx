/* eslint-disable prettier/prettier */
import React, {useState, useEffect, createRef, RefObject, useRef} from 'react'
import {CSmartTable} from '../../components/custom/smart-table/CSmartTable'
import {ReactComponent as Search} from '../../assets/search.svg'
import axios from 'axios'
import {CNav, CNavItem, CNavLink, CFormInput, CContainer} from '@coreui/react'
import {
  ReservationSearchContainerStyle,
  ReservationListContainerStyle,
  ReservationSearchFormContainerStyle,
  ReservationSearchButtonStyle,
} from './ReservationStyle'
import {getReservationList} from '../../apis/reservation'
import {useNavigate} from 'react-router'
import {UserInfo} from './reservation.contstants'
import {maskString} from '../../utils/utility'

const Reservation = (): JSX.Element => {
  const [currentElements, setCurrentElements] = useState<UserInfo[]>([]) // 현재 보여지는 데이터 목록
  const [tabRefs, setTabRefs] = useState<RefObject<HTMLLIElement>[]>()
  const [currentActive, setCurrentActive] = useState<number>(0)
  const [tabActive, setTabActive] = useState<number>(0) // 탭 활성화
  const [reservationStatus, setReservationStatus] = useState<number>(0)
  const [currentElementValid, setCurrentElementValid] = useState<boolean>(true)
  const [totalList, setTotalList] = useState<UserInfo[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const navigate = useNavigate()
  const reservationState = useRef<string>('review') // api param -> status
  const columns = [
    {
      label: '예약 ID',
      key: 'reservationIdx',
      _style: {width: '10%'},
      _props: {className: 'fw-semibold'},
    },
    {
      label: '닉네임',
      key: 'nickName',
      _style: {width: '20%'},
      _props: {className: 'fw-semibold'},
    },
    {
      label: '이메일',
      key: 'email',
      _style: {width: '25%'},
      _props: {className: 'fw-semibold'},
    },
    {
      label: '휴대폰 번호',
      key: 'phoneNumber',
      _style: {width: '25%'},
      _props: {className: 'fw-semibold'},
    },
    {
      label: '예약 상태',
      key: 'state',
      _style: {width: '20%'},
      _props: {className: 'fw-semibold'},
    },
  ]

  const setReservationList = async () => {
    try {
      const response = await getReservationList(reservationState.current)
      const resList = response.getReservationResList.map((info: any) => {
        let phoneNumber = ''
        let email = ''
        if (info.phoneNumber !== null) {
          phoneNumber = maskString(info.phoneNumber, 2, 'right')
        }
        if (info.email !== null) {
          const [emailUser, emailDomain] = info.email.split('@')
          email = maskString(info.email, 2, 'left')
        }
        const value = {
          ...info,
          email,
          phoneNumber,
        }
        return value
      })
      setTotalList([...resList])
    } catch (e) {
      console.log(e)
    }
  }

  const onClickTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 예약 필터링 탭 클릭
    const target = e.target as HTMLButtonElement
    console.log(target.innerHTML)
    switch (target.innerHTML) {
      case '예약 대기':
        tabRefs![tabActive].current?.classList.remove('active')
        tabRefs![0].current?.classList.add('active')
        setReservationStatus(0)
        setCurrentActive(0)
        setTabActive(0)
        reservationState.current = 'review'
        setReservationList()
        break
      case '예약 완료':
        tabRefs![tabActive].current?.classList.remove('active')
        tabRefs![1].current?.classList.add('active')
        setReservationStatus(1)
        setCurrentActive(0)
        setTabActive(1)
        reservationState.current = 'finish'
        setReservationList()
        break
      case '예약 취소 (관리자)':
        tabRefs![tabActive].current?.classList.remove('active')
        tabRefs![2].current?.classList.add('active')
        setReservationStatus(2)
        setCurrentActive(0)
        setTabActive(2)
        reservationState.current = 'cancel_admin'
        setReservationList()
        break
      case '예약 취소 (고객)':
        tabRefs![tabActive].current?.classList.remove('active')
        tabRefs![3].current?.classList.add('active')
        setReservationStatus(3)
        setCurrentActive(0)
        setTabActive(3)
        reservationState.current = 'cancel_user'
        setReservationList()
        break
    }
  }

  const onClickSearch = () => {
    tabRefs![tabActive].current?.classList.remove('active')
    const getSearchList = async () => {
      try {
        const {data: response} = await axios.get(
          `${process.env.REACT_APP_API}/admin/reservations/search?search=${inputValue}&state=${'review'}`,
          {
            headers: {'X-AUTH-TOKEN': localStorage.getItem('jwt') || ''},
          },
        )
        setTotalList(response.result.getReservationResList)
      } catch (e) {
        console.log(e)
      }
    }
    getSearchList()
  }

  const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  useEffect(() => {
    setTabRefs(Array.from({length: 4}).map(() => createRef()))
  }, [currentElementValid])

  useEffect(() => {
    setCurrentElements([...totalList])
    console.log(currentElements)
  }, [totalList])

  useEffect(() => {
    if (tabRefs !== undefined) {
      tabRefs![0].current?.classList.add('active') //첫 번째 active 초기화
    }
  }, [tabRefs])

  useEffect(() => {
    setReservationList()
    setCurrentElementValid(false)
  }, [])

  return (
    <div>
      <ReservationSearchContainerStyle>
        <ReservationSearchFormContainerStyle>
          <Search />
          <p>검색</p>
        </ReservationSearchFormContainerStyle>
        <ReservationSearchFormContainerStyle>
          <CFormInput
            style={{width: '45%'}}
            type='text'
            size='lg'
            placeholder='검색어를 입력하세요'
            aria-label='lg input example'
            value={inputValue}
            onChange={onChangeInputValue}
          />
          <ReservationSearchButtonStyle onClick={() => onClickSearch()}>조회하기</ReservationSearchButtonStyle>
        </ReservationSearchFormContainerStyle>
      </ReservationSearchContainerStyle>
      <ReservationListContainerStyle>
        {tabRefs !== undefined ? (
          <CNav
            style={{
              paddingRight: 'calc(var(--cui-gutter-x) * 0.5)',
              paddingLeft: 'calc(var(--cui-gutter-x) * 0.5)',
            }}
            variant='pills'
            layout='fill'
          >
            <CNavItem>
              <CNavLink onClick={onClickTab} ref={tabRefs[0]}>
                예약 대기
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink onClick={onClickTab} ref={tabRefs[1]}>
                예약 완료
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink onClick={onClickTab} ref={tabRefs[2]}>
                예약 취소 (관리자)
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink onClick={onClickTab} ref={tabRefs[3]}>
                예약 취소 (고객)
              </CNavLink>
            </CNavItem>
          </CNav>
        ) : null}
        <CContainer style={{marginTop: '40px'}}>
          <CSmartTable
            columns={columns}
            itemsPerPage={5}
            items={currentElements}
            pagination
            clickableRows={true}
            onRowClick={item => navigate(`${item.reservationIdx}`, {state: item})}
            tableHeadProps={{color: 'primary'}}
            tableProps={{
              hover: true,
              responsive: true,
              bgcolor: 'white',
            }}
          />
        </CContainer>
      </ReservationListContainerStyle>
    </div>
  )
}

export default Reservation
