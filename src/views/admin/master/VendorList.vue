<template>
  <div>
    <vendor-list-add-new
      :is-add-new-vendor-sidebar-active.sync="isAddNewVendorSidebarActive"
      @refetch-data="refetchData"
    />
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
              @click="isAddNewVendorSidebarActive = true"
            >
              <span class="text-nowrap">Add Vendor</span>
            </b-button>
          </div>
        </b-col>
      </b-form-group>
    </div>
    <!-- table -->
    <vue-good-table
      :ref="refVendorListTable"
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
                  :id="`project-row-${props.row.id}-vendor-icon`"
                  icon="EyeIcon"
                  size="16"
                  class="mx-1"
                  @click="$router.push({ name: 'admin-template-list', params: { vendorId: props.row.id }})"
                />
                <b-tooltip
                  title="Vendor Detail"
                  :target="`project-row-${props.row.id}-vendor-icon`"
                />

                <feather-icon
                  :id="`project-row-${props.row.id}-vendor-icon-edit`"
                  icon="EditIcon"
                  size="16"
                  class="mx-1"
                  @click="$router.push({ name: 'admin-vendor-edit', params: { vendorId: props.row.id }})"
                />
                <b-tooltip
                  title="Vendor Update"
                  :target="`project-row-${props.row.id}-vendor-icon-edit`"
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
  BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BButton, BCol, BTooltip,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'
import { ref, onUnmounted } from '@vue/composition-api'
import 'vue-good-table/dist/vue-good-table.css'
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import useVendorsList from './useVendorsList'
import masterStoreModule from './masterStoreModule'
import VendorListAddNew from './VendorListAddNew.vue'

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
    BTooltip,
    VendorListAddNew,
  },
  setup() {
    const VENDOR_APP_STORE_MODULE_NAME = 'app-vendor'

    // Register module
    if (!store.hasModule(VENDOR_APP_STORE_MODULE_NAME)) store.registerModule(VENDOR_APP_STORE_MODULE_NAME, masterStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(VENDOR_APP_STORE_MODULE_NAME)) store.unregisterModule(VENDOR_APP_STORE_MODULE_NAME)
    })

    const isAddNewVendorSidebarActive = ref(false)

    const {
      refetchData,
      refVendorListTable,
    } = useVendorsList()
    return {
      // Sidebar
      isAddNewVendorSidebarActive,
      refVendorListTable,
      refetchData,
    }
  },
  data() {
    return {
      pageLength: 20,
      dir: false,
      searchTerm: '',
      columns: [
        {
          label: 'Vendor Code',
          field: 'vendor_code',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Vendor',
          },
        },
        {
          label: 'Vendor Name',
          field: 'vendor_name',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Vendor',
          },
        },
        {
          label: 'Description',
          field: 'description',
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
    this.retrieveVendors()
  },
  methods: {
    retrieveVendors() {
      store.dispatch('app-vendor/fetchVendors', {})
        .then(res => { this.rows = res.data })
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
    /* eslint-disable object-shorthand */
    handleError(err) {
      console.error('failed to show', err)
    },
    /* eslint-enable object-shorthand */
  },
}
</script>
