import React, { useState } from 'react';
import axios from 'axios';
import SellerNavbar from './SellerNavbar';
const SellerSignup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/seller', {
        username,
        password,
        firstname,
        lastname,
      });

      if (response.status === 201) {
        setSuccess('Account created successfully');
        setError('');
      } else if (response.status === 400) {
        setError('Username and password cannot be empty');
      } else {
        setError(`Unexpected status code: ${response.status}`);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An unexpected error occurred');
      setSuccess('');
    }
  }

  return (
    <>
    <SellerNavbar/>
    <form onSubmit={handleSubmit}>
      <div className="flex items-center h-screen justify-center ">
        <div className=" border-2 p-15 pt-6 pb-6 pr-20 pl-20 rounded-md shadow-md ">
          <div className="pb-10 text-center">
            <h1 className="font-bold text-3xl underline">Seller Signup</h1>
          </div>
          <div className="p-2 text-left ml-2 font-medium">
            <p>Username</p>
          </div>
          <div className="p-2">
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="sandy@gmail.com"
              className="rounded-md border-2 p-2 w-full"
              value={username}
            />
          </div>
          <div className="text-left ml-4 mt-2 font-medium">
            <p>Password</p>
          </div>
          <div className="p-2">
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter password"
              className="border-2 p-2 rounded-md w-full"
              value={password}
            />
          </div>
          <div className="text-left ml-4 mt-2 font-medium">
            <p>First Name</p>
          </div>
          <div className="p-2">
            <input
              onChange={(e) => setFirstname(e.target.value)}
              type="text"
              placeholder="Enter Firstname"
              className="border-2 p-2 rounded-md w-full"
              value={firstname}
            />
          </div>
          <div className="text-left ml-4 mt-2 font-medium">
            <p>Last Name</p>
          </div>
          <div className="p-2">
            <input
              onChange={(e) => setLastname(e.target.value)}
              type="text"
              placeholder="Enter Lastname"
              className="border-2 p-2 rounded-md w-full"
              value={lastname}
            />
          </div>
          <div className="m-2 mt-4 flex justify-center">
            <button type="submit" className="bg-black rounded-md p-2 text-white pl-4 pr-4">
              Signup
            </button> 
          </div>
          {error && (
            <div className="text-red-500 h-6">
              <p>{error}</p>
            </div>
          )}
          {success && (
            <div className="text-green-500 h-6">
              <p>{success}</p>
            </div>
          )}
        </div>
      </div>
    </form>
    </>
  );
};

export default SellerSignup;
