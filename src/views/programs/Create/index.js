import React, { useState, useEffect } from 'react'
import { Container, makeStyles } from '@material-ui/core'
import Page from 'src/components/Page'
import LoadingScreen from 'src/components/LoadingScreen'
import { useSelector, useDispatch } from 'src/store'
import { getProgramItemRequest, module } from 'src/slices/program'
import { instanceAxios } from 'src/utils/axios'
import { API_BASE_URL } from 'src/constants'
import Header from './Header'
import ProgramCreateForm from './ProgramCreateForm'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: 100
  }
}))

function ProgramCreateView({ match }) {
  const classes = useStyles()
  const { programId } = match.params
  const { loading, data } = useSelector((state) => state[module].item)
  const dispatch = useDispatch()
  const [allTypes, setTypes] = useState([])
  const [initialValues] = useState({
    title: '',
    description: '',
    file: '',
    types: [],
    publish: true
  })

  useEffect(() => {
    if (programId) {
      dispatch(getProgramItemRequest({ programId, type: 'private' }))
    }
    instanceAxios.get(`${API_BASE_URL}/types/`).then((res) => { setTypes(res.data.data) })
  }, [programId, dispatch])

  if ((loading || (programId && !data))) {
    return <LoadingScreen />
  }

  // for multiselect we need ['', ''] not [{}, {}]

  const program = {
    ...data,
    types: data.types.map((typeObj) => typeObj._id)
  }

  return (
    <Page
      className={classes.root}
      title={programId ? 'Program Edit' : 'Program Create'}
    >
      <Container maxWidth="lg">
        <Header id={programId} />
        <ProgramCreateForm
          id={programId}
          allTypes={allTypes}
          initialValues={programId ? program : initialValues}
        />
      </Container>
    </Page>
  )
}

export default ProgramCreateView
