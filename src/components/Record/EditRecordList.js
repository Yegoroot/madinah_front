/* eslint-disable no-underscore-dangle */
import React from 'react'
import PropTypes from 'prop-types'
import EditRecord from 'src/components/Record/Item/EditRecord'

function EditRecordList({
  contents, onDelete, onEdit, onSave, programId, topicId, isEditPage, setSelectedImage
}) {
  return (
    <>
      {contents.map((content, index) => (
        <EditRecord
          isEditPage={isEditPage}
          key={content._id}
          content={content}
          setSelectedImage={setSelectedImage}
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

EditRecordList.propTypes = {
  contents: PropTypes.array,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  programId: PropTypes.string.isRequired,
  topicId: PropTypes.string.isRequired,
  onSave: PropTypes.func
}

export default EditRecordList
