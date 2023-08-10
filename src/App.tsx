import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.scss";
import "./scss/index.module.scss";
import { getProducts } from "./redux/api/products";
import { Route, Routes, BrowserRouter, Link } from "react-router-dom";
import TopBar from "../src/components/TopBar";
import Products from "../src/pages/Products";
import CartDetail from "../src/pages/CartDetail";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<CartDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
