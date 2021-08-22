import { combineReducers } from 'redux';
import {
  productDetailReducer,
  productListReducer,
} from './reducer/product.reducer';
import { cartReducer } from './reducer/cart.reducer';
import {
  loginReducer,
  updateProfileReducer,
  userListReducer,
} from './reducer/user.reducer';
import {
  orderDetailReducer,
  orderListReducer,
  orderReducer,
} from './reducer/order.reducer';

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  userLogin: loginReducer,
  updateProfile: updateProfileReducer,
  order: orderReducer,
  orderDetail: orderDetailReducer,
  orderList: orderListReducer,
  userList: userListReducer,
});

export default rootReducer;
