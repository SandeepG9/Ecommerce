import React from 'react'
import { Link } from 'react-router-dom'

const SellerNavbar = () => {
  return (
    <>
      <nav className="bg-gray-800 p-4 w-full fixed top-0 text-white">
      <div className="flex justify-between items-center mx-auto w-full px-4">
        <div className="text-white text-xl font-bold">        
            UrbanShopper
        </div>
        <div className="flex space-x-4">
            <Link to="/seller/addproduct">Add Products</Link>
            <Link to="/seller/removeproduct">Remove Products</Link>
            <Link to="/seller/removeproduct">Account Details</Link>
            <Link to="/seller/login"> Login</Link>
            <Link to="/seller/removeproduct"> Logout</Link>
        </div>   
      </div>
    </nav>
    </>
  )
}

export default SellerNavbar
