/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react'
import { useLocation, matchPath, Link as RouterLink } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import PropTypes from 'prop-types'
import {
  // Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  Link,
  List,
  ListSubheader,
  // Typography
} from '@material-ui/core'
import useStylesMenu from 'src/layouts/DashboardLayout/NavBar/stylesMenu'
import i18n from 'i18next'
import Logo from 'src/components/Logo'
import useAuth from 'src/hooks/useAuth'
import { useTranslation } from 'react-i18next'
import NavItem from './NavItem'
import { defineSectionsByRole } from './mainMenuByRole'

function renderNavItems({
  items,
  pathname,
  depth = 0
}) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({
          acc, item, pathname, depth
        }),
        []
      )}
    </List>
  )
}

function reduceChildRoutes({
  acc,
  pathname,
  item,
  depth
}) {
  const key = item.title + depth

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false
    })

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={Boolean(open)}
        title={i18n.t(`${item.title}`)}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items
        })}
      </NavItem>
    )
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        info={item.info}
        key={key}
        title={i18n.t(`${item.title}`)}
      />
    )
  }

  return acc
}

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStylesMenu()
  const location = useLocation()
  const { t } = useTranslation()
  const { user } = useAuth()

  const sections = defineSectionsByRole({ role: user.role })

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Hidden lgUp>
          <Box
            p={2}
            display="flex"
          >
            <Logo />
          </Box>
        </Hidden>

        <Box
          p={2}
          pt={3}
        >
          {sections.map((section) => (
            <List
              key={section.subheader}
              subheader={(
                <ListSubheader
                  disableGutters
                  disableSticky
                  classes={{
                    root: classes.subheaderRoot
                  }}
                >
                  {i18n.t(`${section.subheader}`)}
                </ListSubheader>
              )}
            >
              {renderNavItems({
                items: section.items,
                pathname: location.pathname
              })}
            </List>
          ))}
        </Box>
        <Divider />
        <Box p={2}>
          <Box
            p={2}
            className={classes.infoBlock}
            borderRadius="borderRadius"
            bgcolor="background.dark"
          >
            {/* <Typography
              variant="h6"
              color="textPrimary"
            >
              {t('menu.know more')}
            </Typography> */}
            <Link
              variant="subtitle1"
              color="secondary"
              component={RouterLink}
              to="/app/info"
            >
              {t('menu.changelog')}
            </Link>
            {/* , */}
            <br />
            <Link
              variant="subtitle1"
              color="secondary"
              component={RouterLink}
              to="/app/feedback"
            >
              {t('menu.feedback')}
            </Link>
          </Box>
        </Box>
      </PerfectScrollbar>
    </Box>
  )

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  )
}

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
}

export default NavBar
