import { cartActionType } from '../types/cart.type';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case cartActionType.ADD_TO_CART:
      const item = action.payload;
      const existItem = state.cartItems.find(
        (el) => el.product === item.product
      );

      if (existItem) {
        const cartItems = state.cartItems.map((el) =>
          el.product === existItem.product ? item : existItem
        );
        console.log(cartItems);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        return {
          ...state,
          cartItems: cartItems,
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }

    case cartActionType.REMOVE_FROM_CART:
      console.log(action.payload);
      const cartItems = state.cartItems.filter(
        (item) => item.product !== action.payload
      );
      console.log(cartItems);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return {
        ...state,
        cartItems: cartItems,
      };

    default:
      return state;
  }
};
