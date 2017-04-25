import {combineReducers} from 'redux'
import Parse from 'parse/react-native'
import cartReducer from './cartReducer'
import productReducer from './productReducer'

const initialState = {
  products: []
}

const appReducer = combineReducers({
  libraries: () => [
    "Adnan", "Bekir", "Betul"
  ],
  product: productReducer,
  cart: cartReducer
})

export default appReducer
