/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import ObjectID from 'bson-objectid'

const initialState = {
  notifications: [],
}

export const MODULE = 'alert'

const slice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    enqueueSnackbar(alert, { payload }) {
      const { key, notification } = payload
      alert.notifications.push({ key, ...notification })
    },
    closeSnackbar(alert, { payload }) {
      const { key, dismissAll } = payload
      alert.notifications = alert.notifications.map(
        (notification) => ((dismissAll || notification.key === key)
          ? { ...notification, dismissed: true }
          : { ...notification })
      )
    },
    removeSnackbar(alert, { payload }) {
      const { key } = payload
      alert.notifications = alert.notifications.filter(
        (notification) => notification.key !== key,
      )
    }
  },

})

export const { reducer } = slice

export const enqueueSnackbar = ({ message, variant }) => async (dispatch) => {
  const key = ObjectID.generate()

  const options = {
    autoHideDuration: 4000,
    variant,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'right',
    },
  }
  dispatch(slice.actions.enqueueSnackbar({
    notification: {
      message,
      options,
      key,
    },
  }))
}

export const closeSnackbar = (key) => async (dispatch) => {
  console.log(key)
  dispatch(slice.actions.closeSnackbar({
    dismissAll: !key, // dismiss all if no key has been defined
    key
  }))
}

export const removeSnackbar = (key) => async (dispatch) => {
  dispatch(
    slice.actions.removeSnackbar({ key })
  )
}

export default slice
