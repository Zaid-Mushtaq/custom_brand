// cartReducer.js
import {
  ADD_TO_CART,
  UPDATE_CART_ITEM,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
  UPDATE_BILLING_INFO,
  RESET_CART,
} from "../constants/cartConstant.js";

export const cartReducer = (
  state = {
    cartItems: [],
    shippingInfo: {},
    billingInfo: {},
  },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload.item],
      };
    case UPDATE_CART_ITEM:
      const { index, quantity } = action.payload;
      const updatedCartItems = [...state.cartItems];
      updatedCartItems[index].quantity = quantity;
      return {
        ...state,
        cartItems: updatedCartItems,
      };
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.stockId != action.payload),
      };
    case RESET_CART:
      return {
        ...state,
        cartItems: [],
      };
    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };
    case UPDATE_BILLING_INFO:
      return {
        ...state,
        billingInfo: action.payload,
      };

    default:
      return state;
  }
};
