import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS
} from '../actions/user'


// TODO: add utility for expiration
const user = (state = {
  isFetching: false,
  isAuthenticated: !!localStorage.getItem('token'),
  token: localStorage.getItem('token') 
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
        ...action.response.user,
        ...{
          isFetching: false,
          isAuthenticated: true,
          token: action.response.token
        }
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        ...{
          isFetching: false,
          isAuthenticated: false,
          errorMessage: action.error
        }
      }
    default:
      return state
  }
}

export default user