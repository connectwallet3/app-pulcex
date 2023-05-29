import React, { useEffect, useState } from "react";
import { LiqStyle } from "../liquidity/styled";
import { Helmet } from "react-helmet";
import { PageLayout } from "../../globalStyle";
import styled from "styled-components";
import ConnectPop from "../../components/connect/ConnectPop";

function Farms() {
  const [tokens, setTokens] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [tab, setTab] = useState(1);
  const [connect, setConnect] = useState(false);

  useEffect(() => {
    const storedTokensList = localStorage.getItem("tokensList");
    if (storedTokensList) {
      const tokensList = JSON.parse(storedTokensList);
      setTokens(tokensList);
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
          <title>Farms | PulseX</title>
        </Helmet>

        <PageLayout>
          <FarmStyle>
            <h2>Farms</h2>
            <h3>Stake LP tokens and earn Incentive token</h3>

            <div className="flex">
              <div className="head">
                <button
                  className={tab === 1 ? "active" : "inactive"}
                  onClick={() => {
                    setTab(1);
                  }}
                >
                  Live
                </button>
                <button
                  className={tab === 2 ? "active" : "inactive"}
                  onClick={() => {
                    setTab(2);
                  }}
                >
                  Finished
                </button>
              </div>

              <SearchBar>
                <input
                  type="text"
                  placeholder="Search by name or symbol"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </SearchBar>
            </div>
          </FarmStyle>

          {tab === 1 && (
            <Grid>
              {filteredTokens.slice(0, 20).map((token, key) => (
                <Box key={token.uuid}>
                  <div className="head">
                    <img src={token.iconUrl} alt="" />
                    <h2>{token.symbol}</h2>
                  </div>

                  <ul>
                    <li>
                      <p>APR:</p>
                      <p>{token.change}%</p>
                    </li>
                    <li>
                      <p>Earn:</p>
                      <p>INC + Fees</p>
                    </li>

                    <li>
                      <p>INC EARNED</p>
                    </li>
                    <li>
                      <p className="zero">0.00</p>
                      <button>Harvest</button>
                    </li>
                  </ul>
                  <p className="small">DAI FROM ETHEREUM-WPLS LP STAKED</p>
                  <button onClick={() => setConnect(true)}>
                    Connect Wallet
                  </button>
                </Box>
              ))}
            </Grid>
          )}
        </PageLayout>
      </LiqStyle>

      {connect && <ConnectPop connect={() => setConnect(false)} />}
    </>
  );
}

export default Farms;

const FarmStyle = styled.div`
  h2 {
    font-size: 65px;
    font-weight: 500;
    color: #fff;
  }

  h3 {
    font-weight: 500;
    margin: 15px 0;
  }
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .head {
    display: flex;
    padding: 0;
    background: #19191b;
    border: 1px solid #ffffff23;
    border-radius: 10px;
    margin-bottom: 10px;
    width: 200px;

    .inactive {
      background: transparent;
      color: #cccccc;
      font-size: 12px;
      height: 40px;
    }

    .active {
      background: #cccccc;
      color: #202022;
      font-size: 12px;
      height: 40px;
    }
  }
`;

const SearchBar = styled.div`
  padding: 0 20px;
  width: 30%;

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
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 36px;
  column-gap: 18px;
  margin: 20px 0;
`;

const Box = styled.div`
  width: 361px;
  /* height: 336px; */
  background: #202022;
  border: 1px solid #ffffff23;
  border-radius: 10px;
  padding: 20px;

  &:hover {
    border: 1px solid #4cd35ca5;
  }
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      color: #fff;
    }

    img {
      width: 30px;
    }
  }

  ul {
    li {
      list-style: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 20px 0;
      .zero {
        color: #4d4d4d;
      }
      button {
        background: #28282a;
        color: #4d4d4d;
        width: 40%;
      }
    }
  }

  .small {
    font-size: 12px;
    color: #fff;
    margin-bottom: 20px;
  }
`;
