import React, { useState, useEffect } from 'react'
import { Container, makeStyles } from '@material-ui/core'
import Page from 'src/components/Page'
import LoadingScreen from 'src/components/LoadingScreen'
import { useSelector, useDispatch } from 'src/store'
import { module as moduleTopic, getTopicListRequest } from 'src/slices/topic'
import { module as moduleNote, getNoteItemRequest } from 'src/slices/note'
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
  const dispatch = useDispatch()
  const { noteId } = match.params
  const [initialValue] = useState({
    title: '',
    description: '',
    content: [],
    minimumSkill: [],
    topic: [],
    publish: false,
  })

  const topics = useSelector((state) => state[moduleTopic].list.data)
  const { data, loading } = useSelector((state) => state[moduleNote].item)

  useEffect(() => {
    if (noteId) {
      dispatch(getNoteItemRequest({ id: noteId }))
    }
    dispatch(getTopicListRequest({ }))
  }, [dispatch, noteId])

  if (loading) {
    return <LoadingScreen />
  }
  return (
    <Page
      className={classes.root}
      title={noteId ? 'Topic Edit' : 'Topic Create'}
    >
      <Container maxWidth="lg">
        <Header id={noteId} />
        <NoteCreateForm
          id={noteId}
          topics={topics}
          initialValue={noteId ? data : initialValue}
        />
      </Container>
    </Page>
  )
}

export default TopicCreateView
