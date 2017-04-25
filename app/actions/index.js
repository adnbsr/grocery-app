import Parse from 'parse/react-native'
import {InteractionManager} from 'react-native'

const Product = Parse.Object.extend('Product')

loadParseQuery = (type, query) => {
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

export const addToCart = (item) => {
  return {
    type: 'ADD_TO_CART',
    payload: item
  }
}

export const fetchProducts = () => {
  return loadParseQuery('FETCH_PRODUCTS', new Parse.Query(Product))
}
