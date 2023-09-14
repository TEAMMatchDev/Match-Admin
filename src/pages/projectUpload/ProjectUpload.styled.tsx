import {CForm} from '@coreui/react'
import {Switch} from '@mantine/core'
import styled from 'styled-components'

export const Form = styled(CForm)`
  margin: 50px;

  input {
    &:disabled {
      background-color: white;
    }
  }
`
export const ContentWrap = styled.div`
  padding: 50px;
  background-color: white;
  border-radius: 10px;
  width: 100%;
`

export const ContentBox = styled.div`
  display: flex;
  column-gap: 50px;
  row-gap: 10px;

  section {
    width: 50%;
  }
`

export const TextArea = styled.div`
  column-gap: 50px;
  row-gap: 10px;

  section {
    width: 50%;
  }
  .label.my-label {
    margin-right: 20px;
  }
`

export const InputItemWrap = styled.div`
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

  input,
  textarea {
    border-radius: 10px;
    border: 1px solid #bbb7b7;
    background-color: transparent;
    padding: 5px 12px;
    width: 100%;
    outline: none;
    color: #202020;
    font-size: 14px;

    &::placeholder {
      font-size: 12px;
      color: grey;
      vertical-align: center;
    }

    textarea {
      height: 30px;
    }
  }
`

export const Keyword = styled.div`
  width: 100%;
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

  input,
  textarea {
    border-radius: 100px;
    border: 1px solid #bbb7b7;
    background-color: transparent;
    padding: 5px 12px;
    width: 1000px;
    outline: none;
    color: #202020;
    font-size: 14px;
    word-wrap: break-word;

    &::placeholder {
      font-size: 12px;
      color: grey;
    }

    height: 30px; /* Set a fixed height */
    resize: vertical; /* Allow vertical resizing */
    overflow-y: auto; /* Add a scrollbar when content overflows */
  }
`

export const OptionInputItemWrap = styled(InputItemWrap)`
  display: flex;
  flex-direction: column;
`
export const SelectedKeywordItem = styled(Keyword)`
  min-height: 40px;
  resize: vertical;
  overflow-y: auto;
  display: flex;
  align-items: center;
  column-gap: 5px;
  background-color: white;
  color: white;
  font-size: 14px;
`
export const OptionWrap = styled.div`
  border-radius: 10px;
  position: relative;
  margin-bottom: 20px;
  display: flex;
  column-gap: 5px;

  > div {
    display: flex;
    padding: 10px;
    border: 1px solid #bbb7b7;
    border-radius: 10px;
    flex-direction: column;

    > div {
      display: flex;
      column-gap: 10px;
    }
  }

  p {
    color: #202020;
    font-size: 15px;
    font-weight: 600;
    min-width: 90px;
  }
`

export const CustomSwtich = styled(Switch)`
  * {
    border: none;
    padding: 5px;
  }

  input:checked + * {
    background-color: #af5dde;
    color: white;
  }

  input:disabled + * {
    opacity: 0.6;
  }
`
