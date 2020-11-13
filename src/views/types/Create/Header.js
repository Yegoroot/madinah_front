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
import { TYPES_URL } from 'src/constants'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2)
  }
}))

function Header({ className, type, ...rest }) {
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
          {type ? t('admin.edit type') : t('admin.create a new type')}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          component={RouterLink}
          to={`${TYPES_URL}`}
        >
          {t('admin.cancel')}
        </Button>
      </Grid>
    </Grid>
  )
}

Header.propTypes = {
  className: PropTypes.string,
  type: PropTypes.object,
}

export default Header
