import { combineReducers } from '@reduxjs/toolkit'
import { reducer as programReducer } from 'src/slices/program'
import { reducer as userReducer } from 'src/slices/user'
import { reducer as topicReducer } from 'src/slices/topic'
import { reducer as alertReducer } from 'src/slices/alert'
import { reducer as sWorkerReducer } from 'src/slices/sWorker'

const rootReducer = combineReducers({
  program: programReducer,
  topic: topicReducer,
  alert: alertReducer,
  user: userReducer,
  sWorker: sWorkerReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
