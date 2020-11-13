import axios from 'axios'
import store from 'src/store'
import { enqueueSnackbar } from 'src/slices/alert'
import ObjectID from 'bson-objectid'
import i18n from 'i18next'

const instanceWithMock = axios.create()

const errorHandler = (err) => {
  store.dispatch(enqueueSnackbar({
    message: i18n.t(`error.${err.message}`),
    options: {
      autoHideDuration: 4000,
      key: ObjectID.generate(),
      variant: 'error'
    },
  }))
  return Promise.reject(err)
}

export const instanceAxios = axios.create()
instanceAxios.interceptors.request.use((req) => req, errorHandler)
instanceAxios.interceptors.response.use((res) => res, errorHandler)

export default instanceWithMock
