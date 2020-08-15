/* eslint-disable no-param-reassign */
/* eslint-disable func-names */

import produce from 'immer'
import {
  put, takeEvery, all, delay
} from 'redux-saga/effects'
import { enqueueSnackbar } from 'src/logic/notification'
import {
  getProgramService, getProgramsService, getTopicsByProgramService, deleteProgramService
} from 'src/services'

export const module = 'program'
// many
export const GET_PROGRAMS_REQUEST = `${module}/GET_PROGRAMS_REQUEST`
export const GET_PROGRAMS_SUCCESS = `${module}/GET_PROGRAMS_SUCCESS`
export const GET_PROGRAMS_ERROR = `${module}/GET_PROGRAMS_ERROR`
export const DELETE_PROGRAM_REQUEST = `${module}/DELETE_PROGRAM_REQUEST`
// single
export const GET_PROGRAM_REQUEST = `${module}/GET_PROGRAM_REQUEST`
export const GET_PROGRAM_SUCCESS = `${module}/GET_PROGRAM_SUCCESS`
export const GET_PROGRAM_ERROR = `${module}/GET_PROGRAM_ERROR`

const initialState = {
  items: { loading: false },
  item: { loading: false, topics: [] },
}

/**
 * REDUICER
 */
const programsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROGRAMS_REQUEST: {
      return produce(state, (draft) => {
        draft.items.loading = true
      })
    }
    case GET_PROGRAMS_SUCCESS: {
      return produce(state, (draft) => {
        draft.items = action.payload
        draft.items.loading = false
      })
    }
    case GET_PROGRAMS_ERROR: {
      return produce(state, (draft) => {
        draft.items.loading = 'reload'
      })
    }
    // Program
    case GET_PROGRAM_REQUEST: {
      return produce(state, (draft) => {
        draft.item.loading = true
      })
    }
    case GET_PROGRAM_SUCCESS: {
      return produce(state, (draft) => {
        draft.item = action.payload.program
        draft.item.topics = action.payload.topics.data
        draft.item.loading = false
      })
    }
    case GET_PROGRAM_ERROR: {
      return produce(state, (draft) => {
        draft.item.loading = 'reload'
      })
    }
    default: {
      return state
    }
  }
}
export default programsReducer


/**
 * ACTIONS
 */
export const getPrograms = ({ params, reload }) => ({ type: GET_PROGRAMS_REQUEST, params, reload })
export const getProgram = ({ id, reload }) => ({ type: GET_PROGRAM_REQUEST, id, reload })
export const deleteProgram = ({ id }) => ({ type: DELETE_PROGRAM_REQUEST, id })


const errorMessage = (message) => enqueueSnackbar({
  message,
  options: {
    autoHideDuration: 6000,
    key: new Date().getTime() + Math.random(),
    variant: 'error'
  },
})

/**
 * SAGAS
 */
export const deleteProgramSaga = function* ({ id }) {
  const { response, error } = yield deleteProgramService(id)
  if (response) {
    yield put({ type: GET_PROGRAMS_REQUEST })
  } else {
    yield put(errorMessage(error.message))
  }
}


export const getProgramsSaga = function* ({ params, reload }) {
  if (reload) {
    yield delay(2000)
  }
  const { response, error } = yield getProgramsService(params)
  if (response) {
    yield put({ type: GET_PROGRAMS_SUCCESS, payload: response })
  } else {
    yield put({ type: GET_PROGRAMS_ERROR })
    yield put(errorMessage(error.message))
  }
}


export const getProgramSaga = function* ({ id, reload }) {
  if (reload) {
    yield delay(2000)
  }
  const program = yield getProgramService(id)
  const topics = yield getTopicsByProgramService({ id })
  if (program.response && topics.response) {
    yield put({ type: GET_PROGRAM_SUCCESS, payload: { program: program.response, topics: topics.response } })
  } else {
    yield put({ type: GET_PROGRAM_ERROR })
  }
}


export const saga = function* () {
  yield all([
    takeEvery(GET_PROGRAMS_REQUEST, getProgramsSaga),
    takeEvery(GET_PROGRAM_REQUEST, getProgramSaga),
    takeEvery(DELETE_PROGRAM_REQUEST, deleteProgramSaga)
  ])
}
