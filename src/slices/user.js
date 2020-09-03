/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { instanceAxios as axios } from 'src/utils/axios'
import { API_BASE_URL } from 'src/constants'
import wait from 'src/utils/wait'

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

export const module = 'user'

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    /** User */
    getUserItemRequest(user) {
      user.item = { ...initialState.item }
      user.item.loading = true
    },
    getUserItem(user, action) {
      const { data } = action.payload
      user.item.data = data
      user.item.loading = false
    },
    getUserItemError(user) {
      user.item.loading = 'reload'
    },
    deleteSeveralUsers(user, action) {
      const { ids } = action.payload
      user.list.data = user.list.data.filter((_user) => {
        const find = ids.find((id) => id === _user.id)
        return !find
      })
    },
    /** Users */
    getUserListRequest(user) {
      user.list = { ...initialState.list }
      user.list.loading = true
    },
    getUserList(user, action) {
      const { data } = action.payload
      user.list = { ...initialState.list, ...data }
      user.list.loading = false
    },
    getUserListError(user) {
      user.list.loading = 'reload'
    },

  }
})

export const { reducer } = slice

/**
 *
 * user
 */
export const getUserItem = ({ userId }) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}`)
    const { data } = response.data
    dispatch(slice.actions.getUserItem({ data }))
  } catch (error) {
    console.error('error', error) // FIXME alert message
    dispatch(slice.actions.getUserItemError())
  }
}

export const getUserItemRequest = ({ userId, reload, programId }) => async (dispatch, getState) => {
  if (reload) await wait(1000)

  dispatch(slice.actions.getUserItemRequest())
  dispatch(getUserItem({ userId }))
}

export const deleteSeveralUsers = ({ ids }) => async (dispatch) => {
  try {
    await axios.delete(`${API_BASE_URL}/users/?ids=${ids}`)
    dispatch(slice.actions.deleteSeveralUsers({ ids }))
  } catch (error) {
    console.error('error', error) // FIXME alert message
  }
}

/**
 *
 * users
 */
export const getUserList = ({ params = {} }) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/`, { params })
    const { data } = response
    dispatch(slice.actions.getUserList({ data }))
  } catch (error) {
    console.error('error', error) // FIXME alert message
    dispatch(slice.actions.getUserListError())
  }
}
export const getUserListRequest = ({ params = {}, reload }) => async (dispatch) => {
  if (reload) await wait(1000)
  dispatch(slice.actions.getUserListRequest())
  dispatch(getUserList({ params }))
}

export default slice
