import React, {
  // useState,
  useEffect
} from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Container,
  // Divider,
  // Tab,
  // Tabs,
  makeStyles
} from '@material-ui/core'
import Page from 'src/components/Page'
import { useSelector, useDispatch } from 'react-redux'
import { getProgramItemRequest, MODULE } from 'src/slices/program'
import LoadingScreen from 'src/components/LoadingScreen'
import Header from './Header'
import Topics from './Topics'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%'
  }
}))

const ProgramItem = ({ match, location }) => {
  const { programId } = match.params
  const dispatch = useDispatch()
  const { loading, data, topics } = useSelector((state) => state[MODULE].item)
  const classes = useStyles()

  useEffect(() => {
    dispatch(getProgramItemRequest({ programId }))
  }, [dispatch, programId])

  if (loading === 'reload') {
    return (
      <span onClick={() => dispatch(getProgramItemRequest({ programId, reload: true }))}>
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
      />
      {/* <Container maxWidth="lg"> */}
      <Container>
        {/* <Box mt={3}>
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
        </Box> */}

        <Topics
          topics={topics}
          programId={programId}
        />
        {/* <Divider />
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
        </Box> */}
      </Container>
    </Page>
  )
}

ProgramItem.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}
export default ProgramItem
