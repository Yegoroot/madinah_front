// import axios from 'axios'

// const axiosInstance = axios.create()

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
// )

// export default axiosInstance

import axios from 'axios'
import store from 'src/store'
// import { enqueueSnackbar } from 'src/logic/notification'

const instanceWithMock = axios.create()

const errorHandler = (err) =>
  // store.dispatch(enqueueSnackbar({
  //   message: err.message === 'Network Error' ? 'Ошибка соединения' : err.response.data.error,
  //   options: {
  //     autoHideDuration: 6000,
  //     key: new Date().getTime() + Math.random(),
  //     variant: 'error'
  //   },
  // }))
  Promise.reject(err)

export const instanceAxios = axios.create()
instanceAxios.interceptors.request.use((req) => req, errorHandler)
instanceAxios.interceptors.response.use((res) => res, errorHandler)

export default instanceWithMock
