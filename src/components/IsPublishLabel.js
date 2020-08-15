import React from 'react'
import PropTypes from 'prop-types'
import Label from 'src/components/Label'

export default function IsPublishLabel({ isPublish }) {
  let obj = {}
  if (isPublish) {
    obj = {
      text: 'Publish',
      color: 'success'
    }
  } else {
    obj = {
      text: 'Unpublish',
      color: 'error'
    }
  }
  return (
    <Label color={obj.color}>
      {obj.text}
    </Label>
  )
}

IsPublishLabel.propTypes = {
  isPublish: PropTypes.bool
}
