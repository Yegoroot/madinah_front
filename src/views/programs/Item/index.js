import React, { useEffect } from 'react'
import {
  // Box,
  Container,
  makeStyles
} from '@material-ui/core'
import Page from 'src/components/Page'
// import Statistics from './Statistics'
// import Notifications from './Notifications'
// import Projects from './Projects'
// import Todos from './Todos'
import { useSelector, useDispatch } from 'react-redux'
import { getProgramItemRequest, module } from 'src/slices/program'
import LoadingScreen from 'src/components/LoadingScreen'
import Header from './Header'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}))

function OverviewView({ match }) {
  const classes = useStyles()
  const { programId } = match.params

  const dispatch = useDispatch()
  const { loading, data } = useSelector((state) => state[module].item)

  useEffect(() => {
    dispatch(getProgramItemRequest({ id: programId }))
  }, [dispatch, programId])

  if (loading === 'reload') {
    return <span onClick={() => dispatch(getProgramItemRequest({ programId, reload: true }))}>Перезагрузить</span>
  }
  if (loading || !data) {
    return <LoadingScreen />
  }

  return (
    <Page
      className={classes.root}
      title="Overview"
    >
      <Container maxWidth="lg">
        <Header />
        {/* <Box mt={3}>
          <Statistics />
        </Box>
        <Box mt={6}>
          <Notifications />
        </Box>
        <Box mt={6}>
          <Projects />
        </Box>
        <Box mt={6}>
          <Todos />
        </Box> */}
      </Container>
    </Page>
  )
}

export default OverviewView
