import styled from "styled-components";

export const HeaderStyled = styled.header`
  background: #202022;
  padding: 0 16px;
  height: 76px;
  margin-bottom: 1px;
  border-bottom: 1.5px solid #29292c;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .desktop {
    @media (max-width: 480px) {
      display: none;
    }
  }

  .mobile {
    display: none;

    @media (max-width: 480px) {
      display: block;
      width: 24px;
      height: 24px;
      margin-left: -50px;
      margin-right: -50px;
    }
  }

  .left {
    display: flex;
    align-items: center;
    img {
      width: 130px;
    }

    ul {
      display: flex;
      align-items: center;

      li {
        list-style: none;
        margin-left: 20px;
        position: relative;

        .ico {
          padding: 15px;
          border-radius: 5px;
          &:hover {
            background: #313132;
          }
        }
        .icon {
          margin-bottom: -3.5px;
          color: #fff;
          opacity: 0.5;
          font-size: 1.2rem;

          &:hover {
            color: #fff;
          }
        }

        a {
          color: #fff;
          opacity: 0.5;
        }
        a.active {
          color: #fff;
          opacity: 1;
          font-weight: 700;
        }
      }
    }
  }

  .right {
    display: flex;
    align-items: center;
    button {
      height: 40px;
      border: none;
      @media (max-width: 480px) {
        font-size: 12px;
      }
    }

    ul {
      display: flex;
      align-items: center;

      li {
        list-style: none;
        margin-left: 20px;
        position: relative;

        img {
          width: 24px;
        }
        .ico {
          padding: 15px;
          border-radius: 5px;
          &:hover {
            background: #313132;
          }
        }
        .icon {
          margin-bottom: -3.5px;
          color: #fff;
          opacity: 0.5;
          font-size: 1.2rem;

          &:hover {
            color: #fff;
          }
        }

        a {
          color: #fff;
          opacity: 0.5;
        }
        a.active {
          color: #fff;
          opacity: 1;
          font-weight: 700;
        }
      }
    }
  }
`;

export const SubHeader = styled.header`
  background: #28282a;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;

  ul {
    display: flex;
    align-items: center;

    li {
      list-style: none;
      margin-left: 20px;
      position: relative;
    }
    a {
      color: #fff;
      opacity: 0.5;
      padding: 7px;
    }
    a.active {
      color: #fff;
      opacity: 1;
      font-weight: 700;

      &::after {
        content: "";
        position: absolute;
        bottom: -11px;
        border-radius: 5px 5px 0 0;
        left: 0;
        width: 100%;
        height: 3px;
        background-color: #00cc44;
      }
    }
  }
`;

export const Modal = styled.div`
  position: absolute;
  margin-top: 10px;
  top: 100%;
  left: 0;
  width: 200px;
  background: #202022;
  border: 1px solid #29292c;
  padding: 8px;
  border-radius: 4px;
  z-index: 90;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  a {
    color: #fff;
    opacity: 0.8;
    text-decoration: none;
    padding: 4px;
    height: 40px;

    &:hover {
      opacity: 1;
      background: #2a2a2c;
    }
  }
`;
