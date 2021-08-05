import productActionType from '../types/product.type';

export const productListReducer = (
  state = { products: [], isLoading: false, error: null },
  action
) => {
  switch (action.type) {
    case productActionType.GET_ALL_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case productActionType.GET_ALL_PRODUCT_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        products: action.payload,
        isLoading: false,
        error: null,
      };

    case productActionType.GET_ALL_PRODUCT_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const productDetailReducer = (
  state = { product: {}, isLoading: false, error: null },
  action
) => {
  switch (action.type) {
    case productActionType.GET_PRODUCT_DETAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case productActionType.GET_PRODUCT_DETAIL_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        product: action.payload,
        isLoading: false,
        error: null,
      };

    case productActionType.GET_PRODUCT_DETAIL_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
