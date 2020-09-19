/* eslint-disable no-underscore-dangle */
import React from 'react'
import PropTypes from 'prop-types'
import Section from 'src/components/Section/Item/index'

function SectionList({
  contents, onDelete, onEdit, onSave, programId, topicId
}) {
  return (
    <>
      {contents.map((content, index) => (
        <Section
          key={content._id}
          content={content}
          programId={programId}
          topicId={topicId}
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
  programId: PropTypes.string.isRequired,
  topicId: PropTypes.string.isRequired,
  onSave: PropTypes.func
}

export default SectionList
