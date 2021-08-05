import axios from 'axios';
import { cartActionType } from '../types/cart.type';

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
  console.log('hello11');
  dispatch({ type: cartActionType.REMOVE_FROM_CART, payload: id });
};
