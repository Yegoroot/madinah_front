import { combineReducers } from '@reduxjs/toolkit'
import { reducer as programReducer, module as programModule } from 'src/slices/program'
import { reducer as topicReducer, module as topicModule } from 'src/slices/topic'
import { reducer as formReducer } from 'redux-form'
import { reducer as notificationReducer } from 'src/slices/notification'

const rootReducer = combineReducers({
  [programModule]: programReducer,
  [topicModule]: topicReducer,
  form: formReducer,
  notifications: notificationReducer
})

export default rootReducer
