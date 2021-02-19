/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { instanceAxios as axios } from 'src/utils/axios'
import { API_BASE_URL } from 'src/constants'
// import { theSameDocument } from 'src/utils/slice'
// import { enqueueSnackbar } from 'src/logic/notification'
// import { AppDispatch } from 'src/store/rootReducer'
import { AppDispatch } from 'src/store/index'

type InitialState = {
  list: {
    loading: boolean;
    data: any[];
    total: number,
    count: number
  };
  item: {
    loading: boolean | string;
    data: null | any;
    topics: [] // all information
  }
}

const initialState: InitialState = {
  list: {
    loading: false,
    data: [], // []
    total: 0,
    count: 0
  },
  item: {
    loading: false,
    data: null,
    topics: [] // all information
  },
}

export const MODULE = 'program'

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
    },

  }
})

type Params = {
  language: string[];
  level: string[];
  // limit: number;
}
const filter = (params: Params) => {
  const f: any = {}
  if (params?.language?.length) {
    f.language = JSON.stringify(params.language)
  }
  if (params?.level?.length) {
    f.level = JSON.stringify(params.level)
  }
  f.limit = 35
  return f
}

// INSIDE
export const getProgramItem = (
  { programId }: {programId: string}
) => async (dispatch: AppDispatch) => {
  try {
    const programResponse = await axios.get(`${API_BASE_URL}/programs/${programId}`)
    const topicsResponse = await axios
      .get(`${API_BASE_URL}/topics?program=${programId}&sort=sequence`)
    dispatch(slice.actions.getProgramItem({
      programData: programResponse.data.data,
      topicsData: topicsResponse.data.data
    }))
  } catch (error) {
    dispatch(slice.actions.getProgramError())
  }
}

// OUTSIDE
export const getProgramItemRequest = (
  { programId }: {programId: string}
) => async (dispatch: AppDispatch) => {
  dispatch(slice.actions.getProgramItemRequest())
  dispatch(getProgramItem({ programId }))
}

// OUTSIDE
export const deleteProgram = (
  { programId }: {programId: string}
) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${API_BASE_URL}/programs/${programId}`)
    dispatch(slice.actions.deleteProgram({ programId }))
  } catch (error) {
    console.error('error', error) // FIXME alert message
  }
}

// INSIDE
const getProgramList = (
  { params }: {params: Params}
) => async (dispatch: AppDispatch) => {
  const response = await axios.get(`${API_BASE_URL}/programs`, {
    params: filter(params)
  }).catch(() => ({ data: null }))

  const { data } = response
  dispatch(slice.actions.getProgramList({ data }))
}

// OUTSIDE
export const getProgramListRequest = (
  { params }: {params: Params}
) => async (dispatch: AppDispatch) => {
  dispatch(slice.actions.getProgramListRequest())
  dispatch(getProgramList({ params }))
}

// OUTSIDE
export const resetTopicsProgram = () => (dispatch: AppDispatch) => {
  dispatch(slice.actions.resetTopicsProgram())
}

/**
 * menu program
 * we need to get program (for menu) if open topic page directly from google
 */
export const getMenuProgram = (
  programId: string
) => async (dispatch: AppDispatch, getState: any) => {
  if (programId) {
    const program = getState().program.item.data
    if (!program || program.id !== programId) {
      dispatch(getProgramItemRequest({ programId }))
    }
  }
}

export const { reducer } = slice
export default slice
