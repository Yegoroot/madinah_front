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
import {
  Hidden,
  TableRow, Link, SvgIcon, Grid
} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { useTranslation } from 'react-i18next'
import {
  Trash,
  Edit as EditIcon,
  ArrowRight as ArrowRightIcon,
} from 'react-feather'
import { PUBLIC_PROGRAMS_URL } from 'src/constants'
import moment from 'moment'

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
})

function Row({ topic, onDelete }) {
  const [open, setOpen] = React.useState(false)
  const classes = useRowStyles()
  const { t } = useTranslation()
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
            variant="h5"
            color={topic.publish ? 'primary' : 'error'}
            component={RouterLink}
            underline="none"
            to={{
              pathname: `${PUBLIC_PROGRAMS_URL}/${topic.program.id}/topics/${topic.id}`,
              state: {
                fromDashboard: true
              }
            }}
          >
            {topic.title}
          </Link>
        </TableCell>

        <Hidden mdDown>
          <TableCell
            component="th"
            scope="row"
          >
            {topic.program.title}
          </TableCell>

        </Hidden>
        <TableCell
          component="th"
          scope="row"
          style={{ paddingRight: 0 }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            <IconButton
              onClick={() => onDelete(topic.id)}
            >
              <SvgIcon fontSize="small">
                <Trash />
              </SvgIcon>
            </IconButton>
            <IconButton
              component={RouterLink}
              to={`/app/topics/${topic.id}/edit`}
            >
              <SvgIcon fontSize="small">
                <EditIcon />
              </SvgIcon>
            </IconButton>
            <IconButton
              component={RouterLink}
              to={`${PUBLIC_PROGRAMS_URL}/${topic.program.id}/topics/${topic.id}`}
            >
              <SvgIcon fontSize="small">
                <ArrowRightIcon />
              </SvgIcon>
            </IconButton>
          </Box>
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
                justify="space-between"
                spacing={3}
              >
                <Grid item>
                  <Typography
                    variant="h4"
                    gutterBottom
                    component="div"
                  >
                    {t('table.user')}
                  </Typography>
                  {topic.user ? topic.user.name : 'deleted'}
                  <br />
                  {topic.user ? topic.user.email : 'deleted'}
                </Grid>
                <Grid item>
                  <Typography
                    variant="h4"
                    gutterBottom
                    component="div"
                  >
                    {t('table.created')}
                  </Typography>
                  {moment(topic.createdAt).format('DD.MM.YYYY')}
                </Grid>

                <Grid item>
                  <Typography
                    variant="h4"
                    gutterBottom
                    component="div"
                  >
                    {t('table.program')}
                  </Typography>
                  {topic.program.title}
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
  topic: PropTypes.shape({
    publish: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    program: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })

  }).isRequired,
  onDelete: PropTypes.func.isRequired
}

export default function CollapsibleTable({ data, onDelete }) {
  const { t } = useTranslation()
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>{t('table.title')}</TableCell>
            <Hidden mdDown>
              <TableCell>{t('table.program')}</TableCell>
            </Hidden>
            <TableCell align="right">{t('table.actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((topic) => (
            <Row
              key={topic.id}
              topic={topic}
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
