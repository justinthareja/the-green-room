import React, { PropTypes, Component } from 'react'

class SearchBar extends Component {

  static propTypes = {
    onUserInput: PropTypes.func.isRequired
  }

  render () {
    const { onUserInput } = this.props

    return (
      <input 
        type='text' 
        placeholder='filter by name...'
        onChange={(e) => onUserInput(e.target.value)}
      >
      </input>
    )
  }

}

export default SearchBar