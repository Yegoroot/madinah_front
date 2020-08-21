import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Prism from 'prismjs'
import ReactMarkdown from 'react-markdown/with-html'

function Markdown({ className, ...rest }) {
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return <ReactMarkdown {...rest} />
}

Markdown.propTypes = {
  className: PropTypes.string
}

export default Markdown
