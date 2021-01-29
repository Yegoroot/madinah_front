/* eslint-disable no-underscore-dangle */
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
  Box,
  Card,
  IconButton,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles
} from '@material-ui/core'
import {
  Edit as EditIcon,
  Trash,
} from 'react-feather'
import { useTranslation } from 'react-i18next'

// import LoadingScreen from 'src/components/LoadingScreen'
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
  const { enqueueSnackbar } = useSnackbar()
  const classes = useStyles()

  const { t } = useTranslation()
  /**
 *
 *
 * --------------
 */
  const isMountedRef = useIsMountedRef()
  const [types, setTypes] = useState([])

  const getTypes = useCallback(() => {
    instanceAxios
      .get(`${API_BASE_URL}/types`)
      .then((response) => {
        if (isMountedRef.current) {
          setTypes(response.data.data)
        }
      })
  }, [isMountedRef])

  useEffect(() => {
    getTypes()
  }, [getTypes])

  const onDelete = (id) => {
    // eslint-disable-next-line no-alert
    if (window.confirm('do you want to delete this type?')) {
      instanceAxios
        .delete(`${API_BASE_URL}/types/${id}`)
        .then(() => {
          enqueueSnackbar('Type was deleted', { variant: 'success' })
          const newTypes = types.filter((u) => u._id !== id)
          console.log(newTypes)
          setTypes(newTypes)
        })
        .catch(() => {
          enqueueSnackbar('Type wasnt deleted', { variant: 'error' })
        })
    }
  }

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
                {t('table.title')}
              </TableCell>
              <TableCell>
                {t('table.alias')}
              </TableCell>
              <TableCell>
                {t('table.color')}
              </TableCell>
              <TableCell>
                {t('table.id')}
              </TableCell>
              <TableCell align="right">
                {t('table.actions')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {types.map((type) => (
              <TableRow
                hover
                key={type._id}
              >
                <TableCell>
                  {type.title}
                </TableCell>
                <TableCell>
                  {type.alias}
                </TableCell>
                <TableCell>
                  <span style={{ color: type.color }}>{type.color}</span>
                </TableCell>
                <TableCell>
                  {type._id}
                </TableCell>

                <TableCell align="right">
                  <IconButton
                    component={RouterLink}
                    to={`/app/types/${type._id}/edit`}
                  >
                    <SvgIcon fontSize="small">
                      <EditIcon />
                    </SvgIcon>
                  </IconButton>
                  <IconButton
                    onClick={() => onDelete(type._id)}
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
    </Card>
  )
}

Results.propTypes = {
  className: PropTypes.string,
  types: PropTypes.array
}

Results.defaultProps = {
  types: []
}

export default Results
