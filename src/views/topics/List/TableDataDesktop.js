/* eslint-disable max-len */
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import {
  Box,
  IconButton,
  Link,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core'
import {
  Edit as EditIcon,
  Trash,
  ArrowRight as ArrowRightIcon,
} from 'react-feather'
import IsPublishLabel from 'src/components/IsPublishLabel'

import moment from 'moment'
import { PUBLIC_PROGRAMS_URL } from 'src/constants'

function Results({ data, onDelete }) {
  return (

    <Table>
      <TableHead>
        <TableRow>
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
            Create
          </TableCell>
          <TableCell align="right">
            Actions
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((topic) => (
          <TableRow
            hover
            key={topic.id}
          >
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
                  to={{
                    pathname: `${PUBLIC_PROGRAMS_URL}/${topic.program.id}/topics/${topic.id}`,
                    state: {
                      fromDashboard: true
                    }
                  }}
                >
                  {topic.title}
                </Link>
              </Box>
            </TableCell>
            <TableCell>
              <IsPublishLabel isPublish={topic.publish} />
            </TableCell>
            <TableCell>
              {topic.user.name}
              <br />
              {topic.user.email}
            </TableCell>
            <TableCell>
              {`${topic.program.title}`}
            </TableCell>
            <TableCell>
              {moment(topic.createdAt).format('DD.MM.YYYY')}
            </TableCell>
            <TableCell align="right">
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
                  to={{
                    pathname: `${PUBLIC_PROGRAMS_URL}/${topic.program.id}/topics/${topic.id}`,
                    state: {
                      fromDashboard: true
                    }
                  }}
                >
                  <SvgIcon fontSize="small">
                    <ArrowRightIcon />
                  </SvgIcon>
                </IconButton>
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default Results
