import defaultSpots from '../data/spots.json'
import { combineReducers } from 'redux'
import { 
  UPDATE_ACTIVITY_METRIC, 
  SELECT_SPOT,
  SET_SORT_PROP,
  SET_SORT_ORDER
} from '../actions/spots'

const spots = (state = defaultSpots, action) => {
  switch(action.type) {
    case UPDATE_ACTIVITY_METRIC:
      const index = state.findIndex(spot => spot.id === action.id)
      return [
        ...state.slice(0, index),
        spot(state[index], action),
        ...state.slice(index + 1)
      ]
    default:
      return state
  }
}

const spot = (state = {}, action) => {
  switch(action.type) {
    case UPDATE_ACTIVITY_METRIC:
      return {
        ...state,
        ...{ rating: action.rating }
      }
    default: 
      return state
  }
}

const selectedSpotId = (state = null, action) => {
  switch(action.type) {
    case SELECT_SPOT:
      return action.spotId
    default: 
      return state
  }
}

// TODO: compose sort reducers 
// {
//   prop: 'rating',
//   order: 'ascending'
// }
const sortProp = (state = 'rating', action) => {
  switch(action.type) {
    case SET_SORT_PROP:
      return action.prop
    default:
      return state
  }
}

const sortOrder = (state = 'descending', action) => {
  switch(action.type) {
    case SET_SORT_ORDER:
      return action.order
    default:
      return state
  }
}

export default {
  spots,
  selectedSpotId,
  sortProp,
  sortOrder
}

