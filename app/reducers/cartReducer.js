//@flow

import type {Product, Action} from '../types'
import {Map} from 'immutable'

const initialState = {
    items: Map(),
    total: 0
}

type State = {
    items: Map<Product, number>,
    total: number
}

export default function cartReducer(state: State = initialState, action: Action) {

    if (action.type === 'ADD_TO_CART') {

        const {product} = action;

        if (product.price === undefined){
            return state
        }
        
        if (!state.items.has(product)) {
            return {
                items: state.items.set(product, 1),
                total: state.total + product.price
            }
        } else {
            return {
                items: state.items.update(product, (value) => {
                    return value = value + 1;
                }),
                total: state.total + product.price
            }
        }
    }

    if (action.type === 'REMOVE_FROM_CART') {

        const {product} = action

        if (state.items.get(product) === 1) {
            return {
                items: state.items.remove(product),
                total: state.total - product.price
            }
        }

        return {
            items: state.items.update(product, (value) => {
                return value = value - 1
            }),
            total: state.total - product.price
        }
    }

    if (action.type === 'CLEAR_CART') {
        return initialState
    }

    return state
}