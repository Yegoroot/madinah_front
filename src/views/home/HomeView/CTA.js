import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Link as RouterLink } from 'react-router-dom'
import {
  Box,
  Button,
  Container,
  Typography,
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    paddingTop: 128,
    paddingBottom: 128
  },
  browseButton: {
    marginLeft: theme.spacing(2)
  }
}))

const CTA = ({ className, ...rest }) => {
  const classes = useStyles()

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h1"
          align="center"
          color="textPrimary"
        >
          Ready to expolore?
        </Typography>
        <Typography
          variant="h1"
          align="center"
          color="secondary"
        >
          Lets get started with Programs of Education
        </Typography>
        <Box
          mt={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            color="secondary"
            component={RouterLink}
            to="/programs"
            variant="contained"
          >
            Go to Programs
          </Button>
        </Box>
      </Container>
    </div>
  )
}

CTA.propTypes = {
  className: PropTypes.string
}

export default CTA
