/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { instanceAxios as axios } from 'src/utils/axios'
import { API_BASE_URL } from 'src/constants'

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

export const module = 'note'

const slice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    /** Note */
    getNoteItemRequest(note) {
      note.item = { ...initialState.item }
      note.item.loading = true
    },
    getNoteItem(note, action) {
      const { data } = action.payload
      note.item.data = data
      note.item.data.topic = note.item.data.topic.map((e) => e.id) // INFO multi select work with Array[String], but we get Array{Object}
      note.item.loading = false
    },
    deleteSeveralNotes(note, action) {
      const { ids } = action.payload
      note.list.data = note.list.data.filter((nte) => {
        const find = ids.find((id) => id === nte.id)
        return !find
      })
    },
    /** Notes */
    getNoteListRequest(note) {
      note.list = { ...initialState.list }
      note.list.loading = true
    },
    getNoteList(note, action) {
      const { data } = action.payload
      note.list = { ...initialState.list, ...data }
      note.list.loading = false
    },

  }
})

export const { reducer } = slice

/**
 *
 * note
 */
export const getNoteItem = ({ id }) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/notes/${id}`)
    const { data } = response.data
    dispatch(slice.actions.getNoteItem({ data }))
  } catch (error) {
    console.error('error', error) // FIXME alert message
    dispatch(slice.actions.getNoteItemError())
  }
}

export const getNoteItemRequest = ({ id }) => async (dispatch) => {
  dispatch(slice.actions.getNoteItemRequest())
  dispatch(getNoteItem({ id }))
}

export const deleteSeveralNotes = ({ ids }) => async (dispatch) => {
  console.log(ids)
  try {
    await axios.delete(`${API_BASE_URL}/notes/?ids=${ids}`)
    dispatch(slice.actions.deleteSeveralNotes({ ids }))
  } catch (error) {
    console.error('error', error) // FIXME alert message
  }
}

/**
 *
 * notes
 */
export const getNoteList = ({ params = {} }) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/notes/`, { params })
    const { data } = response
    dispatch(slice.actions.getNoteList({ data }))
  } catch (error) {
    console.error('error', error) // FIXME alert message
  }
}
export const getNoteListRequest = ({ params = {} }) => async (dispatch) => {
  dispatch(slice.actions.getNoteListRequest())
  dispatch(getNoteList({ params }))
}

export default slice
