/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
import React, {
  useRef,
  useState,
  memo
} from 'react'
import {
  ListItemIcon,
  ListItemText,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  makeStyles
} from '@material-ui/core'
import MoreIcon from '@material-ui/icons/MoreVert'
import { Delete, Edit } from '@material-ui/icons'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(() => ({
  menu: {
    width: 256,
    maxWidth: '100%'
  }
}))

const GenericMoreButton = ({
  className, onHandle, record
}) => {
  const { t } = useTranslation()
  const classes = useStyles()
  const moreRef = useRef(null)
  const [openMenu, setOpenMenu] = useState(false)

  const handleMenuOpen = () => {
    setOpenMenu(true)
  }

  const handleMenuClose = () => {
    setOpenMenu(false)
  }

  const onHandleDelete = () => {
    if (window.confirm(t('alert.are you sure to delete this entry'))) {
      onHandle({ event: 'delete', ...record })
    } else {
      setOpenMenu(false)
    }
  }

  return (
    <>
      <Tooltip title="">
        <IconButton
          onClick={handleMenuOpen}
          className={className}
          ref={moreRef}
        >
          <MoreIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={moreRef.current}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        onClose={handleMenuClose}
        open={openMenu}
        PaperProps={{ className: classes.menu }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <MenuItem onClick={onHandleDelete}>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText primary={t('components.delete')} />
        </MenuItem>
        <MenuItem onClick={() => {
          onHandle({ event: 'edit', ...record })
          setOpenMenu(false)
        }}
        >
          <ListItemIcon>
            <Edit />
          </ListItemIcon>
          <ListItemText primary={t('components.edit')} />
        </MenuItem>
      </Menu>
    </>
  )
}

export default memo(GenericMoreButton)
