import { instanceAxios } from 'src/utils/axios'
import { API_BASE_URL } from 'src/constants'

export const getTopicsService = () => instanceAxios.get(`${API_BASE_URL}/topics`)
  .then((response) => ({ response: response.data }))
  .catch((error) => ({ error }))

export const getTopicService = (id) => instanceAxios.get(`${API_BASE_URL}/topics/${id}`)
  .then((response) => ({ response: response.data }))
  .catch((error) => ({ error }))

export const getTopicsByProgramService = ({ params, id } = {}) => instanceAxios.get(`${API_BASE_URL}/programs/${id}/topics`, { params })
  .then((response) => ({ response: response.data }))
  .catch((error) => ({ error }))
