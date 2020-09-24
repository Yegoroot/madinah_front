import { combineReducers } from '@reduxjs/toolkit'
import { reducer as programReducer, module as programModule } from 'src/slices/program'
import { reducer as userReducer, module as userModule } from 'src/slices/user'
import { reducer as topicReducer, module as topicModule } from 'src/slices/topic'
import { reducer as alertReducer, module as alertModule } from 'src/slices/alert'
import { reducer as sWorkerReducer, module as sWorkerModule } from 'src/slices/sWorker'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  [programModule]: programReducer,
  [topicModule]: topicReducer,
  [alertModule]: alertReducer,
  [userModule]: userReducer,
  [sWorkerModule]: sWorkerReducer,
  form: formReducer,
})

export default rootReducer
