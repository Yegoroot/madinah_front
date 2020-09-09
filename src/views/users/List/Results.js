/* eslint-disable max-len */
import React, {
  useState,
  useEffect,
  useCallback
} from 'react'
import { Link as RouterLink } from 'react-router-dom'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import {
  Avatar,
  Box,
  Card,
  IconButton,
  Link,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  // TablePagination,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core'
import {
  Edit as EditIcon,
  Trash,
} from 'react-feather'
import getInitials from 'src/utils/getInitials'
import { instanceAxios } from 'src/utils/axios'
import useIsMountedRef from 'src/hooks/useIsMountedRef'
import { API_BASE_URL } from 'src/constants'
import { useSnackbar } from 'notistack'

const useStyles = makeStyles((theme) => ({
  root: {},
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
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1)
  }
}))

function Results({ className, ...rest }) {
  const classes = useStyles()
  // const [page, setPage] = useState(0)
  // const [limit, setLimit] = useState(10)
  const { enqueueSnackbar } = useSnackbar()

  // const dispatch = useDispatch()
  const isMountedRef = useIsMountedRef()
  const [users, setUsers] = useState([])

  const getUsers = useCallback(() => {
    instanceAxios
      .get(`${API_BASE_URL}/users`)
      .then((response) => {
        if (isMountedRef.current) {
          setUsers(response.data.data)
        }
      })
  }, [isMountedRef])

  useEffect(() => {
    getUsers()
  }, [getUsers])

  const onDelete = (id) => {
    if (window.confirm('do you want to delete this user?')) {
      instanceAxios
        .delete(`${API_BASE_URL}/users/${id}`)
        .then(() => {
          enqueueSnackbar('User was deleted', { variant: 'success' })
          const newUsers = users.filter((u) => u._id !== id)
          console.log(newUsers)
          setUsers(newUsers)
        })
        .catch(() => {
          enqueueSnackbar('User wasnt deleted', { variant: 'error' })
        })
    }
  }

  // const handlePageChange = (event, newPage) => {
  //   setPage(newPage)
  // }

  // const handleLimitChange = (event) => {
  //   setLimit(event.target.value)
  // }

  return (
    <Card
      style={{ overflow: 'auto' }}
      className={clsx(classes.root, className)}
      {...rest}
    >

      <Box minWidth={700}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Name
              </TableCell>
              <TableCell>
                Role
              </TableCell>
              <TableCell>
                Id
              </TableCell>
              <TableCell align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                hover
                key={user._id}
              >

                <TableCell>
                  <Box
                    display="flex"
                    alignItems="center"
                  >
                    <Avatar
                      className={classes.avatar}
                      src={user.avatar}
                    >
                      {getInitials(user.name)}
                    </Avatar>
                    <div>
                      <Link
                        color="inherit"
                        component={RouterLink}
                        to={`/app/users/${user._id}`}
                        variant="h6"
                      >
                        {user.name}
                      </Link>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                      >
                        {user.email}
                      </Typography>
                    </div>
                  </Box>
                </TableCell>
                <TableCell>
                  {user.role}
                </TableCell>
                <TableCell>
                  {user._id}
                </TableCell>

                <TableCell align="right">
                  <IconButton
                    component={RouterLink}
                    to={`/app/users/${user._id}/edit`}
                  >
                    <SvgIcon fontSize="small">
                      <EditIcon />
                    </SvgIcon>
                  </IconButton>
                  <IconButton
                    component={RouterLink}
                    onClick={() => onDelete(user._id)}
                  >
                    <SvgIcon fontSize="small">
                      <Trash />
                    </SvgIcon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      {/* <TablePagination
        component="div"
        count={users.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      /> */}
    </Card>
  )
}

Results.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array
}

Results.defaultProps = {
  users: []
}

export default Results
