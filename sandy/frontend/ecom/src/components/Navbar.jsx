import React, { useEffect,useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchInitialCart } from '../features/CartsRedux/cart';
const Navbar = () => {
  const [loginstatus,setLoginStatus] = useState('')
  const cartvaluecount = useSelector((state)=>state.cartcounter.value)
  const valuess = useSelector((state)=>state.cartcounter.item)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchInitialCart())
    if(localStorage.getItem('token'))
    {
      setLoginStatus(1)
    }
    else
    {
      setLoginStatus(0)
    }
  },[loginstatus])
  return (
    <nav className="bg-gray-800 p-4 w-full fixed top-0 text-white">
      <div className="flex justify-between items-center mx-auto w-full px-4">
        <div className="text-white text-xl font-bold"> 
        <Link to="/dashboard" className='text-white hover:text-gray-300'>UrbanShopper</Link>
        </div>
        <div className="flex space-x-4">
          <Link to="/cart"className='hover:text-gray-300'><FontAwesomeIcon icon={faCartShopping}/><span>{cartvaluecount}</span></Link>
          {loginstatus?(<><Link to="/youraccount" className='text-white hover:text-gray-300'>Your Account</Link> <Link to="/logout" className='text-white hover:text-gray-300'>Logout</Link></>
          ):
          (<Link to="/login" className='text-white hover:text-gray-300'>Login</Link>)}
          <Link to="/signup" className='text-white hover:text-gray-300'>Signup</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
