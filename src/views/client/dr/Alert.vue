<template>
  <!-- alert -->
  <b-col
    v-if="projectData.approved == false"
    cols="12"
    class="mt-75"
  >
    <b-alert
      show
      variant="warning"
      class="mb-50"
    >
      <h4 class="alert-heading">
        Your request is Rejected
      </h4>
      <div class="alert-body">
        <b-link class="alert-link">
          {{ projectData.rejected_reason }}
        </b-link>
      </div>
    </b-alert>
  </b-col>
  <!--/ alert -->
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
      alertKey: 0,
    }
  },
  computed: {
  },
  setup() {
    const projectData = ref({})
    const PROJECT_APP_STORE_MODULE_NAME = 'app-project'

    // Register module
    if (!store.hasModule(PROJECT_APP_STORE_MODULE_NAME)) store.registerModule(PROJECT_APP_STORE_MODULE_NAME, projectStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(PROJECT_APP_STORE_MODULE_NAME)) store.unregisterModule(PROJECT_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-project/fetchAdminProject', { id: router.currentRoute.params.id })
      .then(response => {
        projectData.value = response.data
      })
      .catch(error => {
        if (error.response.status === 404) {
          projectData.value = undefined
        }
        if (error.response.status === 500) {
          projectData.value = undefined
        }
      })

    return {
      projectData,
    }
  },
}
</script>
