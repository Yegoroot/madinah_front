/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { instanceAxios as axios } from 'src/utils/axios'
import { API_BASE_URL } from 'src/constants'

// import { enqueueSnackbar } from 'src/logic/notification'

const initialState = {
  list: { loading: false, data: null },
  item: { loading: false, data: null, topics: [] },
}

export const module = 'program'

const slice = createSlice({
  name: 'program',
  initialState,
  reducers: {
    /** Program */
    getProgramRequest(program) {
      program.item.data = null
      program.item.loading = true
    },
    getProgram(program, action) {
      const { data } = action.payload
      program.item.data = data
      program.item.loading = false
    },
    getProgramError(program) {
      program.item.loading = 'reload'
    },
    /** Programs */
    getProgramsRequest(program) {
      program.list.data = null
      program.list.loading = true
    },
    getPrograms(program, action) {
      const { data } = action.payload
      program.list.data = data
      program.list.loading = false
    },
    deleteProgram(program, action) {
      const { id } = action.payload
      program.list.data = program.list.data.filter((el) => el.id !== id)
      // if (!program.list.data.length) {
      //   program.list.data = null
      // }
    },

  }
})

export const { reducer } = slice

/**
 *
 * Program
 */
export const getProgram = ({ id }) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/programs/${id}`)
    const { data } = response.data
    dispatch(slice.actions.getProgram({ data }))
  } catch (error) {
    dispatch(slice.actions.getProgramError())
  }
}

export const getProgramRequest = ({ id }) => async (dispatch) => {
  dispatch(slice.actions.getProgramRequest())
  dispatch(getProgram({ id }))
}

export const deleteProgram = ({ id }) => async (dispatch) => {
  try {
    await axios.delete(`${API_BASE_URL}/programs/${id}`)
    dispatch(slice.actions.deleteProgram({ id }))
  } catch (error) {
    console.error('error', error) // FIXME alert message
  }
}

/**
 *
 * Programs
 */
export const getPrograms = ({ params } = {}) => async (dispatch) => {
  const response = await axios.get(`${API_BASE_URL}/programs/`, { params })
  const { data } = response.data
  dispatch(slice.actions.getPrograms({ data }))
}
export const getProgramsRequest = ({ params } = {}) => async (dispatch) => {
  dispatch(slice.actions.getProgramRequest())
  dispatch(getPrograms({ params }))
}

export default slice
