/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { instanceAxios as axios } from 'src/utils/axios'
import { API_BASE_URL } from 'src/constants'
// import { theSameDocument } from 'src/utils/slice'

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
      const { programId } = action.payload
      program.list.data = program.list.data.filter((el) => el.id !== programId)
      // if (!program.list.data.length) {
      //   program.list.data = null
      // }
    },

  }
})

export const { reducer } = slice

export const prefix = (type) => (type === 'private' ? '/my' : '')

// INSIDE
export const getProgramItem = ({ programId, type }) => async (dispatch) => {
  try {
    const programResponse = await axios.get(`${API_BASE_URL}/programs${prefix(type)}/${programId}`)
    const topicsResponse = await axios.get(`${API_BASE_URL}/topics${prefix(type)}?program=${programId}&sort=sequence`)
    dispatch(slice.actions.getProgramItem({
      programData: programResponse.data.data,
      topicsData: topicsResponse.data.data
    }))
  } catch (error) {
    dispatch(slice.actions.getProgramError())
  }
}

// OUTSIDE
export const getProgramItemRequest = ({ programId, type }) => async (dispatch, getState) => {
  // if (
  //   theSameDocument({ documentId: programId, getState, module })
  // ) {
  //   return false
  // }
  dispatch(slice.actions.getProgramItemRequest())
  dispatch(getProgramItem({ programId, type }))
}

// OUTSIDE
export const deleteProgram = ({ programId }) => async (dispatch) => {
  try {
    await axios.delete(`${API_BASE_URL}/programs/${programId}`)
    dispatch(slice.actions.deleteProgram({ programId }))
  } catch (error) {
    console.error('error', error) // FIXME alert message
  }
}

// INSIDE
export const getProgramList = ({ params, type }) => async (dispatch) => {
  const response = await axios.get(`${API_BASE_URL}/programs${prefix(type)}`, { params })
  const { data } = response
  dispatch(slice.actions.getProgramList({ data }))
}

// OUTSIDE
export const getProgramListRequest = ({ params, type }) => async (dispatch) => {
  dispatch(slice.actions.getProgramListRequest())
  dispatch(getProgramList({ params, type }))
}

// OUTSIDE
export const resetTopicsProgram = () => (dispatch) => {
  dispatch(slice.actions.resetTopicsProgram())
}

/**
 * menu program
 * we need to get program (for menu) if open topic page directly from google
 */
export const getMenuProgram = (programId) => (dispatch, getState) => {
  if (programId) {
    const program = getState().program.item.data
    if (!program || program.id !== programId) {
      dispatch(getProgramItemRequest({ programId }))
    }
  }
}

export default slice
