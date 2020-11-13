import React, {
// useState,
// useEffect,
// useCallback
} from 'react'
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core'
// import axios from 'src/utils/axios'
// import useIsMountedRef from 'src/hooks/useIsMountedRef'
// import { API_BASE_URL } from 'src/config'
// import LoadingScreen from 'src/components/LoadingScreen'
import Page from 'src/components/Page'
import { useTranslation } from 'react-i18next'
import Header from './Header'
import Results from './Results'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}))

function CustomerListView() {
  const classes = useStyles()
  const { t } = useTranslation()
  // const isMountedRef = useIsMountedRef()
  // const [orders, setOrders] = useState(null)
  // const getOrders = useCallback(() => {
  //   axios
  //     .get('/api/management/orders')
  //     .then((response) => {
  //       if (isMountedRef.current) {
  //         setOrders(response.data.orders)
  //       }
  //     })
  // }, [isMountedRef])

  // useEffect(() => {
  //   getOrders()
  // }, [getOrders])

  // console.log(orders)
  // if (!orders) {
  //   return <LoadingScreen />
  // }

  // return <LoadingScreen />

  return (
    <Page
      className={classes.root}
      title={t('menu.users')}
    >
      <Container maxWidth={false}>
        <Header />
        {/* {customers && ( */}
        <Box mt={3}>
          <Results customers={[]} />
        </Box>
        {/* )} */}
      </Container>
    </Page>
  )
}

export default CustomerListView
