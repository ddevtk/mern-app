import userActionType from '../type/user.type';

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case userActionType.LOGIN_REQUEST:
    case userActionType.REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case userActionType.LOGIN_SUCCESS:
    case userActionType.REGISTER_SUCCESS:
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    case userActionType.LOGIN_ERROR:
    case userActionType.REGISTER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case userActionType.LOGOUT:
      window.location.href = '/';
      return {};
    case userActionType.EMPTY_STATE:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
export const updateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case userActionType.UPDATE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case userActionType.UPDATE_SUCCESS:
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        user: action.payload,
      };
    case userActionType.UPDATE_ERROR:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        error: action.payload,
      };
    case userActionType.REFRESH:
      return {
        user: JSON.parse(localStorage.getItem('uerInfo')),
      };
    default:
      return state;
  }
};

export const userListReducer = (state = {}, action) => {
  switch (action.type) {
    case userActionType.USER_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case userActionType.USER_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        userList: action.payload,
      };
    case userActionType.USER_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export const singleUserReducer = (state = {}, action) => {
  switch (action.type) {
    case userActionType.GET_USER_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case userActionType.GET_USER_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        user: action.payload,
      };
    case userActionType.GET_USER_BY_ID_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const updateUserReducer = (state = {}, action) => {
  switch (action.type) {
    case userActionType.UPDATE_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case userActionType.UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
      };
    case userActionType.UPDATE_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        error: action.payload,
      };
    case userActionType.REFRESH:
      return {};
    default:
      return state;
  }
};
