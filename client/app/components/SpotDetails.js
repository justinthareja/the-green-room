import React from 'react'
import SpotForecast from './SpotForecast'
import SpotTweets from './SpotTweets'
import GoogleMap from './GoogleMap'
import { connect } from 'react-redux'
import { 
  fetchAllSpotTweets, 
  fetchConditionsIfNeeded,
  selectSpot
 } from '../actions/index'
 import '../styles/SpotDetails.scss'

class SpotDetails extends React.Component {

  componentWillMount() {
    const { params, dispatch } = this.props
    const spotId = parseInt(params.spotId)

    dispatch(selectSpot(spotId))
    dispatch(fetchConditionsIfNeeded(spotId))
    dispatch(fetchAllSpotTweets(spotId))
  }

  render() {
    const { spot, conditions, tweets } = this.props

    return (
      <div className="SpotDetails">
        <div className='row clearfix'>
          {spot.name && conditions.items.length ? 
            <SpotForecast 
              name={spot.name} id={spot.id}
              conditions={conditions.items} 
              lastUpdated={conditions.lastUpdated}/> : 
            <div>Spinner...</div>
          }
        </div>
        <div className='row clearfix'>
          <div className='col-2-3'>
            {spot.longitude && spot.latitude ?
              <GoogleMap 
              center={{
                lat: parseFloat(spot.latitude),
                lng: parseFloat(spot.longitude)
              }}
              markerLabel={spot.name}/> :
              <div>Spinner...</div>
              
            }
          </div>
          <div className='col-1-3'>
            {tweets.length ? 
              <SpotTweets tweets={tweets}/> :
              <div>Spinner...</div>
            }
          </div>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  const { spots, selectedSpotId, conditionsById, tweetsByHashtag } = state
  const spot = spots.filter(spot => spot.id === selectedSpotId)[0] || {}


  let tweets = spot.hashtags || []

  if (tweets.length > 0) {
    tweets = tweets
      .map(hashtag => tweetsByHashtag[hashtag] || {
        items: [] 
      })
      .map(results => results.items)
      .reduce((results, tweets) => [
        ...results, 
        ...tweets
      ])
  }

  tweets = tweets.sort((a, b) =>
    new Date(b.createdAt) - new Date(a.createdAt))

  const conditions = spot.id && conditionsById[spot.id] || {
    isFetching: true,
    items: []
  }

  return {
    spot,
    conditions,
    tweets
  }
}

export default connect(mapStateToProps)(SpotDetails)