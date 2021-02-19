/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { matchPath } from 'react-router'
import { PROGRAMS_URL, PUBLIC_PROGRAMS_URL } from 'src/constants'

/**
 * function in component listen change url and depends on addres formiring menu
 */
export const matchPathProgram = (path) => {
  // const match = matchPath(`${path}`, { path: '/app/programs/:id', exact: true, strict: false })
  const match = matchPath(`${path}`, { path: `${PROGRAMS_URL}/:id` })
  if (!match) return false
  if (['create', 'overview'].includes(match.params.id)) return false
  return true
}

/**
 * function in component listen change url and depends on addres formiring menu
 */
export const matchPathProgramNotAuth = (path) => {
  const match = matchPath(`${path}`, { path: `${PUBLIC_PROGRAMS_URL}/:id` })
  return !!match
}

/**
 * share url in mobile device
 */
export const onShare = async (url) => {
  if (navigator.share) {
    await navigator.share({ title: 'Share this content', url })
      .then(() => { })
      .catch(console.error)
  }
}
