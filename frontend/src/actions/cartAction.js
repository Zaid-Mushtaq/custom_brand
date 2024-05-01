// Att to Cart
import {
  ADD_TO_CART,
  UPDATE_CART_ITEM,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
  UPDATE_BILLING_INFO,
  RESET_CART,
} from "../constants/cartConstant.js";
import axios from "axios";

export const addItemsToCart = (itemData) => async (dispatch, getState) => {
  let { id, selectedSize, selectedColor, stockId, quantity, totalQuantity } =
    itemData;

  const { data } = await axios.get(`/api/v1/product/${id}`);

  if (!stockId) {
    if (selectedSize && selectedColor) {
      const matchingStock = data.product.stock.find(
        (item) => item.color === selectedColor && item.size === selectedSize
      );

      if (matchingStock) {
        stockId = matchingStock._id;
        totalQuantity = matchingStock.quantity;
      } else {
        stockId = "";
      }
    }
  }

  const newItem = {
    productId: id,
    name: data.product.name,
    price: data.product.price,
    image: data.product.images[0].url,
    stock: data.product.stock,
    category: data.product.category,
    totalQuantity,
    stockId,
    selectedSize,
    selectedColor,
    quantity,
  };

  const existingItemIndex = getState().cart.cartItems.findIndex(
    (item) =>
      item.productId === newItem.productId && item.stockId === newItem.stockId
  );

  if (existingItemIndex !== -1) {
    let updatedQuantity = "";
    if (quantity >= 1) {
      updatedQuantity = getState().cart.cartItems[existingItemIndex].quantity =
        quantity;
    }

    if (updatedQuantity <= totalQuantity) {
      dispatch({
        type: UPDATE_CART_ITEM,
        payload: {
          index: existingItemIndex,
          quantity: updatedQuantity,
        },
      });
    }
  } else {
    dispatch({
      type: ADD_TO_CART,
      payload: {
        item: newItem,
      },
    });
  }

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//Remove From Cart
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//RSET Cart

export const resetCart = () => async (dispatch) => {
  dispatch({
    type: RESET_CART,
  });

  // Optionally, clear the cart items from local storage as well
  localStorage.removeItem("cartItems");
};

//SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};

// billingActions.js
export const updateBillingInfo = (data) => async (dispatch) => {
  dispatch({
    type: UPDATE_BILLING_INFO,
    payload: data,
  });
  sessionStorage.setItem("billingFormData", JSON.stringify(data));
};
