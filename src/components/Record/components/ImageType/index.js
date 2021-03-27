import React, {/* useEffect */} from 'react'
import FilesDropzone from 'src/components/FilesDropzone'
import PropTypes from 'prop-types'
import { UPLOADS_URL } from 'src/constants'
import { Checkbox, FormControlLabel } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

const ImageType = ({
  content, programId, onChange
}) => {
  const { t } = useTranslation()
  const { subtitle, data, _id } = content
  const srcPhoto = _id && data.image
    ? `${UPLOADS_URL}/programs/${programId}/${data.image}`
    : null

  const setFieldValue = (a, file) => {
    if (file) { onChange({ file }) }
  }

  if (!programId) {
    return <span style={{ color: 'red' }}>Choose Program!</span>
  }

  return (
    <>
      {subtitle && <h2 className="subtitle">{subtitle}</h2>}
      <FormControlLabel
        // className={classes.formControlLabel}
        control={(
          <Checkbox
            checked={content.data.fullWidth || false}
            onClick={(e) => onChange({ fullWidth: e.target.checked })}
            value={content.data.fullWidth}
          />
              )}
        label={t('admin.image full width')}
      />
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
