import React, { PropTypes, Component } from 'react'
import ImageTile from './ImageTile'
import { Link } from 'react-router'

class ImageTileList extends Component {

  static propTypes = {
    spots: PropTypes.array.isRequired
  }

  render () {

    const { spots } = this.props

    return (
      <div className="ImageTileList row clearfix">
        {
          spots.map(spot => 
            <Link key={spot.cover + Math.random()} to={{ pathname: `/details/${spot.id}`}}>
              <ImageTile
                image={spot.cover} 
                title={spot.name} 
                description={spot.rating}
              />
            </Link>
          )
        }
      </div>
    )
  }
}

export default ImageTileList