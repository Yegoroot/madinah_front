import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import 'react-perfect-scrollbar/dist/css/styles.css'
import 'prismjs/prism'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-jsx'
import 'nprogress/nprogress.css'
import 'src/assets/css/fonts.css'
import 'src/assets/css/prism.css'
import 'src/assets/css/ar.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { enableES5 } from 'immer'
import * as serviceWorker from 'src/serviceWorkerRegistration'
import store from 'src/store'
import { SettingsProvider } from 'src/contexts/SettingsContext'
import App from 'src/App'
import { /* initServiceWorker, */ onCheckUpdateServiceWorker } from './slices/sWorker'

enableES5()

ReactDOM.render(
  <Provider store={store}>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </Provider>,
  document.getElementById('root')
)

serviceWorker.register({
  // onSuccess: () => store.dispatch(initServiceWorker()),
  onUpdate: (reg: any) => {
    console.log('onUpdate callback', reg)
    store.dispatch(onCheckUpdateServiceWorker(reg))
  }
})
