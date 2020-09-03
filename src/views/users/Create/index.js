import React, { useState, useEffect } from 'react'
import { Container, makeStyles } from '@material-ui/core'
import Page from 'src/components/Page'
import LoadingScreen from 'src/components/LoadingScreen'
import { useSelector, useDispatch } from 'src/store'
import { getUserItemRequest, module as moduleUser } from 'src/slices/user'
import Header from './Header'
import UserCreateForm from './UserCreateForm'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: 100
  }
}))

function UserCreateView({ match }) {
  const classes = useStyles()
  const { userId } = match.params
  const dispatch = useDispatch()
  const [initialValue] = useState({
    name: '',
    email: '',
    role: '',
    password: ''
  })

  const { data, loading } = useSelector((state) => state[moduleUser].item)

  useEffect(() => {
    if (userId) {
      dispatch(getUserItemRequest({ userId })) // get user item
    }
  }, [dispatch, userId])

  if (loading || (userId && !data)) {
    return <LoadingScreen />
  }

  return (
    <Page
      className={classes.root}
      title={userId ? 'Edit User' : 'Create User'}
    >
      <Container maxWidth="lg">
        <Header user={userId ? data : null} />
        <UserCreateForm
          id={userId}
          initialValue={userId ? data : initialValue}
        />
      </Container>
    </Page>
  )
}

export default UserCreateView
