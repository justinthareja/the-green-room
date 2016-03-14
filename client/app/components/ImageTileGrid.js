import React from 'react' 
import ImageTileList from './ImageTileList'

export default class ImageTileGrid extends React.Component {

  static propTypes = {
    spots: React.PropTypes.array.isRequired
  }

  createRows(array, length) {
    return array.reduce((memo, spot) => {
      const innerArray = memo[memo.length - 1]

      if (innerArray.length < length) {
        innerArray.push(spot)
        return memo
      } 

      memo.push([])
      memo[memo.length - 1].push(spot)
      return memo
    }, [[]])
  }

  render() {

    const { spots } = this.props
    const rows = this.createRows(spots, 2)

    return (
      <div className='ImageTileGrid'>
        {
          rows.map((row, i) => 
            <ImageTileList key={i + Math.random()} spots={row} />)
        }
      </div>
    )
  }
}