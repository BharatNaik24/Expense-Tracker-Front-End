import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddTransaction from "./components/AddTransaction/AddTransaction";
import TransactionsList from "./components/TransactionsList/TransactionsList";

import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TransactionsList />} />
        <Route path="/add-transaction" element={<AddTransaction />} />
      </Routes>
    </Router>
  );
}

export default App;
