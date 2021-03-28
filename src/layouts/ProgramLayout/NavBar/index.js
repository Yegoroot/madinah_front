/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react'
import { useLocation, matchPath, Link as RouterLink } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import {
  Box,
  Drawer,
  Hidden,
  LinearProgress,
  List,
  ListSubheader
} from '@material-ui/core'

import i18n from 'i18next'
import Logo from 'src/components/Logo'
import { matchPathProgramNotAuth } from 'src/utils/urls'
import { resetTopicsProgram } from 'src/slices/program'
import useStylesMenu from 'src/layouts/DashboardLayout/NavBar/stylesMenu'
import { generateTopicsMenu } from 'src/layouts/menus'
import NavItem from './NavItem'

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
        unpublish={item.unpublish}
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

  const [menuList, setMenuList] = useState([])
  const { loading, topics } = useSelector((state) => state.program.item)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   const params = {
  //     page, limit
  //   }
  //   dispatch(getTopicListRequest({ params }))
  // }, [dispatch, page, limit, filters])

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose()
    }

    /**
     * If needed urls show subtopics
     */
    if (matchPathProgramNotAuth(`${location.pathname}`)) {
      setMenuList(generateTopicsMenu(topics, loading))
    } else if (topics.length) {
      dispatch(resetTopicsProgram())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, location.pathname, topics, loading])

  console.log('menuList', menuList)

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
        {loading && loading !== 'reload' ? (
          <Box className={classes.progress}>
            <LinearProgress />
          </Box>
        ) : null }

        <Box
          p={2}
          pt={4}
        >
          {menuList.map((section) => (
            <List
              className={classes.subheader}
              key={section.subheader}
              subheader={(
                <ListSubheader
                  classes={{
                    root: classes.subheaderRoot
                  }}
                  component={RouterLink}
                  to={`${section.href}`}
                  disableGutters
                  disableSticky
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
