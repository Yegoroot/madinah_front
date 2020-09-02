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
import { getNoteListRequest, deleteSeveralNotes, module } from 'src/slices/note'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { PROGRAMS_URL } from 'src/constants'
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
  const [selectedNotes, setSelectedNotes] = useState([])
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
    dispatch(getNoteListRequest({ page, limit }))
  }, [dispatch, filters, page, limit])

  if (loading || !data) {
    return <LoadingScreen />
  }

  const deleteNotesHandler = async (selected) => {
    dispatch(deleteSeveralNotes({ ids: selected }))
    setSelectedNotes([])
  }

  const handleSelectAllNotes = (event) => {
    setSelectedNotes(event.target.checked
      ? data.map((note) => note.id)
      : [])
  }

  const handleSelectOneNote = (event, noteId) => {
    if (!selectedNotes.includes(noteId)) {
      setSelectedNotes((prevSelected) => [...prevSelected, noteId])
    } else {
      setSelectedNotes((prevSelected) => prevSelected.filter((id) => id !== noteId))
    }
  }

  const handlePageChange = (event, newPage) => {
    setPage(newPage)
  }

  const handleLimitChange = (event) => {
    setPage(0)
    setLimit(event.target.value)
  }

  const enableBulkOperations = selectedNotes.length > 0
  const selectedSomeNotes = selectedNotes.length > 0 && selectedNotes.length < data.length
  const selectedAllNotes = selectedNotes.length === data.length

  return (
    <Page
      className={classes.root}
      title="My Notes List"
    >
      <Container maxWidth={false}>
        <Header />
        <Box mt={3}>
          <Card>
            {enableBulkOperations && (
              <div className={classes.bulkOperations}>
                <div className={classes.bulkActions}>
                  <Checkbox
                    checked={selectedAllNotes}
                    indeterminate={selectedSomeNotes}
                    onChange={handleSelectAllNotes}
                  />
                  <Button
                    variant="outlined"
                    onClick={() => deleteNotesHandler(selectedNotes)}
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
                          checked={selectedAllNotes}
                          indeterminate={selectedSomeNotes}
                          onChange={handleSelectAllNotes}
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
                        Topic
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
                    {data.map((note) => {
                      const isNoteSelected = selectedNotes.includes(note.id)

                      return (
                        <TableRow
                          hover
                          key={note.id}
                          selected={isNoteSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isNoteSelected}
                              onChange={(event) => handleSelectOneNote(event, note.id)}
                              value={isNoteSelected}
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
                                to={`${PROGRAMS_URL}/${note.topic.program.id}/topics/${note.topic.id}/notes/${note.id}`}
                              >
                                {note.title}
                              </Link>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <IsPublishLabel isPublish={note.publish} />
                          </TableCell>
                          <TableCell>
                            {note.user.name}
                            <br />
                            {note.user.email}
                          </TableCell>
                          <TableCell>
                            {`${note.topic.program.title}`}
                          </TableCell>
                          <TableCell>
                            {`${note.topic.title}`}
                          </TableCell>
                          <TableCell>
                            {moment(note.createdAt).format('DD.MM.YYYY')}
                          </TableCell>
                          <TableCell align="right">
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="flex-end"
                            >
                              <IconButton
                                component={RouterLink}
                                to={`${PROGRAMS_URL}/${note.topic.program.id}/topics/${note.topic.id}/notes/${note.id}/edit`}
                              >
                                <SvgIcon fontSize="small">
                                  <EditIcon />
                                </SvgIcon>
                              </IconButton>
                              <IconButton
                                component={RouterLink}
                                to={`${PROGRAMS_URL}/${note.topic.program.id}/topics/${note.topic.id}/notes/${note.id}`}
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
