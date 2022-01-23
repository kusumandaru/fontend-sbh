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
          :to="{ name: 'admin-project-list'}"
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
          <!-- Header -->
          <b-card-body class="project-padding pb-0">

            <div class="d-flex justify-content-between flex-md-row flex-column project-spacing mt-0">
              <!-- Header: Left Content -->
              <div>
                <div class="logo-wrapper">
                  <logo />
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

          <!-- project Client and Description -->
          <b-card-body
            v-if="projectData.owner"
            class="project-padding pt-0"
          >
            <b-form class="mt-2">
              <b-row>
                <b-col md="6">
                  <b-card-body class="project-padding pb-0">
                    <b-card-title>Project To:</b-card-title>
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
                  </b-card-body>
                </b-col>
                <b-col md="6">
                  <b-card-body class="project-padding pb-0">
                    <b-card-title>Project Detail:</b-card-title>
                    <b-row>
                      <b-card-text class="mb-0">
                        <span class="font-weight-bold">Certification Type:</span>
                        <span class="ml-75">{{ projectData.certification_type }}</span>
                      </b-card-text>
                    </b-row>
                    <b-row>
                      <b-card-text class="mb-0">
                        <span class="font-weight-bold">Building Type:</span>
                        <span class="ml-75">{{ projectData.building_type_name }}</span>
                      </b-card-text>
                    </b-row>
                    <b-row>
                      <b-card-text class="mb-0">
                        <span class="font-weight-bold">Owner:</span>
                        <span class="ml-75">{{ projectData.owner }}</span>
                      </b-card-text>
                    </b-row>
                    <b-row>
                      <b-card-text class="mb-0">
                        <span class="font-weight-bold">Design Recognition:</span>
                        <span class="ml-75">{{ projectData.design_recognition }}</span>
                      </b-card-text>
                    </b-row>
                    <b-row>
                      <b-card-text class="mb-0">
                        <span class="font-weight-bold">Gross Floor Area:</span>
                        <span class="ml-75">{{ projectData.gross_floor_area }}</span>
                      </b-card-text>
                    </b-row>
                  </b-card-body>
                </b-col>
              </b-row>
            </b-form>
          </b-card-body>

          <!-- Spacer -->
          <hr class="project-spacing">

          <!-- Eligibility Document -->
          <b-card-body class="project-padding pb-0">
            <b-card-title>Eligibility Document</b-card-title>
            <b-card-sub-title>Eligibility Document for Project Registration</b-card-sub-title>
            <p />
            <b-row>

              <!-- Col: Download Files -->
              <b-col
                cols="12"
                md="12"
                class="mt-md-0 mt-3"
                order="2"
                order-md="1"
              >
                <app-collapse>
                  <app-collapse-item
                    v-for="(attachments, name) in filteredAttachment(eligibilityAttachments)"
                    :key="name"
                    :title="toTitleCase(name)"
                  >
                    <b-table
                      responsive
                      :items="attachments"
                      :fields="projectAttachmentFields"
                      class="mb-0"
                    >
                      <template #cell(filename)="doc">
                        <b-link
                          class="font-weight-bold d-block text-nowrap"
                          @click="downloadFileByAttachment(doc.item.id)"
                        >
                          {{ doc.value }}
                        </b-link>
                      </template>
                    </b-table>
                  </app-collapse-item>
                </app-collapse>

                <!-- Spacer -->
                <hr class="project-spacing">

                <b-card-text
                  class="mb-0"
                >
                  <span class="font-weight-bold">Berkas : </span>
                  <b-button
                    variant="gradient-primary"
                    @click="downloadAllFiles"
                  >
                    <feather-icon icon="ArchiveIcon" />
                    Download Eligibility Document Archived
                  </b-button>
                </b-card-text>
              </b-col>
            </b-row>
          </b-card-body>

          <!-- Spacer -->
          <hr class="project-spacing">

          <!-- Registered Project Document -->
          <b-card-body class="project-padding pb-0">
            <b-card-title>Registered Project Document</b-card-title>
            <p />
            <b-row>

              <!-- Col: Certification Type -->
              <b-col
                cols="12"
                md="12"
                class="mt-md-0 mt-3"
                order="2"
                order-md="1"
              >
                <app-collapse>
                  <app-collapse-item
                    v-for="(attachments, name) in filteredAttachment(registeredAttachments)"
                    :key="name"
                    :title="toTitleCase(name)"
                  >
                    <b-table
                      responsive
                      :items="attachments"
                      :fields="projectAttachmentFields"
                      class="mb-0"
                    >
                      <template #cell(filename)="doc">
                        <b-link
                          class="font-weight-bold d-block text-nowrap"
                          @click="downloadFileByAttachment(doc.item.id)"
                        >
                          {{ doc.value }}
                        </b-link>
                      </template>
                    </b-table>
                  </app-collapse-item>
                </app-collapse>

                <b-card-text
                  v-if="projectData.registered_project"
                  class="mb-0"
                >
                  <b-button
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    variant="flat-primary"
                    @click="registeredProject"
                  >
                    <feather-icon icon="ArchiveIcon" />
                    Download Registered Project
                  </b-button>
                </b-card-text>

              </b-col>
            </b-row>
          </b-card-body>

          <!-- Spacer -->
          <hr class="project-spacing">

          <!-- Revision Project Document -->
          <b-card-body class="project-padding pb-0">
            <b-card-title>Revision Project Document</b-card-title>
            <p />
            <b-row>

              <!-- Col: Document Type -->
              <b-col
                cols="12"
                md="12"
                class="mt-md-0 mt-3"
                order="2"
                order-md="1"
              >
                <app-collapse>
                  <app-collapse-item
                    v-for="(attachments, name) in filteredAttachment(revisionAttachments)"
                    :key="name"
                    :title="toTitleCase(name)"
                  >
                    <b-table
                      responsive
                      :items="attachments"
                      :fields="projectAttachmentFields"
                      class="mb-0"
                    >
                      <template #cell(filename)="doc">
                        <b-link
                          class="font-weight-bold d-block text-nowrap"
                          @click="downloadFileByAttachment(doc.item.id)"
                        >
                          {{ doc.value }}
                        </b-link>
                      </template>
                    </b-table>
                  </app-collapse-item>
                </app-collapse>

                <b-card-text
                  v-if="projectData.registered_project"
                  class="mb-0"
                >
                  <b-button
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    variant="flat-primary"
                    @click="registeredProject"
                  >
                    <feather-icon icon="ArchiveIcon" />
                    Download Registered Project
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
        <b-card
          bg-variant="secondary"
          text-variant="white"
        >
          <b-card-title class="text-white text-center">
            {{ projectData.task_name }}
          </b-card-title>
          <b-card-text class="text-center">
            <span>{{ taskDescriptionBody }}</span>
          </b-card-text>
        </b-card>
        <b-card>
          <!-- Button: Approve -->
          <b-button
            v-if="approveShow"
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="success"
            class="mb-75"
            block
            @click="approveTask"
          >
            Approve
          </b-button>

          <!-- Button: Reject -->
          <b-button
            v-if="rejectShow"
            v-b-toggle.sidebar-project-reject
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="danger"
            class="mb-75"
            block
          >
            Reject
          </b-button>

          <!-- Button: Continue to FA -->
          <b-button
            v-if="continueFAShow"
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="success"
            class="mb-75"
            block
            @click="approveTask"
          >
            Continue To Final Assessment
          </b-button>

          <!-- Button: Agreement -->
          <b-button
            v-if="agreementShow"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="success"
            class="mb-75"
            block
            @click="agreementPage"
          >
            Agreement Confirmation
          </b-button>

          <!-- Button: Workshop -->
          <b-button
            v-if="workshopShow"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="success"
            class="mb-75"
            block
            @click="workshopPage"
          >
            Workshop and Consultation Submission
          </b-button>

          <!-- Button: Design Recognition Review-->
          <b-button
            v-if="designRecognitionReviewShow"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="success"
            class="mb-75"
            block
            @click="designRecognitionReview"
          >
            Design Recognition Review
          </b-button>

          <!-- Button: Design Recognition Evaluation Assessment-->
          <b-button
            v-if="designRecognitionEvaluationAssessmentShow"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="success"
            class="mb-75"
            block
            @click="designRecognitionEvaluationAssessment"
          >
            Design Recognition Evaluation Assessment
          </b-button>

          <!-- Button: Final Assessment Review-->
          <b-button
            v-if="finalAssessmentReviewShow"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="success"
            class="mb-75"
            block
            @click="finalAssessmentReview"
          >
            Final Assessment Review
          </b-button>

          <!-- Button:Final Assessment Evaluation Assessment-->
          <b-button
            v-if="finalAssessmentEvaluationAssessmentShow"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="success"
            class="mb-75"
            block
            @click="finalAssessmentEvaluationAssessment"
          >
            Final Assessment Evaluation Assessment
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

    <project-sidebar-reject />
  </section>
