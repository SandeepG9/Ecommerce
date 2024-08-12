import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { increment } from '../../features/CartsRedux/cart';
import { useSelector, useDispatch } from 'react-redux';

const Cards = () => {
    const [productDetails, setProductDetails] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortOption, setSortOption] = useState('default');
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();
    const cartcountvalue = useSelector((state) => state.cartcounter.value);
    const [loadingstatus, setLoadingstatus] = useState(false);

    const sortProducts = (products, option) => {
        switch(option) {
            case 'name':
                return products.sort((a, b) => a.productName.localeCompare(b.productName));
            case 'priceAsc':
                return products.sort((a, b) => a.price - b.price);
            case 'priceDesc':
                return products.sort((a, b) => b.price - a.price);
            default:
                return products;
        }
    };

    const filterProducts = (products, query) => {
        return products.filter(product => 
            product.productName.toLowerCase().includes(query.toLowerCase()) ||
            product.productDescription.toLowerCase().includes(query.toLowerCase())
        );
    };

    useEffect(() => {
        async function getProductDetails(){
            try {
                const response = await axios.get('http://localhost:3000/getallproducts', {
                    headers: {
                        'Authorization': localStorage.getItem('token'),
                    },
                });
                setLoadingstatus(response);
                let sortedProducts = sortProducts(response.data, sortOption);
                let filtered = filterProducts(sortedProducts, searchQuery);
                setProductDetails(sortedProducts);
                setFilteredProducts(filtered);
            } catch (error) {
                console.error("Error fetching products", error);
            }
        }
        getProductDetails();
    }, [dispatch, sortOption, searchQuery]);

    return (
        <div className="min-h-screen flex flex-col">
            {/* Centered search bar */}
            <div className="flex-grow flex items-center justify-center mt-8 px-4">
                <div className="w-full max-w-lg flex justify-center">
                    <label htmlFor="search" className="block mb-2 text-center text-lg font-bold"></label>
                    <input 
                        id="search" 
                        type="text" 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        className="w-full p-3 border rounded-md" 
                        placeholder="Search products..." 
                    />
                </div>
            </div>

            {/* Sort option */}
            <div className="mb-4 ml-20 mt-4">
                <label htmlFor="sort" className="mr-2">Sort By:</label>
                <select id="sort" value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="p-2 border rounded">
                    <option value="default">Default</option>
                    <option value="name">Name</option>
                    <option value="priceAsc">Price: Low to High</option>
                    <option value="priceDesc">Price: High to Low</option>
                </select>
            </div>

            {/* Product list */}
            <div className='flex flex-wrap gap-4 ml-20 px-4'>
                {filteredProducts.map((product) => (
                    <div key={product.productId} className='flex flex-col border-2 rounded-md p-6 h-auto w-60'>
                        <h1 className='mb-2 text-center text-lg font-bold h-20'>{product.productName}</h1>
                        <img className='h-32 mb-2 object-cover w-full' src={product.imageUrl} alt="no image found" />
                        <p className='line-clamp-3 mb-2 text-center'>{product.productDescription}</p>
                        <p className='font-bold mb-2 text-center mt-auto'>{product.price}rs</p>
                        <button className='bg-black text-white rounded-md p-2 mt-auto' onClick={() => dispatch(increment(product.productId))}>Add to cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Cards;
