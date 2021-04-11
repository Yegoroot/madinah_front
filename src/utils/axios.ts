import axios from 'axios'
import store from 'src/store'
import { enqueueSnackbar } from 'src/slices/alert'
import i18n from 'i18next'

type Err = {
  message: string;
  response: any;
}

const errorHandler = (err: Err) => {
  console.log(err.response.data)
  console.log(err.response.status, err.message)
  const message = err.response.data.error ? i18n.t(`error.${err.response.data.error}`) : i18n.t(`error.${err.message}`)

  store.dispatch(enqueueSnackbar({
    message,
    variant: 'error'
  }))
  return Promise.reject(err)
}

export const instanceAxios = axios.create({
  withCredentials: true
})
instanceAxios.interceptors.request.use((req) => req, errorHandler)

instanceAxios.interceptors.response.use((res) => res, errorHandler)

export default instanceAxios
