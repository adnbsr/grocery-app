import {combineReducers} from 'redux'
import cartReducer from './cartReducer'
import productReducer from './productReducer'
import userReducer from './userReducer'
import orderReducer from './orderReducer'
import configReducer from './configReducer'

export default appReducer = combineReducers({
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
    order: orderReducer,
    config: configReducer
})