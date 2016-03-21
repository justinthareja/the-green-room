import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, 
  LOGOUT_SUCCESS, LOGOUT_FAILURE, SET_USER_ERROR
} from '../actions/user'


// TODO: add utility for expiration
const user = (state = {
  isFetching: false,
  isAuthenticated: !!localStorage.getItem('token'),
  token: localStorage.getItem('token') || null,
  message: ""
}, action) => {
  switch(action.type) {
    case LOGIN_REQUEST: 
      return {
        ...state,
        ...{
          isFetching: true,
          isAuthenticated: false
        }
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...{
          isFetching: false,
          isAuthenticated: true,
          token: action.payload.token,
          message: "successfully logged in"
        }
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        ...{
          isFetching: false,
          isAuthenticated: false,
          message: action.payload.response.error
        }
      }
    case SET_USER_ERROR:
      return {
        ...state,
        ...{
          message: action.error
        }
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        message: 'Successfully logged out'
      }
    case LOGOUT_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        message: action.error
      }
    default:
      return state
  }
}

export default user