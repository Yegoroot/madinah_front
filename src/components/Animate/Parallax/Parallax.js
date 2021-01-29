/* eslint-disable no-use-before-define */
import React from 'react'
// nodejs library that concatenates classes
import clsx from 'clsx'
// nodejs library to set properties for components
import PropTypes from 'prop-types'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'

// core components
import styles from './parallaxStyle'

const useStyles = makeStyles(styles)

export default function Parallax(props) {
  const paralaxParent = document.getElementById('parent-paralax')
  const scrollTop = paralaxParent ? paralaxParent.scrollTop / 3 : 0
  const [transform, setTransform] = React.useState(`translate3d(0,${scrollTop}px,0)`)

  React.useEffect(() => {
    if (!paralaxParent) return
    paralaxParent.addEventListener('scroll', resetTransform)

    // eslint-disable-next-line consistent-return
    return function cleanup() {
      paralaxParent.removeEventListener('scroll', resetTransform)
    }
  })
  const resetTransform = () => {
    // eslint-disable-next-line no-shadow
    const scrollTop = paralaxParent ? paralaxParent.scrollTop / 3 : 0
    setTransform(`translate3d(0,${scrollTop}px,0)`)
  }
  const {
    filter, className, children, style, image, small
  } = props
  const classes = useStyles()
  const parallaxClasses = clsx({
    [classes.parallax]: true,
    [classes.filter]: filter,
    [classes.small]: small,
    [className]: className !== undefined
  })
  return (
    <div
      className={parallaxClasses}
      style={{
        ...style,
        backgroundImage: image,
        transform
      }}
    >
      {children}
    </div>
  )
}

Parallax.propTypes = {
  className: PropTypes.string,
  filter: PropTypes.bool,
  children: PropTypes.node,
  style: PropTypes.string,
  image: PropTypes.string,
  small: PropTypes.bool
}
