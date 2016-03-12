import React from 'react'
import '../styles/ImageTile.scss'

export default class ImageTile extends React.Component {

  static propTypes = {
    image: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    description: React.PropTypes.number
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
