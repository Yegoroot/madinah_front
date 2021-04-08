/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import { IconButton } from '@material-ui/core'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import { Add, Clear } from '@material-ui/icons'
import {
  Book,
} from 'react-feather'
import { CategoryType } from 'src/slices/dictionary'
import { FormCategory, FormWord } from './Forms'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  item: {
    color: theme.palette.primary.main,
    width: 'initial',
    cursor: 'pointer'
  },
  close: {
    color: theme.palette.error.main
  }
}))

export default function Dictionary() {
  const classes = useStyles()
  const [isOpen, setIsOpen] = React.useState(false)
  const [isOpenCategory, setIsOpenCategory] = React.useState(false)
  const [isOpenWord, setIsOpenWord] = React.useState(false)
  const [categories, setCategories] = React.useState<CategoryType[]>([])

  // --------------
  const onSendCategory = (category: CategoryType) => {
    console.log(category)
    setCategories((old) => ([...old, category]))
    setIsOpenWord(true)
  }

  const toggleDrawer = (open: boolean) => (event: any) => {
    if (
      event
      && event.type === 'keydown'
        && ((event).key === 'Tab'
          || (event).key === 'Shift')
    ) {
      return
    }

    setIsOpen(open)
  }

  const list = () => (
    <div
      className={clsx(classes.root, {
        [classes.fullList]: true,
      })}
      role="presentation"
    >

      <div className={classes.list}>

        {categories.map((category) => (
          <ListItem
            button
            key={category._id}
            className={classes.item}
          >
            <ListItemText
              color="primary"
              primary={category.title}
            />
          </ListItem>
        ))}
      </div>

      <Divider />
      <List>

        <FormCategory
          isOpen={isOpenCategory}
          onClose={() => setIsOpenCategory(false)}
          onChange={onSendCategory}
        />
        <ListItem
          button
          onClick={() => setIsOpenCategory(true)}
        >
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText primary="Add Category" />
        </ListItem>
        <FormWord
          isOpen={isOpenWord}
          onClose={() => setIsOpenWord(false)}
          categories={categories}
        />
        <ListItem
          button
          onClick={
            !categories.length
              ? () => {
                // alert('First of all, we need to add a category of word')
                setIsOpenCategory(true)
              }
              : () => setIsOpenWord(true)
            }
        >
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText primary="Add Word" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem
          button
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          className={classes.close}
        >
          <ListItemIcon className={classes.close}>
            <Clear />
          </ListItemIcon>
          <ListItemText
            primary="Close"
          />
        </ListItem>
      </List>

    </div>
  )

  return (
    <div>
      <IconButton
        color="inherit"
        onClick={toggleDrawer(true)}
      >
        <Book />
      </IconButton>

      <SwipeableDrawer
        anchor="top"
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  )
}
