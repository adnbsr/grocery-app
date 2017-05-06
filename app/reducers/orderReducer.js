/**
 * Created by adnanbasar on 04/05/2017.
 */

const initialState = {
    orderStatus: null
}

export default function orderReducer(state = initialState, action) {

    if (action.type === 'GIVE_ORDER') {
        return {
            orderStatus: 'given'
        }
    }

    if (action.type === 'CLEAR_ORDER') {
        return {
            orderStatus: null
        }
    }

    return state
}