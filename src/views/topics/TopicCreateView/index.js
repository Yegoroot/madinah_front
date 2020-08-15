import React, { useState, useEffect } from 'react'
import { Container, makeStyles } from '@material-ui/core'
import Page from 'src/components/Page'
import LoadingScreen from 'src/components/LoadingScreen'
import { getTopicService, getProgramsService } from 'src/services'
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
  const [initialValue, setInitialValue] = useState({
    title: '',
    description: '',
    content: '',
    file: '',
    tags: [],
    publish: true,
    program: ''
  })
  const [programList, setPrograms] = useState([])


  useEffect(() => {
    const initTopics = async () => {
      const programs = await getProgramsService()
      await setPrograms(programs.response.data)
      if (topicId) {
        const topics = await getTopicService(topicId)
        await setInitialValue(topics.response.data)
      }
    }
    initTopics()
  }, [setInitialValue, topicId])

  if (!initialValue.title && topicId) {
    return <LoadingScreen />
  }

  return (
    <Page
      className={classes.root}
      title="Topic Create"
    >
      <Container maxWidth="lg">
        <Header id={topicId} />
        <TopicCreateForm id={topicId} initialValue={initialValue} programs={programList} />
      </Container>
    </Page>
  )
}

export default TopicCreateView
