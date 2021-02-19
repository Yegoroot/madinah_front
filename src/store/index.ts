/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector
} from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { ENABLE_REDUX_DEV_TOOLS } from 'src/constants'
import rootReducer from './rootReducer'

const store = configureStore({
  reducer: rootReducer,
  devTools: ENABLE_REDUX_DEV_TOOLS
})

// FIXME delete
export const useSelector = useReduxSelector
export const useDispatch = () => useReduxDispatch()

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store
