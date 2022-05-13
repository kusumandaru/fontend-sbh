<template>
  <!-- error -->
  <b-col
    v-if="errorMessage"
    cols="12"
    class="mt-75"
  >
    <b-alert
      show
      variant="danger"
      class="mb-50"
    >
      <h4 class="alert-heading">
        Error Occured
      </h4>
      <div class="alert-body">
        {{ errorMessage }} Check
        <b-link
          class="alert-link"
          :to="{ name: 'admin-project-list'}"
        >
          project List
        </b-link>
        for other projects.
      </div>
    </b-alert>
  </b-col>
  <!--/ error -->
</template>

<script>
import {
  BCol,
  BAlert,
  BLink,
} from 'bootstrap-vue'
import {
  ref, onUnmounted,
} from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import Ripple from 'vue-ripple-directive'
import projectStoreModule from '@/views/projectStoreModule'

export default {
  components: {
    BCol,
    BAlert,
    BLink,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      errorKey: 0,
    }
  },
  computed: {
  },
  setup() {
    const projectData = ref({})
    const errorMessage = ref(undefined)
    const PROJECT_APP_STORE_MODULE_NAME = 'app-project'

    // Register module
    if (!store.hasModule(PROJECT_APP_STORE_MODULE_NAME)) store.registerModule(PROJECT_APP_STORE_MODULE_NAME, projectStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(PROJECT_APP_STORE_MODULE_NAME)) store.unregisterModule(PROJECT_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-project/fetchClientProject', { id: router.currentRoute.params.id })
      .then(response => {
        projectData.value = response.data
        errorMessage.value = undefined
      })
      .catch(error => {
        errorMessage.value = error.response.data.message
        if (error.response.status === 404) {
          projectData.value = undefined
        }
        if (error.response.status === 500) {
          projectData.value = undefined
        }
      })

    return {
      projectData,
      errorMessage,
    }
  },
}
</script>
