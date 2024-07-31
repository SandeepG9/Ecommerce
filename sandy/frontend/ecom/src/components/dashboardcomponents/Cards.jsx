import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Cards = () => {
    const [productDetails,setProductDetails] = useState([])

    useEffect(()=>{
        async function getProductDetails(){
            const response = await axios.get('https://fakestoreapi.com/products')
            setProductDetails(response.data)
        }
        getProductDetails()
    },[])
  return (
    <div className='flex flex-wrap gap-4'>
    {  
        productDetails.map((product)=>{  
            return( 
                <div key={product.id} className='flex flex-col border-2  rounded-md p-6 h-auto w-60'>
                    <h1 className='mb-2 text-lg font-bold h-20'>{product.title}</h1>
                    <img className='h-32 mb-2 object-cover w-full' src={product.image} alt="" />
                    <p className='line-clamp-3 mb-2'>{product.description}</p>
                    <p className='font-bold'>{product.price}rs</p>
                    <button className='bg-black text-white rounded-md p-2 mt-auto'>Add to cart</button>
                </div>
                )}
    )}
    </div>
  )
}

export default Cards


