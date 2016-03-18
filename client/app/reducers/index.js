import { combineReducers } from 'redux'
import conditionsById from './conditionsById'
import spots from './spots'
import tweetsByHashtag from './tweetsByHashtag'
import user from './user'

export default combineReducers({
  ...spots,
  user,
  conditionsById,
  tweetsByHashtag
})

