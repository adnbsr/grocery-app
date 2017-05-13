/**
 * Created by adnanbasar on 02/05/2017.
 */

import SnackBar from 'react-native-snackbar'

const initialState = {
    isUserLoggedIn: false,
    id: null,
    name: null,
    address: null
}

export default function userReducer(state = initialState, action) {

    if (action.type === "LOAD_CONFIG") {

        return {
            isUserLoggedIn: action.payload
        }
    }

    if (action.type === 'LOGGED_OUT') {
        return initialState
    }

    if (action.type === 'LOGGED_IN') {

        const user = action.payload

        return {
            isUserLoggedIn: true,
            id: user.id,
            name: user.get('name'),
            address: user.get('address')
        }
    }

    if (['CHECK_CURRENT_USER','SIGN_UP'].indexOf(action.type) > -1) {

        const user = action.payload

        if (user) {
            return {
                isUserLoggedIn: true,
                id: user.id,
                name: user.get('name'),
                address: user.get('address')
            }
        }

        return initialState

    }

    if (action.type === 'USERNAME_EXISTS') {

        SnackBar.show({
            title: action.message,
            length: SnackBar.LENGTH_SHORT
        })

        return initialState
    }


    if (action.type === 'UPDATE_USER_ADDRESS') {
        return {...state, address: action.payload}
    }

    return state
}

