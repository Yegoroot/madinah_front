export const theSameDocument = ({ documentId, getState, module }) => {
  const { data } = getState()[`${module}`].item
  const id = data ? data.id : null
  if (id === documentId) return true
}

export default {
  theSameDocument
}
