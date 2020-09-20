import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { fade, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    alignItems: 'center',
    borderRadius: 2,
    display: 'inline-flex',
    flexGrow: 0,
    marginRight: 2,
    marginLeft: 2,
    whiteSpace: 'nowrap',
    cursor: 'default',
    flexShrink: 0,
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightMedium,
    height: 20,
    justifyContent: 'center',
    letterSpacing: 0.5,
    minWidth: 20,
    padding: theme.spacing(0.5, 1),
    textTransform: 'uppercase'
  }
}))

const Type = ({
  className = '',
  color = '#000',
  children,
  style,
  ...rest
}) => {
  const classes = useStyles()

  return (
    <span
      style={{
        color,
        backgroundColor: fade(color, 0.08)
      }}
      className={
        clsx(classes.root, className)
      }
      {...rest}
    >
      {children}
    </span>
  )
}

Type.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  color: PropTypes.string.isRequired
}

export default Type
