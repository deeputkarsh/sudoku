import { EDIT_FIELDS, UPDATE_CELL_VALUE, SOLVE_SUDOKU, ROUTE_CHANGE } from './constants'
const editFields = (data) => ({
  type: EDIT_FIELDS,
  payload: data
})
const updateCellValue = (data) => ({
  type: UPDATE_CELL_VALUE,
  payload: data
})
const solveSudoku = (data) => {
  return {
    type: SOLVE_SUDOKU,
    payload: data
  }
}
const onRouteChange = (data) => ({
  type: ROUTE_CHANGE,
  payload: data
})
export {
  editFields,
  solveSudoku,
  updateCellValue,
  onRouteChange
}
