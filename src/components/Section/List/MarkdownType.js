import React, { useEffect } from 'react'
import Markdown from 'src/components/Markdown'
import Prism from 'prismjs'

const MarkdownType = ({ content }) => {
  const { subtitle, data /* , id */ } = content

  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <>
      {subtitle ? (
        <h2>{subtitle}</h2>
      ) : null}
      <Markdown
        escapeHtml={false}
        source={data}
      />
    </>
  )
}

export default MarkdownType
