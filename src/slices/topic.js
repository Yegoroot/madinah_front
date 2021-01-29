/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { instanceAxios as axios } from 'src/utils/axios'
import { API_BASE_URL } from 'src/constants'
import { getMenuProgram, prefix } from 'src/slices/program'

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

export const MODULE = 'topic'

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
    deleteTopic(topic, action) {
      const { topicId } = action.payload
      topic.list.data = topic.list.data.filter((el) => el.id !== topicId)
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

  }
})

export const { reducer } = slice

// INSIDE
export const getTopicItem = ({ topicId, type }) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/topics${prefix(type)}/${topicId}`)
    const { data } = response.data
    dispatch(slice.actions.getTopicItem({ data }))
  } catch (error) {
    console.error('error', error) // FIXME alert message
  }
}

// OUTSIDE
export const getTopicItemRequest = ({ topicId, programId, type }) => async (dispatch) => {
  dispatch(getMenuProgram(programId)) // set menu
  dispatch(slice.actions.getTopicItemRequest())
  dispatch(getTopicItem({ topicId, type }))
}

// OUTSIDE
export const deleteTopic = ({ topicId }) => async (dispatch) => {
  try {
    await axios.delete(`${API_BASE_URL}/topics/${topicId}`)
    dispatch(slice.actions.deleteTopic({ topicId }))
  } catch (error) {
    console.error('error', error) // FIXME alert message
  }
}

// INSIDE
export const getTopicList = ({ params, type }) => async (dispatch) => {
  console.log(params)
  try {
    const response = await axios.get(`${API_BASE_URL}/topics${prefix(type)}`, { params })
    const { data } = response
    dispatch(slice.actions.getTopicList({ data }))
  } catch (error) {
    console.error('error', error) // FIXME alert message
  }
}

// OUTSIDE
export const getTopicListRequest = ({ params, type }) => async (dispatch) => {
  dispatch(slice.actions.getTopicListRequest())
  dispatch(getTopicList({ params, type }))
}

export default slice
