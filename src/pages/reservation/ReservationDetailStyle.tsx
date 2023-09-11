import styled from 'styled-components'

export const ReservationDetailMenuContainerStyle = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  background-color: white;
  border-radius: 15px;
  padding: 20px 30px;
  margin-bottom: 25px;
  flex-direction: column;

  .menu_btn_container {
    width: 100%;
    display: flex;
  }
  .menu_btn_back {
    margin-right: auto;
  }
  .menu_btn {
    margin-right: 15px;
  }
`

export const ReservationDetailContentContainerStyle = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: white;
  border-radius: 15px;
  padding: 20px 30px;
  justify-content: space-between;
`

export const ReservationDetailImgContainerStyle = styled.div`
  width: 45%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .Img {
    width: 100%;
    height: 60%;
    background-color: azure;
  }
`

export const ReservationDetailInfoContainerStyle = styled.div`
  width: 75%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const ReservationDetailInfoWrapperStyle = styled.div`
  width: 100%;
  height: 10%;
  margin-bottom: 15px;
  display: flex;
  background-color: white;
  justify-content: space-around;

  .info_container {
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .info_title {
      width: 25%;
    }
    .info_element {
      margin-left: 15px;
      width: 78%;
      height: 100%;
      display: flex;
      align-items: center;
      border-radius: 5px;
      justify-content: center;
      background-color: #e2e2e2;
    }
  }

  input {
    text-align: center;
    border: none;
  }
`

// - 사용자명
// - 이메일
// - 전화번호
// - 전시날짜
// - 전시작품 수
// - 작품 크기
// - 프로젝트 내용
// - 포트폴리오 URL
// - 작품 사진
// - 주문번호
// - 대여 공간
// - 결제일
