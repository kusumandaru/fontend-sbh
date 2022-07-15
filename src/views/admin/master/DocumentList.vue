<template>
  <div>
    <document-list-add-new
      :is-add-new-document-sidebar-active.sync="isAddNewDocumentSidebarActive"
      @refetch-data="refetchData"
    />

    <!-- card 3 -->
    <b-col
      md="6"
      lg="4"
    >
      <b-card
        :header="criteria.code"
        :title="criteria.exercise_type"
        :footer="criteria.description"
        class="text-center"
        footer-class="text-muted"
      >
        <b-card-text>
          {{ criteria.code }}
        </b-card-text>
        <b-card-text>
          {{ criteria.created_by }}
        </b-card-text>
        <b-card-text>
          {{ criteria.created_at }}
        </b-card-text>
      </b-card>
    </b-col>

    <!-- Document -->
    <b-card-body>
      <b-card-title>Document</b-card-title>
      <b-card-sub-title>Document submission from client</b-card-sub-title>
    </b-card-body>
    <!-- input search -->
    <div class="custom-search d-flex justify-content-end">
      <b-form-group>
        <!-- Search -->
        <b-col
          cols="18"
          md="18"
        >
          <div class="d-flex align-items-center justify-content-end">
            <b-form-input
              v-model="searchTerm"
              class="d-inline-block mr-1"
              placeholder="Search..."
            />
            <b-button
              variant="primary"
              @click="isAddNewDocumentSidebarActive = true"
            >
              <span class="text-nowrap">Add Document</span>
            </b-button>
          </div>
        </b-col>
      </b-form-group>
    </div>
    <!-- table -->
    <vue-good-table
      :ref="refDocumentListTable"
      :columns="columns"
      :rows="rows"
      :rtl="direction"
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
        <!-- Column: Name -->
        <div
          v-if="props.column.field === 'name'"
          class="text-nowrap"
        >
          <span :v-html="props.row.name" />
        </div>

        <!-- Column: Action -->
        <span v-if="props.column.field === 'action'">
          <span>
            <b-dropdown
              variant="link"
              toggle-class="text-decoration-none"
              no-caret
            >
              <template v-slot:button-content>
                <feather-icon
                  :id="`project-row-${props.row.id}-document-icon-edit`"
                  icon="EditIcon"
                  size="16"
                  class="mx-1"
                  @click="$router.push({ name: 'admin-document-edit', params: { documentId: props.row.id }})"
                />
                <b-tooltip
                  title="Document Update"
                  :target="`project-row-${props.row.id}-document-icon-edit`"
                />

                <feather-icon
                  :id="`project-row-${props.row.id}-document-icon-delete`"
                  icon="TrashIcon"
                  size="16"
                  class="mx-1"
                  @click="deleteDocument(props.row.id)"
                />
                <b-tooltip
                  title="Delete Document"
                  :target="`project-row-${props.row.id}-document-icon-delete`"
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
    <!-- Document -->

    <!-- Blocker -->
    <b-card-body>
      <b-card-title>Criteria  Blocker</b-card-title>
      <b-card-sub-title>Other criteria cannot be selected when client choose this criteria</b-card-sub-title>
    </b-card-body>
    <!-- input search -->
    <div class="custom-search d-flex justify-content-end">
      <b-form-group>
        <!-- Search -->
        <b-col
          cols="18"
          md="18"
        >
          <div class="d-flex align-items-center justify-content-end">
            <b-form-input
              v-model="searchTerm"
              class="d-inline-block mr-1"
              placeholder="Search..."
            />
            <b-button
              variant="primary"
              @click="$router.push({ name: 'admin-blocker-correlation', params: { blockerId: $router.currentRoute.params.criteriaId }})"
            >
              <span class="text-nowrap">Update Correlation Blocker</span>
            </b-button>
          </div>
        </b-col>
      </b-form-group>
    </div>
    <!-- table -->
    <vue-good-table
      :ref="refBlockerListTable"
      :columns="columnBlockers"
      :rows="blockers"
      :rtl="direction"
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
        <!-- Column: Blocker ID -->
        <div
          v-if="props.column.field === 'blocker_code'"
          class="text-nowrap"
        >
          <span class="text-nowrap">{{ props.row.blocker.code }}</span>
        </div>

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
    <!-- Blocker -->

  </div>
