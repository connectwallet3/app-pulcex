import React, { useEffect, useState } from "react";
import { LiqStyle } from "./styled";
import { Box, PageLayout } from "../../globalStyle";
import { Helmet } from "react-helmet";
import { AiOutlineArrowLeft } from "react-icons/ai";
import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import ConnectPop from "../../components/connect/ConnectPop";

function Liquidity() {
  const [change, setChange] = useState(false);
  const [tokens, setTokens] = useState([]);
  const [selectedToken, setSelectedToken] = useState();
  const [selectedToken2, setSelectedToken2] = useState();
  const [connect, setConnect] = useState(false);
  const [tokenModal, setTokenModal] = useState(false);
  const [tokenModal2, setTokenModal2] = useState(false);
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedTokensList = localStorage.getItem("tokensList");
    if (storedTokensList) {
      const tokensList = JSON.parse(storedTokensList);
      setTokens(tokensList);
      setSelectedToken(tokensList[17]);
      setSelectedToken2(tokensList[3]);
    }
  }, []);

  const filteredTokens = tokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <LiqStyle>
        <Helmet>
          <title>Liquidity | PulseX - $0.000</title>
        </Helmet>
        {!change ? (
          <Box>
            <div className="content">
              <h3>Your Liquidity</h3>
            </div>

            <div className="con">
              <p>Connect to a wallet to view your liquidity.</p>
            </div>

            <div className="content2">
              <button onClick={() => setChange(true)}>
                + &nbsp;Add Liquidity
              </button>
            </div>
          </Box>
        ) : (
          <Box2>
            <div className="content">
              <AiOutlineArrowLeft
                className="icon"
                onClick={() => setChange(false)}
              />
              <h3 onClick={() => setChange(false)}>Add Liquidity</h3>
            </div>
            <br />
            <BackgroundDiv2>
              <div className="left">
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="right">
                {selectedToken && (
                  <div className="flex" onClick={() => setTokenModal(true)}>
                    <img src={selectedToken.iconUrl} alt="" />
                    <p>
                      {selectedToken.symbol} &nbsp;
                      <IoIosArrowDown />
                    </p>
                  </div>
                )}
              </div>
            </BackgroundDiv2>
            <div className="center">
              <p>+</p>
            </div>
            <BackgroundDiv2>
              <div className="left">
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="right">
                {selectedToken2 && (
                  <div className="flex" onClick={() => setTokenModal2(true)}>
                    <img src={selectedToken2.iconUrl} alt="" />
                    <p>
                      {selectedToken2.symbol} &nbsp;
                      <IoIosArrowDown />
                    </p>
                  </div>
                )}
              </div>
            </BackgroundDiv2>
            <br />
            <button onClick={() => setConnect(true)}>Connect Wallet</button>
            <br />
          </Box2>
        )}
      </LiqStyle>


      {connect && <ConnectPop connect={() => setConnect(false)} />}

      {tokenModal && (
        <Layout>
          <PageLayout>
            <PageContent>
              <Content2>
                <div className="head">
                  <p>Select an Asset</p>
                  <p className="close" onClick={() => setTokenModal(false)}>
                    x
                  </p>
                </div>
                <SearchBar>
                  <input
                    type="text"
                    placeholder="Search by name or symbol"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </SearchBar>
                <Modal>
                  {filteredTokens.map((token, key) => (
                    <ul key={token.uuid}>
                      <li
                        onClick={() => {
                          setSelectedToken(token);
                          setTokenModal(false);
                        }}
                      >
                        <div className="left">
                          <img src={token.iconUrl} alt="" />
                          <p>{token.symbol}</p>
                        </div>
                        <p>{token.name}</p>
                      </li>
                    </ul>
                  ))}
                </Modal>
              </Content2>
            </PageContent>
          </PageLayout>
        </Layout>
      )}

      {tokenModal2 && (
        <Layout>
          <PageLayout>
            <PageContent>
              <Content2>
                <div className="head">
                  <p>Select an Asset</p>
                  <p className="close" onClick={() => setTokenModal2(false)}>
                    x
                  </p>
                </div>
                <SearchBar>
                  <input
                    type="text"
                    placeholder="Search by name or symbol"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </SearchBar>
                <Modal>
                  {filteredTokens.map((token, key) => (
                    <ul key={token.uuid}>
                      <li
                        onClick={() => {
                          setSelectedToken2(token);
                          setTokenModal2(false);
                        }}
                      >
                        <div className="left">
                          <img src={token.iconUrl} alt="" />
                          <p>{token.symbol}</p>
                        </div>
                        <p>{token.name}</p>
                      </li>
                    </ul>
                  ))}
                </Modal>
              </Content2>
            </PageContent>
          </PageLayout>
        </Layout>
      )}
    </>
  );
}

export default Liquidity;

const Box2 = styled.div`
  border: 1.5px solid #29292c;
  background: #202022;
  border-radius: 10px;
  max-width: 448px;
  width: 100%;
  padding: 20px;

  .head {
    padding: 10px 0;
  }
  .content {
    display: flex;
    margin: 0 -20px;
    .icon {
      font-size: 20px;
      color: #fff;
      margin-right: 10px;
      cursor: pointer;
    }
  }
  .center {
    margin: 15px 0;
    p {
      text-align: center;
    }
  }
`;

const BackgroundDiv2 = styled.div`
  background: #19191b;
  padding: 20px 10px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    input {
      background: transparent;
      border: none;
      font-size: 30px;
      width: 100px;
      color: #fff;
    }
  }

  .right {
    .flex {
      display: flex;
      align-items: center;
      cursor: pointer;

      p {
        color: #fff;
        font-size: 16px;
        font-weight: 700;
        display: flex;
        align-items: center;
      }
    }
    img {
      width: 30px;
      margin-right: 10px;
    }
  }

  ul {
    width: 100%;
    li {
      list-style: none;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;
      height: 50px;
    }
  }
`;

const Layout = styled.div`
  background: rgba(0, 0, 0, 0.486);
  backdrop-filter: blur(15px);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 11;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content2 = styled.div`
  background: #191b1a;
  border: 2px solid rgb(35, 34, 34);
  width: 100%;
  max-width: 486px;
  border-radius: 10px;

  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding: 20px;

    p {
      color: #fff;
    }

    .close {
      font-size: 25px;
      cursor: pointer;
    }
  }
`;

const Modal = styled.div`
  height: 70vh;
  overflow-y: scroll;
  overflow-x: hidden;
  background: #191b1a;
  border-radius: 10px;

  ul {
    li {
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 60px;
      margin: 10px 0;
      color: #fff;
      padding: 20px;
      cursor: pointer;

      .left {
        display: flex;
        align-items: center;
      }

      img {
        width: 30px;
        margin-right: 10px;
      }

      &:hover {
        background: #282a29;
      }
    }
  }
`;

const SearchBar = styled.div`
  padding: 0 20px;

  input {
    width: 100%;
    height: 50px;
    padding: 10px;
    border-radius: 5px;
    border: none;
    outline: none;
    background: #1d1e1e;
    color: #9c9d9d;
  }
`;

const PageContent = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
