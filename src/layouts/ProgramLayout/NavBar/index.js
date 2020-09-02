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
  ListSubheader,
  makeStyles
} from '@material-ui/core'

import i18n from 'i18next'
import Logo from 'src/components/Logo'
import { matchPathProgramNotAuth } from 'src/utils/urls'
import { resetTopicsProgram } from 'src/slices/program'
import NavItem from './NavItem'
import { generateTopicsMenu } from './topicsMenu'
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

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  progress: {
    top: 115,
    left: '50%',
    height: 10,
    position: 'absolute',
    transform: 'translateX(-50%)',
    justifyContent: 'center',
    width: '100%'
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}))

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles()
  const location = useLocation()

  const sections = defineSectionsByRole({ role: null })
  const [menuList, setMenuList] = useState(sections)
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
    } else {
      if (topics.length) {
        dispatch(resetTopicsProgram())
      }

      setMenuList(sections)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, location.pathname, topics, loading])

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
            <RouterLink to="/">
              <Logo />
            </RouterLink>
          </Box>
        </Hidden>
        {loading && loading !== 'reload' ? (
          <Box className={classes.progress}>
            <LinearProgress />
          </Box>
        ) : null }

        <Box p={2}>
          {menuList.map((section) => (
            <List
              key={section.subheader}
              subheader={(
                <ListSubheader
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