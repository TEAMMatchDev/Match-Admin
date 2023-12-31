import React, {useEffect, useState} from 'react'
import KeywordList from './components/KeywordList'
import axios from 'axios'
import {ListContainerStyle} from './components/RecommnedStyle'

const Keyword = () => {
  const [keywords, setKeywords] = useState([])
  const [onEditFlag, setOnEditFlag] = useState(false)
  useEffect(() => {
    const getKeywords = async () => {
      try {
        const {data: response} = await axios.get(`${process.env.REACT_APP_API}/app/keywords`, {
          headers: {'X-AUTH-TOKEN': localStorage.getItem('jwt') || ''},
        })
        setKeywords(response.result.keywords)
      } catch (e) {
        console.log(e)
      }
    }
    getKeywords()
    console.log(onEditFlag, keywords)
  }, [onEditFlag])
  return (
    <ListContainerStyle>
      <KeywordList keywords={keywords} setOnEditFlag={setOnEditFlag} onEditFlag={onEditFlag} />
    </ListContainerStyle>
  )
}

export default Keyword
