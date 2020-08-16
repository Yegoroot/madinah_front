import React, { useState, useEffect } from 'react'
import { Container, makeStyles } from '@material-ui/core'
import Page from 'src/components/Page'
import { getNoteService } from 'src/services'
import LoadingScreen from 'src/components/LoadingScreen'
import Header from './Header'
import NoteCreateForm from './NoteCreateForm'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: 100
  }
}))

function TopicCreateView({ match }) {
  const classes = useStyles()
  const { id } = match.params
  const [initialValue, setInitialValue] = useState({
    title: '',
    description: '',
    content: [],
    minimumSkill: [],
    topic: [],
    // level: '',
    publish: false,
  })

  useEffect(() => {
    const initTopics = async () => {
      if (id) {
        const { response } = await getNoteService(id)
        response.data.topic = response.data.topic.map((e) => e._id)
        await setInitialValue(response.data)
      }
    }
    initTopics()
  }, [setInitialValue, id])

  if (!initialValue.title && id) {
    return <LoadingScreen />
  }
  return (
    <Page
      className={classes.root}
      title={id ? 'Topic Edit' : 'Topic Create'}
    >
      <Container maxWidth="lg">
        <Header id={id} />
        <NoteCreateForm id={id} initialValue={initialValue} />
      </Container>
    </Page>
  )
}

export default TopicCreateView
