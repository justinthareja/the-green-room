import React, { PropTypes, Component } from 'react'

class Picker extends Component {

  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.string.isRequired).isRequired,
    onOptionSelect: PropTypes.func.isRequired
  }

  render () {
    const { options, onOptionSelect } = this.props
    return (
      <select onChange={(e) => onOptionSelect(e.target.value)} name="picker">
        {
          options.map(option => 
            <option key={option}value={option}>{option}</option>
          )
        }
      </select>
    )
  }
}

export default Picker