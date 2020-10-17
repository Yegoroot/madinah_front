/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'

import MarkdownType from 'src/components/Section/Item/MarkdownType'
import TextType from 'src/components/Section/Item/TextType'
import { UPLOADS_URL } from 'src/constants'
import { useSelector } from 'src/store'

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
      <img
        src={`${UPLOADS_URL}/programs/${data.program._id}/${content.data.image}`}
        onClick={onImageOpen}
      />
    // <CardActionArea
    //   onClick={() => setSelectedImage(`${UPLOADS_URL}/programs/${programId}/${content.data.image}`)}
    //   key={content._id}
    // >
    //   <CardMedia
    //     className={classes.media}
    //     image={`${UPLOADS_URL}/programs/${programId}/${content.data.image}`}
    //   />
    // </CardActionArea>
    )
  }
  if (content.type === 'markdown') {
    return (
      <MarkdownType content={content} />
    )
  }
}

export default RenderContents
