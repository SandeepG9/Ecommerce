import {configureStore} from '@reduxjs/toolkit'
import counterReducer from '../features/CartsRedux/cart'; // Correct relative path

const store = configureStore({
    reducer:{
        cartcounter:counterReducer,
    }
})

export default store