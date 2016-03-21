import { REQUEST_CONDITIONS, RECEIVE_CONDITIONS, FAILED_CONDITIONS } from '../actions/conditions'

const conditionsById = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_CONDITIONS:
    case REQUEST_CONDITIONS: 
    const { spotId } = action.payload
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
          items: action.payload.conditions,
          lastUpdated: new Date()
        }
      }
    case FAILED_CONDITIONS:
      return {
        ...state,
        ...{
          isFetching: false,
          items: [],
          error: action.payload.message
        }
      }
    default:
      return state
  }
}

export default conditionsById