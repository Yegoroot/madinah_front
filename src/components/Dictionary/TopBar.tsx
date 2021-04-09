import React from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import { IconButton } from '@material-ui/core'
import { Book } from 'react-feather'
import useAuth from 'src/hooks/useAuth'
import { makeStyles } from '@material-ui/core/styles'
import CreateDictionary from './Components/CreateDictionary'
import LoginButton from './Components/LoginButton'
import MainContent from './Components/MainContent'

const useStylesContent = makeStyles(() => ({
  content: {
    padding: 20,
    textAlign: 'center'
  },

}))

export const Content = ({ toggleDrawer }: {toggleDrawer:any}): any => {
  const classes = useStylesContent()
  const { user } = useAuth()
  if (!user) {
    return <LoginButton className={classes.content} />
  }
  // @ts-ignore
  return user.dictionary.length ? <MainContent toggleDrawer={toggleDrawer} /> : <CreateDictionary className={classes.content} />
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
