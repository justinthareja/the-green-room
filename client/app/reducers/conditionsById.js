import { REQUEST_CONDITIONS, RECEIVE_CONDITIONS } from '../actions/conditions'

const conditionsById = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_CONDITIONS:
    case REQUEST_CONDITIONS:
      const { spotId } = action.options 
      return {
        ...state,
        ...{
          [spotId]: conditions(state[spotId], action)
        }
      }
    default:
      return state
  }
}

const conditions = (state = {
  isFetching: false,
  items: []
}, action) => {
  switch (action.type) {
    case REQUEST_CONDITIONS:
      return {
        ...state,
        ...{ 
          isFetching: true,
          items: [] 
        }
      }
    case RECEIVE_CONDITIONS:
      return {
        ...state,
        ...{
          isFetching: false,
          items: action.response,
          lastUpdated: action.receivedAt
        }
      }
    case FAILED_CONDITIONS:
      return {
        ...state,
        ...{
          isFetching: false,
          items: [],
          errorMessage: action.error
        }
      }
    default:
      return state
  }
}

export default conditionsById