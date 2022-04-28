import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "./providers/UserContext";
import './styles/reset.css';
import './styles/style.css';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';

function App() {

  const initialToken = localStorage.getItem("token");
  const initialUserInfos = localStorage.getItem("userInfos");

  const [userInfos, setUserInfos] = useState(JSON.parse(initialUserInfos));
  const [token, setToken] = useState(initialToken);

  return (

    <UserContext.Provider value={{ userInfos, setUserInfos, token, setToken }} >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/sign-up" element={<SignUpPage />}></Route>
          <Route path="/home" element={<HomePage pageNumber = {0} />}></Route>
          <Route path="/home-teachers" element={<HomePage pageNumber = {1} />}></Route>
          <Route path="/register" element={<HomePage pageNumber = {2} />}></Route>
          <Route path="/search" element={<HomePage pageNumber = {3} />}></Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
