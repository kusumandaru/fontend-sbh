<template>
  <div>
    <evaluation-list-add-new
      :is-add-new-evaluation-sidebar-active.sync="isAddNewEvaluationSidebarActive"
      @refetch-data="refetchData"
    />
    <level-list-add-new
      :is-add-new-level-sidebar-active.sync="isAddNewLevelSidebarActive"
      @refetch-data="refetchData"
    />

    <b-col
      md="6"
      lg="4"
    >
      <b-card
        header=""
        :title="template.project_version"
        :footer="template.project_type"
        class="text-center"
        footer-class="text-muted"
      >
        <b-card-text>
          {{ template.created_by }}
        </b-card-text>
        <b-card-text>
          {{ template.created_at }}
        </b-card-text>
      </b-card>
    </b-col>

    <!-- Evaluation -->
    <b-card-body>
      <b-card-title>Master Evaluation</b-card-title>
      <b-card-sub-title>Score Assessment Evaluation Name</b-card-sub-title>
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
              @click="isAddNewEvaluationSidebarActive = true"
            >
              <span class="text-nowrap">Add Evaluation</span>
            </b-button>
          </div>
        </b-col>
      </b-form-group>
    </div>
    <!-- table -->
    <vue-good-table
      :ref="refEvaluationListTable"
      :columns="evaluationColumns"
      :rows="evaluationRows"
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
                  :id="`project-row-${props.row.id}-evaluation-icon`"
                  icon="EyeIcon"
                  size="16"
                  class="mx-1"
                  @click="$router.push({ name: 'admin-exercise-list', params: { vendorId: $router.currentRoute.params.vendorId, templateId: $router.currentRoute.params.templateId, evaluationId: props.row.id }})"
                />
                <b-tooltip
                  title="Evaluation Detail"
                  :target="`project-row-${props.row.id}-evaluation-icon`"
                />

                <feather-icon
                  :id="`project-row-${props.row.id}-evaluation-icon-edit`"
                  icon="EditIcon"
                  size="16"
                  class="mx-1"
                  @click="$router.push({ name: 'admin-evaluation-edit', params: { vendorId: $router.currentRoute.params.vendorId, templateId: $router.currentRoute.params.templateId, evaluationId: props.row.id }})"
                />
                <b-tooltip
                  title="Evaluation Update"
                  :target="`project-row-${props.row.id}-evaluation-icon-edit`"
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

    <!-- Level -->
    <b-card-body>
      <b-card-title>Level Score</b-card-title>
      <b-card-sub-title>Field for set score level</b-card-sub-title>
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
              @click="isAddNewLevelSidebarActive = true"
            >
              <span class="text-nowrap">Add Level</span>
            </b-button>
          </div>
        </b-col>
      </b-form-group>
    </div>
    <!-- table -->
    <vue-good-table
      :ref="refLevelListTable"
      :columns="levelColumns"
      :rows="levelRows"
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
                  :id="`project-row-${props.row.id}-level-icon-edit`"
                  icon="EditIcon"
                  size="16"
                  class="mx-1"
                  @click="$router.push({ name: 'admin-level-edit', params: { levelId: props.row.id }})"
                />
                <b-tooltip
                  title="Building Document Update"
                  :target="`project-row-${props.row.id}-level-icon-edit`"
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
  BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BButton, BCol, BCard, BCardBody, BCardTitle, BCardSubTitle, BCardText, BTooltip,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'
import { ref, onUnmounted } from '@vue/composition-api'
import 'vue-good-table/dist/vue-good-table.css'
import router from '@/router'
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import useEvaluationsList from './useEvaluationsList'
import masterStoreModule from './masterStoreModule'
import EvaluationListAddNew from './EvaluationListAddNew.vue'
import LevelListAddNew from './LevelListAddNew.vue'

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
    BCardBody,
    BCardTitle,
    BCardSubTitle,
    BCardText,
    BTooltip,
    EvaluationListAddNew,
    LevelListAddNew,

  },
  setup() {
    const EVALUATION_APP_STORE_MODULE_NAME = 'app-evaluation'

    // Register module
    if (!store.hasModule(EVALUATION_APP_STORE_MODULE_NAME)) store.registerModule(EVALUATION_APP_STORE_MODULE_NAME, masterStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(EVALUATION_APP_STORE_MODULE_NAME)) store.unregisterModule(EVALUATION_APP_STORE_MODULE_NAME)
    })

    const isAddNewEvaluationSidebarActive = ref(false)
    const isAddNewLevelSidebarActive = ref(false)

    const {
      resolveProjectTypeIcon,
      resolveProjectTypeVariant,
      resolveProjectTypeTranslation,
      refetchData,
      refEvaluationListTable,
      refLevelListTable,
    } = useEvaluationsList()
    return {
      // Sidebar
      isAddNewEvaluationSidebarActive,
      isAddNewLevelSidebarActive,
      refEvaluationListTable,
      refLevelListTable,
      resolveProjectTypeIcon,
      resolveProjectTypeVariant,
      resolveProjectTypeTranslation,
      refetchData,
    }
  },
  data() {
    return {
      template: {},
      pageLength: 20,
      dir: false,
      searchTerm: '',
      evaluationColumns: [
        {
          label: 'Code',
          field: 'code',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Code',
          },
        },
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
      evaluationRows: [],
      levelColumns: [
        {
          label: 'Level Name',
          field: 'name',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Level',
          },
        },
        {
          label: 'Minimum Score',
          field: 'minimum_score',
        },
        {
          label: 'Percentage',
          field: 'percentage',
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
      levelRows: [],
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
    this.retrieveTemplate()
    this.retrieveEvaluations()
    this.retrieveLevels()
  },
  methods: {
    retrieveTemplate() {
      this.$http.get(`engine-rest/master-project/templates/${router.currentRoute.params.templateId}`, { })
        .then(res => { this.template = res.data })
        .catch(() => {
          useToast({
            component: ToastificationContent,
            props: {
              title: 'Error fetching template',
              icon: 'AlertTriangleIcon',
              variant: 'danger',
            },
          })
        })
    },
    retrieveEvaluations() {
      this.$http.get(`engine-rest/master-project/templates/${router.currentRoute.params.templateId}/evaluations`)
        .then(res => { this.evaluationRows = res.data })
    },
    retrieveLevels() {
      this.$http.get(`engine-rest/master-project/templates/${router.currentRoute.params.templateId}/levels`)
        .then(res => { this.levelRows = res.data })
    },
    /* eslint-disable object-shorthand */
    handleError(err) {
      console.error('failed to show diagram', err)
    },
    /* eslint-enable object-shorthand */
  },
}
</script>
