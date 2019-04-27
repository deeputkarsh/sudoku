import React, { Component } from 'react'
import './styles/App.scss'
import Grid from './gridComponents/Grid'
import Buttons from './interactionComponents/Buttons'

class App extends Component {
  render () {
    return (
      <div className='sudoku-app'>
        <Grid />
        <Buttons />
      </div>
    )
  }
}

export default App
