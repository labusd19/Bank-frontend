import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./Navbar/Navbar";
import Signup from "./Signup/Signup";
import Login from "./Login/Login";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
