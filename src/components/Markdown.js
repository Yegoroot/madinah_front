import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import Prism from 'prismjs'
import ReactMarkdown from 'react-markdown/with-html'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary
  }
}))

function Markdown({ className, ...rest }) {
  const classes = useStyles()

  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <div className={clsx(classes.wrapper, className)}>
      <ReactMarkdown {...rest} />
    </div>
  )
}

Markdown.propTypes = {
  className: PropTypes.string
}

export default Markdown
