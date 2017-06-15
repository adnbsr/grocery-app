import Parse from 'parse/react-native'
import {InteractionManager, AsyncStorage, Platform} from 'react-native'
import {APPNAME, ANDROID_PACKAGE_NAME, IOS_BUNDLE_IDENTIFIER} from '../utils/constants'

import type {Product,Action} from '../types'

const _Product = Parse.Object.extend('Product')
const _Category = Parse.Object.extend('Category')
const _Order = Parse.Object.extend('Order')

function loadParseQuery(type, query) {
    return (dispatch) => {
        return query.find({
            success: (list) => {
                // We don't want data loading to interfere with smooth animations
                InteractionManager.runAfterInteractions(() => {
                    // Flow can't guarantee {type, list} is a valid action
                    dispatch(({type, list}: any))
                })
            },
            error: (error) => {
                console.error(error)
            }
        })
    }
}


export async function loadConfig(){
    const config = await Parse.Config.get()
    return {
        type: 'LOAD_CONFIG',
        config
    }
}

export async function signUp(params) {

    const user = new Parse.User()

    try {

        const newUser = await user.signUp(params)

        return {
            type: 'SIGN_UP',
            user: {
                id: newUser.id,
                phone: newUser.get('username'),
                name: newUser.get('name'),
                address: newUser.get('address')
            }
        }
    } catch (error) {

        if (error.code === 202) {
            return {
                type: 'USERNAME_EXISTS'
            }
        }
    }
}

export async function checkCurrentUser() {
    const user = await Parse.User.currentAsync()
    return {
        type: "CHECK_CURRENT_USER",
        user: {
            id: user.id,
            phone: user.get('username'),
            name: user.get('name'),
            address: user.get('address')
        }
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

export async function getCurrentUser() {
    const user = await Parse.User.currentAsync()
    return user
}

export async function updateUser(params: Object = {}) {
    const user = await getCurrentUser()

    try {
        const updatedUser = await user.save(params)
        return {
            type: 'UPDATE_USER',
            params: params
        }
    }catch (error) {
        //Todo: ParseError {code: 202, message: "Account already exists for this username."}
    }
}
/**
 * @param username: Parse Serverdaki username as User's phone number
 * @param password
 * @returns {Promise.<{type: string, payload: *}>}
 */
export async function logIn(username: string, password: string): Action {

    try{
        const user = await Parse.User.logIn(username, password)

        return {
            type: "LOGGED_IN",
            user: {
                id: user.id,
                phone: user.get('username'),
                name: user.get('name'),
                address: user.get('address')
            }
        }
    }catch (error){

        if (error.code === 101) {
            return {
                type: 'LOGIN_ERROR'
            }
        }

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

export function fetchOffers() {

    const query = new Parse.Query(_Product)
    query.include('category')
    query.equalTo("offer", true)

    return loadParseQuery('FETCH_OFFERS', query)
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

export async function cancelOrder(id: string) {
    const order = new Parse.Object('Order')
    order.id = id
    order.set('orderState', 'canceled')
    const cancledOrder = await order.save(null)
    return {
        type: 'CANCEL_ORDER',
        order: cancledOrder
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

export function fetchOrders(userId: String) {

    const user = new Parse.User()
    user.id = userId

    const query = new Parse.Query(_Order)
    query.include('user')
    query.equalTo('user', user)

    return loadParseQuery('FETCH_ORDERS', query)
}

/**
 * Gets current parse installation from Parse which is stored after initialization
 * @returns {Promise.<*>}
 */
export async function getCurrentInstallation(): Promise {

    const installationId = await Parse._getInstallationId()
    return new Parse.Installation({
        installationId,
        appName: APPNAME,
        deviceType: Platform.OS,
        appIdentifier: Platform.select(
            {
                android: ANDROID_PACKAGE_NAME,
                ios: IOS_BUNDLE_IDENTIFIER
            }
        )
    });
}

export async function updateInstallation(params: Object = {}): Promise {
    const installation = await getCurrentInstallation()
    await installation.save(params)
}

export async function storeDeviceToken(deviceToken: Object) {
    const pushType = Platform.OS === 'android' ? 'gcm' : 'apns';

    await updateInstallation({
        pushType,
        deviceToken: deviceToken.token,
        deviceTokenLastModified: Date.now(),
        GCMSenderId: '487866672474'
    })
    return {
        type: "REGISTERED_NOTIFICATIONS"
    }
}

export async function updateInstallationUser() {

    const user = await Parse.User.currentAsync()

    await updateInstallation({user})

    return {
        type: 'UPDATE_INSTALLATION_USER'
    }
}
