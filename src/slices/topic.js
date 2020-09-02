/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { instanceAxios as axios } from 'src/utils/axios'
import { API_BASE_URL } from 'src/constants'
import wait from 'src/utils/wait'
import { getMenuProgram } from './program'

const initialState = {
  list: {
    loading: false,
    data: null, // []
    total: null,
    count: null
  },
  item: {
    loading: false,
    data: null
  }
}

export const module = 'topic'

const slice = createSlice({
  name: 'topic',
  initialState,
  reducers: {
    /** Topic */
    getTopicItemRequest(topic) {
      topic.item = { ...initialState.item }
      topic.item.loading = true
    },
    getTopicItem(topic, action) {
      const { data } = action.payload
      topic.item.data = data
      topic.item.loading = false
    },
    getTopicItemError(topic) {
      topic.item.loading = 'reload'
    },
    deleteSeveralTopics(topic, action) {
      const { ids } = action.payload
      topic.list.data = topic.list.data.filter((_topic) => {
        const find = ids.find((id) => id === _topic.id)
        return !find
      })
    },
    /** Topics */
    getTopicListRequest(topic) {
      topic.list = { ...initialState.list }
      topic.list.loading = true
    },
    getTopicList(topic, action) {
      const { data } = action.payload
      topic.list = { ...initialState.list, ...data }
      topic.list.loading = false
    },
    getTopicListError(topic) {
      topic.list.loading = 'reload'
    },

  }
})

export const { reducer } = slice

/**
 *
 * topic
 */
export const getTopicItem = ({ topicId }) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/topics/${topicId}`)
    const { data } = response.data
    dispatch(slice.actions.getTopicItem({ data }))
  } catch (error) {
    console.error('error', error) // FIXME alert message
    dispatch(slice.actions.getTopicItemError())
  }
}

export const getTopicItemRequest = ({ topicId, reload, programId }) => async (dispatch, getState) => {
  if (reload) await wait(1000)

  dispatch(getMenuProgram(programId)) // set menu

  dispatch(slice.actions.getTopicItemRequest())
  dispatch(getTopicItem({ topicId }))
}

export const deleteSeveralTopics = ({ ids }) => async (dispatch) => {
  try {
    await axios.delete(`${API_BASE_URL}/topics/?ids=${ids}`)
    dispatch(slice.actions.deleteSeveralTopics({ ids }))
  } catch (error) {
    console.error('error', error) // FIXME alert message
  }
}

/**
 *
 * topics
 */
export const getTopicList = ({ params = {} }) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/topics/`, { params })
    const { data } = response
    dispatch(slice.actions.getTopicList({ data }))
  } catch (error) {
    console.error('error', error) // FIXME alert message
    dispatch(slice.actions.getTopicListError())
  }
}
export const getTopicListRequest = ({ params = {}, reload }) => async (dispatch) => {
  if (reload) await wait(1000)
  dispatch(slice.actions.getTopicListRequest())
  dispatch(getTopicList({ params }))
}

export default slice
