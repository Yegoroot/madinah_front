/* eslint-disable max-len */
import React, { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { /* IMAGES_BASE_URL, */PROGRAMS_URL, PUBLIC_PROGRAMS_URL } from 'src/constants'
import Label from 'src/components/Label'
import {
  // Avatar,
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
// import getInitials from 'src/utils/getInitials'
import {
  // Image as ImageIcon,
  Edit as EditIcon,
  ArrowRight as ArrowRightIcon,
} from 'react-feather'
import IsPublishLabel from 'src/components/IsPublishLabel'
import { useSelector, useDispatch } from 'react-redux'
import { getProgramListRequest, module } from 'src/slices/program'
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
  const [selectedPrograms, setSelectedPrograms] = useState([])
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
    const params = {
      page, limit
    }
    dispatch(getProgramListRequest({ params }))
  }, [dispatch, page, limit, filters])

  const onDelete = () => {
    // dispatch(deleteSeveralPrograms({ ids: selectedPrograms }))
  }

  if (loading === 'reload') {
    const params = {
      page, limit
    }
    return <span onClick={() => dispatch(getProgramListRequest({ params, reload: true }))}>Перезагрузить</span>
  } if (loading || !data) {
    return <LoadingScreen />
  }

  const handleSelectAllPrograms = (event) => {
    setSelectedPrograms(event.target.checked
      ? data.map((program) => program.id)
      : [])
  }

  const handleSelectOneProgram = (event, programId) => {
    if (!selectedPrograms.includes(programId)) {
      setSelectedPrograms((prevSelected) => [...prevSelected, programId])
    } else {
      setSelectedPrograms((prevSelected) => prevSelected.filter((id) => id !== programId))
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
  const enableBulkOperations = selectedPrograms.length > 0
  const selectedSomePrograms = selectedPrograms.length > 0 && selectedPrograms.length < data.length
  const selectedAllPrograms = selectedPrograms.length === data.length

  return (
    <Page
      className={classes.root}
      title="Program List"
    >
      <Container maxWidth={false}>
        <Header />

        <Box mt={3}>
          <Card>
            {enableBulkOperations && (
              <div className={classes.bulkOperations}>
                <div className={classes.bulkActions}>
                  <Checkbox
                    checked={selectedAllPrograms}
                    indeterminate={selectedSomePrograms}
                    onChange={handleSelectAllPrograms}
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
                          checked={selectedAllPrograms}
                          indeterminate={selectedSomePrograms}
                          onChange={handleSelectAllPrograms}
                        />
                      </TableCell>
                      {/* <TableCell /> */}
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
                        Topics
                      </TableCell>
                      <TableCell>
                        Created
                      </TableCell>
                      <TableCell align="right">
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((program) => {
                      const isProgramSelected = selectedPrograms.includes(program.id)

                      return (
                        <TableRow
                          hover
                          key={program.id}
                          selected={isProgramSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isProgramSelected}
                              onChange={(event) => handleSelectOneProgram(event, program.id)}
                              value={isProgramSelected}
                            />
                          </TableCell>
                          {/* <TableCell className={classes.imageCell}>
                            {program.photo ? (
                              <img
                                alt="Program"
                                src={`${IMAGES_BASE_URL}/${program.photo}`}
                                className={classes.image}
                              />
                            ) : (

                              <Avatar
                                variant="square"
                                className={classes.image}
                              >
                                { getInitials(program.title)}
                              </Avatar>

                            )}
                          </TableCell> */}
                          <TableCell>
                            <Box
                              display="flex"
                              alignItems="center"
                            >

                              <div>
                                <Link
                                  color="inherit"
                                  component={RouterLink}
                                  to={`${PUBLIC_PROGRAMS_URL}/${program.id}`}
                                  variant="h6"
                                >
                                  {program.title}
                                </Link>
                                <Typography
                                  variant="body2"
                                  tag="span"
                                  color="textSecondary"
                                >
                                  {program.description}
                                </Typography>
                              </div>
                            </Box>
                          </TableCell>

                          <TableCell>
                            {program.user.name}
                            <br />
                            {program.user.email}
                          </TableCell>
                          <TableCell>
                            <IsPublishLabel isPublish={program.publish} />
                          </TableCell>
                          <TableCell>
                            {program.topics.map((topic) => (
                              <Label>
                                {' '}
                                {topic.title}
                                {' '}
                              </Label>
                            ))}
                          </TableCell>
                          <TableCell>
                            {moment(program.createdAt).format('DD.MM.YYYY')}
                          </TableCell>

                          <TableCell align="right">
                            <IconButton
                              component={RouterLink}
                              to={`${PROGRAMS_URL}/${program.id}/edit`}
                            >
                              <SvgIcon fontSize="small">
                                <EditIcon />
                              </SvgIcon>
                            </IconButton>
                            <IconButton
                              component={RouterLink}
                              to={`${PROGRAMS_URL}/${program.id}`}
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
