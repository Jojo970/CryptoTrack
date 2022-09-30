import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css'

const Navigation = ({loggedIn, setLoggedIn}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/current-user', {withCredentials: true}).then(
            (res) => {setUser(res.data);
            console.log(res)}
        ).catch((err) => console.log("error in getting user",err));
    }, [loggedIn]);

    const handleLogout = () => {
        axios.post('http://localhost:8000/api/logout', {}, {withCredentials: true}).then(
            (res) => {setUser(null);}
        ).catch(err => console.log('Error in logging out', err));
    };


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
                {user? (
                    <div>
                        <p>Hello: {user.username}</p>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <div>
                        <NavLink to = "/login">
                            Login
                        </NavLink>
                        <NavLink to = "/register">
                            Register
                        </NavLink>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Navigation;