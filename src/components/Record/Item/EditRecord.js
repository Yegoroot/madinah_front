/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-underscore-dangle */
import React, { memo, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'
import { UPLOADS_URL } from 'src/constants'
import Buttons from 'src/components/RecordButtons'
import TextType from './components/TextType'
import MarkdownType from './components/MarkdownType'
import WaveSurfer from './components/AudioType/WaveSurfer'
import ImageTypeShow from './components/ImageType/ImageTypeShow'
import Create from '../Create'

const useStyles = makeStyles((theme) => ({
  section: {
    position: 'relative',
    '&:hover ': {
      // opacity: 0.95,
      '& $buttons': {
        background: theme.palette.primary.main
      }
    },
    '& img': {
      maxWidth: '100%',
      width: '100%'
    }
  },
  buttons: {
    position: 'absolute',
    top: 3,
    right: 0,
    zIndex: 100
  },
  wavesurfer: {
    marginTop: '50',
    top: ''
  }
}))

const SectionItem = ({
  content, index, onDelete, onEdit, onSave, programId, topicId
}) => {
  const classes = useStyles()
  const [isEdit, setIsEdit] = useState(false)

  const onHandleButton = (record) => {
    if (record.event === 'delete') {
      onDelete(record)
    }
    if (record.event === 'edit') {
      setIsEdit(true)
      onEdit(record)
    }
  }
  const onUpdateRecord = (record) => {
    onSave({ record, action: 'update', index })
    setIsEdit(false)
  }

  return (
    <section
      key={content._id}
      className={classes.section}
    >

      <Buttons
        className={classes.buttons}
        record={content}
        onHandle={onHandleButton}
      />

      {isEdit
        ? (
          <Create
            topicId={topicId}
            programId={programId}
            onSave={({ record }) => onUpdateRecord(record, index)} // индекс чтоб обновить данные
            onCancel={() => setIsEdit(false)}
            initialValues={content}
            isUpdate
          />
        )
        : (
          <>
            {content.type === 'text' && <TextType content={content} />}
            {content.type === 'markdown' && <MarkdownType content={content} /> }
            {content.type === 'image' && (
            <ImageTypeShow
              content={content}
              mediaLink={`${UPLOADS_URL}/programs/${programId}/${content.data.image}`}
            />
            )}
            {content.type === 'audio' && (
            <div style={{ paddingTop: 60 }}>
              <WaveSurfer
                subtitle={content.subtitle}
                mediaLink={`${UPLOADS_URL}/programs/${programId}${content.data.audio}`}
                dataAnnotations={content.data.annotations}
              />
            </div>
            )}
          </>

        )}

    </section>
  )
}

SectionItem.propTypes = {
  content: PropTypes.object,
  index: PropTypes.number,
  programId: PropTypes.string.isRequired,
  topicId: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onSave: PropTypes.func
}

export default memo(SectionItem)
