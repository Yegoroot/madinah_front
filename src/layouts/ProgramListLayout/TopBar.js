import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {
  AppBar,
  Box,
  Hidden,
  // Link,
  Toolbar,
} from '@material-ui/core'
import Logo from 'src/components/Logo'
import Settings from 'src/layouts/DashboardLayout/TopBar/Settings'
import { useStyles } from '../DashboardLayout/TopBar/style'
import Account from '../DashboardLayout/TopBar/Account'

const TopBar = ({
  className,
  ...rest
}) => {
  const classes = useStyles()

  return (
    <AppBar
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Toolbar className={classes.toolbar}>
        <Hidden>
          <Logo className={classes.logo} />
        </Hidden>
        <Box
          ml={2}
          flexGrow={1}
        />
        <Settings />
        <Account />
      </Toolbar>
    </AppBar>
  )
}

TopBar.propTypes = {
  className: PropTypes.string,
}

export default TopBar
