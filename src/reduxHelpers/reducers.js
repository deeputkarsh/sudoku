import { EDIT_FIELDS, UPDATE_CELL_VALUE, SOLVE_SUDOKU, ROUTE_CHANGE } from './constants'

/* const valueMatrix = [
    ['','','','','','','','',''],
    ['','','','','','','','',''],
    ['','','','','','','','',''],
    ['','','','','','','','',''],
    ['','','','','','','','',''],
    ['','','','','','','','',''],
    ['','','','','','','','',''],
    ['','','','','','','','',''],
    ['','','','','','','','','']
]; */

const valueMatrix = [
  ['', '9', '4', '', '', '2', '7', '', ''],
  ['1', '2', '', '', '', '3', '', '8', ''],
  ['5', '', '', '', '', '8', '', '', '2'],
  ['', '', '', '', '', '', '2', '5', '6'],
  ['', '', '', '', '', '', '', '', ''],
  ['7', '8', '5', '', '', '', '', '', ''],
  ['2', '', '', '4', '', '', '', '', '9'],
  ['', '6', '', '9', '', '', '', '2', '1'],
  ['', '', '3', '6', '', '', '4', '7', '']
]

const editedValueMatrix = valueMatrix.map(row => {
  return row.map(value => !!value)
})

const initialState = {
  isEditing: false,
  valueMatrix,
  editedValueMatrix
}

export const appState = (state = initialState, action = {}) => {
  const data = action.payload
  const {
    isEditing,
    valueMatrix
  } = state
  switch (action.type) {
    case ROUTE_CHANGE :
      const routeState = getRouteState(data)
      return { ...state, ...routeState }
    case EDIT_FIELDS :
      const newEditValueMatrix = valueMatrix.map(row => {
        return row.map(value => isEditing && !!value)
      })
      return {
        ...state,
        editedValueMatrix: newEditValueMatrix,
        isEditing: !isEditing
      }
    case UPDATE_CELL_VALUE :
      let newValueMatrix = valueMatrix.slice(0)
      newValueMatrix[data.row][data.col] = data.newValue
      return {
        ...state,
        valueMatrix: newValueMatrix
      }
    case SOLVE_SUDOKU :
      return {
        ...state,
        valueMatrix: solveSudoku(valueMatrix)
      }
    default :
      return state
  }
}
const hasEmptyCells = (matrix) => {
  return !!matrix.filter(row => {
    return !!row.filter(val => !val).length
  }).length
}
const solveSudoku = (inputMatrix) => {
  let outputMatrix = inputMatrix.map(row => {
    return row.map(val => val)
  })
  let possibleValueMatrix = outputMatrix.map(row => {
    return row.map(val => val)
  })
  const matrixSize = outputMatrix.length
  let singleValueReached = false
  outer : for (let row = 0; row < matrixSize; row++) { // eslint-disable-line no-labels
    for (let col = 0; col < matrixSize; col++) {
      let currCellValue = outputMatrix[row][col]
      possibleValueMatrix[row][col] = [currCellValue]
      if (!currCellValue) {
        let possibleValues = getPossibleValuesForCell(outputMatrix, row, col, matrixSize)
        possibleValueMatrix[row][col] = possibleValues
        if (possibleValues.length === 1) {
          outputMatrix[row][col] = possibleValues[0]
          singleValueReached = true
          break outer // eslint-disable-line no-labels
        }
      }
    }
  }
  const isEmptyCellPresent = hasEmptyCells(outputMatrix)
  if (singleValueReached && isEmptyCellPresent) {
    return solveSudoku(outputMatrix)
  } else if (isEmptyCellPresent) {
    return reducePossibleValues(outputMatrix, possibleValueMatrix, matrixSize)
  } else {
    return outputMatrix
  }
}
const reducePossibleValues = (inputMatrix, possiblityMatrix, matrixSize) => {
  let outputMatrix = inputMatrix.map(row => {
    return row.map(val => val)
  })
  let wasMatrixReduced = false
  for (let row = 0; row < matrixSize; row++) {
    for (let col = 0; col < matrixSize; col++) {
      let currCell = possiblityMatrix[row][col]
      if (currCell.length > 1) {
        let samelengthR = possiblityMatrix[row].filter(val => val.length === currCell.length)
        let isReductionPossible = 0
        samelengthR.forEach(element => {
          if (element.join() === currCell.join()) {
            isReductionPossible++
          }
        })
        if (isReductionPossible === currCell.length) {
          wasMatrixReduced = true
          for (let i = 0; i < matrixSize; i++) {
            if (possiblityMatrix[row][i].join() !== currCell.join()) {
              possiblityMatrix[row][i] = possiblityMatrix[row][i].filter(value => !currCell.includes(value))
            }
          }
        }
        let samelengthC = []
        for (let rowIndex = 0; rowIndex < matrixSize; rowIndex++) {
          if (possiblityMatrix[rowIndex][col].length === currCell.length) {
            samelengthC.push(possiblityMatrix[rowIndex][col])
          }
        }
        isReductionPossible = 0
        samelengthC.forEach(element => {
          if (element.join() === currCell.join()) {
            isReductionPossible++
          }
        })
        if (isReductionPossible === currCell.length) {
          wasMatrixReduced = true
          for (let i = 0; i < matrixSize; i++) {
            if (possiblityMatrix[i][col].join() !== currCell.join()) {
              possiblityMatrix[i][col] = possiblityMatrix[i][col].filter(value => !currCell.includes(value))
            }
          }
        }
      }
    }
  }
  if (wasMatrixReduced) {
    for (let row = 0; row < matrixSize; row++) {
      for (let col = 0; col < matrixSize; col++) {
        if (!outputMatrix[row][col] && possiblityMatrix[row][col].length === 1) {
          outputMatrix[row][col] = possiblityMatrix[row][col][0]
        }
      }
    }
    if (hasEmptyCells(outputMatrix)) {
      return solveSudoku(outputMatrix)
    } else {
      return outputMatrix
    }
  } else {
    return inputMatrix
  }
}
const getPossibleValuesForCell = (matrix, row, col, matrixSize) => {
  let possibleValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
  // filter row values
  possibleValues = possibleValues.filter(value => !matrix[row].includes(value))
  // filter column values
  possibleValues = possibleValues.filter(value => {
    let isValuePresent = false
    for (let rowIndex = 0; rowIndex < matrixSize; rowIndex++) {
      isValuePresent = matrix[rowIndex][col] === value
      if (isValuePresent) {
        break
      }
    }
    return !isValuePresent
  })
  // filter 3X3 grid values
  possibleValues = possibleValues.filter(value => {
    let rowIndex = (Math.floor(row / 3)) * 3
    let colIndex = (Math.floor(col / 3)) * 3
    let isValuePresent = false
    outer : for (let i = 0; i < 3; i++) { // eslint-disable-line no-labels
      for (let j = 0; j < 3; j++) {
        isValuePresent = matrix[i + rowIndex][j + colIndex] === value
        if (isValuePresent) {
          break outer // eslint-disable-line no-labels
        }
      }
    }
    return !isValuePresent
  })
  return possibleValues
}

const getRouteState = (route) => {
  switch (route) {
    case 'home' :
      return {
        isSignedIn: true,
        route
      }
    default :
      return {
        route
      }
  }
}
