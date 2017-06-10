/**
 * Created by adnanbasar on 02/05/2017.
 *
 * @flow
 */

import SnackBar from 'react-native-snackbar'
import strings from '../utils/strings'
import type {Action, User} from '../types'

type State = {
    isUserLoggedIn: boolean,
    id: string,
    name: string,
    address: string,
    phone: string
}

const initialState = {
    isUserLoggedIn: false,
    id: "",
    name: "",
    address: "",
    phone: ""
}

export default function userReducer(state: State = initialState, action: Action) {

    if (action.type === 'LOGGED_IN') {

        const {user} = action

        return {
            isUserLoggedIn: true,
            id: user.id,
            phone: user.phone,
            name: user.name,
            address: user.address
        }
    }

    if (action.type === 'LOGGED_OUT') {
        return initialState
    }

    if (['CHECK_CURRENT_USER', 'SIGN_UP'].indexOf(action.type) > -1) {

        const {user} = action

        if (user) {
            return {
                isUserLoggedIn: true,
                id: user.id,
                phone: user.phone,
                name: user.name,
                address: user.address
            }
        }

        return initialState
    }

    if (action.type === 'USERNAME_EXISTS') {

        SnackBar.show({
            title: strings.usernameExits,
            length: SnackBar.LENGTH_SHORT
        })

        return initialState
    }

    if (action.type === 'UPDATE_USER_ADDRESS') {
        return {...state, address: action.payload}
    }

    if (action.type === 'UPDATE_USER') {
        const {params} = action
        return {
            ...state,
            name: params.name,
            username: params.username,
            address: params.address
        }
    }

    return state
}

