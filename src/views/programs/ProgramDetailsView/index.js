import React, {
  useState,
  useEffect
} from 'react'
import {
  Box,
  Container,
  Divider,
  Tabs,
  Tab,
  makeStyles
} from '@material-ui/core'
import Page from 'src/components/Page'
import { useSelector, useDispatch } from 'react-redux'
import { getProgram, module } from 'src/logic/programs'
import LoadingScreen from 'src/components/LoadingScreen'
import Overview from './Overview'
import Header from './Header'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}))

function ProgramDetailsView({ match }) {
  const { id } = match.params
  const classes = useStyles()
  const [currentTab, setCurrentTab] = useState('overview')
  const tabs = [
    { value: 'overview', label: 'Overview' },
    { value: 'files', label: 'Files' },
    { value: 'activity', label: 'Activity' },
    { value: 'subscribers', label: 'Subscribers' }
  ]

  const handleTabsChange = (event, value) => {
    setCurrentTab(value)
  }

  const dispatch = useDispatch()
  const { loading, data } = useSelector((state) => state[module].item)

  useEffect(() => {
    dispatch(getProgram({ id }))
  }, [dispatch, id])

  if (loading === 'reload') {
    return <span onClick={() => dispatch(getProgram({ id, reload: true }))}>Перезагрузить</span>
  } if (loading || !data) {
    return <LoadingScreen />
  }


  return (
    <Page
      className={classes.root}
      title="Program Details"
    >
      <Container maxWidth="lg">
        <Header program={data} />
        <Box mt={3}>
          <Tabs
            onChange={handleTabsChange}
            scrollButtons="auto"
            textColor="secondary"
            value={currentTab}
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
        <Box mt={3}>
          {currentTab === 'overview' && <Overview program={data} />}
          {/* {currentTab === 'files' && <Files files={program.files} />}
          {currentTab === 'activity' && <Activities activities={program.activities} />}
          {currentTab === 'subscribers' && <Subscribers subscribers={program.subscribers} />} */}
        </Box>
      </Container>
    </Page>
  )
}

export default ProgramDetailsView
