import React from 'react'
import ImageTile from './ImageTile'
import { Link } from 'react-router'

export default class ImageTileList extends React.Component {

  static propTypes = {
    spots: React.PropTypes.array.isRequired
  }

  render () {

    const { spots } = this.props

    return (
      <div className="ImageTileList row clearfix">
        {
          spots.map(spot => 
            <Link to={{ pathname: `/details/${spot.id}`}}>
              <ImageTile
                key={spot.cover + Math.random()} 
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

