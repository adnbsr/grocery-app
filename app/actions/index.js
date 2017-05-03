import Parse from 'parse/react-native'
import {InteractionManager, AsyncStorage} from 'react-native'

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

export async function loadConfig(): Promise<Object> {

    const config = await AsyncStorage.getItem('@sepetim:config')

    return {
        type: "LOAD_CONFIG",
        payload: config
    }
}

export async function signUp(newUser) {

    const user = new Parse.User()
    user.set('username', newUser.username)
    user.set('password', newUser.password)
    user.set('name', newUser.name)
    user.set('phone', newUser.phone)
    user.set('address', newUser.address)

    const payload = await user.signUp(null)

    return {
        type: 'SIGN_UP',
        payload: payload
    }
}

export async function checkCurrentUser() {
    const user = await Parse.User.currentAsync()
    return {
        type: "CHECK_CURRENT_USER",
        payload: user
    }
}

export async function logIn(username: string, password: string): Promise {

    const  user  = await Parse.User.logIn(username, password)

    return {
        type: "LOGGED_IN",
        payload: user
    }
}

export function logOut() {

    return (dispatch) => {

        Parse.User.logOut()

        return dispatch({
            type: "LOGGED_OUT"
        })
    }

}


export const loadLibraries = () => {
    return {
        type: "LOAD_LIBRARIES"
    }
}

export function addToCart(item: Product) {
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