import React, {
  useState,
  useEffect
} from 'react'
import {
  Box,
  Container,
  Divider,
  Tab,
  Tabs,
  makeStyles
} from '@material-ui/core'
import Page from 'src/components/Page'
import { useSelector, useDispatch } from 'react-redux'
import { getProgramItemRequest, module } from 'src/slices/program'
import LoadingScreen from 'src/components/LoadingScreen'
import Header from './Header'
import Topics from './Topics'
import Files from './Files'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%'
  }
}))

const ProfileView = ({ match }) => {
  const { programId } = match.params
  const dispatch = useDispatch()
  const { loading, data, topics } = useSelector((state) => state[module].item)
  const classes = useStyles()
  const [currentTab, setCurrentTab] = useState('topics')
  const tabs = [
    { value: 'topics', label: 'Topics' },
    { value: 'files', label: 'Files' },
  ]

  const handleTabsChange = (event, value) => {
    setCurrentTab(value)
  }

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
      title={data.title}
    >
      <Header program={data} />
      <Container maxWidth="lg">
        <Box mt={3}>
          <Tabs
            onChange={handleTabsChange}
            scrollButtons="auto"
            value={currentTab}
            textColor="secondary"
            variant="scrollable"
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
              />
            ))}
          </Tabs>
        </Box>
        <Divider />
        <Box
          py={3}
          pb={6}
        >
          {currentTab === 'topics' && <Topics topics={topics} />}
          {currentTab === 'files' && <Files files={[]} />}
        </Box>
      </Container>
    </Page>
  )
}

export default ProfileView
