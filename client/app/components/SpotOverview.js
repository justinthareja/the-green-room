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
            options={['rating', 'name']} 
            onOptionSelect={handlePropChange} 
          />
          <span>Order:</span>
          <Picker value={sortOrder}
            options={['descending', 'ascending']} 
            onOptionSelect={handleOrderChange} 
          />
        </div>
        <ImageTileGrid spots={spots} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { spots, sortProp, sortOrder } = state

  spots = spots.sort((a, b) => 
    sortOrder === 'descending' ? b[sortProp] > a[sortProp] : b[sortProp] < a[sortProp])

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