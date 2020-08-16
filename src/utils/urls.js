import { matchPath } from 'react-router'
import { PROGRAMS_URL } from 'src/constants'
// eslint-disable-next-line import/prefer-default-export
export const matchPathProgram = (path) => {
  // const match = matchPath(`${path}`, { path: '/app/programs/:id', exact: true, strict: false })
  const match = matchPath(`${path}`, { path: `${PROGRAMS_URL}/:id` })

  if (!match) return false
  if (['create', 'overview'].includes(match.params.id)) return false
  return true
}
