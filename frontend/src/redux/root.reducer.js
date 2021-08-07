import { combineReducers } from 'redux';
import {
  productDetailReducer,
  productListReducer,
} from './reducer/product.reducer';
import { cartReducer } from './reducer/cart.reducer';
import { loginReducer } from './reducer/user.reducer';

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  userLogin: loginReducer,
});

export default rootReducer;
