import React, {
  useState,
  useEffect
} from 'react'
import PropTypes from 'prop-types'
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
import useAuth from 'src/hooks/useAuth'
// eslint-disable-next-line camelcase
import { get_item } from 'src/utils/permissions'
import Header from './Header'
import Topics from './Topics'
import Files from './Files'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%'
  }
}))

const ProgramItem = ({ match, location }) => {
  const { programId } = match.params
  const dispatch = useDispatch()
  const { loading, data, topics } = useSelector((state) => state[module].item)
  const classes = useStyles()
  const [currentTab, setCurrentTab] = useState('topics')
  const { user } = useAuth()
  const tabs = [
    { value: 'topics', label: 'Topics' },
    { value: 'files', label: 'Files' },
  ]
  const handleTabsChange = (event, value) => {
    setCurrentTab(value)
  }

  const type = get_item({ location, user }) ? 'private' : ''

  useEffect(() => {
    dispatch(getProgramItemRequest({ programId, type }))
  }, [dispatch, programId, type])

  if (loading === 'reload') {
    return (
      <span onClick={() => dispatch(getProgramItemRequest({ programId, type, reload: true }))}>
        Перезагрузить
      </span>
    )
  }
  if (loading || !data) {
    return <LoadingScreen />
  }

  return (
    <Page
      className={classes.root}
      title={data.title}
    >
      <Header
        program={data}
        topics={topics}
        type={type}
      />
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
          {currentTab === 'topics' && (
          <Topics
            topics={topics}
            programId={programId}
          />
          )}
          {currentTab === 'files' && <Files files={[]} />}
        </Box>
      </Container>
    </Page>
  )
}

ProgramItem.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}
export default ProgramItem
