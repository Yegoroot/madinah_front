/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  serviceWorkerInitialized: false,
  serviceWorkerUpdated: false,
  serviceWorkerRegistration: null,
}

export const module = 'sWorker'

const slice = createSlice({
  name: module,
  initialState,
  reducers: {
    initServiceWorker(sWorker) {
      sWorker.serviceWorkerInitialized = true
    },
    updateServiceWorker(sWorker, { payload }) {
      const { registration } = payload
      console.log('payload in Reduce', payload)
      sWorker.serviceWorkerRegistration = registration
      sWorker.serviceWorkerUpdated = true
    },
  },

})

export const { reducer } = slice

/**
 * Service Worker init
 */
export const initServiceWorker = () => async (dispatch) => {
  dispatch(slice.actions.initServiceWorker())
}

/**
 * Service Worker update
 */
export const updateServiceWorker = (registration) => async (dispatch) => {
  console.log('registration in action', registration)
  dispatch(slice.actions.updateServiceWorker({ registration }))
}

export default slice
