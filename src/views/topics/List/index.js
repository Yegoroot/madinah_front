/* eslint-disable max-len */
import React, { useState, useEffect } from 'react'
import {
  Box,
  Card,
  Container,
  TablePagination,
  makeStyles
} from '@material-ui/core'
import Page from 'src/components/Page'
import LoadingScreen from 'src/components/LoadingScreen'
import { getTopicListRequest, deleteTopic, module } from 'src/slices/topic'
import { useSelector, useDispatch } from 'react-redux'
import Header from './Header'
import TableData from './TableData'

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

  const [filters] = useState({
    category: null,
    availability: null,
    inStock: null,
    isShippable: null
  })

  const onDelete = (topicId) => {
    if (window.confirm('Delete topic and all content inside?')) {
      dispatch(deleteTopic({ topicId }))
      total -= 1
    }
  }

  useEffect(() => {
    dispatch(getTopicListRequest({ page, limit, type: 'private' }))
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
      title="My Topics List"
    >
      <Container maxWidth={false}>
        <Header />
        <Box mt={3}>
          <Card>
            <TableData
              data={data}
              onDelete={onDelete}
            />
            <TablePagination
              component="div"
              count={total}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              labelRowsPerPage="Строк:"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} из ${count}`}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Card>
        </Box>
      </Container>
    </Page>
  )
}

export default Results
