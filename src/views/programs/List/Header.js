import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {
  Button,
  Grid,
  SvgIcon,
  Typography,
  makeStyles
} from '@material-ui/core'
import {
  PlusCircle as PlusCircleIcon,
} from 'react-feather'
import { Link as RouterLink } from 'react-router-dom'
import { PROGRAMS_URL } from 'src/constants'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  root: {},
  action: {
    marginBottom: theme.spacing(1),
    '& + &': {
      marginLeft: theme.spacing(1)
    }
  },
  actionIcon: {
    marginRight: theme.spacing(1)
  }
}))

function Header({ className, ...rest }) {
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
          {t('admin.my programs')}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          color="secondary"
          variant="contained"
          className={classes.action}
          component={RouterLink}
          to={`${PROGRAMS_URL}/create`}
        >
          <SvgIcon
            fontSize="small"
            className={classes.actionIcon}
          >
            <PlusCircleIcon />
          </SvgIcon>
          {t('admin.new program')}
        </Button>
      </Grid>
    </Grid>
  )
}

Header.propTypes = {
  className: PropTypes.string
}

export default Header
