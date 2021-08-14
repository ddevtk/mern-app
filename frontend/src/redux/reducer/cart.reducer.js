import { cartActionType } from '../type/cart.type';

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
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        return {
          ...state,
          cartItems: cartItems,
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }

    case cartActionType.REMOVE_FROM_CART:
      const cartItems = state.cartItems.filter(
        (item) => item.product !== action.payload
      );
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return {
        ...state,
        cartItems: cartItems,
      };

    case cartActionType.SAVE_SHIPPING_ADDRESS:
      localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case cartActionType.SAVE_PAYMENT_METHOD:
      localStorage.setItem('paymentMethod', JSON.stringify(action.payload));
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case cartActionType.CLEAR_CART:
      return { cartItems: [] };

    default:
      return state;
  }
};
