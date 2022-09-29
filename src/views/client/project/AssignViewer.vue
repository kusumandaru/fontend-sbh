<template>
  <section class="project-preview-wrapper">
    <!-- error -->
    <error :key="errorKey" />
    <!-- error -->
    <add-viewer
      :is-add-new-viewer-sidebar-active.sync="isAddNewViewerSidebarActive"
      @refetch-data="refetchData"
    />
    <b-row
      v-if="projectData"
      class="project-preview"
    >
      <!-- Col: Left (project Container) -->
      <b-col
        cols="18"
        xl="12"
        md="10"
      >
        <b-card
          no-body
          class="project-preview-card"
        >
          <!-- alert -->
          <alert :key="alertKey" />
          <!-- alert -->

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

          <b-card-body>
            <b-button
              variant="primary"
              @click="isAddNewViewerSidebarActive = true"
            >
              <span class="text-nowrap">Add Viewer</span>
            </b-button>
            <!-- table -->
            <vue-good-table
              :columns="columns"
              :rows="rows"
              :rtl="direction"
              :theme="skinLayout"
              :search-options="{
                enabled: true,
                externalQuery: searchTerm }"
              :pagination-options="{
                enabled: true,
                perPage:pageLength
              }"
            >
              <template
                slot="table-row"
                slot-scope="props"
              >
                <!-- Column: First Name -->
                <div
                  v-if="props.column.field === 'first_name'"
                  class="text-nowrap"
                >
                  <span class="text-nowrap">{{ ((props.row || {}).user || {}).first_name || "" }}</span>
                </div>

                <!-- Column: Last Name -->
                <div
                  v-if="props.column.field === 'last_name'"
                  class="text-nowrap"
                >
                  <span class="text-nowrap">{{ ((props.row || {}).user || {}).last_name || "" }}</span>
                </div>

                <!-- Column: Email -->
                <div
                  v-if="props.column.field === 'email'"
                  class="text-nowrap"
                >
                  <span class="text-nowrap">{{ ((props.row || {}).user || {}).email || "" }}</span>
                </div>

                <!-- Column: Tenant -->
                <div
                  v-if="props.column.field === 'tenant'"
                  class="text-nowrap"
                >
                  <span class="text-nowrap">{{ ((props.row || {}).tenant || {}).name || "" }}</span>
                </div>

                <!-- Column: Action -->
                <span v-else-if="props.column.field === 'action'">
                  <span>
                    <b-dropdown
                      variant="link"
                      toggle-class="text-decoration-none"
                      no-caret
                    >
                      <template v-slot:button-content>
                        <feather-icon
                          :id="`master-row-${props.row.id}-user-icon-delete`"
                          icon="DeleteIcon"
                          size="16"
                          class="mx-1"
                          @click="deleteUser(props.row.id)"
                        />
                        <b-tooltip
                          title="User Delete"
                          :target="`master-row-${props.row.id}-user-icon-delete`"
                        />
                      </template>
                    </b-dropdown>
                  </span>
                </span>

                <!-- Column: Common -->
                <span v-else>
                  {{ props.formattedRow[props.column.field] }}
                </span>
              </template>

              <!-- pagination -->
              <template
                slot="pagination-bottom"
                slot-scope="props"
              >
                <div class="d-flex justify-content-between flex-wrap">
                  <div class="d-flex align-items-center mb-0 mt-1">
                    <span class="text-nowrap">
                      Showing 1 to
                    </span>
                    <b-form-select
                      v-model="pageLength"
                      :options="['10','20','50']"
                      class="mx-1"
                      @input="(value)=>props.perPageChanged({currentPerPage:value})"
                    />
                    <span class="text-nowrap "> of {{ props.total }} entries </span>
                  </div>
                  <div>
                    <b-pagination
                      :value="1"
                      :total-rows="props.total"
                      :per-page="pageLength"
                      first-number
                      last-number
                      align="right"
                      prev-class="prev-item"
                      next-class="next-item"
                      class="mt-1 mb-0"
                      @input="(value)=>props.pageChanged({currentPage:value})"
                    >
                      <template #prev-text>
                        <feather-icon
                          icon="ChevronLeftIcon"
                          size="18"
                        />
                      </template>
                      <template #next-text>
                        <feather-icon
                          icon="ChevronRightIcon"
                          size="18"
                        />
                      </template>
                    </b-pagination>
                  </div>
                </div>
              </template>
            </vue-good-table>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import {
  ref, onUnmounted,
} from '@vue/composition-api'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store'
import router from '@/router'
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'vue-good-table/dist/vue-good-table.css'
import { useToast } from 'vue-toastification/composition'
import {
  BRow, BCol, BCard, BCardBody, BCardTitle, BCardText, VBToggle, BForm, BFormSelect, BPagination, BDropdown, BTooltip, BButton,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import projectStoreModule from '@/views/projectStoreModule'
import Alert from './Alert.vue'
import Error from './Error.vue'
import AddViewer from './AddViewer.vue'

Vue.use(VueSweetalert2)

export default {
  directives: {
    Ripple,
    'b-toggle': VBToggle,
  },
  components: {
    VueGoodTable,
    BRow,
    BCol,
    BCard,
    BCardBody,
    BCardTitle,
    BCardText,
    BForm,
    BFormSelect,
    BPagination,
    BDropdown,
    BTooltip,
    BButton,
    Alert,
    Error,
    AddViewer,
  },
  data() {
    return {
      alertKey: 0,
      errorKey: 0,
      pageLength: 20,
      dir: false,
      searchTerm: '',
      user: null,
      columns: [
        {
          label: 'First Name',
          field: 'first_name',
          filterOptions: {
            enabled: true,
            placeholder: 'Search First Name',
          },
        },
        {
          label: 'Last Name',
          field: 'last_name',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Last Name',
          },
        },
        {
          label: 'Email',
          field: 'email',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Email',
          },
        },
        {
          label: 'Tenant',
          field: 'tenant',
        },
        {
          label: 'Action',
          field: 'action',
        },
      ],
      options: {
        propertiesPanel: {},
        additionalModules: [],
        moddleExtensions: [],
      },
    }
  },
  computed: {
    skinLayout() {
      const statusColor = {
        /* eslint-disable key-spacing */
        light: 'default',
        dark: 'nocturnal',
        /* eslint-enable key-spacing */
      }
      return statusColor[store.state.appConfig.layout.skin]
    },
    direction() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = true
        return this.dir
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = false
      return this.dir
    },
  },
  setup() {
    const projectData = ref(null)
    const userData = ref(null)
    const isLoading = ref(null)
    const rows = ref([])
    const toast = useToast()
    const isAddNewViewerSidebarActive = ref(false)

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
      })
      .catch(error => {
        console.error(error)
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

    store.dispatch('app-project/fetchUser')
      .then(response => {
        userData.value = response.data
      })
      .catch(error => {
        if (error.response.status === 404) {
          userData.value = undefined
        }
      })

    store.dispatch('app-project/fetchViewer', { id: router.currentRoute.params.id })
      .then(response => {
        rows.value = response.data
      })
      .catch(error => {
        if (error.response.status === 404) {
          rows.value = undefined
        }
      })

    const deleteUser = userId => {
      Vue.swal({
        title: 'Are you sure?',
        text: 'Delete this user',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        customClass: {
          confirmButton: 'btn btn-danger',
          cancelButton: 'btn btn-outline-primary ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          isLoading.value = true

          store.dispatch('app-project/deleteViewer', {
            userId,
          })
            .then(() => {
              isLoading.value = false
              toast({
                component: ToastificationContent,
                props: {
                  title: 'Success',
                  icon: 'InfoIcon',
                  text: 'Successfully delete user',
                  variant: 'success',
                },
              })
              router.go()
            })
            .catch(error => {
              isLoading.value = false
              toast({
                component: ToastificationContent,
                props: {
                  title: 'Cannot delete',
                  icon: 'AlertTriangleIcon',
                  text: error.response.data.message,
                  variant: 'danger',
                },
              })
            })
        }
      })
    }

    const refetchData = () => {
      router.go()
    }

    return {
      projectData,
      userData,
      isLoading,
      deleteUser,
      rows,
      refetchData,
      isAddNewViewerSidebarActive,
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
