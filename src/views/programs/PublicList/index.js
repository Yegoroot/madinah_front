import React, {
  useEffect
} from 'react'
import {
  Box,
  Container,
  Typography,
  makeStyles
} from '@material-ui/core'
import Page from 'src/components/Page'
import { useSelector, useDispatch } from 'react-redux'
import { getProgramListRequest, module } from 'src/slices/program'
import LoadingScreen from 'src/components/LoadingScreen'
// import Filter from './Filter'
import Results from './Results'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}))

function ProgramBrowseView() {
  const classes = useStyles()

  const dispatch = useDispatch()
  const { loading, data } = useSelector((state) => state[module].list)

  useEffect(() => {
    dispatch(getProgramListRequest({ params: {} }))
  }, [dispatch])

  if (loading === 'reload') {
    return <span onClick={() => dispatch(getProgramListRequest({ params: {}, reload: true }))}>Перезагрузить</span>
  } if (loading || !data) {
    return <LoadingScreen />
  }

  return (
    <Page
      className={classes.root}
      title="Program List"
    >
      <Container maxWidth="lg">

        {/* <Box>
          <Filter />
        </Box> */}
        <Typography
          variant="h1"
          color="textPrimary"
        >
          Choose program for learning
        </Typography>
        <Box mt={2}>
          <Results programs={data} />
        </Box>
      </Container>
    </Page>
  )
}

export default ProgramBrowseView
