/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'

import MarkdownType from 'src/components/Record/Item/components/MarkdownType'
import TextType from 'src/components/Record/Item/components/TextType'
import ImageTypeShow from 'src/components/Record/Item/components/ImageType/ImageTypeShow'
import WaveSurfer from 'src/components/Record/Item/components/AudioType/WaveSurfer'
import { UPLOADS_URL } from 'src/constants'
import { useSelector } from 'src/store'

// eslint-disable-next-line consistent-return
const RenderContents = ({ content, setSelectedImage }) => {
  const { data } = useSelector((state) => state.topic.item)

  const onImageOpen = () => {
    if (setSelectedImage) {
      setSelectedImage(`${UPLOADS_URL}/programs/${data.program._id}/${content.data.image}`)
    }
  }

  if (content.type === 'text') {
    return (
      <TextType content={content} />
    )
  }
  if (content.type === 'image') {
    return (
      <ImageTypeShow
        content={content}
        mediaLink={`${UPLOADS_URL}/programs/${data.program._id}/${content.data.image}`}
        onImageOpen={onImageOpen}
      />
    )
  }
  if (content.type === 'markdown') {
    return (
      <MarkdownType content={content} />
    )
  }

  if (content.type === 'audio') {
    return (
      <WaveSurfer
        subtitle={content.subtitle}
        mediaLink={`${UPLOADS_URL}/programs/${data.program._id}${content.data.audio}`}
        dataAnnotations={content.data.annotations}
      />
    )
  }
}

export default RenderContents
