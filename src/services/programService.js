import { instanceAxios } from 'src/utils/axios'
import { API_BASE_URL } from 'src/constants'

export const getProgramService = (id) => instanceAxios.get(`${API_BASE_URL}/programs/${id}`)
  .then((response) => ({ response: response.data }))
  .catch((error) => ({ error }))

export const getProgramsService = ({ params } = {}) => instanceAxios.get(`${API_BASE_URL}/programs`, { params })
  .then((response) => ({ response: response.data }))
  .catch((error) => ({ error }))

export const deleteProgramService = (id) => instanceAxios.delete(`${API_BASE_URL}/programs/${id}`)
  .then((response) => ({ response: response.data }))
  .catch((error) => ({ error }))

export default getProgramService
