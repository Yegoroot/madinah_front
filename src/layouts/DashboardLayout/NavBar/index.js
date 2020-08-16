/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react'
import { useLocation, matchPath, Link as RouterLink } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  Link,
  List,
  ListSubheader,
  Typography,
  makeStyles
} from '@material-ui/core'
import { PROGRAMS_URL, TOPICS_URL, NOTES_URL } from 'src/constants'
import i18n from 'i18next'
import {
  Folder as FolderIcon,
  User as UserIcon,
  FolderPlus as FolderPlusIcon,
  Plus as PlusIcon,
  Paperclip as PaperclipIcon,
  Layers as LayersIcon,
  // Heart as HeartIcon,
  // Server as ServerIcon,
} from 'react-feather'
import Logo from 'src/components/Logo'
import useAuth from 'src/hooks/useAuth'
import { matchPathProgram } from 'src/utils/urls'
import NavItem from './NavItem'
import { generateTopicsMenu } from './topicsMenu'

const sections = [

  {
    subheader: 'Education',
    items: [
      {
        title: 'Program List',
        href: `${PROGRAMS_URL}`,
        icon: FolderIcon
      },
      {
        title: 'Create',
        href: `${PROGRAMS_URL}/create`,
        icon: FolderPlusIcon,
      },

      // {
      //   title: 'Favorite Programs',
      //   href: `${PROGRAMS_URL}`,
      //   icon: HeartIcon
      // },
    ]
  },
  {
    subheader: 'Managment',
    items: [

      {
        title: 'Topics',
        href: '#',
        icon: LayersIcon,
        items: [
          {
            title: 'List Topics',
            href: `${TOPICS_URL}`,
            icon: LayersIcon,
          },
          {
            title: 'Create',
            href: `${TOPICS_URL}/create`,
            icon: PlusIcon,
          },
        ]
      },
      {
        title: 'Notes',
        href: '#',
        icon: PaperclipIcon,
        items: [
          {
            title: 'List Notes',
            href: `${NOTES_URL}`,
            icon: PaperclipIcon,
          },
          {
            title: 'Create',
            href: `${NOTES_URL}/create`,
            icon: PlusIcon,
          },
        ]
      },
      {
        title: 'Account',
        href: '/app/account',
        icon: UserIcon
      },
    ]
  },
]

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
  const { user } = useAuth()
  const [menuList, setMenuList] = useState(sections)
  const { loading, topics } = useSelector((state) => state.program.item)

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose()
    }
    if (matchPathProgram(`${location.pathname}`)) {
      setMenuList(generateTopicsMenu(topics, loading))
    } else {
      setMenuList(sections)
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
            justifyContent="center"
          >
            <RouterLink to="/">
              <Logo />
            </RouterLink>
          </Box>
        </Hidden>
        <Box p={2}>
          <Box
            display="flex"
            justifyContent="center"
          >
            <RouterLink to="/app/account">
              <Avatar
                alt="User"
                className={classes.avatar}
                src={user.avatar}
              />
            </RouterLink>
          </Box>
          <Box
            mt={2}
            textAlign="center"
          >
            <Link
              component={RouterLink}
              to="/app/account"
              variant="h5"
              color="textPrimary"
              underline="none"
            >
              {user.name}
            </Link>
            {/* <Typography
              variant="body2"
              color="textSecondary"
            >
              Your tier:
              {' '}
              <Link
                component={RouterLink}
                to="/pricing"
              >
                {user.tier}
              </Link>
            </Typography> */}
          </Box>
        </Box>
        <Divider />
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
        <Divider />
        <Box p={2}>
          <Box
            p={2}
            borderRadius="borderRadius"
            bgcolor="background.dark"
          >
            <Typography
              variant="h6"
              color="textPrimary"
            >
              Need Help?
            </Typography>
            <Link
              variant="subtitle1"
              color="secondary"
              component={RouterLink}
              to="/docs"
            >
              Check our docs
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
