/**
 * @flow
 */

import type {Category, Product, Action} from '../types'

const initialState = {
    all: [],
    categories: []
}

type State = {
    all: Array<Product>,
    categories: Array<Category>
}

const productReducer = (state: State = initialState, action: Action) => {

    if (action.type === 'FETCH_PRODUCTS') {
        return {...state, all: action.list.map(fromParseObject)}
    }

    if (action.type === 'SEARCH_PRODUCTS'){
        return {...state, all: action.list.map(fromParseObject)}
    }

    if (action.type === 'FETCH_CATEGORIES') {
        return {...state, categories: action.list.map(fromParseObjectToCategory)}
    }

    return state
}


function fromParseObjectToCategory(object: Object): Category {
    return {
        id: object.id,
        name: object.get('name'),
        thumbnail: object.get('thumbnail') && object.get('thumbnail').url()
    }
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
