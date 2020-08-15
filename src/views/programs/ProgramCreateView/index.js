import React, { useState, useEffect } from 'react'
import { Container, makeStyles } from '@material-ui/core'
import Page from 'src/components/Page'
import LoadingScreen from 'src/components/LoadingScreen'
import { getProgramService } from 'src/services'
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
  const { id } = match.params
  const [initialValues, setInitialValue] = useState({
    title: '',
    description: '',
    file: '',
    tags: [],
    publish: true
  })

  useEffect(() => {
    const initTopics = async () => {
      if (id) {
        const { response } = await getProgramService(id)
        await setInitialValue(response.data)
      }
    }
    initTopics()
  }, [setInitialValue, id])


  if (!initialValues.title && id) {
    return <LoadingScreen />
  }


  return (
    <Page
      className={classes.root}
      title={id ? 'Program Edit' : 'Program Create'}
    >
      <Container maxWidth="lg">
        <Header id={id} />
        <ProgramCreateForm id={id} initialValues={initialValues} />
      </Container>
    </Page>
  )
}

export default ProgramCreateView
