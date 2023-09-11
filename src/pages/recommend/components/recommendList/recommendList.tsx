import React from 'react'
import {ContainerStyle} from './style'
import {CButton} from '@coreui/react'
const RecommendList = () => {
  const mock = [
    {title: '키워드'},
    {title: '키워드'},
    {title: '키워드'},
    {title: '키워드'},
    {title: '키워드'},
    {title: '키워드'},
    {title: '키워드'},
    {title: '키워드'},
    {title: '키워드'},
    {title: '키워드'},
    {title: '키워드'},
    {title: '키워드'},
    {title: '키워드'},
    {title: '키워드'},
    {title: '키워드'},
    {title: '키워드'},
    {title: '키워드'},
    {title: '키워드'},
    {title: '키워드'},
  ]

  return (
    <React.Fragment>
      <ContainerStyle>
        {mock.map(e => (
          <li key={e.title}>
            <div>키워드</div>
            <div>
              <CButton className='btn btn-primary btn-sm' style={{marginRight: '8px'}}>
                수정
              </CButton>
            </div>
          </li>
        ))}
      </ContainerStyle>
    </React.Fragment>
  )
}

export default RecommendList