</template>

<script>
import {
  BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BButton, BCol, BCard, BCardText, BTooltip, BCardBody, BCardTitle, BCardSubTitle,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'
import { ref, onUnmounted } from '@vue/composition-api'
import 'vue-good-table/dist/vue-good-table.css'
import router from '@/router'
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import useDocumentsList from './useDocumentsList'
import useBlockersList from './useBlockersList'
import masterStoreModule from './masterStoreModule'
import DocumentListAddNew from './DocumentListAddNew.vue'

Vue.use(VueSweetalert2)

export default {
  components: {
    VueGoodTable,
    BDropdown,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BButton,
    BCol,
    BCard,
    BCardText,
    BTooltip,
    BCardBody,
    BCardTitle,
    BCardSubTitle,
    DocumentListAddNew,
  },
  setup() {
    const CRITERIA_APP_STORE_MODULE_NAME = 'app-document'

    // Register module
    if (!store.hasModule(CRITERIA_APP_STORE_MODULE_NAME)) store.registerModule(CRITERIA_APP_STORE_MODULE_NAME, masterStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(CRITERIA_APP_STORE_MODULE_NAME)) store.unregisterModule(CRITERIA_APP_STORE_MODULE_NAME)
    })

    const isAddNewDocumentSidebarActive = ref(false)
    const toast = useToast()
    const isLoading = ref(null)

    const deleteDocument = documentId => {
      Vue.swal({
        title: 'Are you sure?',
        text: 'Delete this document',
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

          store.dispatch('app-document/deleteDocument', {
            documentId,
          })
            .then(() => {
              isLoading.value = false
              toast({
                component: ToastificationContent,
                props: {
                  title: 'Success',
                  icon: 'InfoIcon',
                  text: 'Successfully delete document',
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

    const {
      resolveProjectTypeIcon,
      resolveProjectTypeVariant,
      resolveProjectTypeTranslation,
      refetchData,
      refDocumentListTable,
    } = useDocumentsList()
    const {
      refBlockerListTable,
    } = useBlockersList()
    return {
      // Sidebar
      isAddNewDocumentSidebarActive,
      refDocumentListTable,
      refBlockerListTable,
      resolveProjectTypeIcon,
      resolveProjectTypeVariant,
      resolveProjectTypeTranslation,
      refetchData,
      isLoading,
      deleteDocument,
    }
  },
  data() {
    return {
      criteria: {},
      pageLength: 20,
      dir: false,
      searchTerm: '',
      columns: [
        {
          label: 'Name',
          field: 'name',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Name',
          },
        },
        {
          label: 'Active',
          field: 'active',
        },
        {
          label: 'Created At',
          field: 'created_at',
        },
        {
          label: 'Action',
          field: 'action',
        },
      ],
      rows: [],
      blockers: [],
      columnBlockers: [
        {
          label: 'Blocker Code',
          field: 'blocker_code',
        },
        {
          label: 'Created At',
          field: 'created_at',
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
  created() {
    this.retrieveCriteria()
    this.retrieveDocuments()
    this.retrieveBlockers()
  },
  methods: {
    retrieveCriteria() {
      this.$http.get(`engine-rest/master-project/criterias/${router.currentRoute.params.criteriaId}`, { })
        .then(res => { this.criteria = res.data })
        .catch(() => {
          useToast({
            component: ToastificationContent,
            props: {
              title: 'Error fetching criteria',
              icon: 'AlertTriangleIcon',
              variant: 'danger',
            },
          })
        })
    },
    retrieveDocuments() {
      this.$http.get(`engine-rest/master-project/criterias/${router.currentRoute.params.criteriaId}/documents`)
        .then(res => { this.rows = res.data })
    },
    retrieveBlockers() {
      this.$http.get(`engine-rest/master-project/criterias/${router.currentRoute.params.criteriaId}/blockers`)
        .then(res => { this.blockers = res.data })
    },
    /* eslint-disable object-shorthand */
    handleError(err) {
      console.error('failed to show diagram', err)
    },
    /* eslint-enable object-shorthand */
  },
}
</script>
