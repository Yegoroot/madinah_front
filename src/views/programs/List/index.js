/* eslint-disable max-len */
import React, { useState, useEffect } from 'react'
import {
  Box,
  Card,
  TablePagination,
  Container,
  Hidden,
  makeStyles
} from '@material-ui/core'
import Page from 'src/components/Page'
import { useSelector, useDispatch } from 'react-redux'
import { getProgramListRequest, MODULE, deleteProgram } from 'src/slices/program'
import ReloadData from 'src/components/ReloadData'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useTranslation } from 'react-i18next'
import Header from './Header'
import TableDataMobile from './TableDataMobile'
import TableDataDesktop from './TableDataDesktop'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}))

function Results() {
  const classes = useStyles()
  const { t } = useTranslation()
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10)

  // const [sort, setSort] = useState(sortOptions[0].value)
  const [filters] = useState({
    isProspect: null,
    isReturning: null,
    acceptsMarketing: null
  })

  const dispatch = useDispatch()
  const { loading, data, } = useSelector((state) => state[MODULE].list)
  let { total } = useSelector((state) => state[MODULE].list)

  useEffect(() => {
    const params = {
      page, limit, fromDashboard: true
    }
    dispatch(getProgramListRequest({ params }))
  }, [dispatch, page, limit, filters])

  const onDelete = (programId) => {
    if (window.confirm(t('alert.do you want to delete program'))) {
      dispatch(deleteProgram({ programId }))
      total -= 1
    }
  }

  const params = {
    page, limit, fromDashboard: true
  }
  if (loading || !data) {
    return (
      <ReloadData
        loading={loading}
        data={data}
        onClick={() => dispatch(getProgramListRequest({ params, reload: true }))}
      />
    )
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
      title={t('admin.my programs')}
    >
      <Container maxWidth={false}>
        <Header />

        <Box mt={3}>
          <Card>
            <Hidden mdDown>
              <PerfectScrollbar>
                <TableDataDesktop
                  data={data}
                  onDelete={onDelete}
                />
              </PerfectScrollbar>
            </Hidden>
            <Hidden lgUp>
              <TableDataMobile
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
              labelRowsPerPage={`${t('table.rows')}:`}
              labelDisplayedRows={({ from, to, count }) => `${from} - ${to} ${t('table.from')} ${count}`}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 35]}
            />

          </Card>
        </Box>
      </Container>
    </Page>
  )
}

export default Results
