/**
 * Created by adnanbasar on 04/05/2017.
 */

import type {Order} from '../types'

//TODO: STATE TYPE

const initialState = {
    orderStatus: null,
    list: [],
    cancel: false
}

export default function orderReducer(state = initialState, action) {

    if (action.type === 'GIVE_ORDER') {
        return {
            ...state,
            orderStatus: 'given'
        }
    }

    if (action.type === 'CLEAR_ORDER') {
        return {
            ...state,
            orderStatus: null
        }
    }

    if (action.type === 'FETCH_ORDERS') {

        return {
            ...state,
            cancel: false,
            list: action.list.map(fromParseObjectToOrder)
        }
    }

    if (action.type === 'CANCEL_ORDER') {
        return {...state, cancel: true}
    }

    return state
}

//TODO: Order TYpe

function fromParseObjectToOrder(object: Object): Order {
    return {
        id: object.id,
        total: object.get('total'),
        orderState: object.get('orderState'),
        items: object.get('items'),
        deliveryType: object.get('deliveryType'),
        address: object.get('address')
    }
}