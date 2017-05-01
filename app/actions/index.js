import Parse from 'parse/react-native'
import {InteractionManager} from 'react-native'

import type {Product} from '../types'

const _Product = Parse.Object.extend('Product')

loadParseQuery = (type, query) => {
    return (dispatch) => {
        return query.find({
            success: (list) => {
                // We don't want data loading to interfere with smooth animations
                InteractionManager.runAfterInteractions(() => {
                    // Flow can't guarantee {type, list} is a valid action
                    dispatch(({type, list}: any));
                });
            },
            error: (error) => {
                console.error(error)
            }
        });
    };
}

export const addToCart = (item: Product) => {
    return {
        type: 'ADD_TO_CART',
        payload: item
    }
}

export const removeFromCart = (item: Object) => {
    return {
        type: 'REMOVE_FROM_CART',
        payload: item
    }
}

export const fetchProducts = () => {

    const query = new Parse.Query(_Product)
    query.include('category')

    return loadParseQuery('FETCH_PRODUCTS', query)
}

export const searchProducts = (keyword: string) => {

    const query = new Parse.Query(_Product)
    query.include('category')
    query.contains("name", keyword)

    return loadParseQuery('SEARCH_PRODUCTS', query)
}