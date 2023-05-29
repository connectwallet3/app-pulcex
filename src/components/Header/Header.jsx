import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import { HeaderStyled, SubHeader, Modal, ModalContent } from "./styled";
import { NavLink } from "react-router-dom";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import X from "../../assets/x.svg";
import ConnectPop from "../connect/ConnectPop";

function Header() {
  const location = useLocation();
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [showEarnModal, setShowEarnModal] = useState(false);
  const [showIconModal, setShowIconModal] = useState(false);
  const [connect, setConnect] = useState(false);

  const toggleTradeModal = () => {
    setShowTradeModal(!showTradeModal);
  };

  const toggleEarnModal = () => {
    setShowEarnModal(!showEarnModal);
  };

  const toggleIconModal = () => {
    setShowIconModal(!showIconModal);
  };

  const isSubHeaderVisible =
    location.pathname === "/" || location.pathname === "/liquidity";
  const isSubHeaderVisible2 =
    location.pathname === "/farms" || location.pathname === "/pools";

  return (
    <div>
      <HeaderStyled>
        <div className="left">
          <Link to="/">
            <img src={Logo} alt="" className="desktop" />
          </Link>
          <Link to="/">
            <img src={X} alt="" className="mobile" />
          </Link>
          <div className="links">
            <ul>
              <li>
                <NavLink
                  to="/"
                  onMouseEnter={() => {
                    toggleTradeModal();
                    setShowEarnModal(false);
                    setShowIconModal(false);
                  }}
                >
                  Trade
                </NavLink>

                {showTradeModal && (
                  <Modal onMouseLeave={toggleTradeModal}>
                    <ModalContent>
                      <NavLink to="/" onClick={() => setShowTradeModal(false)}>
                        Exchange
                      </NavLink>
                      <NavLink
                        to="/liquidity"
                        onClick={() => setShowTradeModal(false)}
                      >
                        Liquidity
                      </NavLink>
                    </ModalContent>
                  </Modal>
                )}
              </li>
              <li>
                <NavLink
                  to="/farms"
                  onMouseEnter={() => {
                    toggleEarnModal();
                    setShowTradeModal(false);
                    setShowIconModal(false);
                  }}
                >
                  Earn
                </NavLink>

                {showEarnModal && (
                  <Modal onMouseLeave={toggleEarnModal}>
                    <ModalContent>
                      <NavLink
                        to="/farms"
                        onClick={() => setShowEarnModal(false)}
                      >
                        Farms
                      </NavLink>
                      <NavLink
                        to="/pools"
                        onClick={() => setShowEarnModal(false)}
                      >
                        Pools
                      </NavLink>
                    </ModalContent>
                  </Modal>
                )}
              </li>
              <li>
                <NavLink
                  onMouseEnter={() => {
                    toggleIconModal();
                    setShowTradeModal(false);
                    setShowEarnModal(false);
                  }}
                >
                  <div className="ico">
                    <BiDotsHorizontalRounded className="icon" />
                  </div>
                </NavLink>

                {showIconModal && (
                  <Modal onMouseLeave={toggleIconModal}>
                    <ModalContent>
                      <NavLink
                        to="/burn"
                        onClick={() => setShowIconModal(false)}
                      >
                        Burn
                      </NavLink>
                      <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => setShowIconModal(false)}
                      >
                        Twitter
                      </a>
                      <a
                        href="https://telegram.com"
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => setShowIconModal(false)}
                      >
                        Telegram
                      </a>
                    </ModalContent>
                  </Modal>
                )}
              </li>
            </ul>
          </div>
        </div>

        <div className="right">
          <ul>
            <li className="desktop">
              <img src={X} alt="" />
            </li>
            <li className="desktop">
              <p>$0.00007</p>
            </li>
            <li>
              <button onClick={() => setConnect(true)}>Connect Wallet</button>
            </li>
          </ul>
        </div>
      </HeaderStyled>

      {isSubHeaderVisible && (
        <SubHeader>
          <ul>
            <li>
              <NavLink to="/">Exchange</NavLink>
            </li>
            <li>
              <NavLink to="/liquidity">Liquidity</NavLink>
            </li>
          </ul>
        </SubHeader>
      )}
      {isSubHeaderVisible2 && (
        <SubHeader>
          <ul>
            <li>
              <NavLink to="/farms">Farms</NavLink>
            </li>
            <li>
              <NavLink to="/pools">Pools</NavLink>
            </li>
          </ul>
        </SubHeader>
      )}

      {connect && <ConnectPop connect={() => setConnect(false)} />}
    </div>
  );
}

export default Header;
