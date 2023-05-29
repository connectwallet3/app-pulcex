import styled from "styled-components";

export const Box = styled.div`
  border: 1.5px solid #29292c;
  background: #202022;
  border-radius: 10px;
  max-width: 448px;
  width: 100%;

  .content {
    display: flex;
    .icon {
      font-size: 20px;
      color: #fff;
      margin-right: 10px;
      cursor: pointer;
    }
  }

  
`;

export const PageLayout = styled.div`
  width: 100%;
  max-width: 1136px;
  margin: 0 auto;

  @media (max-width: 1120px) {
    padding: 0 20px;
  }
`;

export const Layout = styled.div`
  background: rgba(0, 0, 0, 0.699);
  backdrop-filter: blur(15px);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;
