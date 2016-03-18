import fetch from 'isomorphic-fetch'

const BASE_URL = '/api'

const identity = (x) => x

const callApi = (options, authenticated) => {

  const { method, body, endpoint } = options
  const url = BASE_URL + endpoint
  const token = localStorage.getItem('token') || null

  const config = { 
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }

  // append authorization header 
  if (authenticated) {
    if(token) {
      config.headers['Authorization'] = `Bearer ${token}`
    } else {
      throw new Error('No token found for authenicated request')
    }
  }

  return fetch(url, config)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed request type ${method} to ${url}`)
      }
      return response.json()
    })

}

export const CALL_API = Symbol('Call API')

export default store => next => action => {
  
  const callAPI = action[CALL_API]

  // skip actions that are not api requests
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { options, types, authenticated, onSuccess } = callAPI

  const [ requestType, successType, errorType ] = types
  
  // default to just returning the response onSuccess
  onSuccess = onSuccess || identity

  // dispatch request action
  next({ 
    options: action.reducerOptions,
    type: requestType 
  })

  return callApi(options, authenticated)
    // execute any side effects / mapping before passing to the reducer
    .then(response => onSuccess(response))
    // dispatch success action
    .then(response => next({
      authenticated,
      response,
      options: action.reducerOptions,
      receivedAt: Date.now(),
      type: successType
    }))
    // dispatch error action
    .catch(error => next({
      error: error.message || 'API middleware blew up',
      type: errorType
    }))
}

