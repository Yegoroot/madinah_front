/* eslint-disable max-len */
import React, { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { /* IMAGES_BASE_URL, */PROGRAMS_URL, PUBLIC_PROGRAMS_URL } from 'src/constants'
import Label from 'src/components/Label'
import {
  // Avatar,
  Box,
  Card,
  IconButton,
  Link,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Container,
  makeStyles
} from '@material-ui/core'
import Page from 'src/components/Page'

import {
  // Image as ImageIcon,
  Trash as DeleteIcon,
  Edit as EditIcon,
  ArrowRight as ArrowRightIcon,
} from 'react-feather'
import IsPublishLabel from 'src/components/IsPublishLabel'
import { useSelector, useDispatch } from 'react-redux'
import { getProgramListRequest, module, deleteProgram } from 'src/slices/program'
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

  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10)

  // const [sort, setSort] = useState(sortOptions[0].value)
  const [filters] = useState({
    isProspect: null,
    isReturning: null,
    acceptsMarketing: null
  })

  const dispatch = useDispatch()
  const { loading, data, } = useSelector((state) => state[module].list)
  let { total } = useSelector((state) => state[module].list)

  useEffect(() => {
    const params = {
      page, limit
    }
    dispatch(getProgramListRequest({ params, type: 'private' }))
  }, [dispatch, page, limit, filters])

  const onDelete = (programId) => {
    if (window.confirm('Delete program and all topics inside')) {
      dispatch(deleteProgram({ programId }))
      total -= 1
    }
  }

  if (loading === 'reload') {
    const params = {
      page, limit
    }
    return <span onClick={() => dispatch(getProgramListRequest({ params, reload: true, type: 'private' }))}>Перезагрузить</span>
  } if (loading || !data) {
    return <LoadingScreen />
  }

  const handlePageChange = (event, newPage) => {
    setPage(newPage)
  }

  const handleLimitChange = (event) => {
    setPage(0)
    setLimit(event.target.value)
  }

  return (
    <Page
      className={classes.root}
      title="Program List"
    >
      <Container maxWidth={false}>
        <Header />

        <Box mt={3}>
          <Card>
            <PerfectScrollbar>
              <Box minWidth={700}>
                <Table>
                  <TableHead>
                    <TableRow>
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
                    {data.map((program) => (
                      <TableRow
                        hover
                        key={program.id}
                      >
                        <TableCell>
                          <Link
                            color="inherit"
                            component={RouterLink}
                            to={`${PUBLIC_PROGRAMS_URL}/${program.id}`}
                            variant="h6"
                          >
                            {program.title}
                          </Link>

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
                            <Label key={topic.id}>
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
                            onClick={() => onDelete(program.id)}
                          >
                            <SvgIcon fontSize="small">
                              <DeleteIcon />
                            </SvgIcon>
                          </IconButton>
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
                            to={`${PUBLIC_PROGRAMS_URL}/${program.id}`}
                          >
                            <SvgIcon fontSize="small">
                              <ArrowRightIcon />
                            </SvgIcon>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
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
