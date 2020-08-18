/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { instanceAxios as axios } from 'src/utils/axios'
import { API_BASE_URL } from 'src/constants'

// import { enqueueSnackbar } from 'src/logic/notification'

const initialState = {
  list: {
    loading: false,
    data: null, // []
    total: null,
    count: null
  },
  item: {
    loading: false,
    data: null,
    topics: [] // all information
  },
}

export const module = 'program'

const slice = createSlice({
  name: 'program',
  initialState,
  reducers: {
    /** Program */
    getProgramItemRequest(program) {
      program.item = { ...initialState.item }
      program.item.loading = true
    },
    getProgramItem(program, action) {
      const { programData, topicsData } = action.payload
      program.item.data = programData
      program.item.topics = topicsData
      program.item.loading = false
    },
    getProgramError(program) {
      program.item.loading = 'reload'
    },
    resetTopicsProgram(program) {
      program.item.topics = []
    },
    /** Programs */
    getProgramListRequest(program) {
      program.list = { ...initialState.list }
      program.list.loading = true
    },
    getProgramList(program, action) {
      const { data } = action.payload
      program.list = { ...initialState.list, ...data }
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
export const getProgramItem = ({ id }) => async (dispatch) => {
  try {
    const programResponse = await axios.get(`${API_BASE_URL}/programs/${id}`)
    const topicsResponse = await axios.get(`${API_BASE_URL}/programs/${id}/topics`)
    dispatch(slice.actions.getProgramItem({
      programData: programResponse.data.data,
      topicsData: topicsResponse.data.data
    }))
  } catch (error) {
    dispatch(slice.actions.getProgramError())
  }
}

export const getProgramItemRequest = ({ id }) => async (dispatch) => {
  dispatch(slice.actions.getProgramItemRequest())
  dispatch(getProgramItem({ id }))
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
export const getProgramList = ({ params } = {}) => async (dispatch) => {
  const response = await axios.get(`${API_BASE_URL}/programs/`, { params })
  const { data } = response
  dispatch(slice.actions.getProgramList({ data }))
}
export const getProgramListRequest = ({ params } = {}) => async (dispatch) => {
  dispatch(slice.actions.getProgramListRequest())
  dispatch(getProgramList({ params }))
}

export const resetTopicsProgram = () => (dispatch) => {
  dispatch(slice.actions.resetTopicsProgram())
}

export default slice
