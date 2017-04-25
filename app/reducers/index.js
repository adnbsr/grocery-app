import {combineReducers} from 'redux'
import Parse from 'parse/react-native'

const appReducer = combineReducers({
  libraries: () => [
    "Adnan", "Bekir", "Betul"
  ],
  cartItems: (state, action) => {

    if (action.type === 'ADD_TO_CART') {
      return [
        ...state,
        action.payload
      ]
    }

    return []
  },
  products : (state, action) => {
    if (action.type === 'FETCH_PRODUCTS') {
      return action.list
    }

    return []
  }
})

export default appReducer
