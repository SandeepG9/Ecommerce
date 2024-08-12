import React, { useState } from 'react'
import SellerNavbar from './SellerNavbar'
import axios from 'axios'

const SellerAddProduct = () => {
    const [productName,setProductName] = useState('')
    const [price,setPrice] = useState(0.0)
    const [gender,setGender] = useState('')
    const [productDescription,setProductDescription] = useState('')
    const [productType,setProductType] = useState('')
    const [image,setImage] = useState([])

    async function handleSubmit(event)
    {
        
       const token = localStorage.getItem('sellertoken')
       const floatprice = parseFloat(price)
       console.log(typeof(floatprice))
       event.preventDefault()
       const formData = new FormData()
       formData.append('productName',productName)
       formData.append('price',floatprice)
       formData.append('gender',gender)
       formData.append('productDescription',productDescription)
       formData.append('productType',productType)
       formData.append('image',image)
       console.log(formData)
       const resp = await axios.post(
        'http://localhost:3000/seller/addproduct',
          formData,
        {
          headers: {
            'Authorization': `sellertoken ${token}`, // Include the token in the Authorization header
          }
        }
      );
      console.log(resp.data)
    }

  return (
    <>
    <div className='mb-10'>
    <SellerNavbar/>
    </div>
      <form onSubmit={handleSubmit}>
            <div className='flex justify-center h-screen items-center' >
                <div className='flex flex-col border-2 p-14 pr-20 pl-20 shadow-md rounded-md'>
                    <div className='flex flex-row justify-center pl-2 text-2xl font-bold mb-4 underline'>Add Product</div>
                    <div className='pl-2 font-bold'>Product name</div>
                    <div className=' border-2 rounded-md m-2'>
                        <input className='p-2' type="text" value={productName} placeholder='product name' onChange={(e)=>{
                            setProductName(e.target.value)
                        }}/>
                    </div>
                    <div className='pl-2  font-bold'>Price</div>
                    <div className=' border-2 rounded-md m-2 '>
                        <input className='p-2' value={price} type="text" placeholder='price' onChange={(e)=>{
                            setPrice(e.target.value)
                        }}/>
                    </div>
                    <div className='pl-2  font-bold'>Gender</div>
                    <div className=' border-2 rounded-md m-2 '>
                        <input className='p-2' value={gender} type="text" placeholder='gender' onChange={(e)=>{
                            setGender(e.target.value)
                        }}/>
                    </div>
                    <div className='pl-2 font-bold'>Product Description</div>
                    <div className=' border-2 rounded-md m-2'>
                        <input className='p-2' value={productDescription} type="text" placeholder='description' onChange={(e)=>{
                            setProductDescription(e.target.value)
                        }}/>
                    </div>
                    <div className='pl-2  font-bold'>Product Type</div>
                    <div className=' border-2 rounded-md m-2'>
                        <input className='p-2' value={productType} type="text" placeholder='product type' onChange={(e)=>{
                            setProductType(e.target.value)
                        }}/>
                    </div>
                    <div className='pl-2  font-bold '>Product Image</div>
                    <div className=' border-2 rounded-md m-2 mb-10'>
                        <input type="file"  onChange={(e)=>{
                            setImage(e.target.files[0])
                            console.log(image.name)
                        }}/>
                    </div>
                    <div className='flex flex-row justify-center text-white'>
                        <button className='bg-black p-2 rounded-md hover:bg-gray-700'>Add Product</button>
                    </div>
                </div>
            </div>
      </form>
      </>
  )
}

export default SellerAddProduct
