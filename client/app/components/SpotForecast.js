import React, { PropTypes, Component } from 'react'
import getCurrent from '../helpers/getCurrentConditions'
import StarRating from './StarRating'
import Compass from './Compass'
import '../styles/SpotForecast.scss'

class SpotForecast extends Component {

  static propTypes = {
    conditions: PropTypes.arrayOf(PropTypes.shape({
      swellHeight: PropTypes.number.isRequired,
      swellPeriod: PropTypes.number.isRequired,
      swellDirection: PropTypes.number.isRequired,
      swellCompassDirection: PropTypes.string.isRequired,
      swellUnit: PropTypes.string.isRequired,
      windSpeed: PropTypes.number.isRequired,
      windDirection: PropTypes.number.isRequired,
      windCompassDirection: PropTypes.string.isRequired,
      windUnit: PropTypes.string.isRequired,
      solidRating: PropTypes.number.isRequired,
      fadedRating: PropTypes.number.isRequired,
    })).isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    lastUpdated: PropTypes.number
  }

  getMagicSeaweedUrl() {
    return `http://magicseaweed.com/${this.props.name}-Surf-Report/${this.props.id}/`
  }

  render () {

    const { 
      swellHeight, swellPeriod, swellDirection, swellUnit, swellCompassDirection,
      windSpeed, windDirection, windUnit, windCompassDirection, 
      timestamp, solidRating, fadedRating
    } = getCurrent(this.props.conditions)

    const lastUpdated = new Date(this.props.lastUpdated).toLocaleString()
    const forecastReported = new Date(timestamp * 1000).toLocaleString()

    return (
      // TODO: abstract into a separate spot forecast, so this component can easily look into the future
      <div className='SpotForecast'>
        <div className='header'> 
          <h1>Current Forecast for {this.props.name} </h1>
          <p>Last update: {lastUpdated}</p>
          <h3>Magic Seaweed Star Rating</h3>
          <StarRating solidRating={solidRating} fadedRating={fadedRating} />
          <p><a href={this.getMagicSeaweedUrl()}>See more...</a></p>
        </div>
        <div className='col-1-2'>
          <h1>Swell Breakdown</h1>
          <div className='breakdown'>
            <p>height: {swellHeight} {swellUnit}</p>
            <p>period: {swellPeriod} sec</p>
            <p>direction: {swellCompassDirection}</p>
          </div>
          <Compass direction={swellDirection} />
        </div>
          <div className='col-1-2'>
            <h1>Wind Breakdown</h1>
            <div className='breakdown'>
              <p>speed: {windSpeed} {windUnit} </p>
              <p>direction: {windCompassDirection}</p>
            </div>
            <Compass direction={windDirection} />
          </div>
      </div>
    )

  }


}

export default SpotForecast