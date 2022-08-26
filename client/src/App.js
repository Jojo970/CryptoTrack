import './App.css';
import React, {useState} from 'react';
import axios from 'axios';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CryptoList from './components/CryptoList';
import CryptoForm from './components/CryptoForm';
import CryptoEdit from './components/CryptoEdit';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  return (
    <>
      <BrowserRouter>
      <div className='whole'>
        <Navigation loggedIn ={loggedIn} setLoggedIn={setLoggedIn} />
        <Routes>
          <Route path = "/" element = {<CryptoList/>} />
          <Route path = "/add" element = {<CryptoForm/>} />
          <Route path = "/edit/:id" element = {<CryptoEdit/>} />
          <Route path = "/login" element = {<Login setLoggedIn={setLoggedIn}/>} />
          <Route path = "/register" element = {<Register setLoggedIn={setLoggedIn} />} />
        </Routes>
      </div>
      </BrowserRouter>
    </>
  );
}

export default App;
