import React, { PropTypes, Component } from 'react'


class StarRating extends Component {

  static propTypes = {
    solidRating: PropTypes.number.isRequired,
    fadedRating: PropTypes.number.isRequired
  }

  static defaultProps = {
    solidStar: "http://cdnimages.magicseaweed.com/star_filled.png",
    fadedStar: "http://cdnimages.magicseaweed.com/star_empty.png"
  }

  render () {

    const { solidStar, solidRating, fadedStar, fadedRating } = this.props
    let rating = []

    for (let i = 0; i < solidRating; i++) {
      rating.push(<img key={i + Math.random()} src={solidStar} />)
    }

    for (let i = 0; i < fadedRating; i++) {
      rating.push(<img key={i + Math.random()} src={fadedStar} />)
    }

    return (
      <div className='StarRating'>
        { rating }
      </div>
    )
  }
}

export default StarRating