import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setLoggedIn }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const handleChange = (e) => {
        setUser({
        ...user,
        [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
        .post('http://localhost:8000/login', user, { withCredentials: true })
        .then((res) => {
            console.log(res.data);
            setLoggedIn(true);
            navigate('/');
        })
        .catch((err) => console.log(err));
    };
    return (
        <form style = {{fontSize: '1.2em', color: 'white'}} onSubmit={handleSubmit}>
        <label style = {{backgroundColor: 'black', margin: '22px', padding: '5px 25px'}} htmlFor="email">Email:</label>
        <input type="email" name="email" value={user.email} onChange={handleChange} required />
        <label style = {{backgroundColor: 'black', margin: '22px', padding: '5px 25px'}} htmlFor="password">Password:</label>
        <input type="password" name="password" value={user.password} onChange={handleChange} required />
        <button>Login</button>
        </form>
    );
};

export default Login;