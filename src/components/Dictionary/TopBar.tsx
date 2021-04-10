import React from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import { IconButton, Button } from '@material-ui/core'
import { Book } from 'react-feather'
import useAuth from 'src/hooks/useAuth'
import { makeStyles } from '@material-ui/core/styles'
import LoadingScreen from 'src/components/LoadingScreen'
import { useSelector } from 'src/store/hooks'
import blinkImage from 'src/assets/images/blink.gif'
import CreateDictionary from './Components/CreateDictionary'
import LoginButton from './Components/LoginButton'
import MainContent from './Components/MainContent'

const useStylesContent = makeStyles(() => ({
  content: {
    padding: 20,
    textAlign: 'center'
  },
  reload: {
    display: 'flex',
    margin: '20px auto',
  }

}))

export const Content = ({ toggleDrawer }: {toggleDrawer:any}): any => {
  const classes = useStylesContent()
  const { user } = useAuth()
  const { loading, categories } = useSelector((store) => store.dictionary.list)

  if (loading === 'reload') {
    return (
      <div className={classes.reload}>
        <Button
          onClick={() => window.location.reload()}
          variant="outlined"
          color="secondary"
        >
          {/* {t('btn.reload')} */}
          reload
        </Button>
      </div>
    )
  }

  if (!user) {
    return <LoginButton className={classes.content} />
  }

  if (loading) {
    return <div className={classes.content}><LoadingScreen /></div>
  }
  console.log(categories)

  return categories
    ? <MainContent toggleDrawer={toggleDrawer} />
    : <CreateDictionary className={classes.content} />
}

export default function Dictionary(): any {
  const [isOpen, setIsOpen] = React.useState(false)

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

  return (
    <div>
      <IconButton
        color="inherit"
        onClick={toggleDrawer(true)}
      >
        <Book />
        <img
          style={{
            position: 'absolute', width: 5, bottom: 12, right: 7
          }}
          src={blinkImage}
          alt=""
        />
      </IconButton>

      <SwipeableDrawer
        anchor="top"
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Content toggleDrawer={toggleDrawer} />
      </SwipeableDrawer>
    </div>
  )
}
