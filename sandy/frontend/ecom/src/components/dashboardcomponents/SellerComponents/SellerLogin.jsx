import {React,useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SellerNavbar from './SellerNavbar';
const SellerLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
   

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await axios.post(`http://localhost:3000/seller/login`, {
                username: username,
                password: password
            });
            if (response.status === 201) {
                console.log(response.data.sellertoken)

                localStorage.setItem("sellertoken",response.data.sellertoken)
                    navigate("/seller/dashboard")
            }
        } catch (err) {
            console.log(err)
            if (err.response && err.response.status === 401) {
                setError('Incorrect Credentials');
            } else {
                setError('Unexpected error');
            }
        } finally {
            setLoading(false);
        }
    };
  return (
    <>
    <SellerNavbar/>
    <form onSubmit={handleSubmit}>
            <div className="flex items-center h-screen justify-center">
                <div className="border-2 p-20 rounded-md shadow-md">
                    <div className="pb-10 text-center">
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
                    <div className="m-2 mt-6 flex justify-center ">
                        <button type="submit" className="bg-black rounded-md p-2 text-white pl-4 pr-4" disabled={loading}>
                            {loading ? 'Signin in...' : 'Signin'}
                        </button>
                    </div>
                    {error && (
                        <div className="text-red-500 mt-2 flex justify-center ">
                            <p>{error}</p>
                        </div>
                    )}
                </div>
            </div>
        </form>
        </>
  )
}

export default SellerLogin
