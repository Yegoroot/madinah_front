import React, { useState, useEffect } from 'react'
import { Container, makeStyles } from '@material-ui/core'
import Page from 'src/components/Page'
import LoadingScreen from 'src/components/LoadingScreen'
import { useSelector, useDispatch } from 'src/store'
import { getProgramItemRequest, module } from 'src/slices/program'
import Header from './Header'
import ProgramCreateForm from './ProgramCreateForm'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: 100
  }
}))

function ProgramCreateView({ match }) {
  const classes = useStyles()
  const { programId } = match.params
  const { loading, data } = useSelector((state) => state[module].item)
  const dispatch = useDispatch()
  const [initialValues] = useState({
    title: '',
    description: '',
    file: '',
    tags: [],
    publish: true
  })

  useEffect(() => {
    if (programId) {
      dispatch(getProgramItemRequest({ programId, type: 'private' }))
    }
  }, [programId, dispatch])

  if ((loading || (programId && !data))) {
    return <LoadingScreen />
  }

  return (
    <Page
      className={classes.root}
      title={programId ? 'Program Edit' : 'Program Create'}
    >
      <Container maxWidth="lg">
        <Header id={programId} />
        <ProgramCreateForm
          id={programId}
          initialValues={programId ? data : initialValues}
        />
      </Container>
    </Page>
  )
}

export default ProgramCreateView
