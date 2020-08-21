import React from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { create } from 'jss'
import rtl from 'jss-rtl'
import MomentUtils from '@date-io/moment'
import { SnackbarProvider } from 'notistack'
import {
  jssPreset,
  StylesProvider,
  ThemeProvider
} from '@material-ui/core'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import GlobalStyles from 'src/components/GlobalStyles'
import ScrollReset from 'src/components/ScrollReset'
import CookiesNotification from 'src/components/CookiesNotification'
import GoogleAnalytics from 'src/components/GoogleAnalytics'
import SettingsNotification from 'src/components/SettingsNotification'
import { AuthProvider } from 'src/contexts/JWTAuthContext'
import useSettings from 'src/hooks/useSettings'
import { createTheme } from 'src/theme'
import routes, { renderRoutes } from 'src/routes'
import { I18nextProvider } from 'react-i18next'
import i18n from 'src/localization/i18n'
import useStyles from 'src/theme/global'

const jss = create({ plugins: [...jssPreset().plugins, rtl()] })
const history = createBrowserHistory()

const App = () => {
  const { settings } = useSettings()

  const theme = createTheme({
    direction: settings.direction,
    responsiveFontSizes: settings.responsiveFontSizes,
    theme: settings.theme
  })

  useStyles()
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <StylesProvider jss={jss}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <SnackbarProvider
              dense
              maxSnack={3}
            >
              <Router history={history}>
                <AuthProvider>
                  <GlobalStyles />
                  <ScrollReset />
                  <GoogleAnalytics />
                  <CookiesNotification />
                  <SettingsNotification />
                  {renderRoutes(routes)}
                </AuthProvider>
              </Router>
            </SnackbarProvider>
          </MuiPickersUtilsProvider>
        </StylesProvider>
      </ThemeProvider>
    </I18nextProvider>
  )
}

export default App
