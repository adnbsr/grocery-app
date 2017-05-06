import Parse from 'parse/react-native'
import {InteractionManager, AsyncStorage} from 'react-native'

import type {Product} from '../types'

const _Product = Parse.Object.extend('Product')

function loadParseQuery(type, query) {
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

export async function updateUserAddress(address: string) {
    const user = await Parse.User.currentAsync()
    user.set('address', address)
    await user.save(null)
    return {
        type: "UPDATE_USER_ADDRESS",
        payload: address
    }
}


export async function logIn(username: string, password: string): Promise {

    const user = await Parse.User.logIn(username, password)

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

export function addToCart(item: Product) {
    return {
        type: 'ADD_TO_CART',
        payload: item
    }
}

export function removeFromCart(item: Object) {
    return {
        type: 'REMOVE_FROM_CART',
        payload: item
    }
}

export function clearCart() {
    return {
        type: 'CLEAR_CART'
    }
}

export function fetchProducts() {

    const query = new Parse.Query(_Product)
    query.include('category')

    return loadParseQuery('FETCH_PRODUCTS', query)
}

export function searchProducts(keyword: string) {

    const query = new Parse.Query(_Product)
    query.include('category')
    query.matches("name", keyword, 'i')

    return loadParseQuery('SEARCH_PRODUCTS', query)
}

export async function giveOrder(user: Object, items: Array<Object>, total: number, address: string, deliveryType: string = 'standard', orderState: string = 'nonApproved') {

    const parseUser = new Parse.User()
    parseUser.id = user.id

    const order = new Parse.Object('Order')
    order.set('user', parseUser);
    order.set('items', items);
    order.set('total', total);
    order.set('address', address);
    order.set('deliveryType', deliveryType);
    order.set('orderState', orderState);

    await order.save(null)

    return {
        type: 'GIVE_ORDER'
    }
}

export function clearOrder() {
    return {
        type: 'CLEAR_ORDER'
    }
}