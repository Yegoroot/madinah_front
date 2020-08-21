import React from 'react'
import PropTypes from 'prop-types'
import TextType from './TextType'
import MarkdownType from './MarkdownType'

function SectionList({ contents }) {
  return (
    <>
      {contents.map((content, key) => (
        <section key={content.id || content.subtitle || key}>
          {content.type === 'text' ? <TextType content={content} /> : null }
          {content.type === 'markdown' ? <MarkdownType content={content} /> : null }
        </section>
      ))}
    </>
  )
}

SectionList.propTypes = {
  contents: PropTypes.array
}

export default SectionList
