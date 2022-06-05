import Vue from 'vue'
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'

import Rollbar from 'rollbar'

import router from './router'
import store from './store'
import App from './App.vue'

// Global Components
import './global-components'

// 3rd party plugins
import '@/libs/portal-vue'
import '@/libs/toastification'
import '@/libs/acl'

// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)

// Composition API
Vue.use(VueCompositionAPI)

// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

// import font
require('@core/assets/fonts/feather/iconfont.css')

// date parser
Vue.use(require('vue-moment'))

Vue.config.productionTip = false

// Set the Rollbar instance in the Vue prototype
// before creating the first Vue instance.
// This ensures it is available in the same way for every
// instance in your app.
Vue.prototype.$rollbar = new Rollbar({
  accessToken: '07bfdbba08e04b94b49248851302ba30',
  captureUncaught: true,
  captureUnhandledRejections: true,
  captureUsername: true,
  enabled: true,
  payload: {
    environment: 'development',
    // Track your events to a specific version of code for better visibility into version health
    code_version: '1.0.0',
    // Add custom data to your events by adding custom key/value pairs like the one below
    // custom_data: 'foo'
  },
})

// just add `vm.$rollbar.error(err)` to the top of it.
// If not, this simple example will preserve the app’s existing
// behavior while also reporting uncaught errors to Rollbar.
// eslint-disable-next-line no-unused-vars
Vue.config.errorHandler = (err, vm, info) => {
  vm.$rollbar.error(err)
  throw err // rethrow
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
