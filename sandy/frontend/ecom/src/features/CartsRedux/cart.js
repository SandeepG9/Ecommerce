import { createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchInitialCart = createAsyncThunk(
    'cart/fetchInitialCart',
    async () => {
        const token = localStorage.getItem('token')
        const config = {
            headers:{
                authorization: `token ${token}`
            }
        }
        const cartDetails =await axios.get('http://localhost:3000/getCartProducts',config)
        const count = cartDetails.data.length
        return count; 
    }
);

async function getCartProductDetails()
{
    async () => {
        const token = localStorage.getItem('token')
        const config = {
            headers:{
                authorization: `token ${token}`
            }
        }
        const cartDetails =await axios.get('http://localhost:3000/getCartProducts',config)
        console.log(cartDetails)
        return cartDetails.data
    }
}
async function  addtoCart(itemID) {
    const token = localStorage.getItem('token')
    const config = {
        headers:{
            authorization: `token ${token}`
        }
    }
        const userData = await axios.get('http://localhost:3000/getUserDetails',config
    )
    const cartresponse = await axios.post('http://localhost:3000/addtoCart',
        {
            "userId":userData.data.id,
            "productId":itemID
        }
    )   
}
const counterSlice = createSlice(
    {
        name:'cartcounter',
        initialState:{
            item:[],
            value:0,
            productDetails:[]
        },
        reducers:{
            increment:(state,action)=>{
                state.item = action.payload
                state.value+=1
                addtoCart(action.payload)
            },
        },
        extraReducers: (builder) => {
            builder
                .addCase(fetchInitialCart.pending, (state) => {
                    state.status = 'loading';
                })
                .addCase(fetchInitialCart.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.value = action.payload; 
                })
                .addCase(fetchInitialCart.rejected, (state) => {
                    state.status = 'failed';
                });
                
        },
    }
)

export const{increment} = counterSlice.actions
export default counterSlice.reducer