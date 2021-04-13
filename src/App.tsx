import React from 'react'
import { BrowserRouter } from 'react-router-dom'
// import { createBrowserHistory } from 'history'
import { create } from 'jss'
import rtl from 'jss-rtl'
// import MomentUtils from '@date-io/moment'
import { SnackbarProvider } from 'notistack'
import {
  jssPreset,
  StylesProvider,
  ThemeProvider
} from '@material-ui/core'
// import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import GlobalStyles from 'src/components/GlobalStyles'
import ScrollReset from 'src/components/ScrollReset'
// import CookiesNotification from 'src/components/CookiesNotification'
import GoogleAnalytics from 'src/components/GoogleAnalytics'
// import SettingsNotification from 'src/components/SettingsNotification'
import Alerts from 'src/components/Alerts'
import { AuthProvider } from 'src/contexts/AuthContext'
import useSettings from 'src/hooks/useSettings'
import { createTheme } from 'src/theme'
import routes, { renderRoutes } from 'src/routes'
import { I18nextProvider } from 'react-i18next'
import i18n from 'src/localization/i18n'
import UpdateApp from 'src/components/UpdateApp'
import InitDictionary from 'src/components/Dictionary/InitDictionary'

const jss = create({ plugins: [...jssPreset().plugins, rtl()] })
// const history = createBrowserHistory()

const App = () => {
  const { settings } = useSettings()

  const theme = createTheme({
    direction: 'rtl',
    responsiveFontSizes: false,
    theme: settings.theme
  })

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <StylesProvider jss={jss}>
          {/* <MuiPickersUtilsProvider utils={MomentUtils}> */}
          <SnackbarProvider
              // dense
            hideIconVariant
            maxSnack={3}
          >
            <BrowserRouter>
              <AuthProvider>
                <UpdateApp />
                <GlobalStyles />
                <ScrollReset />
                <GoogleAnalytics />
                {/* <CookiesNotification /> */}
                {/* <SettingsNotification /> */}
                <Alerts />
                {renderRoutes(routes)}
                <InitDictionary />
              </AuthProvider>
            </BrowserRouter>
          </SnackbarProvider>
          {/* </MuiPickersUtilsProvider> */}
        </StylesProvider>
      </ThemeProvider>
    </I18nextProvider>
  )
}

export default App
