import { fetchConditionsIfNeeded } from './conditions'
import { fetchTweetsIfNeeded, fetchAllSpotTweets } from './tweets'
import { 
  selectSpot, 
  calculateActivityRating, 
  setSortProp, 
  setSortOrder, 
  setVisibilityFilter 
} from './spots'

const load = () => {
  return (dispatch, getState) => {

    getState().spots.forEach(spot =>
      // fetch conditions and tweets with relevent hashtags
      Promise.all([
        dispatch(fetchConditionsIfNeeded(spot.id)),
        dispatch(fetchAllSpotTweets(spot.id))
      ])
      // calculate activity rating
      .then(() => {
        dispatch(calculateActivityRating(spot))
      })
    )
  }

}

export { 
  load,
  selectSpot,
  setSortProp,
  setSortOrder,
  setVisibilityFilter,
  fetchConditionsIfNeeded, 
  fetchTweetsIfNeeded,
  fetchAllSpotTweets
}

export { loginUser } from './user'