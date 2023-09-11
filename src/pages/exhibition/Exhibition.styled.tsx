import styled from 'styled-components'

export const Wrap = styled.div`
  margin: 50px;
`

export const Header = styled.header`
  width: 100%;
  justify-content: flex-end;
  margin-bottom: 40px;
  display: flex;
`

export const TagWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;

  span {
    display: flex;
    align-items: center;
    padding: 5px;
    height: 30px;
    background-color: #f7f7f7;
    border-radius: 5px;
  }
`
