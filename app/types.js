/**
 * Created by adnanbasar on 28/04/2017.
 * @flow
 */


export type Category = {
    id: string,
    name: string
}

export type Product = {
    id: string,
    name: string,
    price: number,
    thumbnail: string,
    category: Category
}

//Abstract Drawer Item Type
export type IItem = {
    type: string,
    label: string
}