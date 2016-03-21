import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Picker from './Picker'
import ImageTileGrid from './ImageTileGrid'
import SearchBar from './SearchBar'
import '../styles/SpotOverview.scss'
import { 
  setSortProp, 
  setSortOrder, 
  load,
  selectSpot,
  setVisibilityFilter,
  loginUser,
  logoutUser
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
    this.props.resetVisibilityFilter()
    this.props.initializeSpotData()
  }

  render () {
    const { 
      handlePropChange, handleOrderChange, handleSearchInput, login, logout,
      spots, sortProp, sortOrder, user
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
        <SearchBar onUserInput={handleSearchInput}/>
        <button onClick={() => login({ 
          email: 'justin@gmail.com', 
          password: 'password'
        })}>login</button>
        <button onClick={() => logout()}>logout</button>
        {user.message &&
          <div className='error'>{user.message}</div>
        }
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

const getVisibleSpots = (spots, search) => {
  search = search.toLowerCase()
  return spots.filter(spot =>
    spot.name.toLowerCase().startsWith(search))
}

const mapStateToProps = (state) => {
  let { spots, sortProp, sortOrder, visibilityFilter, user } = state
  // TODO: shape the sort state properly
  const propType = typeof spots[0][sortProp]

  // update the sort of the spots
  spots = spots.sort(compare(sortProp, sortOrder, propType))
  // apply any filter to the spots if necessary
  spots = getVisibleSpots(spots, visibilityFilter)

  return {
    user,
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
    },
    handleSearchInput(value) {
      dispatch(setVisibilityFilter(value))
    },
    resetVisibilityFilter() {
      dispatch(setVisibilityFilter(''))
    },
    login(credentials) {
      dispatch(loginUser(credentials))
    },
    logout() {
      dispatch(logoutUser())
    }
  }
}


export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(SpotOverview)