/* eslint-disable max-len */
import React, { useState, useEffect } from 'react'
import {
  Box,
  Card,
  Container,
  TablePagination,
  Hidden,
  makeStyles
} from '@material-ui/core'
import Page from 'src/components/Page'
import LoadingScreen from 'src/components/LoadingScreen'
import { getTopicListRequest, deleteTopic, module } from 'src/slices/topic'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Header from './Header'
import TableDataMobile from './TableDataMobile'
import TableDataDesktop from './TableDataDesktop'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: 100
  }
}))

function Results() {
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10)
  const dispatch = useDispatch()
  const { loading, data } = useSelector((state) => state[module].list)
  let { total } = useSelector((state) => state[module].list)

  const { t } = useTranslation()
  const [filters] = useState({
    category: null,
    availability: null,
    inStock: null,
    isShippable: null
  })

  const onDelete = (topicId) => {
    if (window.confirm(t('alert.do you want to delete topic'))) {
      dispatch(deleteTopic({ topicId }))
      total -= 1
    }
  }

  useEffect(() => {
    const params = {
      page, limit
    }
    dispatch(getTopicListRequest({ params, type: 'private' }))
  }, [dispatch, filters, page, limit])

  if (loading || !data) {
    return <LoadingScreen />
  }

  const handlePageChange = (event, newPage) => {
    setPage(newPage)
  }

  const handleLimitChange = (event) => {
    setPage(0)
    setLimit(event.target.value)
  }

  return (
    <Page
      className={classes.root}
      title={t('admin.my topics')}
    >
      <Container maxWidth={false}>
        <Header />
        <Box mt={3}>
          <Card>
            <Hidden lgUp>
              <TableDataMobile
                data={data}
                onDelete={onDelete}
              />
            </Hidden>
            <Hidden mdDown>
              <TableDataDesktop
                data={data}
                onDelete={onDelete}
              />
            </Hidden>
            <TablePagination
              component="div"
              count={total}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              labelRowsPerPage={t('table.rows')}
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} ${t('table.from')} ${count}`}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Card>
        </Box>
      </Container>
    </Page>
  )
}

export default Results
