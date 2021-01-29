/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { Container, makeStyles, Box } from '@material-ui/core'
import Page from 'src/components/Page'
import LoadingScreen from 'src/components/LoadingScreen'
import { useSelector, useDispatch } from 'src/store'
import { MODULE as moduleTopic, getTopicItemRequest } from 'src/slices/topic'
import { MODULE as moduleProgram, getProgramListRequest } from 'src/slices/program'

import Header from './Header'
import TopicCreateForm from './TopicCreateForm'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: 100
  }
}))

function TopicCreateView({ match, location }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { topicId, } = match.params
  const [initialValue] = useState({
    title: '',
    description: '',
    contents: [],
    // tags: [],
    program: '',
    publish: true,
  })

  const programs = useSelector((state) => state[moduleProgram].list.data)
  const topic = useSelector((state) => state[moduleTopic].item)

  useEffect(() => {
    if (topicId) {
      dispatch(getTopicItemRequest({ topicId, type: 'private' })) // get topic item
    }
    dispatch(getProgramListRequest({ type: 'private' })) // get program list
  }, [dispatch, topicId])

  if (topic.loading || (topicId && !topic.data)) {
    return <LoadingScreen />
  }

  return (
    <Page
      className={classes.root}
      title={topicId ? 'Topic Edit' : 'Topic Create'}
    >
      <Container maxWidth="lg">
        <Box mb={2}>
          <Header title={topicId ? topic.data.title : null} />
        </Box>
        <TopicCreateForm
          location={location}
          programs={programs}
          id={topicId}
          initialValue={topicId ? topic.data : initialValue}
        />
      </Container>
    </Page>
  )
}

export default TopicCreateView
