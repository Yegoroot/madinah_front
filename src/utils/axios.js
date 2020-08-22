import axios from 'axios'
import store from 'src/store'
import { enqueueSnackbar } from 'src/slices/alert'
import { v4 as uuidv4 } from 'uuid'

const instanceWithMock = axios.create()

const errorHandler = (err) => {
  store.dispatch(enqueueSnackbar({
    message: err.message,
    options: {
      autoHideDuration: 4000,
      key: uuidv4(),
      variant: 'error'
    },
  }))
  return Promise.reject(err)
}

export const instanceAxios = axios.create()
instanceAxios.interceptors.request.use((req) => req, errorHandler)
instanceAxios.interceptors.response.use((res) => res, errorHandler)

export default instanceWithMock
