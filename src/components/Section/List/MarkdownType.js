import React, { useEffect } from 'react'
import Markdown from 'src/components/Markdown'
import Prism from 'prismjs'

const MarkdownType = ({ content }) => {
  const { subtitle, data /* , id */ } = content

  useEffect(() => {
    console.log(Prism)
    Prism.highlightAll()
  }, [])

  return (
    <Markdown
      escapeHtml={false}
      source={data}
    />
  )
}

export default MarkdownType
