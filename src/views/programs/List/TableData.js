/* eslint-disable no-underscore-dangle */
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
import Label from 'src/components/Label'
import {
  TableRow, Link, SvgIcon, Grid
} from '@material-ui/core'
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
import Type from 'src/components/Type'
import moment from 'moment'

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
            color={program.publish ? 'primary' : 'error'}
            component={RouterLink}
            to={`${PUBLIC_PROGRAMS_URL}/${program.id}`}
            variant="h5"
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
            <Box
              margin={1}
              pb={2}
            >
              <Grid
                container
                spacing={3}
              >
                <Grid item>
                  <Typography
                    variant="h4"
                    gutterBottom
                    component="div"
                  >
                    User
                  </Typography>
                  {program.user.name}
                  <br />
                  {program.user.email}
                </Grid>
                <Grid item>
                  <Typography
                    variant="h4"
                    gutterBottom
                    component="div"
                  >
                    Created
                  </Typography>
                  {moment(program.createdAt).format('DD.MM.YYYY')}
                </Grid>
                <Grid item>
                  <Typography
                    variant="h4"
                    gutterBottom
                    component="div"
                  >
                    Types
                  </Typography>
                  <Box mx={-1}>
                    {program.types.map((type) => (
                      <Type
                        color={type.color}
                        key={type._id}
                      >
                        {type.title}
                      </Type>
                    ))}
                  </Box>
                </Grid>
                <Grid item>
                  <Typography
                    variant="h4"
                    gutterBottom
                    component="div"
                  >
                    Topics
                  </Typography>
                  {program.topics.map((topic) => (
                    <Label key={topic.id}>{topic.title}</Label>
                  ))}
                </Grid>

              </Grid>

            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

Row.propTypes = {
  program: PropTypes.shape({
    publish: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    topics: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    ).isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
    types: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
      }),
    ).isRequired,

  }).isRequired,
  onDelete: PropTypes.func.isRequired
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

CollapsibleTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onDelete: PropTypes.func.isRequired
}
