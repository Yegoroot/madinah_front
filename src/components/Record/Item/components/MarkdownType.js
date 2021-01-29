/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import Markdown from 'src/components/Markdown'
import Prism from 'prismjs'

const MarkdownType = ({ content }) => {
  const { subtitle, data /* , _id */ } = content

  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <>
      {subtitle ? (
        <h2 className="subtitle">{subtitle}</h2>
      ) : null}
      <Markdown
        escapeHtml={false}
        source={data}
      />
    </>
  )
}

export default MarkdownType
