import React, { memo, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'
import TextType from './TextType'
import MarkdownType from './MarkdownType'
import Buttons from './Buttons'
import Create from '../Create'

const useStyles = makeStyles((theme) => ({
  section: {
    position: 'relative',
    '&:hover ': {
      opacity: 0.7,
      '& $buttons': {
        background: theme.palette.primary.main
      }
    },

  },
  buttons: {
    position: 'absolute',
    top: 0,
    right: 0
  }
}))

const Section = ({
  content, index, onDelete, onEdit, onSave
}) => {
  const classes = useStyles()
  const [isEdit, setIsEdit] = useState(false)

  const onHandleButton = (record) => {
    if (record.event === 'delete') {
      onDelete(record.id)
    }
    if (record.event === 'edit') {
      setIsEdit(true)
      onEdit(record.id)
    }
  }
  const onUpdateRecord = (record) => {
    onSave({ record, action: 'update', index })
    setIsEdit(false)
  }

  return (
    <section
      key={content.id}
      className={classes.section}
    >

      {content.type === 'text' ? <TextType content={content} /> : null }
      {content.type === 'markdown' ? <MarkdownType content={content} /> : null }

      <Buttons
        className={classes.buttons}
        id={content.id}
        onHandle={onHandleButton}
      />

      {!isEdit ? null : (
        <Create
          // необходимо знать индекс чтоб обновить данные
          onSave={({ record }) => onUpdateRecord(record, index)}
          onCancel={() => setIsEdit(false)}
          initialValues={content}
          isUpdate
        />
      )}

    </section>
  )
}

Section.propTypes = {
  content: PropTypes.object,
  index: PropTypes.number,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onSave: PropTypes.func
}

export default memo(Section)
