//@flow

import type {Product} from '../types'
import {Map} from 'immutable'

const initialState = {
    items: Map(),
    total: 0
}

export default function cartReducer(state = initialState, action) {

    if (action.type === 'ADD_TO_CART') {

        if (action.payload.price === undefined){
            return state
        }
        
        if (!state.items.has(action.payload)) {
            return {
                items: state.items.set(action.payload, 1),
                total: state.total + action.payload.price
            }
        } else {
            return {
                items: state.items.update(action.payload, (value) => {
                    return value = value + 1;
                }),
                total: state.total + action.payload.price
            }
        }

        return state

    } else if (action.type === 'REMOVE_FROM_CART') {

        if (state.items.get(action.payload) === 1) {
            return {
                items: state.items.remove(action.payload),
                total: state.total - action.payload.price
            }
        }

        return {
            items: state.items.update(action.payload, (value) => {
                return value = value - 1
            }),
            total: state.total - action.payload.price
        }
    }

    if (action.type === 'CLEAR_CART') {
        return initialState
    }

    return state
}