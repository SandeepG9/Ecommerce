import { useEffect, useState } from "react";
import Navbar from "../../Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartDetails = () => {
   const navigate = useNavigate();
   const [productDetails, setProductDetails] = useState([]);

   useEffect(() => {
      async function getProductDetails() {
         const token = localStorage.getItem('token');
         const config = {
            headers: {
               authorization: `token ${token}`
            }
         };

         try {
            const response = await axios.get('http://localhost:3000/productDetailsforCart', config);
            setProductDetails(response.data);
         } catch (error) {
            console.error("Error fetching product details:", error);
         }
      }
      getProductDetails();
   }, []);
   const handleCheckout = () => {
      navigate('/checkout', { state: { CartDetails: productDetails } });
   }
   return (
      <>
         <Navbar />
         <div className="flex justify-center mt-20 p-6 space-x-8">
  <div className="w-2/4">
    {productDetails.map((product, index) => (
      <a 
        key={index} 
        href="#" 
        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mb-6"
      >
        <img 
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" 
          src={product.imageUrl} 
          alt={product.productName} 
        />
        <div className="flex flex-col justify-between p-4 leading-normal w-full">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {product.productName}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {product.productDescription}
          </p>
          <p className="mb-3 font-semibold text-gray-900 dark:text-white">
            ₹{product.price}
          </p>
          <button type="button" className="bg-black text-white w-full hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Remove Product
          </button>
        </div>
      </a>
    ))}
  </div>
  <div className="w-1/3 bg-white p-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-80 ml-32">
    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Cart Summary</h3>
    <p className="text-lg font-medium text-gray-700 dark:text-gray-400">Total Products: {productDetails.length}</p>
    <p className="text-lg font-medium text-gray-700 dark:text-gray-400">
      Total Price: ₹{productDetails.reduce((total, product) => total + product.price, 0)}
    </p>
    <button onClick={handleCheckout} type="button" className="bg-black text-white w-full hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 mt-4">
      Checkout
    </button>
  </div>
</div>

      </>
   );
};

export default CartDetails;
