/* eslint-disable max-len */
import React, { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import {
  Box,
  Button,
  Card,
  Container,
  Checkbox,
  IconButton,
  Link,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  makeStyles
} from '@material-ui/core'
import {
  Edit as EditIcon,
  ArrowRight as ArrowRightIcon,
} from 'react-feather'
import IsPublishLabel from 'src/components/IsPublishLabel'
import Page from 'src/components/Page'
import LoadingScreen from 'src/components/LoadingScreen'
import { getTopicListRequest, deleteSeveralTopics, module } from 'src/slices/topic'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { PUBLIC_PROGRAMS_URL } from 'src/constants'
import Header from './Header'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: 100
  },
  bulkOperations: {
    position: 'relative'
  },
  bulkActions: {
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 6,
    position: 'absolute',
    width: '100%',
    zIndex: 2,
    backgroundColor: theme.palette.background.default
  },
  bulkAction: {
    marginLeft: theme.spacing(2)
  },
  queryField: {
    width: 500
  },
  categoryField: {
    flexBasis: 200
  },
  availabilityField: {
    marginLeft: theme.spacing(2),
    flexBasis: 200
  },
  stockField: {
    marginLeft: theme.spacing(2)
  },
  shippableField: {
    marginLeft: theme.spacing(2)
  },
  imageCell: {
    fontSize: 0,
    width: 68,
    flexBasis: 68,
    flexGrow: 0,
    flexShrink: 0
  },
  image: {
    height: 68,
    width: 68
  }
}))

function Results() {
  const classes = useStyles()
  const [selectedTopics, setSelectedTopics] = useState([])
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10)
  const dispatch = useDispatch()
  const { loading, data, total } = useSelector((state) => state[module].list)

  const [filters] = useState({
    category: null,
    availability: null,
    inStock: null,
    isShippable: null
  })

  useEffect(() => {
    dispatch(getTopicListRequest({ page, limit, type: 'private' }))
  }, [dispatch, filters, page, limit])

  if (loading || !data) {
    return <LoadingScreen />
  }

  const deleteTopicsHandler = async (selected) => {
    dispatch(deleteSeveralTopics({ ids: selected }))
    setSelectedTopics([])
  }

  const handleSelectAllTopics = (event) => {
    setSelectedTopics(event.target.checked
      ? data.map((topic) => topic.id)
      : [])
  }

  const handleSelectOneTopic = (event, topicId) => {
    if (!selectedTopics.includes(topicId)) {
      setSelectedTopics((prevSelected) => [...prevSelected, topicId])
    } else {
      setSelectedTopics((prevSelected) => prevSelected.filter((id) => id !== topicId))
    }
  }

  const handlePageChange = (event, newPage) => {
    setPage(newPage)
  }

  const handleLimitChange = (event) => {
    setPage(0)
    setLimit(event.target.value)
  }

  const enableBulkOperations = selectedTopics.length > 0
  const selectedSomeTopics = selectedTopics.length > 0 && selectedTopics.length < data.length
  const selectedAllTopics = selectedTopics.length === data.length

  return (
    <Page
      className={classes.root}
      title="My Topics List"
    >
      <Container maxWidth={false}>
        <Header />
        <Box mt={3}>
          <Card>
            {enableBulkOperations && (
              <div className={classes.bulkOperations}>
                <div className={classes.bulkActions}>
                  <Checkbox
                    checked={selectedAllTopics}
                    indeterminate={selectedSomeTopics}
                    onChange={handleSelectAllTopics}
                  />
                  <Button
                    variant="outlined"
                    onClick={() => deleteTopicsHandler(selectedTopics)}
                    className={classes.bulkAction}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            )}
            <PerfectScrollbar>
              <Box minWidth={1200}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedAllTopics}
                          indeterminate={selectedSomeTopics}
                          onChange={handleSelectAllTopics}
                        />
                      </TableCell>
                      <TableCell>
                        Title
                      </TableCell>
                      <TableCell>
                        Status
                      </TableCell>
                      <TableCell>
                        User
                      </TableCell>
                      <TableCell>
                        Program
                      </TableCell>
                      <TableCell>
                        Create
                      </TableCell>
                      <TableCell align="right">
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((topic) => {
                      const isTopicSelected = selectedTopics.includes(topic.id)

                      return (
                        <TableRow
                          hover
                          key={topic.id}
                          selected={isTopicSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isTopicSelected}
                              onChange={(event) => handleSelectOneTopic(event, topic.id)}
                              value={isTopicSelected}
                            />
                          </TableCell>
                          <TableCell>
                            <Box
                              display="flex"
                              alignItems="center"
                            >
                              <Link
                                variant="subtitle2"
                                color="textPrimary"
                                component={RouterLink}
                                underline="none"
                                to={{
                                  pathname: `${PUBLIC_PROGRAMS_URL}/${topic.program.id}/topics/${topic.id}`,
                                  state: {
                                    fromDashboard: true
                                  }
                                }}
                              >
                                {topic.title}
                              </Link>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <IsPublishLabel isPublish={topic.publish} />
                          </TableCell>
                          <TableCell>
                            {topic.user.name}
                            <br />
                            {topic.user.email}
                          </TableCell>
                          <TableCell>
                            {`${topic.program.title}`}
                          </TableCell>
                          <TableCell>
                            {moment(topic.createdAt).format('DD.MM.YYYY')}
                          </TableCell>
                          <TableCell align="right">
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="flex-end"
                            >
                              <IconButton
                                component={RouterLink}
                                to={`/app/topics/${topic.id}/edit`}
                              >
                                <SvgIcon fontSize="small">
                                  <EditIcon />
                                </SvgIcon>
                              </IconButton>
                              <IconButton
                                component={RouterLink}
                                to={`${PUBLIC_PROGRAMS_URL}/${topic.program.id}/topics/${topic.id}`}
                              >
                                <SvgIcon fontSize="small">
                                  <ArrowRightIcon />
                                </SvgIcon>
                              </IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
                <TablePagination
                  component="div"
                  count={total}
                  onChangePage={handlePageChange}
                  onChangeRowsPerPage={handleLimitChange}
                  page={page}
                  rowsPerPage={limit}
                  rowsPerPageOptions={[5, 10, 25]}
                />
              </Box>
            </PerfectScrollbar>
          </Card>
        </Box>
      </Container>
    </Page>
  )
}

export default Results
