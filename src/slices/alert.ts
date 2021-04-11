// INFO https://iamhosseindhv.com/notistack/demos

/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import ObjectID from 'bson-objectid'
import { AppDispatch } from 'src/store/index'

// {key?: any, message: any, options: Opt, dismissed: boolean}
type keySnackbarType = string | number

export type EnqueSnackbarType = {
  key?: keySnackbarType,
  message: string,
  options?: any,
  dismissed?: boolean,
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info'
}

interface IEnqueSnackbars {
  notifications: EnqueSnackbarType[]
}

const initialState: IEnqueSnackbars = {
  notifications: [],
}

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

export const enqueueSnackbar = ({ message, variant }: EnqueSnackbarType) => async (dispatch: AppDispatch) => {
  const key = ObjectID.generate()

  const options = {
    autoHideDuration: 3000,
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

export const closeSnackbar = (key: keySnackbarType) => async (dispatch: AppDispatch) => {
  console.log(key)
  dispatch(slice.actions.closeSnackbar({
    dismissAll: !key, // dismiss all if no key has been defined
    key
  }))
}

export const removeSnackbar = (key: keySnackbarType) => async (dispatch: AppDispatch) => {
  dispatch(
    slice.actions.removeSnackbar({ key })
  )
}

export default slice
