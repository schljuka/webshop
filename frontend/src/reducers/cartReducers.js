import {
    ADD_TO_CART,
    REMOVE_ITEM_CART,
    SAVE_SHIPPING_INFO,
    RESET_CART
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [], shippingInfo: {} }, action) => {
    switch (action.type) {

        case ADD_TO_CART:
            const item = action.payload;

            const isItemExist = state.cartItems.find(elem => elem.product === item.product)

            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(elem => elem.product === item.product ?
                        item : elem)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        case REMOVE_ITEM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(elem => elem.product !== action.payload)
            }

        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload
            }

        case RESET_CART:
            return {
                ...state,
                cartItems: []
            }

        default:
            return state;
    }
}