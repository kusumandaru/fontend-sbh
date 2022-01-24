<template>
  <b-row
    v-if="projectData"
    class="project-preview"
  >
    <!-- Col: Left (project Container) -->
    <b-col
      cols="12"
      xl="12"
      md="12"
    >
      <!-- Project Name -->
      <b-card
        bg-variant="primary"
        text-variant="white"
      >
        <b-card-title class="text-white text-center">
          {{ projectData.task_name }}
        </b-card-title>
        <b-card-text class="text-center">
          <span>{{ taskDescriptionBody }}</span>
        </b-card-text>
      </b-card>
      <!-- Header -->
      <b-card
        no-body
        class="project-preview-card"
      >
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
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import {
  BCard,
  BCardBody,
  BCardTitle,
  BCardText,
  BRow,
  BCol,
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
    BCard,
    BCardBody,
    BCardTitle,
    BCardText,
    BRow,
    BCol,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      projectHeaderKey: 0,
      agreementLetterDocument: null,
      firstPaymentDocument: null,
      maxChar: 200,
      successShow: false,
      result: {},
      resultId: null,
      isLoading: false,
      taskDescription: [
        { task: 'design-recognition-trial', role: 'admin', title: 'Proses approval DR' },
        { task: 'design-recognition-trial-revision', role: 'client', title: 'Revisi DR setelah sidang' },
      ],
    }
  },
  computed: {
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
    const projectData = ref({})
    const PROJECT_APP_STORE_MODULE_NAME = 'app-project'

    // Register module
    if (!store.hasModule(PROJECT_APP_STORE_MODULE_NAME)) store.registerModule(PROJECT_APP_STORE_MODULE_NAME, projectStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(PROJECT_APP_STORE_MODULE_NAME)) store.unregisterModule(PROJECT_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-project/fetchProject', { id: router.currentRoute.params.id })
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

<style lang="scss" scoped>
@import "~@core/scss/base/pages/app-project.scss";
@import '@core/scss/vue/libs/vue-select.scss';
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
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
