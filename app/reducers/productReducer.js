/**
 * @flow
 */

import type {Category, Product, Action} from '../types'

const initialState = {
    categories: [],
    results: [],
    offers: []
}

type State = {
    categories: Array<Category>,
    results: Array<Product>,
    offers: Array<Product>
}

const productReducer = (state: State = initialState, action: Action) => {

    if (action.type === 'FETCH_PRODUCTS') {
        return {...state, results: action.list.map(fromParseObject)}
    }

    if (action.type === 'SEARCH_PRODUCTS'){
        return {...state, results: action.list.map(fromParseObject)}
    }

    if (action.type === 'FETCH_CATEGORIES') {
        return {...state, categories: action.list.map(fromParseObjectToCategory)}
    }

    if (action.type === 'FETCH_OFFERS'){
        return {...state, offers: action.list.map(fromParseObject)}
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
        },
        offer: object.get('offer')
    }
}

export default productReducer
