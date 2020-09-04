import React from 'react'
import PropTypes from 'prop-types'
import Section from './Item'

function SectionList({
  contents, onDelete, onEdit, onSave,
}) {
  return (
    <>
      {contents.map((content, index) => (
        <Section
          key={content.id}
          content={content}
          index={index}
          onEdit={onEdit}
          onSave={onSave}
          onDelete={onDelete}
        />
      ))}
    </>
  )
}

SectionList.propTypes = {
  contents: PropTypes.array,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onSave: PropTypes.func
}

export default SectionList
