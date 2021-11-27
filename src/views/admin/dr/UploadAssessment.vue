<!--Dokumen Penilaian -->
<template>
  <b-col md="12">
    <b-form-group>
      <b-card-text
        v-if="projectAssessment.assessment_attachment"
        class="mb-0"
      >
        <b-button
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
          variant="flat-primary"
          @click="downloadAssessment"
        >
          <feather-icon icon="ArchiveIcon" />
          Download Dokumen Penilaian
        </b-button>
      </b-card-text>
    </b-form-group>
  </b-col>
</template>

<script>
import {
  BCardText,
  BCol,
  BFormGroup,
  BButton,
} from 'bootstrap-vue'
import {
  ref, onUnmounted,
} from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import Ripple from 'vue-ripple-directive'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import masterDrStoreModule from './masterDrStoreModule'

export default {
  components: {
    BCardText,
    BCol,
    BFormGroup,
    BButton,
  },
  directives: {
    Ripple,
  },
  props: {
    rerenderUploadAssessment: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      assessmentAttachment: null,
    }
  },
  created() {
  },
  setup() {
    const DR_APP_STORE_MODULE_NAME = 'app-dr'
    const blankProjectAssessment = {
      temporary_score: 0,
      potential_score: 0,
      proposed_level: {
        name: '',
      },
    }
    const projectAssessment = ref(JSON.parse(JSON.stringify(blankProjectAssessment)))

    // Register module
    if (!store.hasModule(DR_APP_STORE_MODULE_NAME)) store.registerModule(DR_APP_STORE_MODULE_NAME, masterDrStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(DR_APP_STORE_MODULE_NAME)) store.unregisterModule(DR_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-dr/fetchProjectAssessment', { taskId: router.currentRoute.params.id })
      .then(response => {
        // eslint-disable-next-line prefer-destructuring
        projectAssessment.value = response.data[0]
      })
      .catch(error => {
        if (error.response.status === 404) {
          projectAssessment.value = undefined
        }
      })

    const downloadAssessment = () => {
      store.dispatch('app-dr/downloadLink', { taskId: router.currentRoute.params.id })
        .then(response => {
          window.open(response.data.url)
        })
        .catch(error => {
          if (error.response.status === 404) {
            console.error(error)
          }
          if (error.response.status === 500) {
            console.error(error)
          }
        })
    }

    return {
      projectAssessment,
      downloadAssessment,
    }
  },
  methods: {
    showToast(variant, titleToast, description) {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: titleToast,
          icon: 'BellIcon',
          text: description,
          variant,
        },
      })
    },
  },
}
</script>
