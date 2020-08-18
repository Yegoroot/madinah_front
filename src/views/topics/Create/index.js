import React, { useState, useEffect } from 'react'
import { Container, makeStyles } from '@material-ui/core'
import Page from 'src/components/Page'
import LoadingScreen from 'src/components/LoadingScreen'
import { useSelector, useDispatch } from 'src/store'
import { getProgramListRequest, module as moduleProgram } from 'src/slices/program'
import { getTopicItemRequest, module as moduleTopic } from 'src/slices/topic'
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

function TopicCreateView({ match }) {
  const classes = useStyles()
  const { topicId } = match.params
  const dispatch = useDispatch()
  const [initialValue] = useState({
    title: '',
    description: '',
    content: '',
    file: '',
    tags: [],
    publish: true,
    program: ''
  })

  const programs = useSelector((state) => state[moduleProgram].list.data)
  const { data, loading } = useSelector((state) => state[moduleTopic].item)

  useEffect(() => {
    if (topicId) {
      dispatch(getTopicItemRequest({ id: topicId })) // get topic item
    }
    dispatch(getProgramListRequest({ })) // get program list
  }, [dispatch, topicId])

  if (loading || (topicId && !data)) {
    return <LoadingScreen />
  }

  return (
    <Page
      className={classes.root}
      title={topicId ? 'Edit Topic' : 'Create Topic'}
    >
      <Container maxWidth="lg">
        <Header topic={topicId ? data : null} />
        <TopicCreateForm
          id={topicId}
          initialValue={topicId ? data : initialValue}
          programs={programs}
        />
      </Container>
    </Page>
  )
}

export default TopicCreateView
