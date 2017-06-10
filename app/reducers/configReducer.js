/**
 * Created by adnanbasar on 07/06/2017.
 */

type State = {
    expressFee: number
}

const initialState = {
    expressFee: 0
}

export default function configReducer(state: State = initialState, action){

    if (action.type === 'LOAD_CONFIG') {
        const {config} = action
        return {...state, expressFee: config.get('expressFee')}
    }

    return state
}