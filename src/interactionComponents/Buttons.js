import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editFields, solveSudoku } from '../reduxHelpers/actions'

const mapStateToProps = state => ({
  isEditing: state.isEditing
})

class Buttons extends Component {
  render () {
    const {
      isEditing,
      editFields,
      solveSudoku
    } = this.props
    return (
      <div className='button-container'>
        <button className='edit-btn' onClick={editFields}>Edit Fields</button>
        <button className='solve-btn' onClick={solveSudoku} disabled={isEditing}>Solve Now</button>
      </div>
    )
  }
}
export default connect(mapStateToProps, { editFields, solveSudoku })(Buttons)
