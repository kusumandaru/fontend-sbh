<!--Dokumen Penilaian -->
<template>
  <b-col md="12">
    <b-modal
      id="scoring-document-modal"
      v-model.lazy="isLoading"
      modal-class="modal-success"
      centered
      title="Processing in background"
      hide-footer
      hide-header-close
      no-close-on-backdrop
      no-close-on-esc
    >
      <b-card-text>
        <h5>
          Waiting to process ...
          <b-spinner v-show="isLoading" />
        </h5>
      </b-card-text>
    </b-modal>

    <b-card
      no-body
      style="background: #f6f6f6"
    >
      <b-card-text
        class="mb-0"
      >
        <span class="font-weight-bold" />
        <b-button
          variant="light"
          :disabled="isLoading"
          @click="downloadAllFiles()"
        >
          <feather-icon icon="ArchiveIcon" />
          Download All Final Assessment Document
        </b-button>
      </b-card-text>
    </b-card>
  </b-col>
</template>

<script>
import {
  BCardText,
  BCol,
  BButton,
  BModal,
  BCard,
  BSpinner,
} from 'bootstrap-vue'
import {
  ref, onUnmounted,
} from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import Ripple from 'vue-ripple-directive'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import masterFaStoreModule from './masterFaStoreModule'

export default {
  components: {
    BCardText,
    BCol,
    BButton,
    BModal,
    BCard,
    BSpinner,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
    }
  },
  computed: {
  },
  created() {
  },
  setup() {
    const FA_APP_STORE_MODULE_NAME = 'app-fa-scoring-document'
    const isLoading = ref(null)
    const projectData = ref(null)

    const downloadAllFiles = () => {
      isLoading.value = true

      store.dispatch('app-fa-scoring-document/fetchClientProject', { id: router.currentRoute.params.id })
        .then(response => {
          projectData.value = response.data

          store.dispatch('app-fa-scoring-document/downloadAllScoringFiles', {
            id: router.currentRoute.params.id,
            certificationTypeId: projectData.value.certification_type_id,
            projectType: 'final_assessment',
          })
            .then(resp => {
              isLoading.value = false

              const blob = new Blob([resp.data], { type: 'application/zip' })
              const url = window.URL.createObjectURL(blob)

              // window.open(url)
              const downloadLink = document.createElement('a')
              downloadLink.href = url

              document.body.appendChild(downloadLink)
              downloadLink.click()
              document.body.removeChild(downloadLink)
            })
            .catch(err => {
              isLoading.value = false

              if (err.response.status === 404) {
                console.error(err)
              }
              if (err.response.status === 500) {
                console.error(err)
              }
            })
        })
        .catch(error => {
          if (error.response.status === 404) {
            projectData.value = undefined
          }
          if (error.response.status === 500) {
            projectData.value = undefined
          }
        })
    }

    // Register module
    if (!store.hasModule(FA_APP_STORE_MODULE_NAME)) store.registerModule(FA_APP_STORE_MODULE_NAME, masterFaStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(FA_APP_STORE_MODULE_NAME)) store.unregisterModule(FA_APP_STORE_MODULE_NAME)
    })

    return {
      downloadAllFiles,
      isLoading,
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
    getAttachment(attachment) {
      this.isLoading = true
      this.$http.get(`/engine-rest/new-building/assessment_attachment/${attachment.id}`).then(response => {
        // window.open(response.data.url)
        const downloadLink = document.createElement('a')
        downloadLink.href = response.data.url
        downloadLink.download = response.data.filename

        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)

        this.isLoading = false
      }).catch(() => {
        this.isLoading = false
        this.showToast('danger', 'Cannot Load Attachment', 'There is error when load attachment, contact administrator')
      })
    },
  },
}
</script>
