import React, {/* useEffect */} from 'react'
import FilesDropzone from 'src/components/FilesDropzone'
import PropTypes from 'prop-types'
import { UPLOADS_URL } from 'src/constants'

const ImageType = ({
  content, programId, onChange
}) => {
  const { subtitle, data, _id } = content
  const srcPhoto = _id && data.image
    ? `${UPLOADS_URL}/programs/${programId}${data.image}`
    : null

  const setFieldValue = (a, file) => {
    if (file) { onChange(file) }
  }

  if (!programId) {
    return <span style={{ color: 'red' }}>Choose Program!</span>
  }
  return (
    <>
      {subtitle && <h2 className="subtitle">{subtitle}</h2>}
      <FilesDropzone
        setFieldValue={setFieldValue}
        srcPhoto={srcPhoto}
        one
        type="photo"
      />
    </>
  )
}

ImageType.propTypes = {
  content: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  programId: PropTypes.string,
}

export default ImageType
