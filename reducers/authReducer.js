const initialState = {
  access_token: null,
  refresh_token: null,
  error: null,
  isAuthenticated: false,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        access_token: action.payload.access_token,
        refresh_token: action.payload.refresh_token,
        error: null,
        isAuthenticated: true
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        access_token: null,
        refresh_token: null,
        error: action.payload,
        isAuthenticated: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        access_token: null,
        refresh_token: null,
        error: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
