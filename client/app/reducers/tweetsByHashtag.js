import { REQUEST_TWEETS, RECEIVE_TWEETS } from '../actions/tweets'

const tweetsByHashtag = (state = {}, action) => {
  switch(action.type) {
    case REQUEST_TWEETS:
    case RECEIVE_TWEETS:
    const { hashtag } = action.options
      let nextState = {}
      nextState[hashtag] = tweets(state[hashtag] , action)
      return {
        ...state,
        ...nextState
      }
    default: 
      return state
  }
}

const tweets = (state = {
  isFetching: false,
  items: {}
}, action) => {
  switch(action.type) {
    case REQUEST_TWEETS:
      return {
        ...state,
        ...{ 
          isFetching: true,
          items: {} 
        }
      } 
    case RECEIVE_TWEETS:
      return {
        ...state, 
        ...{
          isFetching: false,
          items: action.response,
          lastUpdated: action.receivedAt
        }
      }
    default:
      return state
  }
}

export default tweetsByHashtag