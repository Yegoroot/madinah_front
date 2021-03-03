import { useContext } from 'react'
import AuthContext from 'src/contexts/AuthContext'

/**
 * этот хук определяет возвращает разные контексты
 * если пользователь авторихован через email то вернуть ему контекст с email,
 * иначе вернуть контекст социальных сетей
 */

const useAuth = () => useContext(AuthContext)

export default useAuth
