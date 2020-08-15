/* eslint-disable no-param-reassign */
/* eslint-disable func-names */

import produce from 'immer'
import { instanceAxios } from 'src/utils/axios'
import { API_BASE_URL } from 'src/constants'
import {
  put, takeEvery, all, delay
} from 'redux-saga/effects'
import { enqueueSnackbar } from 'src/logic/notification'

export const module = 'notes'
export const GET_NOTES_REQUEST = `${module}/GET_NOTES_REQUEST`
export const GET_NOTES_SUCCESS = `${module}/GET_NOTES_SUCCESS`
export const GET_NOTES_ERROR = `${module}/GET_NOTES_ERROR`
export const DELETE_NOTES_REQUEST = `${module}/DELETE_NOTES_REQUEST`

const initialState = {
  notes: [],
  loading: true
}

/**
 * REDUICER
 */
const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTES_REQUEST: {
      return produce(state, (draft) => {
        draft.loading = true
      })
    }
    case GET_NOTES_SUCCESS: {
      return produce(state, (draft) => {
        draft.notes = action.payload
        draft.loading = false
      })
    }
    case GET_NOTES_ERROR: {
      return produce(state, (draft) => {
        draft.loading = false
      })
    }
    default: {
      return state
    }
  }
}
export default notesReducer

/**
 * ACTIONS
 */
export const getNotes = (params) => ({ type: GET_NOTES_REQUEST, params })
export const deleteNotes = (ids) => ({ type: DELETE_NOTES_REQUEST, ids })

/**
 * SAGAS
 */
export const getNotesSaga = function* ({ params }) {
  try {
    const res = yield instanceAxios.get(`${API_BASE_URL}/notes`, { params }).then((res) => res.data)
    yield put({ type: GET_NOTES_SUCCESS, payload: res })
  } catch (e) {
    yield put({ type: GET_NOTES_ERROR, error: e.message })

    // yield delay(6000)
    yield put(enqueueSnackbar({
      message: e.message,
      options: {
        autoHideDuration: 6000,
        key: new Date().getTime() + Math.random(),
        variant: 'error'
      },
    }))
  }
}

export const deleteNotesSaga = function* (action) {
  try {
    const { ids } = action
    yield instanceAxios.delete(`${API_BASE_URL}/notes/?ids=${ids}`).then((res) => res.data.data)
    yield put({ type: GET_NOTES_REQUEST })
    yield put(enqueueSnackbar({
      message: 'wasDeleted',
      options: { variant: 'success' },
    }))
  } catch (e) {
    yield put({ type: GET_NOTES_ERROR, error: e.message })
    yield delay(800)
    yield put(enqueueSnackbar({
      message: e.message,
      options: {
        autoHideDuration: 6000,
        key: new Date().getTime() + Math.random(),
        variant: 'error'
      },
    }))
  }
}

export const saga = function* () {
  yield all([
    takeEvery(GET_NOTES_REQUEST, getNotesSaga),
    takeEvery(DELETE_NOTES_REQUEST, deleteNotesSaga)
  ])
}
