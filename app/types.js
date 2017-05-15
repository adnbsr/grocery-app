/**
 * Created by adnanbasar on 28/04/2017.
 * @flow
 */

type ParseObject = Object

export type Category = {
    id: string,
    name: string,
    thumbnail?: string
}

export type Product = {
    id: string,
    name: string,
    price: number,
    thumbnail: string,
    category: Category,
    offer?: boolean
}

export type DrawerAbstractItem = {
    type: string,
    label: string
}

export type Action = { type: 'FETCH_PRODUCTS', list: Array<ParseObject> }
    | { type: 'SEARCH_PRODUCTS', list: Array<ParseObject> }
    | { type: 'FETCH_CATEGORIES', list: Array<ParseObject> }
    | { type: 'ADD_TO_CART', product: Product }
    | { type: 'REMOVE_FROM_CART', product: Product }
    | { type: 'CLEAR_CART' }


export type Dispatch = (action: Action) => any;


//Map Types

export type Region = {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number
}

export type Point = {
    latitude: number,
    longitude: number
}