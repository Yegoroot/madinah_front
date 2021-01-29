/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { Container, makeStyles } from '@material-ui/core'
import Page from 'src/components/Page'
import { instanceAxios } from 'src/utils/axios'
import { API_BASE_URL } from 'src/constants'
import Header from './Header'
import TypeCreateForm from './TypeCreateForm'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: 100
  }
}))

function TypeCreateView({ match }) {
  const classes = useStyles()
  const { typeId } = match.params
  const [data, setData] = useState({
    title: '',
    alias: '',
    color: ''
  })

  useEffect(() => {
    if (typeId) {
      instanceAxios
        .get(`${API_BASE_URL}/types/${typeId}`)
        .then((res) => {
          setData(res.data.data)
        })
    }
  }, [typeId])

  if (typeId && !data.title) {
    return null
  }
  return (
    <Page
      className={classes.root}
      title={typeId ? 'Edit Type' : 'Create Type'}
    >
      <Container maxWidth="lg">
        <Header type={typeId ? data : null} />
        <TypeCreateForm
          id={typeId}
          initialValue={data}
        />
      </Container>
    </Page>
  )
}

export default TypeCreateView
