import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS
} from '../actions/user'


// TODO: add utility for expiration
const user = (state = {
  isFetching: false,
  isAuthenticated: !!localStorage.getItem('token') 
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
        ...action.response,
        ...{
          isFetching: false,
          isAuthenticated: true
        }
      }
    case LOGIN_FAILURE:
      return {
        ...stat,
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