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

const useStyles = makeStyles(() => ({
  menu: {
    width: 256,
    maxWidth: '100%'
  }
}))

const GenericMoreButton = ({
  className, onHandle, record
}) => {
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
    if (window.confirm('Are you sure to delete this record?')) {
      onHandle({ event: 'delete', ...record })
    } else {
      setOpenMenu(false)
    }
  }

  return (
    <>
      <Tooltip title="Options">
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
          <ListItemText primary="Delete" />
        </MenuItem>
        <MenuItem onClick={() => {
          onHandle({ event: 'edit', ...record })
          setOpenMenu(false)
        }}
        >
          <ListItemIcon>
            <Edit />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </MenuItem>
      </Menu>
    </>
  )
}

export default memo(GenericMoreButton)
