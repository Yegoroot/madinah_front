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
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()

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
          {t('homepage.readytoexplore')}
        </Typography>

        <Box
          mt={2}
        >
          <Typography
            variant="h2"
            align="center"
            color="secondary"
          >
            {t('homepage.letsgetstarted')}
          </Typography>
        </Box>
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
            {t('homepage.gotoprogram')}
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
