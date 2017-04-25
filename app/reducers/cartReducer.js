

const initialState = {
  items: ['adnan']
}

const cartReducer = (state = initialState, action) => {
  if (action.type === 'ADD_TO_CART'){
    return Object.assign({},state, {items: [...state.items, action.payload]})
  }

  return state
}

export default cartReducer
