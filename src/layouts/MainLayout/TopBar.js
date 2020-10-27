import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  makeStyles
} from '@material-ui/core'
import Logo from 'src/components/Logo'
import Settings from 'src/layouts/DashboardLayout/TopBar/Settings'
import Account from '../DashboardLayout/TopBar/Account'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default
  },
  toolbar: {
    height: 64
  },
  logo: {
    marginRight: theme.spacing(2)
  },
  link: {
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightMedium,
    '& + &': {
      marginLeft: theme.spacing(2)
    }
  },
  divider: {
    width: 1,
    height: 32,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  }
}))

const TopBar = ({ className, ...rest }) => {
  const classes = useStyles()

  return (
    <AppBar
      className={clsx(classes.root, className)}
      color="default"
      {...rest}
    >
      <Toolbar className={classes.toolbar}>
        <Logo className={classes.logo} />
        <Button
          className={classes.programs}
          component={RouterLink}
          color="primary"
          to="/programs"
          variant="outlined"
        >
          Programs
        </Button>
        <Box flexGrow={1} />
        <Settings />
        <Box ml={1}>
          <Account />
        </Box>

      </Toolbar>
    </AppBar>
  )
}

TopBar.propTypes = {
  className: PropTypes.string
}

export default TopBar
