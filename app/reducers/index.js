import {combineReducers} from 'redux'
import cartReducer from './cartReducer'
import productReducer from './productReducer'
import userReducer from './userReducer'

export default appReducer = combineReducers({
    product: productReducer,
    cart: cartReducer,
    user: userReducer
})