import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./Navbar/Navbar";
import Signup from "./Signup/Signup";
import Login from "./Login/Login";
import Homepage from "./Homepage/Homepage";
import BankAccount from "./BankAccount/BankAccount";
import TransactionsInfo from "./TransactionsInfo/TransactionsInfo";
import Transfer from "./Transfer/Transfer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/bank-account/:id" element={<BankAccount />} />
        <Route path="/transactions/:id" element={<TransactionsInfo />} />
        <Route path="/transfer-money" element={<Transfer />} />
      </Routes>
    </Router>
  );
}

export default App;
