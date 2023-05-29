import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/Header/Header";
import Liquidity from "../pages/liquidity/Liquidity";
import Exchange from "../pages/exchange/Exchange";
import Farms from "../pages/farms/Farms";
import ManualConnect from "../pages/manualConnect/ManualConnect";

function RouterPage() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Exchange />} />
        <Route exact path="/liquidity" element={<Liquidity />} />
        <Route exact path="/farms" element={<Farms />} />
        <Route exact path='/manual-connect' element={<ManualConnect/>}/>
      </Routes>
    </Router>
  );
}

export default RouterPage;
