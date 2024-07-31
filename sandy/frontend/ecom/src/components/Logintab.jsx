import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import DashboardHome from './DashboardHome';
const Logintab = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login', {
                username: username,
                password: password
            });
            if(response.status==200)
            {
                localStorage.setItem('token',response.data.token)
                navigate("/dashboard")
            }
            } catch (err) {
            console.error('Error logging in:', err);
            setError(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex items-center h-screen justify-center">
                <div className="border-2 p-20 rounded-md shadow-md">
                    <div className="pb-10">
                        <h1 className="font-bold text-3xl">Login</h1>
                    </div>
                    <div className="p-2 text-left ml-2"><p>Username</p></div>
                    <div className="p-2">
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            placeholder="Enter username"
                            className="rounded-md border-2 p-2"
                            value={username}
                        />
                    </div>
                    <div className="text-left ml-4 mt-2"><p>Password</p></div>
                    <div className="p-2">
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Enter password"
                            className="border-2 p-2 rounded-md"
                            value={password}
                        />
                    </div>
                    <div className="m-2 mt-4">
                        <button type="submit" className="bg-black rounded-md p-2 text-white pl-4 pr-4">
                            Login
                        </button>
                    </div>
                    {error && (
                        <div className="text-red-500">
                            <p>{error}</p>
                        </div>
                    )}
                </div>
            </div>
        </form>
    );
};

export default Logintab;
