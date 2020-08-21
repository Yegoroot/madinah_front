import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {
  Breadcrumbs,
  Button,
  Grid,
  Link,
  Typography,
  makeStyles
} from '@material-ui/core'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { TOPICS_URL } from 'src/constants'

const useStyles = makeStyles(() => ({
  root: {}
}))

function Header({ className, topic, ...rest }) {
  const classes = useStyles()

  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      justify="space-between"
      spacing={3}
      {...rest}
    >
      <Grid item>
        <Typography
          variant="h1"
          color="textPrimary"
        >
          {topic ? 'Edit topic' : 'Create a new topic'}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          component={RouterLink}
          to={`${TOPICS_URL}`}
        >
          Cancel
        </Button>
      </Grid>
    </Grid>
  )
}

Header.propTypes = {
  className: PropTypes.string
}

export default Header
