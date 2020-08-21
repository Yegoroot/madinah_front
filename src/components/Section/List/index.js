import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core'
import TextType from './TextType'
import MarkdownType from './MarkdownType'
import Buttons from './Buttons'

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
function SectionList({ contents, onDelete, onEdit }) {
  const classes = useStyles()

  const onHandle = (record) => {
    if (record.event === 'delete') {
      onDelete(record.id)
    }
    if (record.event === 'edit') {
      onEdit(record.id)
    }
  }

  return (
    <>
      {contents.map((content, key) => (
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
        </section>
      ))}
    </>
  )
}

SectionList.propTypes = {
  contents: PropTypes.array,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
}

export default memo(SectionList)
