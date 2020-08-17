import { instanceAxios } from 'src/utils/axios'
import { API_BASE_URL } from 'src/constants'

export const getNoteService = (id) => instanceAxios.get(`${API_BASE_URL}/notes/${id}`)
  .then((response) => ({ response: response.data }))
  .catch((error) => ({ error }))
