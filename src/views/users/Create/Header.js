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
import { USERS_URL } from 'src/constants'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(() => ({
  root: {}
}))

function Header({ className, user, ...rest }) {
  const classes = useStyles()
  const { t } = useTranslation()
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
          {user ? t('admin.update user') : t('admin.create a new user')}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          component={RouterLink}
          to={`${USERS_URL}`}
        >
          {t('admin.cancel')}
        </Button>
      </Grid>
    </Grid>
  )
}

Header.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
}

export default Header
