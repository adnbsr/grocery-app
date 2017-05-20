/**
 * Created by adnanbasar on 04/05/2017.
 */

import type {Order} from '../types'

//TODO: STATE TYPE

const initialState = {
    orderStatus: null,
    list: []
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
            list: action.list.map(fromParseObjectToOrder)
        }
    }

    return state
}

//TODO: Order TYpe

function fromParseObjectToOrder(object: Object): Order {
    return {
        total: object.get('total'),
        orderState: object.get('orderState'),
        items: object.get('items'),
        deliveryType: object.get('deliveryType'),
        address: object.get('address')
    }
}