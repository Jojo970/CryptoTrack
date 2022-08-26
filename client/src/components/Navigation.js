import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css'

const Navigation = (props) => {
  return (
    <header>
        <div>

        <h1>
            CryptoWatch
        </h1>
        </div>
        <div className='links'>

        <NavLink to="/">
            Home
        </NavLink>
        <NavLink to="/add">
            Add to Watchlist
        </NavLink>
        <NavLink to = "/login">
            Login
        </NavLink>
        <NavLink to = "/register">
            Register
        </NavLink>
        </div>
    </header>
  )
}

export default Navigation;