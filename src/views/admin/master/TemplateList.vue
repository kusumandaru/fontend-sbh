<template>
  <div>
    <template-list-add-new
      :is-add-new-template-sidebar-active.sync="isAddNewTemplateSidebarActive"
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
              @click="isAddNewTemplateSidebarActive = true"
            >
              <span class="text-nowrap">Add Template</span>
            </b-button>
          </div>
        </b-col>
      </b-form-group>
    </div>
    <!-- table -->
    <vue-good-table
      :ref="refTemplateListTable"
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
                  :id="`project-row-${props.row.id}-template-icon`"
                  icon="EyeIcon"
                  size="16"
                  class="mx-1"
                  @click="$router.push({ name: 'admin-evaluation-list', params: { vendorId: $router.currentRoute.params.vendorId, templateId: props.row.id }})"
                />
                <b-tooltip
                  title="Template Detail"
                  :target="`project-row-${props.row.id}-template-icon`"
                />

                <feather-icon
                  :id="`project-row-${props.row.id}-template-icon-edit`"
                  icon="EditIcon"
                  size="16"
                  class="mx-1"
                  @click="$router.push({ name: 'admin-template-edit', params: { vendorId: $router.currentRoute.params.vendorId, templateId: props.row.id }})"
                />
                <b-tooltip
                  title="Template Update"
                  :target="`project-row-${props.row.id}-template-icon-edit`"
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
import useTemplatesList from './useTemplatesList'
import masterStoreModule from './masterStoreModule'
import TemplateListAddNew from './TemplateListAddNew.vue'

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
    TemplateListAddNew,
  },
  setup() {
    const TEMPLATE_APP_STORE_MODULE_NAME = 'app-template'

    // Register module
    if (!store.hasModule(TEMPLATE_APP_STORE_MODULE_NAME)) store.registerModule(TEMPLATE_APP_STORE_MODULE_NAME, masterStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(TEMPLATE_APP_STORE_MODULE_NAME)) store.unregisterModule(TEMPLATE_APP_STORE_MODULE_NAME)
    })

    const isAddNewTemplateSidebarActive = ref(false)

    const projectTypeOptions = [
      { label: 'Design Recognition', value: 'design_recognition' },
      { label: 'Final Assessment', value: 'final_assessment' },
    ]

    const {
      resolveProjectTypeIcon,
      resolveProjectTypeVariant,
      resolveProjectTypeTranslation,
      refetchData,
      refTemplateListTable,
    } = useTemplatesList()
    return {
      // Sidebar
      projectTypeOptions,
      isAddNewTemplateSidebarActive,
      refTemplateListTable,
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
          label: 'Project Type',
          field: 'project_type',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Template',
          },
        },
        {
          label: 'Project Version',
          field: 'project_version',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Template',
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
    this.retrieveTemplates()
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
    retrieveTemplates() {
      this.$http.get(`engine-rest/master-project/vendors/${router.currentRoute.params.vendorId}/templates`)
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
