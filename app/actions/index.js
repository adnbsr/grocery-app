import Parse from 'parse/react-native'
import {InteractionManager, AsyncStorage, Platform} from 'react-native'

import type {Product} from '../types'

const _Product = Parse.Object.extend('Product')
const _Category = Parse.Object.extend('Category')

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

    try {

        const parseUser = await user.signUp(null)

        return {
            type: 'SIGN_UP',
            payload: parseUser
        }
    }catch (error) {

        if (error.code === 202) {
            return {
                type: 'USERNAME_EXISTS',
                message: 'This username is already registered!'
            }
        }
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

export function addToCart(product: Product) {
    return {
        type: 'ADD_TO_CART',
        product: product
    }
}

export function removeFromCart(product: Product) {
    return {
        type: 'REMOVE_FROM_CART',
        product: product
    }
}

export function clearCart() {
    return {
        type: 'CLEAR_CART'
    }
}

export function fetchCategories() {

    const query = new Parse.Query(_Category)

    return loadParseQuery('FETCH_CATEGORIES', query)
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

export function searchProductsInCategory(id: string) {
    const category = new Parse.Object('Category')
    category.id = id
    const query = new Parse.Query(_Product)
    query.include('category')
    query.equalTo('category', category)

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

/**
 * Action to clear order after order is given
 * @returns Action: {{type: string}}
 */
export function clearOrder() {
    return {
        type: 'CLEAR_ORDER'
    }
}

/**
 * Gets current parse installation from Parse which is stored after initialization
 * @returns {Promise.<*>}
 */
export async function getCurrentInstallation(): Promise {

    const installationId = await Parse._getInstallationId()
    return new Parse.Installation({
        installationId,
        appName: 'Sebetim',
        deviceType: Platform.OS,
        appIdentifier: 'com.sebetim'
    });
}

export async function updateInstallation(params: Object = {}): Promise {
    const installation = await getCurrentInstallation()
    await installation.save(params)
}

export async function storeDeviceToken(deviceToken: Object) {
    const pushType = Platform.OS === 'android' ? 'gcm' : undefined;
    await updateInstallation({
        pushType,
        deviceToken: deviceToken.token,
        deviceTokenLastModified: Date.now()
    })
    return {
        type: "REGISTERED_NOTIFICATIONS"
    }
}

