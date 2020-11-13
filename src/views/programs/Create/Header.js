import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { PROGRAMS_URL } from 'src/constants'
import { useTranslation } from 'react-i18next'
import {
  // Breadcrumbs,
  Button,
  Grid,
  // Link,
  Typography,
  makeStyles
} from '@material-ui/core'
// import NavigateNextIcon from '@material-ui/icons/NavigateNext'

const useStyles = makeStyles(() => ({
  root: {}
}))

function Header({ className, id, ...rest }) {
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
          {id ? t('admin.edit program') : t('admin.create a new program')}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          component={RouterLink}
          to={`${PROGRAMS_URL}`}
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
