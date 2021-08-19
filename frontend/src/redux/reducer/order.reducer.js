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
export const orderDetailReducer = (state = { isLoading: true }, action) => {
  switch (action.type) {
    case orderActionType.ORDER_DETAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case orderActionType.ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        order: action.payload,
        isSuccess: true,
      };

    case orderActionType.ORDER_DETAIL_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export const orderListReducer = (state = { isLoading: true }, action) => {
  switch (action.type) {
    case orderActionType.ORDER_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case orderActionType.ORDER_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orderList: action.payload,
        isSuccess: true,
      };

    case orderActionType.ORDER_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
