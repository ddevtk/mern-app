import productActionType from '../type/product.type';

export const productListReducer = (
  state = { products: [], isLoading: false, error: null, length: 1 },
  action
) => {
  switch (action.type) {
    case productActionType.GET_ALL_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case productActionType.GET_ALL_PRODUCT_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
        length: action.payload.allProduct,
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

export const updateProductReducer = (state = {}, action) => {
  switch (action.type) {
    case productActionType.UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case productActionType.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload,
        isLoading: false,
        isSuccess: true,
      };

    case productActionType.UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case productActionType.UPDATE_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};
