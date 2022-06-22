<template>
  <div>
    <certification-list-add-new
      :is-add-new-certification-sidebar-active.sync="isAddNewCertificationSidebarActive"
      :project-type-options="projectTypeOptions"
      @refetch-data="refetchData"
    />

    <!-- card 3 -->
    <b-col
      md="6"
      lg="4"
    >
      <b-card
        header=""
        :title="vendor.vendor_name"
        :footer="vendor.description"
        class="text-center"
        footer-class="text-muted"
      >
        <b-card-text>
          {{ vendor.vendor_code }}
        </b-card-text>
        <b-card-text>
          {{ vendor.created_by }}
        </b-card-text>
        <b-card-text>
          {{ vendor.created_at }}
        </b-card-text>
      </b-card>
    </b-col>

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
              @click="isAddNewCertificationSidebarActive = true"
            >
              <span class="text-nowrap">Add Certification</span>
            </b-button>
          </div>
        </b-col>
      </b-form-group>
    </div>
    <!-- table -->
    <vue-good-table
      :ref="refCertificationListTable"
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
        <!-- Column: Project Type -->
        <div
          v-if="props.column.field === 'project_type'"
          class="text-nowrap"
        >
          <b-badge :variant="resolveProjectTypeVariant(props.row.project_type)">
            {{ resolveProjectTypeTranslation(props.row.project_type) }}
          </b-badge>
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
                  :id="`project-row-${props.row.id}-certification-icon`"
                  icon="EyeIcon"
                  size="16"
                  class="mx-1"
                  @click="$router.push({ name: 'admin-template-list', params: { vendorId: $router.currentRoute.params.vendorId, certificationTypeId: props.row.id }})"
                />
                <b-tooltip
                  title="Certification Detail"
                  :target="`project-row-${props.row.id}-certification-icon`"
                />

                <feather-icon
                  :id="`project-row-${props.row.id}-certification-icon-edit`"
                  icon="EditIcon"
                  size="16"
                  class="mx-1"
                  @click="$router.push({ name: 'admin-certification-edit', params: { vendorId: $router.currentRoute.params.vendorId, certificationTypeId: props.row.id }})"
                />
                <b-tooltip
                  title="Certification Update"
                  :target="`project-row-${props.row.id}-certification-icon-edit`"
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
  </div>
</template>

<script>
import {
  BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BButton, BCol, BCard, BCardText, BBadge, BTooltip,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'
import { ref, onUnmounted } from '@vue/composition-api'
import 'vue-good-table/dist/vue-good-table.css'
import router from '@/router'
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import useCertificationsList from './useCertificationsList'
import masterStoreModule from './masterStoreModule'
import CertificationListAddNew from './CertificationListAddNew.vue'

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
    BBadge,
    BTooltip,
    CertificationListAddNew,
  },
  setup() {
    const TEMPLATE_APP_STORE_MODULE_NAME = 'app-certification'

    // Register module
    if (!store.hasModule(TEMPLATE_APP_STORE_MODULE_NAME)) store.registerModule(TEMPLATE_APP_STORE_MODULE_NAME, masterStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(TEMPLATE_APP_STORE_MODULE_NAME)) store.unregisterModule(TEMPLATE_APP_STORE_MODULE_NAME)
    })

    const isAddNewCertificationSidebarActive = ref(false)

    const projectTypeOptions = [
      { label: 'Design Recognition', value: 'design_recognition' },
      { label: 'Final Assessment', value: 'final_assessment' },
    ]

    const {
      resolveProjectTypeIcon,
      resolveProjectTypeVariant,
      resolveProjectTypeTranslation,
      refetchData,
      refCertificationListTable,
    } = useCertificationsList()
    return {
      // Sidebar
      projectTypeOptions,
      isAddNewCertificationSidebarActive,
      refCertificationListTable,
      resolveProjectTypeIcon,
      resolveProjectTypeVariant,
      resolveProjectTypeTranslation,
      refetchData,
    }
  },
  data() {
    return {
      vendor: {},
      pageLength: 20,
      dir: false,
      searchTerm: '',
      columns: [
        {
          label: 'Certification Code',
          field: 'certification_code',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Certification',
          },
        },
        {
          label: 'Certification Name',
          field: 'certification_name',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Certification',
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
    this.retrieveVendor()
    this.retrieveCertifications()
  },
  methods: {
    retrieveVendor() {
      this.$http.get(`engine-rest/master-project/vendors/${router.currentRoute.params.vendorId}`, { })
        .then(res => { this.vendor = res.data })
        .catch(() => {
          useToast({
            component: ToastificationContent,
            props: {
              title: 'Error fetching vendor',
              icon: 'AlertTriangleIcon',
              variant: 'danger',
            },
          })
        })
    },
    retrieveCertifications() {
      this.$http.get(`engine-rest/master-project/vendors/${router.currentRoute.params.vendorId}/certification_types`)
        .then(res => { this.rows = res.data })
    },
    /* eslint-disable object-shorthand */
    handleError(err) {
      console.error('failed to show diagram', err)
    },
    /* eslint-enable object-shorthand */
  },
}
</script>
