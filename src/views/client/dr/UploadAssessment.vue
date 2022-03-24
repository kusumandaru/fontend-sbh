<!--Dokumen Penilaian -->
<template>
  <b-col md="12">
    <b-button
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      type="submit"
      variant="light"
      class="mr-1"
      @click="latestScoringFormAttachment"
    >
      Download template form penilaian
    </b-button>
    <b-modal
      id="modal-success"
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
    <b-form-group>
      <label>Upload Dokumen Penilaian</label>
      <b-input-group>
        <b-form-file
          v-model="files"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
          multiple
        />
        <b-input-group-append>
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            type="submit"
            variant="secondary"
            class="mr-1"
            @click="submitAssessment"
          >
            Submit
          </b-button>
        </b-input-group-append>
      </b-input-group>
      <b-card-text
        v-if="attachmentExist"
        class="mb-0"
      >
        <b-card no-body>
          <b-table
            responsive
            :items="projectAttachments"
            :fields="attachmentFields"
            class="mb-0"
          >
            <template #cell(filename)="doc">
              <b-link
                class="font-weight-bold d-block text-nowrap"
                @click="getAttachment(doc.item)"
              >
                {{ doc.value }}
              </b-link>
            </template>
            <template #cell(action)="drow">
              <feather-icon
                :id="`attachment-${drow.item.id}-delete-icon`"
                icon="Trash2Icon"
                size="16"
                class="mx-1"
                @click="deleteAttachment(drow.item)"
              />
            </template>
          </b-table>
        </b-card>
      </b-card-text>
    </b-form-group>

    <!-- Spacer -->
    <hr class="project-spacing">

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
          Download All Design Recognition Document
        </b-button>
      </b-card-text>
    </b-card>
  </b-col>
</template>

<script>
import {
  BCardText,
  BCol,
  BFormFile,
  BFormGroup,
  BButton,
  BInputGroup,
  BInputGroupAppend,
  BTable,
  BModal,
  BLink,
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
import masterDrStoreModule from './masterDrStoreModule'

export default {
  components: {
    BCardText,
    BCol,
    BFormFile,
    BFormGroup,
    BButton,
    BInputGroup,
    BInputGroupAppend,
    BTable,
    BModal,
    BLink,
    BCard,
    BSpinner,
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
      files: null,
      attachmentFields: [
        { key: 'filename', label: 'Document Name' },
        { key: 'created_at', label: 'Created At' },
        'action',
      ],
    }
  },
  computed: {
    attachmentExist() {
      return Array.isArray(this.projectAttachments) && this.projectAttachments.length > 0
    },
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
    const blankAdminData = {
      manager_name: '',
      manager_signature: '',
      registration_letter: '',
      first_attachment: '',
      second_attachment: '',
      third_attachment: '',
      dr_template_id: '',
      fa_template_id: '',
    }
    const adminData = ref(JSON.parse(JSON.stringify(blankAdminData)))
    const projectAttachments = ref(JSON.parse('[]'))
    const scoringForm = ref(null)
    const isLoading = ref(null)

    const downloadAllFiles = () => {
      isLoading.value = true

      store.dispatch('app-dr/downloadAllScoringFiles', {
        id: router.currentRoute.params.id,
        templateId: adminData.value.dr_template_id,
      })
        .then(response => {
          isLoading.value = false

          const blob = new Blob([response.data], { type: 'application/zip' })
          const url = window.URL.createObjectURL(blob)

          // window.open(url)
          const downloadLink = document.createElement('a')
          downloadLink.href = url

          document.body.appendChild(downloadLink)
          downloadLink.click()
          document.body.removeChild(downloadLink)
        })
        .catch(error => {
          isLoading.value = false

          if (error.response.status === 404) {
            console.error(error)
          }
          if (error.response.status === 500) {
            console.error(error)
          }
        })
    }

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

    store.dispatch('app-dr/fetchProjectAttachments', { taskId: router.currentRoute.params.id })
      .then(response => {
        projectAttachments.value = response.data
      })
      .catch(error => {
        if (error.response.status === 404) {
          projectAttachments.value = undefined
        }
      })

    store.dispatch('app-dr/fetchAdminData')
      .then(response => {
        adminData.value = response.data
      })
      .catch(error => {
        if (error.response.status === 404) {
          adminData.value = undefined
        }
        if (error.response.status === 500) {
          adminData.value = undefined
        }
      })

    const latestScoringFormAttachment = () => {
      store.dispatch('app-dr/getLatestAttachmentByType', { taskId: router.currentRoute.params.id, fileType: 'scoring_form' })
        .then(response => {
          scoringForm.value = response.data
          console.log(scoringForm)
          store.dispatch('app-dr/downloadLinkByAttachmentId', {
            taskId: router.currentRoute.params.id,
            attachmentId: scoringForm.value.id,
          })
            .then(resp => {
              const downloadLink = document.createElement('a')
              downloadLink.href = resp.data.url
              downloadLink.download = resp.data.filename

              document.body.appendChild(downloadLink)
              downloadLink.click()
              document.body.removeChild(downloadLink)
            })
            .catch(err => {
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
            scoringForm.value = undefined
          }
          if (error.response.status === 500) {
            scoringForm.value = undefined
          }
        })
    }

    return {
      projectAssessment,
      projectAttachments,
      latestScoringFormAttachment,
      downloadAllFiles,
      isLoading,
    }
  },
  methods: {
    rerenderAssessment() {
      this.rerenderUploadAssessment()
    },
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
    submitAssessment() {
      if (this.files === undefined) {
        return
      }

      this.isLoading = true
      const request = new FormData()
      for (let i = 0; i < this.files.length; i += 1) {
        request.append('files', this.files[i])
      }
      const config = {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      }
      this.$http.post(`/engine-rest/new-building/design_recognition/${router.currentRoute.params.id}/assessment_attachment`, request, config).then(res => {
        this.result = JSON.parse(JSON.stringify(res.data))
        this.isLoading = false
        this.rerenderAssessment()
        this.showToast('success', 'Saved', 'Assessment successfully submitted')
      }).catch(() => {
        this.isLoading = false
        this.showToast('danger', 'Cannot Save', 'There is error when submit data, contact administrator')
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
    deleteAttachment(attachment) {
      this.isLoading = true
      this.$http.delete(`/engine-rest/new-building/assessment_attachment/${attachment.id}`).then(() => {
        this.isLoading = false
        this.rerenderAssessment()
        this.showToast('success', 'Deleted', 'Attachment successfully delete')
      }).catch(() => {
        this.isLoading = false
        this.rerenderAssessment()
        this.showToast('danger', 'Cannot Delete', 'There is error when delete attachment, contact administrator')
      })
    },
  },
}
</script>
