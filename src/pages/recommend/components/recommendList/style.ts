import styled from 'styled-components'

export const ContainerStyle = styled.ul`
  background: white;
  width: 40%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid black;
  border-radius: 7px;
  padding: 0;
  justify-content: center;
  align-items: center;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    padding: 15px;
    border: 1px solid black;
    margin: 10px;
  }
`
