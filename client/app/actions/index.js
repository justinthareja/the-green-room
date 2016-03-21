import { fetchConditionsIfNeeded } from './conditions'
import { fetchAllSpotTweets } from './tweets'
import { calculateActivityRating } from './spots'


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

export { load }
export { fetchTweetsIfNeeded, fetchAllSpotTweets } from './tweets'
export { fetchConditionsIfNeeded } from './conditions'
export { loginUser, updateUserError, logoutUser } from './user'
export { selectSpot, setSortProp, setSortOrder, setVisibilityFilter } from './spots'