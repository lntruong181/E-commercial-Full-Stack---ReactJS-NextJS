import {ACTIONS} from './Actions'

const reducers = (state, action) => {
    switch(action.type){
        case ACTIONS.NOTIFY:
            return {
                ...state,
                notify: action.payload
            };
        case ACTIONS.AUTH:
            return {
                ...state,
                auth: action.payload
            };
        case ACTIONS.ADD_CART:
            return {
                ...state,
                cart: action.payload
            };
        case ACTIONS.ADD_MODAL:
<<<<<<< HEAD
                return {
                    ...state,
                    modal: action.payload
                };
=======
            return {
                ...state,
                modal: action.payload
            };
        case ACTIONS.ADD_ORDERS:
            return {
                ...state,
                orders: action.payload
            };
>>>>>>> 56d01981be8e90878dc0a26a149f50334312155f
        default:
            return state;
    }
}
export default reducers