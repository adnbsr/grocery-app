const initialState = {
    all: []
}

const productReducer = (state = initialState, action) => {

    if (action.type === 'FETCH_PRODUCTS') {
        return {all: action.list.map(fromParseObject)}
    }else if (action.type === 'SEARCH_PRODUCTS'){
        return {all: action.list.map(fromParseObject)}
    }

    return state
}

const fromParseObject = (object: Object): Product => {

    return {
        id: object.id,
        name: object.get('name'),
        price: object.get('price'),
        thumbnail: object.get('thumbnail') && object.get('thumbnail').url(),
        category: {
            id: object.get('category') && object.get('category').id,
            name: object.get('category') && object.get('category').get('name')
        }
    }
}

export default productReducer
