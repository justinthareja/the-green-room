import React from 'react'
import { connect } from 'react-redux'
import { setSortProp, setSortOrder, load } from '../actions/index'
import Picker from './Picker'
import ImageTileGrid from './ImageTileGrid'
import '../styles/SpotOverview.scss'

class SpotOverview extends React.Component {

  componentWillMount() {
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
    }
  }
}


export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(SpotOverview)