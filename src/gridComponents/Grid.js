import React, { Component } from 'react'
import Cell from './Cell'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  valueMatrix: state.valueMatrix
})

class Grid extends Component {
  getCells () {
    return this.props.valueMatrix.map((row, rowIndex) => {
      const rowHtm = row.map((cellValue, colIndex) => {
        return <Cell row={rowIndex} col={colIndex} key={`${rowIndex}-${colIndex}`} />
      })
      return (
        <div key={`row-${rowIndex}`} className='sudoku-row'>{rowHtm}</div>
      )
    })
  }
  render () {
    return (
      <div className='sudoku-container'>
        {this.getCells()}
      </div>
    )
  }
}
export default connect(mapStateToProps)(Grid)
