/* eslint-disable max-len */
import React, {
  useState,
  useEffect,
  useCallback
} from 'react'
import { Link as RouterLink } from 'react-router-dom'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import PerfectScrollbar from 'react-perfect-scrollbar'
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
  const [selectedCustomers, setSelectedCustomers] = useState([])
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10)

  /**
 *
 *
 * --------------
 */
  const isMountedRef = useIsMountedRef()
  const [customers, setCustomers] = useState([])

  const getCustomers = useCallback(() => {
    instanceAxios
      .get(`${API_BASE_URL}/users`)
      .then((response) => {
        if (isMountedRef.current) {
          setCustomers(response.data.data)
        }
      })
  }, [isMountedRef])

  useEffect(() => {
    getCustomers()
  }, [getCustomers])

  // if (!customers.length) {
  //   // return <LoadingScreen />
  // }
  /**
 *
 *
 *
* -------------------
*/

  const handleSelectAllCustomers = (event) => {
    setSelectedCustomers(event.target.checked
      ? customers.map((customer) => customer._id)
      : [])
  }

  const handleSelectOneCustomer = (event, customerId) => {
    if (!selectedCustomers.includes(customerId)) {
      setSelectedCustomers((prevSelected) => [...prevSelected, customerId])
    } else {
      setSelectedCustomers((prevSelected) => prevSelected.filter((id) => id !== customerId))
    }
  }

  const handlePageChange = (event, newPage) => {
    setPage(newPage)
  }

  const handleLimitChange = (event) => {
    setLimit(event.target.value)
  }

  const paginatedCustomers = customers
  const enableBulkOperations = selectedCustomers.length > 0
  const selectedSomeCustomers = selectedCustomers.length > 0 && selectedCustomers.length < customers.length
  const selectedAllCustomers = selectedCustomers.length === customers.length

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >

      {enableBulkOperations && (
        <div className={classes.bulkOperations}>
          <div className={classes.bulkActions}>
            <Checkbox
              checked={selectedAllCustomers}
              indeterminate={selectedSomeCustomers}
              onChange={handleSelectAllCustomers}
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
      <PerfectScrollbar>
        <Box minWidth={700}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAllCustomers}
                    indeterminate={selectedSomeCustomers}
                    onChange={handleSelectAllCustomers}
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
              {paginatedCustomers.map((customer) => {
                const isCustomerSelected = selectedCustomers.includes(customer._id)

                return (
                  <TableRow
                    hover
                    key={customer._id}
                    selected={isCustomerSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isCustomerSelected}
                        onChange={(event) => handleSelectOneCustomer(event, customer._id)}
                        value={isCustomerSelected}
                      />
                    </TableCell>
                    <TableCell>
                      <Box
                        display="flex"
                        alignItems="center"
                      >
                        <Avatar
                          className={classes.avatar}
                          src={customer.avatar}
                        >
                          {getInitials(customer.name)}
                        </Avatar>
                        <div>
                          <Link
                            color="inherit"
                            component={RouterLink}
                            to="/app/management/customers/1"
                            variant="h6"
                          >
                            {customer.name}
                          </Link>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                          >
                            {customer.email}
                          </Typography>
                        </div>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {customer.role}
                    </TableCell>
                    <TableCell>
                      {customer._id}
                    </TableCell>

                    <TableCell align="right">
                      <IconButton
                        component={RouterLink}
                        to="/app/management/customers/1/edit"
                      >
                        <SvgIcon fontSize="small">
                          <EditIcon />
                        </SvgIcon>
                      </IconButton>
                      <IconButton
                        component={RouterLink}
                        to="/app/management/customers/1"
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
        count={customers.length}
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
  customers: PropTypes.array
}

Results.defaultProps = {
  customers: []
}

export default Results
