import React, {/* useEffect */} from 'react'
import FilesDropzone from 'src/components/FilesDropzone'
import PropTypes from 'prop-types'
import { UPLOADS_URL } from 'src/constants'

const PictureType = ({ content, topicId }) => {
  const { subtitle, data, id } = content

  // useEffect(() => {
  //   Prism.highlightAll()
  // }, [])

  console.log(topicId)
  const setFieldValue = (d) => {
    console.log('sdfsdf', d)
  }

  const srcPhoto = id
    ? `${UPLOADS_URL}/temp/topics/${topicId}/contents/${id}/photo/compress/${data.photo}`
    : null

  // const generateId = '' // Generate Id if new

  return (
    <>
      {subtitle ? (
        <h2>{subtitle}</h2>
      ) : null}
      <FilesDropzone
        setFieldValue={setFieldValue}
        srcPhoto={srcPhoto}
        one
        photo
        // photoLoad// BUTTON LOAD
      />
    </>
  )
}

PictureType.propTypes = {
  content: PropTypes.object.isRequired,
  topicId: PropTypes.string.isRequired,
}

export default PictureType
