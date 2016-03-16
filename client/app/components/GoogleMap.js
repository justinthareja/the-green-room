import React, { PropTypes, Component } from 'react'
import loadMapsAPI from '../helpers/loadMapsApi'
import '../styles/GoogleMap.scss'

class GoogleMap extends Component {

  static propTypes = {
    zoom: PropTypes.number.isRequired,
    center: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired
    }).isRequired,
    markerLabel: React.PropTypes.string
  }

  static defaultProps = {
    zoom: 8
  }

  componentDidMount () {
    const { center, zoom, markerLabel } = this.props

    loadMapsAPI()
      .then(() => {
        const map = new google.maps.Map(this._map, {
          center: center,
          zoom: zoom
        })
        const marker = new google.maps.Marker({
          title: markerLabel || 'marker',
          position: center,
          map: map
        })
        this.setState({ 
          map: map 
        })
      })
      .catch(err => { 
        throw err 
      })
  }

  render() {
    return (
      <div ref={node => this._map = node} className='GoogleMap'></div>
    )
  }
}

export default GoogleMap