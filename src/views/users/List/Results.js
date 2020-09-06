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
  makeStyles
} from '@material-ui/core'
import {
  Edit as EditIcon,
  ArrowRight as ArrowRightIcon,
} from 'react-feather'
import getInitials from 'src/utils/getInitials'
// import LoadingScreen from 'src/components/LoadingScreen'
import { instanceAxios } from 'src/utils/axios'
import useIsMountedRef from 'src/hooks/useIsMountedRef'
import { API_BASE_URL } from 'src/constants'

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
  const [selectedUsers, setSelectedUsers] = useState([])
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10)

  /**
 *
 *
 * --------------
 */
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

  // if (!users.length) {
  //   // return <LoadingScreen />
  // }
  /**
 *
 *
 *
* -------------------
*/

  const handleSelectAllUsers = (event) => {
    setSelectedUsers(event.target.checked
      ? users.map((user) => user._id)
      : [])
  }

  const handleSelectOneUser = (event, userId) => {
    if (!selectedUsers.includes(userId)) {
      setSelectedUsers((prevSelected) => [...prevSelected, userId])
    } else {
      setSelectedUsers((prevSelected) => prevSelected.filter((id) => id !== userId))
    }
  }

  const handlePageChange = (event, newPage) => {
    setPage(newPage)
  }

  const handleLimitChange = (event) => {
    setLimit(event.target.value)
  }

  const paginatedUsers = users
  const enableBulkOperations = selectedUsers.length > 0
  const selectedSomeUsers = selectedUsers.length > 0 && selectedUsers.length < users.length
  const selectedAllUsers = selectedUsers.length === users.length

  return (
    <Card
      style={{ overflow: 'auto' }}
      className={clsx(classes.root, className)}
      {...rest}
    >

      {enableBulkOperations && (
        <div className={classes.bulkOperations}>
          <div className={classes.bulkActions}>
            <Checkbox
              checked={selectedAllUsers}
              indeterminate={selectedSomeUsers}
              onChange={handleSelectAllUsers}
            />
            <Button
              variant="outlined"
              className={classes.bulkAction}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              className={classes.bulkAction}
            >
              Edit
            </Button>
          </div>
        </div>
      )}
      <Box minWidth={700}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAllUsers}
                  indeterminate={selectedSomeUsers}
                  onChange={handleSelectAllUsers}
                />
              </TableCell>
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
            {paginatedUsers.map((user) => {
              const isUserSelected = selectedUsers.includes(user._id)

              return (
                <TableRow
                  hover
                  key={user._id}
                  selected={isUserSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isUserSelected}
                      onChange={(event) => handleSelectOneUser(event, user._id)}
                      value={isUserSelected}
                    />
                  </TableCell>
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
                      to={`/app/users/${user._id}`}
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
      <TablePagination
        component="div"
        count={users.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
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
