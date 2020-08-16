import { instanceAxios } from 'src/utils/axios'
import { API_BASE_URL } from 'src/constants'

export const getTopicListService = () => instanceAxios.get(`${API_BASE_URL}/topics`)
  .then((response) => ({ response: response.data }))
  .catch((error) => ({ error }))

export const getTopicListervice = (id) => instanceAxios.get(`${API_BASE_URL}/topics/${id}`)
  .then((response) => ({ response: response.data }))
  .catch((error) => ({ error }))

export const getTopicListByProgramService = ({ params, id } = {}) => instanceAxios.get(`${API_BASE_URL}/programs/${id}/topics`, { params })
  .then((response) => ({ response: response.data }))
  .catch((error) => ({ error }))
