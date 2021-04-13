/* eslint-disable no-underscore-dangle */
import React from 'react'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { Add, Clear } from '@material-ui/icons'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'src/store/hooks'
import { useTranslation } from 'react-i18next'
import { useHistory, useLocation } from 'react-router-dom'
import CreateCategoryModal from './CreateCategoryModal'
import CreateWordModal from './CreateWordModal'
import ShowCategoryModal from './ShowCategoryModal'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  item: {
    color: theme.palette.primary.main,
    width: 'initial',
    cursor: 'pointer'
  },
  close: {
    color: theme.palette.error.main
  },
  bage: {
    position: 'absolute',
    right: 6,
    fontSize: '0.7rem',
    top: 0,
    color: theme.palette.text.primary
  },
  h2: {
    marginBottom: 0,
    marginTop: 20,
    marginLeft: theme.spacing(2)
    // fontSize:
  }
}))

const MainContent = ({ toggleDrawer, onCloseDictionary }: {toggleDrawer: any, onCloseDictionary: any}): any => {
  const classes = useStyles()
  const { t } = useTranslation()
  const history = useHistory()
  const location = useLocation()

  // get category
  const { categories } = useSelector((store) => store.dictionary.list)

  // create, update Category
  const [isOpenCategory, setIsOpenCategory] = React.useState(false)
  const [isOpenWord, setIsOpenWord] = React.useState(false)

  if (!categories) return <div style={{ color: 'red' }}> No Categories </div>

  const showCategory = (id:string): void => {
    history.push({
      ...location,
      // @ts-ignore
      state: { categoryId: id }
    })
  }

  return (
    <div
      className={clsx(classes.root, {
        [classes.fullList]: true,
      })}
      role="presentation"
    >
      <h2 className={classes.h2}>{t('dict.my dictionary')}</h2>
      {!!categories.length && (
      <div className={classes.list}>
        {categories.map((category) => (
          <ListItem
            button
            onClick={() => {
              showCategory(category._id || '')
            }}
            key={category._id}
            className={classes.item}
          >
            <ListItemText
              color="primary"
              primary={category.title}
            />
            <div className={classes.bage}>
              {category.countWords}
            </div>
          </ListItem>
        ))}
      </div>
      )}

      { !!categories.length && <Divider /> }
      <List>

        <CreateCategoryModal
          isOpen={isOpenCategory}
          onClose={() => setIsOpenCategory(false)}
        />
        <ListItem
          button
          onClick={() => setIsOpenCategory(true)}
        >
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText primary={t('dict.add category')} />
        </ListItem>
        <CreateWordModal
          onCloseDictionary={onCloseDictionary}
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
          <ListItemText primary={t('dict.add word')} />
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
            primary={t('btn.close')}
          />
        </ListItem>
      </List>

      <ShowCategoryModal />
    </div>
  )
}

export default MainContent
