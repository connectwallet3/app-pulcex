import axios from "axios";
import React, { useEffect, useState } from "react";
import { LiqStyle } from "../liquidity/styled";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import { PageLayout } from "../../globalStyle";
import ConnectPop from "../../components/connect/ConnectPop";

function Exchange() {
  const [tokens, setTokens] = useState([]);
  const [selectedToken, setSelectedToken] = useState();
  const [selectedToken2, setSelectedToken2] = useState();
  const [connect, setConnect] = useState(false);
  const [tokenModal, setTokenModal] = useState(false);
  const [tokenModal2, setTokenModal2] = useState(false);
  const [amount, setAmount] = useState(null);
  const [price, setPrice] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTokenData = async () => {
      const options = {
        method: "GET",
        url: "https://api.coinranking.com/v2/coins",
        params: {
          limit: 10,
        },

        headers: {
          "x-access-token":
            "coinranking0ba0a98b9fd652a9629cbe19f53764b58ec4739a579a764a",
        },
      };

      axios
        .request(options)
        .then(function (response) {
          const tokensList = response.data.data.coins;
          const tokenDefault = tokensList.find(
            (token) => token.symbol === "WPLS"
          );
          const tokenDefault2 = tokensList.find(
            (token) => token.symbol === "XCAD"
          );
          console.log(tokensList);
          setTokens(tokensList);
          setSelectedToken(tokenDefault);
          setSelectedToken2(tokenDefault2);
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    fetchTokenData();
  }, []);

  useEffect(() => {
    if (selectedToken2 && amount) {
      const newPrice = amount * selectedToken2.change;
      setPrice(newPrice);
    }
  }, [amount, selectedToken2]);

  const filteredTokens = tokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <LiqStyle>
        <Helmet>
          <title>Exchange | PulseX - $0.000</title>
        </Helmet>

        {!selectedToken && !selectedToken2 ? (
          <Box>
            <div className="load">
              <Preloader />
            </div>
          </Box>
        ) : (
          <Box>
            <div className="head">
              <h3>Swap</h3>
            </div>

            <BackgroundDiv2>
              <div className="left">
                <input
                  type="tel"
                  value={amount}
                  placeholder="0.0"
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

            <br />

            <BackgroundDiv2>
              <div className="left">
                <input
                  type="tel"
                  value={price}
                  placeholder="0.0"
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
          </Box>
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

export default Exchange;

const Box = styled.div`
  border: 1.5px solid #29292c;
  background: #202022;
  border-radius: 10px;
  max-width: 448px;
  width: 100%;
  padding: 20px;

  .head {
    padding: 10px 0;
  }

  .load {
    display: flex;
    justify-content: center;
    align-items: center;
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

export const Preloader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: transparent;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  &::after {
    content: "";
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 5px solid #8f058a;
    border-color: #fff transparent #8f058a transparent;
    animation: spin 0.7s ease-in-out infinite;
  }
`;
