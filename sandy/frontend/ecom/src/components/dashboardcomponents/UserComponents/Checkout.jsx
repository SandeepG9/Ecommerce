import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../Navbar';
import SuccessMessage from './SuccessMessage';
const CheckoutPage = () => {
    const location = useLocation();
    const cartDetails = location.state?.CartDetails || [];
    const [showSuccess, setShowSuccess] = useState(false);
    const totalPrice = cartDetails.reduce((total, item) => total + item.price, 0);
    const handlePlaceOrder = () => {
        // Simulate placing the order
        setTimeout(() => {
          setShowSuccess(true); // Show the success message
        }, 500); // Simulate a delay for placing the order
      };
  return (
    <>
    <Navbar/>
    <div className="flex justify-center items-center mt-20 p-6">
      <div className="w-full max-w-4xl bg-white p-8 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Checkout</h2>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Order Summary</h3>
          {cartDetails.map((item, index) => (
            <div key={index} className="flex justify-between items-center mb-4">
              <div className="text-lg font-medium text-gray-900 dark:text-white">
                {item.productName}
              </div>
              <div className="text-lg font-medium text-gray-700 dark:text-gray-400">
                ₹{item.price}
              </div>
            </div>
          ))}
          <div className="border-t border-gray-300 dark:border-gray-600 mt-4 pt-4">
            <div className="flex justify-between items-center">
              <div className="text-xl font-semibold text-gray-900 dark:text-white">
                Total Price
              </div>
              <div className="text-xl font-semibold text-gray-900 dark:text-white">
                ₹{totalPrice}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Shipping Information</h3>
          {/* Shipping Form here */}
        </div>
        <div className='ml-2 text-lg font-semibold'>Full Name</div>
        <div>
            <input type="text" className='border-2 h-10 p-2 rounded-md m-2 mb-4 w-full' />
        </div>
        <div className='ml-2 text-lg font-semibold'>Address</div>
        <div>
            <input type="text" className='border-2 h-10 p-2 rounded-md m-2 mb-4 w-full' />
        </div>
        <div className='ml-2 text-lg font-semibold'>Pincode</div>
        <div >
            <input type="text" className='border-2 p-2 h-10 w-full w rounded-md m-2 mb-4' />
        </div>
        <div className='ml-2 text-lg font-semibold'>Phone Number</div>
        <div>
            <input type="text" className='border-2 p-2 h-10 w-full rounded-md m-2 mb-4' />
        </div>
        <button
          type="button" onClick={handlePlaceOrder}
          className="w-full m-2 bg-black text-white hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Place Order
        </button>
      </div>
      {showSuccess && (
        <SuccessMessage
          message="Your order has been placed successfully!"
          onClose={() => setShowSuccess(false)}
        />
      )}
    </div>
    </>
  );
};

export default CheckoutPage;
