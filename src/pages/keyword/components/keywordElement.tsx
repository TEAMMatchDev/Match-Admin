import React, {useState} from 'react'
import {CButton} from '@coreui/react'
import axios from 'axios'

const KeywordElement = ({keyword, setOnEditFlag, onEditFlag}: any) => {
  const [editFlag, setEditFlag] = useState(false)
  const [editValue, setEditValue] = useState(keyword.keyword)
  const changeEditFlag = () => {
    setEditFlag(!editFlag)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value)
  }

  const handleEdit = async () => {
    console.log(editValue, keyword)

    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_API}/app/keywords`,
        {
          keywordIdx: keyword.keywordIdx,
          keyword: editValue,
        },
        {
          headers: {'X-AUTH-TOKEN': localStorage.getItem('jwt') || ''},
        },
      )
      if (res.data.code === 400) {
        alert('2~6글자 사이의 키워드를 입력해주세요')
        setEditValue(keyword.keyword)
      }
      setOnEditFlag(!onEditFlag)
      changeEditFlag()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <li key={keyword.keyword}>
      {editFlag === false ? (
        <React.Fragment>
          <div>{keyword.keyword}</div>
          <div>
            <CButton className='btn btn-primary btn-sm' onClick={changeEditFlag} style={{marginRight: '8px'}}>
              수정
            </CButton>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <input value={editValue} onChange={onChange} />
          <div>
            <CButton className='btn btn-primary btn-sm' onClick={handleEdit} style={{marginRight: '8px'}}>
              저장
            </CButton>
          </div>
        </React.Fragment>
      )}
    </li>
  )
}

export default KeywordElement
