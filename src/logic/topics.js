/* eslint-disable no-param-reassign */
/* eslint-disable func-names */

import produce from 'immer'
import { instanceAxios } from 'src/utils/axios'
import { API_BASE_URL } from 'src/constants'
import { put, takeEvery, all, /* delay */ } from 'redux-saga/effects'
import { enqueueSnackbar } from 'src/logic/notification'

export const module = 'topic'
export const GET_TOPICS_REQUEST = `${module}/GET_TOPICS_REQUEST`
export const GET_TOPICS_SUCCESS = `${module}/GET_TOPICS_SUCCESS`
export const GET_TOPICS_ERROR = `${module}/GET_TOPICS_ERROR`
export const DELETE_TOPICS_REQUEST = `${module}/DELETE_TOPICS_REQUEST`

// export const UPDATE_TOPIC = `${module}/UPDATE_TOPIC`
// export const GET_TOPIC = `${module}/GET_TOPIC`

const initialState = {
  topics: {}, // topic list
  // topic: null, // one topic
  loading: true // loading will be for topic and topics
}

/**
 * REDUICER
 */
const topicsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOPICS_REQUEST: {
      return produce(state, (draft) => {
        draft.loading = true
      })
    }
    case GET_TOPICS_SUCCESS: {
      return produce(state, (draft) => {
        draft.topics = action.payload
        draft.loading = false
      })
    }
    case GET_TOPICS_ERROR: {
      return produce(state, (draft) => {
        draft.loading = false
      })
    }
    default: {
      return state
    }
  }
}
export default topicsReducer

/**
 * ACTIONS
 */
export const getTopics = (params) => ({ type: GET_TOPICS_REQUEST, params })
export const deleteTopics = (payload) => ({ type: DELETE_TOPICS_REQUEST, payload })

/**
 * SAGAS
 */
export const getTopicsSaga = function* ({ params }) {
  try {
    const res = yield instanceAxios.get(`${API_BASE_URL}/topics`, {
      params
    }).then((res) => res.data)
    yield put({ type: GET_TOPICS_SUCCESS, payload: res })
  } catch (e) {
    yield put({ type: GET_TOPICS_ERROR, error: e.message })

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

export const deleteTopicsSaga = function* (action) {
  const ids = action.payload
  try {
    yield instanceAxios.delete(`${API_BASE_URL}/topics?ids=${ids}`).then((res) => res.data.data)
    yield put({ type: GET_TOPICS_REQUEST })
    yield put(enqueueSnackbar({
      message: 'Topics were deleted',
      options: {
        autoHideDuration: 6000,
        key: new Date().getTime() + Math.random(),
        variant: 'success'
      },
    }))
  } catch (e) {
    yield put({ type: GET_TOPICS_ERROR })
    // yield delay(6000)
  }
}

// export const deleteNotesSaga = function* (action) {
//   try {
//     const { ids } = action
//     const res = yield instanceAxios.delete(`${API_BASE_URL}/notes/?ids=${ids}`).then((res) => res.data.data)
//     yield put({ type: GET_NOTES_REQUEST })
//     yield put(enqueueSnackbar({
//       message: "wasDeleted",
//       options: { variant: 'success' },
//     }))
//     // yield put({ type: GET_NOTES_SUCCESS, payload: res })
//   } catch (e) {
//     yield put({ type: GET_NOTES_ERROR, error: e.message })

//     // yield delay(6000)
//     yield put(enqueueSnackbar({
//       message: e.message,
//       options: {
//         autoHideDuration: 6000,
//         key: new Date().getTime() + Math.random(),
//         variant: 'error'
//       },
//     }))
//   }
// }

export const saga = function* () {
  yield all([
    takeEvery(GET_TOPICS_REQUEST, getTopicsSaga),
    takeEvery(DELETE_TOPICS_REQUEST, deleteTopicsSaga),
    // takeEvery(DELETE_NOTES_REQUEST, deleteNotesSaga)
  ])
}
