/* eslint-disable max-len */
import React, { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { IMAGES_BASE_URL, TOPICS_URL } from 'src/constants'
import {
  Avatar,
  Box,
  Button,
  Card,
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
  Typography,
  Container,
  makeStyles
} from '@material-ui/core'
import Page from 'src/components/Page'
import getInitials from 'src/utils/getInitials'
import {
  // Image as ImageIcon,
  Edit as EditIcon,
  ArrowRight as ArrowRightIcon,
} from 'react-feather'
import IsPublishLabel from 'src/components/IsPublishLabel'
import { useSelector, useDispatch } from 'react-redux'
import { getTopicListRequest, deleteSeveralTopics, module } from 'src/slices/topic'
import LoadingScreen from 'src/components/LoadingScreen'
import moment from 'moment'
import Header from './Header'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  queryField: {
    width: 500
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
  imageCell: {
    fontSize: 0,
    width: 68,
    flexBasis: 68,
    flexGrow: 0,
    flexShrink: 0
  },
  image: {
    backgroundColor: theme.palette.background.dark,
    color: '#fff',
    height: 68,
    width: 68
  }
}))

function Results() {
  const classes = useStyles()
  // const [currentTab, setCurrentTab] = useState('all')
  const [selectedTopics, setSelectedTopics] = useState([])
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10)

  // const [sort, setSort] = useState(sortOptions[0].value)
  const [filters] = useState({
    isProspect: null,
    isReturning: null,
    acceptsMarketing: null
  })

  const dispatch = useDispatch()
  const { loading, data, total } = useSelector((state) => state[module].list)

  useEffect(() => {
    dispatch(getTopicListRequest({ page, limit }))
  }, [dispatch, page, limit, filters])

  const onDelete = () => {
    dispatch(deleteSeveralTopics(selectedTopics))
  }

  if (loading === 'reload') {
    return <span onClick={() => dispatch(getTopicListRequest({ params: {}, reload: true }))}>Перезагрузить</span>
  } if (loading || !data) {
    return <LoadingScreen />
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

  // Usually query is done on backend with indexing solutions
  const enableBulkOperations = selectedTopics.length > 0
  const selectedSomeTopics = selectedTopics.length > 0 && selectedTopics.length < data.length
  const selectedAllTopics = selectedTopics.length === data.length

  return (
    <Page
      className={classes.root}
      title="Topic List"
    >
      <Container maxWidth={false}>
        <Header />

        <Box mt={5}>
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
                    onClick={onDelete}
                    className={classes.bulkAction}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            )}
            <PerfectScrollbar>
              <Box minWidth={700}>
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
                      <TableCell />
                      <TableCell>
                        Title
                      </TableCell>
                      <TableCell>
                        User
                      </TableCell>
                      <TableCell>
                        Status
                      </TableCell>
                      <TableCell>
                        Created
                      </TableCell>
                      <TableCell>
                        Updated
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
                          <TableCell className={classes.imageCell}>
                            {topic.photo ? (
                              <img
                                alt="Topic"
                                src={`${IMAGES_BASE_URL}/${topic.photo}`}
                                className={classes.image}
                              />
                            ) : (

                              <Avatar
                                variant="square"
                                className={classes.image}
                              >
                                { getInitials(topic.title)}
                              </Avatar>

                            )}
                          </TableCell>
                          <TableCell>
                            <Box
                              display="flex"
                              alignItems="center"
                            >

                              <div>
                                <Link
                                  color="inherit"
                                  component={RouterLink}
                                  to={`${TOPICS_URL}/${topic.id}`}
                                  variant="h6"
                                >
                                  {topic.title}
                                </Link>
                                <Typography
                                  variant="body2"
                                  tag="span"
                                  color="textSecondary"
                                >
                                  {topic.description}
                                </Typography>
                              </div>
                            </Box>
                          </TableCell>

                          <TableCell>
                            {topic.user.name}
                            <br />
                            {topic.user.email}
                          </TableCell>
                          <TableCell>
                            <IsPublishLabel isPublish={topic.publish} />
                          </TableCell>
                          <TableCell>
                            {moment(topic.createdAt).format('DD.MM.YYYY')}
                          </TableCell>
                          <TableCell>
                            {moment(topic.updatedAt).format('DD.MM.YYYY')}
                          </TableCell>

                          <TableCell align="right">
                            <IconButton
                              component={RouterLink}
                              to={`${TOPICS_URL}/${topic._id}/edit`}
                            >
                              <SvgIcon fontSize="small">
                                <EditIcon />
                              </SvgIcon>
                            </IconButton>
                            <IconButton
                              component={RouterLink}
                              to={`${TOPICS_URL}/${topic.id}`}
                            >
                              <SvgIcon fontSize="small">
                                <ArrowRightIcon />
                              </SvgIcon>
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>
            <TablePagination
              component="div"
              count={total}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Card>
        </Box>
      </Container>
    </Page>
  )
}

export default Results
