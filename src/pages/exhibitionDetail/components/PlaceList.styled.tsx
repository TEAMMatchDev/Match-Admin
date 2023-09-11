import styled from 'styled-components'
import {EditButton} from '../ExhibitionDetail.styled'

export const SpaceList = styled.ul`
  list-style: none;
  border-radius: 10px;
  border: 1px solid #bbb7b7;
  padding: 10px;
  color: #202020;
  font-size: 14px;
  width: 100%;
  min-height: 50px;
  max-height: 300px;
  overflow-y: scroll;
`

export const InputItemWrap = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: flex-start;
  column-gap: 5px;
  margin-bottom: 10px;

  label {
    text-align: left;
    color: #202020;
    font-size: 15px;
    font-weight: 600;
    min-width: 90px;
  }
`

export const PlaceEditButton = styled(EditButton)`
  bottom: -35px;
  right: 10px;
`
