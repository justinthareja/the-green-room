import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Picker from './Picker'
import ImageTileGrid from './ImageTileGrid'
import '../styles/SpotOverview.scss'
import { 
  setSortProp, 
  setSortOrder, 
  load,
  selectSpot
} from '../actions/index'

class SpotOverview extends Component {

  static propTypes = {
    initializeSpotData: PropTypes.func.isRequired,
    handlePropChange: PropTypes.func.isRequired,
    handleOrderChange: PropTypes.func.isRequired,
    spots: PropTypes.arrayOf(PropTypes.shape({
      cover: PropTypes.string.isRequired,
      hashtags: PropTypes.array.isRequired,
      id: PropTypes.number.isRequired,
      latitude: PropTypes.string.isRequired,
      longitude: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      rating: PropTypes.number
    }).isRequired).isRequired,
    sortProp: PropTypes.string.isRequired,
    sortOrder: PropTypes.string.isRequired
  }


  componentWillMount() {
    this.props.resetSelectedSpot()
    this.props.initializeSpotData()
  }

  render () {
    const { 
      handlePropChange, handleOrderChange, 
      spots, sortProp, sortOrder 
    } = this.props
   
    return (
      <div className='SpotOverview'>
        <div>
          <span>Sort by:</span>
          <Picker value={sortProp}
            options={['name', 'rating']} 
            onOptionSelect={handlePropChange} 
          />
          <span>Order:</span>
          <Picker value={sortOrder}
            options={['ascending', 'descending']} 
            onOptionSelect={handleOrderChange} 
          />
        </div>
        <ImageTileGrid spots={spots} />
      </div>
    )
  }
}


const compare = (key, order, type) => {
  const on = {
    number(a, b) {
      a = a[key]
      b = b[key]
      if (order === 'descending') {
        return b - a
      } else if (order === 'ascending') {
        return a - b
      } else {
        throw new Error('invalid order for compare numbers')
      }
    },
    string(a,b) {
      a = a[key].toLowerCase()
      b = b[key].toLowerCase()
      if (order === 'descending') {
        return b.localeCompare(a)
      } else if (order === 'ascending') {
        return a.localeCompare(b)
      } else {
        throw new Error('invalid order for compareStrings')
      }
    }
  }

  return on[type]
}


const mapStateToProps = (state) => {
  let { spots, sortProp, sortOrder } = state
  // TODO: shape the sort state properly
  const propType = typeof spots[0][sortProp]

  spots = spots.sort(compare(sortProp, sortOrder, propType))

  return {
    spots,
    sortProp,
    sortOrder
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handlePropChange(value) {
      dispatch(setSortProp(value))
    },
    handleOrderChange(value) {
      dispatch(setSortOrder(value))
    },
    initializeSpotData() {
      dispatch(load())
    },
    resetSelectedSpot() {
      dispatch(selectSpot(null))
    }
  }
}


export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(SpotOverview)