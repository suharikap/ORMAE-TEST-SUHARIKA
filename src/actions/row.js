import { REMOVE_ROW } from './actionType'

// export const addTodo = (todo) => {
//   return { type: ADD_TODO, todo }
// }

export const delTodo = (row) => {
  return { type: REMOVE_ROW, row }
}