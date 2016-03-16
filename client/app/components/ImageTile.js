import React, { PropTypes, Component } from 'react'
import '../styles/ImageTile.scss'

class ImageTile extends Component {

  static propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.number
  }

  render () {
    const { image, title, description } = this.props
    return (
      <div className="ImageTile col-1-2">
        <img src={image}></img>
        <h1>{title}</h1>
        <h3>STOKE rating: {description || '...'}</h3> 
      </div>
    )
  }
}

export default ImageTile