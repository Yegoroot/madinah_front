import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core'
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
function SectionList({
  contents, onDelete, onEdit, onSave, onCancel
}) {
  const classes = useStyles()

  const [isEdit, setIsEdit] = useState(false)

  const onHandle = (record) => {
    if (record.event === 'delete') {
      onDelete(record.id)
    }
    if (record.event === 'edit') {
      setIsEdit(true)
      onEdit(record.id)
    }
  }

  const onUpdate = (record, index) => {
    onSave({ record, action: 'update', index })
    setIsEdit(false)
  }

  return (
    <>
      {contents.map((content, index) => (
        <section
          key={content.id}
          className={classes.section}
        >

          {content.type === 'text' ? <TextType content={content} /> : null }
          {content.type === 'markdown' ? <MarkdownType content={content} /> : null }

          <Buttons
            className={classes.buttons}
            id={content.id}
            onHandle={onHandle}
          />

          {!isEdit ? null : (
            <Create
              onSave={({ record }) => onUpdate(record, index)} // необходимо знать индекс чтоб обновить данные
              onCancel={onCancel}
              initialValues={content}
              isUpdate
            />
          )}

        </section>
      ))}
    </>
  )
}

SectionList.propTypes = {
  contents: PropTypes.array,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
}

export default memo(SectionList)
