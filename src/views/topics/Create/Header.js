/* eslint-disable react/prop-types */
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {
  Button,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import { TOPICS_URL } from 'src/constants'

const useStyles = makeStyles(() => ({
  root: {}
}))

function Header({ className, title, ...rest }) {
  const { t } = useTranslation()
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
          {title ? `${t('admin.edit topic')} ${title}` : t('admin.create a new topic') }
        </Typography>
      </Grid>
      <Grid item>
        <Button
          component={RouterLink}
          to={`${TOPICS_URL}`}
        >
          {t('admin.cancel')}
        </Button>
      </Grid>
    </Grid>
  )
}

Header.propTypes = {
  className: PropTypes.string
}

export default Header
