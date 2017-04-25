
const initialState = {
  all : []
}

const productReducer = (state = initialState, action) => {

  if (action.type === 'FETCH_PRODUCTS'){
    return {all: action.list}
  }

  return state
}

export default productReducer
