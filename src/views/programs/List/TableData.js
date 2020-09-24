import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import { Link as RouterLink } from 'react-router-dom'
import { TableRow, Link, SvgIcon } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import {
  // Image as ImageIcon,
  Trash as DeleteIcon,
  Edit as EditIcon,
  ArrowRight as ArrowRightIcon,
} from 'react-feather'
import { PROGRAMS_URL, PUBLIC_PROGRAMS_URL } from 'src/constants'

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
})

function Row({ program, onDelete }) {
  const [open, setOpen] = React.useState(false)
  const classes = useRowStyles()

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          component="th"
          scope="row"
        >
          <Link
            color="inherit"
            component={RouterLink}
            to={`${PUBLIC_PROGRAMS_URL}/${program.id}`}
            variant="h6"
          >
            {program.title}
          </Link>
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
            to={{
              pathname: `${PUBLIC_PROGRAMS_URL}/${program.id}`,
              state: {
                fromDashboard: true
              }
            }}
          >
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
          >
            <Box margin={1}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
              >
                History
              </Typography>
              Information
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

Row.propTypes = {
  // row: PropTypes.shape({

  //   carbs: PropTypes.number.isRequired,
  //   fat: PropTypes.number.isRequired,
  //   history: PropTypes.arrayOf(
  //     PropTypes.shape({
  //       amount: PropTypes.number.isRequired,
  //       customerId: PropTypes.string.isRequired,
  //       date: PropTypes.string.isRequired,
  //     }),
  //   ).isRequired,
  //   name: PropTypes.string.isRequired,
  //   price: PropTypes.number.isRequired,
  //   protein: PropTypes.number.isRequired,
  // }).isRequired,
}

export default function CollapsibleTable({ data, onDelete }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Title</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((program) => (
            <Row
              key={program.id}
              program={program}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
