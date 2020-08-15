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
  Image as ImageIcon,
  Edit as EditIcon,
  ArrowRight as ArrowRightIcon,
} from 'react-feather'
// import Label from 'src/components/Label'
import IsPublishLabel from 'src/components/IsPublishLabel'
import Page from 'src/components/Page'
import LoadingScreen from 'src/components/LoadingScreen'
import { getNotes, deleteNotes, module } from 'src/logic/notes'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import Header from './Header'

// function getInventoryLabel(inventoryType) {
//   const getObj = (level) => {
//     switch (level) {
//       case 1:
//         return {
//           text: 'Первый Уровень',
//           color: 'success'
//         }
//       case 2:
//         return {
//           text: 'Второй Уровень',
//           color: 'success'
//         }
//       // eslint-disable-next-line no-sequences
//       case 3, 4, 5, 6:
//         return {
//           text: 'Третий Уровень',
//           color: 'warning'
//         }
//       default:
//         return {
//           text: 'Не определен',
//           color: 'error'
//         }
//     }
//   }
//   const { text, color } = getObj(inventoryType)
//   return (
//     <Label color={color}>
//       {text}
//     </Label>
//   )
// }

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
  // const [sort, setSort] = useState(sortOptions[0].value)
  const dispatch = useDispatch()
  const loading = useSelector((state) => state[module].loading)
  const notes = useSelector((state) => state[module].notes.data)
  const total = useSelector((state) => state[module].notes.total)
  const [filters] = useState({
    category: null,
    availability: null,
    inStock: null,
    isShippable: null
  })

  useEffect(() => {
    dispatch(getNotes({ page, limit }))
  }, [dispatch, filters, page, limit])

  if (loading) {
    return <LoadingScreen />
  }

  const deleteNotesHandler = async (selected) => {
    dispatch(deleteNotes(selected))
    setSelectedNotes([])
  }

  const handleSelectAllNotes = (event) => {
    setSelectedNotes(event.target.checked
      ? notes.map((note) => note.id)
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
  const selectedSomeNotes = selectedNotes.length > 0 && selectedNotes.length < notes.length
  const selectedAllNotes = selectedNotes.length === notes.length

  return (
    <Page
      className={classes.root}
      title="Notes List"
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
                      <TableCell />
                      <TableCell>
                        Title
                      </TableCell>
                      <TableCell>
                        Status
                      </TableCell>
                      <TableCell>
                        User
                      </TableCell>
                      {/* <TableCell>
                        Level
                      </TableCell> */}
                      <TableCell>
                        Topics
                      </TableCell>
                      <TableCell>
                        Create
                      </TableCell>
                      <TableCell>
                        Update
                      </TableCell>
                      <TableCell align="right">
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {notes.map((note) => {
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
                          <TableCell className={classes.imageCell}>
                            {note.image ? (
                              <img
                                alt="Note"
                                src={note.image}
                                className={classes.image}
                              />
                            ) : (
                              <Box
                                p={2}
                                bgcolor="background.dark"
                              >
                                <SvgIcon>
                                  <ImageIcon />
                                </SvgIcon>
                              </Box>
                            )}
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
                                to={`/app/management/notes/${note.id}`}
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
                          {/* <TableCell>
                            {getInventoryLabel(note.level)}
                          </TableCell> */}
                          <TableCell>
                            {note.topic.length > 0 ? `Topics: ${note.topic.map((item) => item.title)}` : 'Не определен'}
                          </TableCell>
                          <TableCell>
                            {moment(note.createdAt).format('DD.MM.YYYY')}
                          </TableCell>
                          <TableCell>
                            {moment(note.updatedAt).format('DD.MM.YYYY')}
                          </TableCell>
                          <TableCell align="right">
                            <Box
                              display="flex"
                              alignItems="center"
                            >
                              <IconButton
                                component={RouterLink}
                                to={`/app/management/notes/${note.id}/edit`}
                              >
                                <SvgIcon fontSize="small">
                                  <EditIcon />
                                </SvgIcon>
                              </IconButton>
                              <IconButton
                                component={RouterLink}
                                to={`/app/management/notes/${note.id}`}
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
