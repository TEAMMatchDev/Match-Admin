import styled from 'styled-components'

export const ModalContent = styled.div`
  padding: 30px;
`

export const PlaceList = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  column-gap: 5px;
  row-gap: 5px;
  background-color: #f7f2fa;
  border-radius: 10px;
  min-height: 60px;
  padding: 10px;
`

export const PlaceItem = styled.div`
  padding: 5px 10px;
  background-color: #f7f2fa;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  column-gap: 5px;
  background-color: #5e0094;
  color: white;
  font-size: 14px;

  button {
    border: none;
    background-color: transparent;
    color: inherit;
    padding: 0;
  }
`

export const Searchbar = styled.form`
  border-radius: 8px;
  height: 40px;
  width: 45%;
  margin: 30px 0;
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: space-between;

  button {
    width: 100px;
    height: 100%;
  }
`

export const ButtonList = styled.div`
  display: flex;
  margin-top: 50px;
  width: 100%;
  column-gap: 10px;
  justify-content: flex-end;

  button {
    min-width: 100px;
    height: 40px;
    border-radius: 10px;
    color: white;
    border: none;
  }
`
