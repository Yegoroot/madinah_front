/* eslint-disable max-len */
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { PROGRAMS_URL, PUBLIC_PROGRAMS_URL } from 'src/constants'
import Label from 'src/components/Label'
import {
  IconButton,
  Link,
  SvgIcon,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core'

import {
  Trash as DeleteIcon,
  Edit as EditIcon,
  ArrowRight as ArrowRightIcon,
} from 'react-feather'
import IsPublishLabel from 'src/components/IsPublishLabel'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import Type from 'src/components/Type'

function Results({ data, onDelete }) {
  const { t } = useTranslation()
  return (

    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            {t('table.title')}
          </TableCell>
          <TableCell>
            {t('table.user')}
          </TableCell>
          <TableCell>
            {t('table.types')}
          </TableCell>
          <TableCell>
            {t('table.status')}
          </TableCell>
          <TableCell>
            {t('table.topics')}
          </TableCell>
          <TableCell>
            {t('table.created')}
          </TableCell>
          <TableCell align="right">
            {t('table.actions')}
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
                to={{
                  pathname: `${PUBLIC_PROGRAMS_URL}/${program.id}`,
                  state: {
                    fromDashboard: true
                  }
                }}
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
              {program.types.map((type) => (
                <Type
                  color={type.color}
                  key={type._id}
                >
                  {type.title}
                </Type>
              ))}
            </TableCell>
            <TableCell>
              <IsPublishLabel isPublish={program.publish} />
            </TableCell>
            <TableCell>
              {program.topics.map((topic) => (
                <Label key={topic.id}>{topic.title}</Label>
              ))}
            </TableCell>
            <TableCell>
              {moment(program.createdAt).format('DD.MM.YYYY')}
            </TableCell>

            <TableCell align="right">
              <Box
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
              >
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
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

  )
}

export default Results
