import axios from 'axios';
import { cartActionType } from '../type/cart.type';

export const addToCart = (id, qty) => async (dispatch) => {
  const { data } = await axios(`/api/products/${id}`);

  dispatch({
    type: cartActionType.ADD_TO_CART,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty: +qty,
    },
  });
};

export const removeFromCart = (id) => (dispatch) => {
  dispatch({ type: cartActionType.REMOVE_FROM_CART, payload: id });
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: cartActionType.SAVE_SHIPPING_ADDRESS, payload: data });
};

export const clearCart = () => (dispatch) => {
  dispatch({ type: cartActionType.CLEAR_CART });
};
