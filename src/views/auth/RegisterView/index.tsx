import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Box,
  Card,
  CardContent,
  // Chip,
  Container,
  Divider,
  Link,
  // Tooltip,
  Typography,
  makeStyles
} from '@material-ui/core'
import Page from 'src/components/Page'
import Logo from 'src/components/Logo'
// import useAuth from 'src/hooks/useAuth'
// import Auth0Register from './Auth0Register'
// import FirebaseAuthRegister from './FirebaseAuthRegister'
import { useTranslation } from 'react-i18next'
import { AuthBySocial } from 'src/components/SocialButtons'
import JWTRegister from './JWTRegister'

// const methodIcons = {
//   Auth0: '/static/images/auth0.svg',
//   FirebaseAuth: '/static/images/firebase.svg',
//   JWT: '/static/images/jwt.svg'
// }

const useStyles = makeStyles((theme) => ({
  root: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  // banner: {
  //   backgroundColor: theme.palette.background.paper,
  //   paddingBottom: theme.spacing(2),
  //   paddingTop: theme.spacing(2),
  //   borderBottom: `1px solid ${theme.palette.divider}`
  // },
  // bannerChip: {
  //   marginRight: theme.spacing(2)
  // },
  // methodIcon: {
  //   height: 30,
  //   marginLeft: theme.spacing(2),
  //   marginRight: theme.spacing(2)
  // },
  cardContainer: {
    paddingBottom: 80,
    paddingTop: 80,
  },
  cardContent: {
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    minHeight: 400
  },
  currentMethodIcon: {
    height: 40,
    '& > img': {
      width: 'auto',
      maxHeight: '100%'
    }
  }
}))

const RegisterView = () => {
  const classes = useStyles()
  // const { method } = useAuth()
  const { t } = useTranslation()

  return (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Page
      className={classes.root}
      title={t('pageAuth.register')}
    >
      {/* <div className={classes.banner}>
        <Container maxWidth="md">
          <Box
            alignItems="center"
            display="flex"
            justifyContent="center"
          >
            <Chip
              color="secondary"
              label="NEW"
              size="small"
              className={classes.bannerChip}
            />
            <Box
              alignItems="center"
              display="flex"
            >
              <Typography
                color="textPrimary"
                variant="h6"
              >
                Visit our
                {' '}
                <Link
                  component={RouterLink}
                  to="/docs"
                >
                  docs
                </Link>
                {' '}
                and find out how to switch between
              </Typography>
              <Tooltip title="Auth0">
                <img
                  alt="Auth0"
                  className={classes.methodIcon}
                  src={methodIcons.Auth0}
                />
              </Tooltip>
              <Tooltip title="Firebase">
                <img
                  alt="Firebase"
                  className={classes.methodIcon}
                  src={methodIcons.FirebaseAuth}
                />
              </Tooltip>
              <Tooltip title="JSON Web Token">
                <img
                  alt="JWT"
                  className={classes.methodIcon}
                  src={methodIcons.JWT}
                />
              </Tooltip>
            </Box>
          </Box>
        </Container>
      </div> */}
      <Container
        className={classes.cardContainer}
        maxWidth="sm"
      >
        <Box
          mb={8}
          display="flex"
          justifyContent="center"
        >
          <Logo />
        </Box>
        <Card>
          <CardContent className={classes.cardContent}>
            <Box
              alignItems="center"
              display="flex"
              justifyContent="space-between"
              mb={3}
            >
              <div>
                <Typography
                  color="textPrimary"
                  gutterBottom
                  variant="h2"
                >
                  {t('pageAuth.register')}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                >
                  {t('pageAuth.registerDescription')}
                </Typography>
              </div>
              {/* <div className={classes.currentMethodIcon}>
                <img
                  alt="Auth method"
                  src={methodIcons[method]}
                />
              </div> */}
            </Box>
            <AuthBySocial />
            <Box
              flexGrow={1}
              mt={3}
            >
              <JWTRegister />
            </Box>
            <Box my={3}>
              <Divider />
            </Box>
            <Link
              component={RouterLink}
              to="/login"
              variant="body2"
              color="textSecondary"
            >
              {t('pageAuth.haveAccount')}
            </Link>
          </CardContent>
        </Card>
      </Container>
    </Page>
  )
}

export default RegisterView
