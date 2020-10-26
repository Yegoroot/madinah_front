/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import PropTypes from 'prop-types'

const ImageTypeShow = ({ onImageOpen, mediaLink, content }) => {
  const { subtitle, } = content

  return (
    <>
      {subtitle && <h2>{subtitle}</h2> }
      <img
        alt={subtitle}
        src={mediaLink}
        onClick={onImageOpen}
      />
    </>
  )
}

ImageTypeShow.propTypes = {
  onImageOpen: PropTypes.func.isRequired,
  content: PropTypes.object.isRequired,
  mediaLink: PropTypes.string.isRequired,
}

export default ImageTypeShow
