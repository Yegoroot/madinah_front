import React, {
  useCallback,
  useState,
  useEffect
} from 'react'
import {
  Box,
  Container,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core'
import Page from 'src/components/Page'
import { instanceAxios } from 'src/utils/axios'
import useIsMountedRef from 'src/hooks/useIsMountedRef'
import { API_BASE_URL } from 'src/constants'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}))

function UserDetailsView({ match }) {
  const classes = useStyles()
  const isMountedRef = useIsMountedRef()
  const [user, setUser] = useState(null)

  const getUser = useCallback(() => {
    instanceAxios
      .get(`${API_BASE_URL}/users/${match.params.userId}`)
      .then((response) => {
        if (isMountedRef.current) {
          setUser(response.data.data)
        }
      })
  }, [isMountedRef])

  useEffect(() => {
    getUser()
  }, [getUser])

  if (!user) {
    return null
  }

  return (
    <Page
      className={classes.root}
      title="User Details"
    >
      <Container maxWidth={false}>

        <Box mt={3}>
          <Typography color="primary">
            {user.name}
            {' '}
            -
            {user.email}
            {' '}
            -
            {user.role}
          </Typography>
        </Box>
      </Container>
    </Page>
  )
}

export default UserDetailsView
