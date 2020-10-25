import React, {/* useEffect */} from 'react'
import FilesDropzone from 'src/components/FilesDropzone'
import PropTypes from 'prop-types'
import { UPLOADS_URL } from 'src/constants'
import WaveSurfer from './WaveSurfer'

const AudioType = ({
  programId, onChange, isEdit, content
}) => {
  const { subtitle, data } = content

  const setFieldValue = (a, file) => {
    if (file) { onChange({ file }) }
  }

  if (!programId) {
    return <span style={{ color: 'red' }}>Choose Program!</span>
  }

  const onSaveChangesOut = (annotations) => {
    console.log(annotations)
    onChange({ annotations })
  }
  const src = `${UPLOADS_URL}/programs/${programId}${data.audio}`

  return (
    <>
      <h2>{subtitle}</h2>
      { isEdit
        ? (
          <WaveSurfer
            mediaLink={src}
            dataAnnotations={data.annotations}
            onSaveChangesOut={onSaveChangesOut}
          />
        )
        : (
          <FilesDropzone
            setFieldValue={setFieldValue}
            one
            type="audio"
          />
        )}
    </>
  )
}

AudioType.propTypes = {
  onChange: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
  content: PropTypes.object.isRequired,
  programId: PropTypes.string,
}

export default AudioType
