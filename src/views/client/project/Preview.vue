<template>
  <section class="project-preview-wrapper">
    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="projectData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching project data
      </h4>
      <div class="alert-body">
        No project found with this project id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'client-project-list'}"
        >
          project List
        </b-link>
        for other projects.
      </div>
    </b-alert>

    <b-row
      v-if="projectData"
      class="project-preview"
    >

      <!-- Col: Left (project Container) -->
      <b-col
        cols="12"
        xl="9"
        md="8"
      >
        <b-card
          no-body
          class="project-preview-card"
        >
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

          <!-- Header -->
          <b-card-body class="project-padding pb-0">
            <div class="d-flex justify-content-between flex-md-row flex-column project-spacing mt-0">
              <!-- Header: Left Content -->
              <div>
                <div class="logo-wrapper">
                  <h3 class="text-primary project-logo">
                    {{ projectData.building_name }}
                  </h3>
                </div>
                <p class="card-text mb-25">
                  {{ projectData.building_address }}
                </p>
                <p class="card-text mb-25">
                  {{ projectData.city_name }}
                </p>
                <p class="card-text mb-25">
                  {{ projectData.province_name }}
                </p>
                <p class="card-text mb-25">
                  {{ projectData.postal_code }}
                </p>
                <p class="card-text mb-0">
                  <feather-icon icon="PhoneIcon" />
                  Telephone: {{ projectData.telephone }}
                </p>
                <p class="card-text mb-0">
                  <feather-icon icon="PhoneIcon" />
                  Handphone: {{ projectData.handphone }}
                </p>
                <p class="card-text mb-0">
                  <feather-icon icon="MailIcon" />
                  Email: {{ projectData.email }}
                </p>
                <p class="card-text mb-0">
                  <feather-icon icon="PrinterIcon" />
                  Faximile: {{ projectData.faximile }}
                 </p>
              </div>

              <!-- Header: Right Content -->
              <div class="mt-md-0 mt-2">
                <h4 class="project-title">
                  Project ID
                  <span class="project-number">#{{ projectData.task_id }}</span>
                </h4>
                <div class="project-date-wrapper">
                  <p class="project-date-title">
                    Date Created:
                  </p>
                  <p class="project-date">
                    {{ projectData.created_at | moment("dddd, MMMM Do YYYY") }}
                  </p>
                </div>
              </div>
            </div>
          </b-card-body>

          <!-- Spacer -->
          <hr class="project-spacing">

          <!-- project Client -->
          <b-card-body
            v-if="projectData.owner"
            class="project-padding pt-0"
          >
            <b-row class="project-spacing">

              <!-- Col: project To -->
              <b-col
                cols="12"
                xl="6"
                class="p-0"
              >
                <h6 class="mb-2">
                  project To:
                </h6>
                <h6 class="mb-25">
                  {{ projectData.owner }}
                </h6>
                <p class="card-text mb-25">
                  {{ projectData.building_name }}
                </p>
                <p class="card-text mb-25">
                  {{ projectData.building_address }}, {{ projectData.postal_code }}
                </p>
                <p class="card-text mb-25">
                  {{ projectData.phone }}
                </p>
                <p class="card-text mb-0">
                  {{ projectData.email }}
                </p>
              </b-col>
            </b-row>
          </b-card-body>

          <!-- project Description -->
          <b-card-body class="project-padding pb-0">
            <b-row>

              <!-- Col: Certification Type -->
              <b-col
                cols="12"
                md="6"
                class="mt-md-0 mt-3"
                order="2"
                order-md="1"
              >
                <b-card-text class="mb-0">
                  <span class="font-weight-bold">Certification Type:</span>
                  <span class="ml-75">{{ projectData.certification_type }}</span>
                </b-card-text>
                <b-card-text class="mb-0">
                  <span class="font-weight-bold">Building Type:</span>
                  <span class="ml-75">{{ projectData.building_type_name }}</span>
                </b-card-text>
                <b-card-text class="mb-0">
                  <span class="font-weight-bold">Owner:</span>
                  <span class="ml-75">{{ projectData.owner }}</span>
                </b-card-text>
                <b-card-text class="mb-0">
                  <span class="font-weight-bold">Design Recognition:</span>
                  <span class="ml-75">{{ projectData.design_recognition }}</span>
                </b-card-text>
                <b-card-text class="mb-0">
                  <span class="font-weight-bold">Gross Floor Area:</span>
                  <span class="ml-75">{{ projectData.gross_floor_area }}</span>
                </b-card-text>
              </b-col>
            </b-row>
          </b-card-body>

          <!-- Spacer -->
          <hr class="project-spacing">

          <b-card-body class="project-padding pb-0">
            <b-row>

              <!-- Col: Certification Type -->
              <b-col
                cols="12"
                md="12"
                class="mt-md-0 mt-3"
                order="2"
                order-md="1"
              >
                <b-card-text
                  v-if="projectData.proof_of_payment"
                  class="mb-0"
                >
                  <b-button
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    variant="flat-primary"
                    @click="downloadFile('proof_of_payment')"
                  >
                    <feather-icon icon="ArchiveIcon" />
                    Download Bukti Pembayaran
                  </b-button>
                </b-card-text>

                <b-card-text
                  v-if="projectData.building_plan"
                  class="mb-0"
                >
                  <b-button
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    variant="flat-primary"
                    @click="downloadFile('building_plan')"
                  >
                    <feather-icon icon="ArchiveIcon" />
                    Download Gambar denah bangunan
                  </b-button>
                </b-card-text>

                <b-card-text
                  v-if="projectData.rt_rw"
                  class="mb-0"
                >
                  <b-button
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    variant="flat-primary"
                    @click="downloadFile('rt_rw')"
                  >
                    <feather-icon icon="ArchiveIcon" />
                    Download Peta RT/RW
                  </b-button>
                </b-card-text>

                <b-card-text
                  v-if="projectData.upl_ukl"
                  class="mb-0"
                >
                  <b-button
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    variant="flat-primary"
                    @click="downloadFile('upl_ukl')"
                  >
                    <feather-icon icon="ArchiveIcon" />
                    Download Salinan UPL/UKL
                  </b-button>
                </b-card-text>

                <b-card-text
                  v-if="projectData.earthquake_resistance"
                  class="mb-0"
                >
                  <b-button
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    variant="flat-primary"
                    @click="downloadFile('earthquake_resistance')"
                  >
                    <feather-icon icon="ArchiveIcon" />
                    Download Syarat Tahan Gempa
                  </b-button>
                </b-card-text>

                <b-card-text
                  v-if="projectData.disability_friendly"
                  class="mb-0"
                >
                  <b-button
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    variant="flat-primary"
                    @click="downloadFile('disability_friendly')"
                  >
                    <feather-icon icon="ArchiveIcon" />
                    Download Syarat Penyandang Cacat
                  </b-button>
                </b-card-text>

                <b-card-text
                  v-if="projectData.safety_and_fire_requirement"
                  class="mb-0"
                >
                  <b-button
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    variant="flat-primary"
                    @click="downloadFile('safety_and_fire_requirement')"
                  >
                    <feather-icon icon="ArchiveIcon" />
                    Download Syarat Keselamatan dan Kebakaran
                  </b-button>
                </b-card-text>

                <b-card-text
                  v-if="projectData.study_case_readiness"
                  class="mb-0"
                >
                  <b-button
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    variant="flat-primary"
                    @click="downloadFile('study_case_readiness')"
                  >
                    <feather-icon icon="ArchiveIcon" />
                    Download Pernyataan Bersedia Studi Kasus
                  </b-button>
                </b-card-text>

                <!-- Spacer -->
                <hr class="project-spacing">

                <b-card-text
                  class="mb-0"
                >
                  <span class="font-weight-bold">Semua berkas : </span>
                  <b-button
                    variant="gradient-primary"
                    @click="downloadAllFiles"
                  >
                    <feather-icon icon="ArchiveIcon" />
                    Download
                  </b-button>
                </b-card-text>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </b-col>

      <!-- Right Col: Card -->
      <b-col
        cols="12"
        md="4"
        xl="3"
        class="project-actions"
      >
        <b-card>
          <!-- Button: Edit Project-->
          <b-button
            v-if="editProjectShow"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="success"
            class="mb-75"
            block
            @click="editProject"
          >
            Update Project
          </b-button>

          <!-- Button: Eligibility Statement-->
          <b-button
            v-if="eligibilityStatementShow"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="success"
            class="mb-75"
            block
            @click="eligibleStatement"
          >
            Eligibility Statement
          </b-button>

          <!-- Button: Draft Registration Letter-->
          <b-button
            v-if="draftRegistrationLetterShow"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="success"
            class="mb-75"
            block
            @click="draftRegistrationLetter"
          >
            Draft Registration Letter
          </b-button>

          <!-- Button: Registration Letter-->
          <b-button
            v-if="registrationLetterShow"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="success"
            class="mb-75"
            block
            @click="registeredProject"
          >
            Registration Letter
          </b-button>

          <!-- Button: Registration Letter Attachment-->
          <b-button
            v-if="registrationLetterAttachmentShow"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="success"
            class="mb-75"
            block
            @click="registeredProjectAttachment"
          >
            Panduan Registered Project Declaration
          </b-button>

          <!-- Button: Upload Document Building-->
          <b-button
            v-if="uploadDocumentShow"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="success"
            class="mb-75"
            block
            @click="uploadDocumentPage"
          >
            Upload Document Building
          </b-button>

          <!-- Button: Print -->
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="outline-secondary"
            class="mb-75"
            block
            @click="printProject"
          >
            Print
          </b-button>
        </b-card>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import {
  ref, onUnmounted, reactive,
} from '@vue/composition-api'
import store from '@/store'
import router from '@/router'
import {
  BRow, BCol, BCard, BCardBody, BCardText, BButton, BAlert, BLink, VBToggle,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import projectStoreModule from '@/views/projectStoreModule'
import fileDownload from 'js-file-download'

export default {
  directives: {
    Ripple,
    'b-toggle': VBToggle,
  },
  components: {
    BRow,
    BCol,
    BCard,
    BCardBody,
    BCardText,
    BButton,
    BAlert,
    BLink,
  },
  computed: {
    editProjectShow() {
      return ['fill-registration-project'].includes(this.projectData.definition_key)
    },
    uploadDocumentShow() {
      return ['fill-document-building'].includes(this.projectData.definition_key)
    },
    eligibilityStatementShow() {
      return !(this.aboveCheckBuildingTasks.includes(this.projectData.definition_key))
    },
    draftRegistrationLetterShow() {
      return ['agreement-and-first-payment'].includes(this.projectData.definition_key)
    },
    registrationLetterShow() {
      return !(this.aboveFirstPaymentTasks.includes(this.projectData.definition_key))
    },
    registrationLetterAttachmentShow() {
      return !(this.aboveFirstPaymentTasks.includes(this.projectData.definition_key))
    },
  },
  setup() {
    const projectData = ref(null)
    const PROJECT_APP_STORE_MODULE_NAME = 'app-project'

    const paymentProps = reactive({
      center: true,
      fluidGrow: true,
      blank: true,
      blankColor: '#bbb',
      class: 'my-5',
    })

    // Register module
    if (!store.hasModule(PROJECT_APP_STORE_MODULE_NAME)) store.registerModule(PROJECT_APP_STORE_MODULE_NAME, projectStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(PROJECT_APP_STORE_MODULE_NAME)) store.unregisterModule(PROJECT_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-project/fetchProject', { id: router.currentRoute.params.id })
      .then(response => {
        projectData.value = response.data
        paymentProps.blank = false
        paymentProps.src = response.data.proof_of_payment_url
      })
      .catch(error => {
        if (error.response.status === 404) {
          projectData.value = undefined
        }
        if (error.response.status === 400) {
          projectData.value = undefined
        }
        if (error.response.status === 500) {
          projectData.value = undefined
        }
      })

    const printProject = () => {
      window.print()
    }

    const editProject = () => {
      router.push({ name: 'client-project-edit', params: { id: router.currentRoute.params.id } })
    }

    const uploadDocumentPage = () => {
      router.push({ name: 'client-project-upload-document', params: { id: router.currentRoute.params.id } })
    }

    const downloadFile = fileName => {
      store.dispatch('app-project/downloadLink', {
        id: projectData.value.task_id,
        filename: fileName,
      })
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

    const eligibleStatement = () => {
      store.dispatch('app-project/downloadEligibleStatement', {
        id: projectData.value.task_id,
      })
        .then(response => {
          fileDownload(response.data, 'eligible.pdf')
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

    const registeredProject = () => {
      store.dispatch('app-project/downloadRegisteredProject', {
        id: projectData.value.task_id,
      })
        .then(response => {
          fileDownload(response.data, 'registered-project.pdf')
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

    const registeredProjectAttachment = () => {
      store.dispatch('app-project/downloadRegisteredProjectAttachment', {
        id: projectData.value.task_id,
      })
        .then(response => {
          const blob = new Blob([response.data], { type: 'application/zip' })
          const url = window.URL.createObjectURL(blob)

          window.open(url)
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

    const draftRegistrationLetter = () => {
      store.dispatch('app-project/downloadMasterLink', {
        filename: 'registration_letter',
      })
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

    const downloadAllFiles = () => {
      store.dispatch('app-project/downloadAllFiles', {
        id: projectData.value.task_id,
      })
        .then(response => {
          const blob = new Blob([response.data], { type: 'application/zip' })
          const url = window.URL.createObjectURL(blob)

          window.open(url)
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

    const aboveCheckBuildingTasks = ['check-registration-project', 'fill-registration-project', 'fill-document-building', 'check-document-building']
    const aboveFirstPaymentTasks = ['check-registration-project', 'fill-registration-project', 'fill-document-building', 'check-document-building', 'agreement-and-first-payment']

    return {
      projectData,
      printProject,
      paymentProps,
      editProject,
      uploadDocumentPage,
      downloadFile,
      downloadAllFiles,
      eligibleStatement,
      registeredProject,
      registeredProjectAttachment,
      draftRegistrationLetter,
      aboveCheckBuildingTasks,
      aboveFirstPaymentTasks,
    }
  },
}
</script>

<style lang="scss" scoped>
@import "~@core/scss/base/pages/app-project.scss";
</style>

<style lang="scss">
@media print {

  // Global Styles
  body {
    background-color: transparent !important;
  }
  nav.header-navbar {
    display: none;
  }
  .main-menu {
    display: none;
  }
  .header-navbar-shadow {
    display: none !important;
  }
  .content.app-content {
    margin-left: 0;
    padding-top: 2rem !important;
  }
  footer.footer {
    display: none;
  }
  .card {
    background-color: transparent;
    box-shadow: none;
  }
  .customizer-toggle {
    display: none !important;
  }

  // project Specific Styles
  .project-preview-wrapper {
    .row.project-preview {
      .col-md-8 {
        max-width: 100%;
        flex-grow: 1;
      }

      .project-preview-card {
        .card-body:nth-of-type(2) {
          .row {
              > .col-12 {
              max-width: 50% !important;
            }

            .col-12:nth-child(2) {
              display: flex;
              align-items: flex-start;
              justify-content: flex-end;
              margin-top: 0 !important;
            }
          }
        }
      }
    }

    // Action Right Col
    .project-actions {
      display: none;
    }
  }
}
</style>
