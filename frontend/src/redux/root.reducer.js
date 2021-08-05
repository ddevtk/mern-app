import { combineReducers } from 'redux';
import {
  productDetailReducer,
  productListReducer,
} from './reducer/product.reducer';
import { cartReducer } from './reducer/cart.reducer';

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
});

export default rootReducer;
