import './App.css';
import Login from "./components/login"
import React, { useState,useEffect} from 'react';
import Navbar from "./components/Nav"
import BuyBorrow from "./pages/BuyBorrow"
import Listing from "./pages/MyListing"
import History from "./pages/History"
import SellShare from "./pages/SellShare"
import ForgotPassword from './components/forgotPassword';
import Register from './components/register';
import axios from 'axios';
import { Route, Routes , Navigate} from 'react-router-dom';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    alert("Are you sure you want to logout??")
    setIsLoggedIn(false);
  };

  const refreshAccessToken = async () => {
    try {
      await axios.post('/token', {refresh_token: localStorage.getItem("refreshToken")});
      console.log(localStorage.getItem("refreshToken"));
    } catch (error) {
      console.error('Token refresh failed:', error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      refreshAccessToken();
      const intervalId = setInterval(refreshAccessToken, 15 * 60 * 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isLoggedIn]);  

  const PrivateRoute = ({ isLoggedIn, children }) => {
    return isLoggedIn ? children : <Navigate to="/login" />;
  };
  
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<BuyBorrow />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/SellShare"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <SellShare />
            </PrivateRoute>
          }
        />
        <Route
          path="/MyListing"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Listing />
            </PrivateRoute>
          }
        />
        <Route
          path="/History"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <History />
            </PrivateRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
  
}

export default App;
