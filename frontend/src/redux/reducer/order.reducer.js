import { orderActionType } from '../type/order.type';

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case orderActionType.ADD_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case orderActionType.ADD_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        order: action.payload,
        isSuccess: true,
      };

    case orderActionType.ADD_ORDER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'EMPTY_STATE':
      return {
        order: state.order,
      };
    default:
      return state;
  }
};
