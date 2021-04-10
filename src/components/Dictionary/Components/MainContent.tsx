/* eslint-disable no-underscore-dangle */
import React from 'react'
import { CategoryType } from 'src/slices/dictionary'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import { Add, Clear } from '@material-ui/icons'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { /* useDispatch, */useSelector } from 'src/store/hooks'
import { FormCategory, FormWord, ModalShowCategory } from './Modals'

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
  },
  // h2: {
  //   margin: ' 0px 16px'
  // }
}))

const MainContent = ({ toggleDrawer }: {toggleDrawer: any}): any => {
  const classes = useStyles()
  // get category
  const { categories } = useSelector((store) => store.dictionary.list)

  // create, update Category
  const [isOpenCategory, setIsOpenCategory] = React.useState(false)
  const [isOpenWord, setIsOpenWord] = React.useState(false)

  // Show Category
  const [categoryId, setCategoryId] = React.useState('')

  // --------------
  const onSendCategory = (category: CategoryType) => {
    console.log(category)
    // setCategories((old) => ([...old, category]))
    setIsOpenWord(true)
  }

  const onCategoryClick = (id: string) => {
    setCategoryId(id)
  }

  // на самом деле по логике ты никогда не должен оказатся в компоненте MainContent если нет categories,
  // но typescript жалуется и пусть будет спокоен
  if (!categories) return <div style={{ color: 'red' }}> No Categories </div>

  return (
    <div
      className={clsx(classes.root, {
        [classes.fullList]: true,
      })}
      role="presentation"
    >
      {/* <h2 className={classes.h2}>Categories</h2> */}
      <div className={classes.list}>
        {categories.map((category) => (
          <ListItem
            button
            onClick={() => onCategoryClick(category._id)}
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
            ? () => setIsOpenCategory(true)
            : () => setIsOpenWord(true)
          }
        >
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText primary="Add Word" />
        </ListItem>

        {/* <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem> */}

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

      <ModalShowCategory
        onClose={() => setCategoryId('')}
        categoryId={categoryId}
      />
    </div>
  )
}

export default MainContent
