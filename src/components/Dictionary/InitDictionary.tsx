import { useEffect } from 'react'
import { getDictionaryRequest } from 'src/slices/dictionary'
import { useDispatch } from 'src/store/hooks'
import useAuth from 'src/hooks/useAuth'

export const InitDictionary = (): any => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      console.log('YEAH')
      dispatch(getDictionaryRequest())
    }
  }, [dispatch, isAuthenticated])

  return null
}

export default InitDictionary