</template>

<script>
import {
  ref, onUnmounted, reactive,
} from '@vue/composition-api'
import store from '@/store'
import router from '@/router'
import {
  BRow, BCol, BCard, BCardBody, BCardText, BButton, BAlert, BLink, VBToggle, BCardTitle, BCardSubTitle, BTable, BForm,
} from 'bootstrap-vue'
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'
import Logo from '@core/layouts/components/Logo.vue'
import Ripple from 'vue-ripple-directive'
import projectStoreModule from '@/views/projectStoreModule'
import ProjectSidebarReject from '@/views/admin/project/SidebarReject.vue'
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
    BCardTitle,
    BCardSubTitle,
    BCardText,
    BButton,
    BAlert,
    BLink,
    BTable,
    BForm,
    AppCollapse,
    AppCollapseItem,

    Logo,
    ProjectSidebarReject,
  },
  data() {
    return {
      projectAttachmentFields: [
        { key: 'filename', label: 'Document Name' },
        { key: 'version', label: 'Version' },
        { key: 'created_at', label: 'Created At' },
      ],
      taskDescription: [
        { task: 'design-recognition-trial', role: 'admin', title: 'Apabila diapprove akan langsung ke Design Recognition Letter, bila direject akan masuk ke revisi DR' },
        { task: 'design-recognition-trial-revision', role: 'client', title: 'Revisi DR oleh client' },
      ],
    }
  },
  computed: {
    approveShow() {
      return this.adminTasks.includes(this.projectData.definition_key)
    },
    rejectShow() {
      return this.adminTasks.includes(this.projectData.definition_key)
    },
    continueFAShow() {
      return ['design-recognition-letter'].includes(this.projectData.definition_key)
    },
    agreementShow() {
      return this.agreementTasks.includes(this.projectData.definition_key)
    },
    workshopShow() {
      return this.workshopTasks.includes(this.projectData.definition_key)
    },
    designRecognitionReviewShow() {
      return ['design-recognition-review'].includes(this.projectData.definition_key)
    },
    designRecognitionEvaluationAssessmentShow() {
      return ['design-recognition-evaluation-assessment'].includes(this.projectData.definition_key)
    },
    finalAssessmentReviewShow() {
      return ['final-assessment-review'].includes(this.projectData.definition_key)
    },
    finalAssessmentEvaluationAssessmentShow() {
      return ['final-assessment-evaluation-assessment'].includes(this.projectData.definition_key)
    },
    taskDescriptionBody() {
      // eslint-disable-next-line
      const filtered = this.taskDescription.filter(f => { 
        // eslint-disable-next-line
        return f.task === this.projectData.definition_key
      })
      if (filtered[0] !== undefined) {
        return filtered[0].title
      }
      return ''
    },
  },
  setup() {
    const projectData = ref(null)
    const proofOfPayments = ref(null)
    const buildingPlan = ref(null)
    const rtRw = ref(null)
    const uplUkl = ref(null)
    const earthquakeResistance = ref(null)
    const disabilityFriendly = ref(null)
    const safetyAndFireRequirement = ref(null)
    const studyCaseReadiness = ref(null)
    const firstPaymentDocument = ref(null)
    const secondPaymentDocument = ref(null)
    const thirdPaymentDocument = ref(null)
    const attendanceDocument = ref(null)
    const workshorReportDocument = ref(null)
    const eligibilityStatement = ref(null)
    const agreementLetterDocument = ref(null)
    const drRevisionDocument = ref(null)
    const faRevisionDocument = ref(null)
    const drEvaluationDocument = ref(null)
    const faEvaluationDocument = ref(null)
    const claim = ref(null)
    const PROJECT_APP_STORE_MODULE_NAME = 'app-project'

    const eligibilityAttachments = ref({
      proof_of_payment: proofOfPayments,
      building_plan: buildingPlan,
      rt_rw: rtRw,
      upl_ukl: uplUkl,
      earthquake_resistance: earthquakeResistance,
      disability_friendly: disabilityFriendly,
      safety_and_fire_requirement: safetyAndFireRequirement,
      study_case_readiness: studyCaseReadiness,
    })

    const registeredAttachments = ref({
      first_payment_document: firstPaymentDocument,
      second_payment_document: secondPaymentDocument,
      third_payment_document: thirdPaymentDocument,
      attendance_document: attendanceDocument,
      workshop_report_document: workshorReportDocument,
      eligibility_statement: eligibilityStatement,
      agreement_letter_document: agreementLetterDocument,
    })

    const revisionAttachments = ref({
      dr_revision_submission: drRevisionDocument,
      fa_revision_submission: faRevisionDocument,
      dr_evaluation_assessment: drEvaluationDocument,
      fa_evaluation_assessment: faEvaluationDocument,
    })

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

    Object.keys(registeredAttachments.value).forEach(key => {
      store.dispatch('app-project/getAttachmentsByType', { taskId: router.currentRoute.params.id, fileType: key })
        .then(response => {
          registeredAttachments.value[key] = response.data
        })
        .catch(error => {
          if (error.response.status === 404) {
            registeredAttachments.value[key] = undefined
          }
          if (error.response.status === 500) {
            registeredAttachments.value[key] = undefined
          }
        })
    })

    Object.keys(eligibilityAttachments.value).forEach(key => {
      store.dispatch('app-project/getAttachmentsByType', { taskId: router.currentRoute.params.id, fileType: key })
        .then(response => {
          eligibilityAttachments.value[key] = response.data
        })
        .catch(error => {
          if (error.response.status === 404) {
            eligibilityAttachments.value[key] = undefined
          }
          if (error.response.status === 500) {
            eligibilityAttachments.value[key] = undefined
          }
        })
    })

    Object.keys(revisionAttachments.value).forEach(key => {
      store.dispatch('app-project/getAttachmentsByType', { taskId: router.currentRoute.params.id, fileType: key })
        .then(response => {
          revisionAttachments.value[key] = response.data
        })
        .catch(error => {
          if (error.response.status === 404) {
            revisionAttachments.value[key] = undefined
          }
          if (error.response.status === 500) {
            revisionAttachments.value[key] = undefined
          }
        })
    })

    const printProject = () => {
      window.print()
    }

    const approveTask = () => {
      store.dispatch('app-project/approveTask', { id: router.currentRoute.params.id })
        .then(response => {
          claim.value = response.data
        })
        .catch(error => {
          if (error.response.status === 404) {
            claim.value = undefined
          }
          if (error.response.status === 500) {
            claim.value = undefined
          }
        })
        .finally(() => {
          router.push({ name: 'admin-project-list' })
        })
    }

    const downloadFileByAttachment = attachmentId => {
      store.dispatch('app-project/downloadLinkByAttachmentId', {
        taskId: projectData.value.task_id,
        attachmentId,
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

    const agreementPage = () => {
      router.push({ name: 'admin-project-agreement', params: { id: router.currentRoute.params.id } })
    }

    const workshopPage = () => {
      router.push({ name: 'admin-project-workshop', params: { id: router.currentRoute.params.id } })
    }

    const designRecognitionReview = () => {
      router.push({ name: 'admin-project-dr-assessment', params: { id: router.currentRoute.params.id } })
    }

    const designRecognitionEvaluationAssessment = () => {
      router.push({ name: 'admin-project-dr-evaluation-assessment', params: { id: router.currentRoute.params.id } })
    }

    const finalAssessmentReview = () => {
      router.push({ name: 'admin-project-fa-assessment', params: { id: router.currentRoute.params.id } })
    }

    const finalAssessmentEvaluationAssessment = () => {
      router.push({ name: 'admin-project-fa-evaluation-assessment', params: { id: router.currentRoute.params.id } })
    }

    const adminTasks = ['check-registration-project', 'check-document-building', 'check-first-payment', 'check-second-payment', 'check-third-payment', 'check-third-payment-fa', 'design-recognition-trial', 'design-recognition-revision-review', 'final-assessment-trial', 'final-assessment-revision-review']
    const agreementTasks = ['agreement']
    const workshopTasks = ['workshop']

    return {
      projectData,
      eligibilityAttachments,
      registeredAttachments,
      revisionAttachments,
      adminTasks,
      agreementTasks,
      workshopTasks,
      agreementPage,
      workshopPage,
      printProject,
      paymentProps,
      approveTask,
      downloadFileByAttachment,
      downloadAllFiles,
      registeredProject,
      designRecognitionReview,
      designRecognitionEvaluationAssessment,
      finalAssessmentReview,
      finalAssessmentEvaluationAssessment,
    }
  },
  methods: {
    toTitleCase(word) {
      return word.split('_').map(item => item.charAt(0).toUpperCase() + item.substring(1)).join(' ')
    },
    filteredAttachment(attachment) {
      // eslint-disable-next-line no-unused-vars
      return Object.fromEntries(Object.entries(attachment).filter(([k, v]) => v != null && v.length > 0))
    },
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
