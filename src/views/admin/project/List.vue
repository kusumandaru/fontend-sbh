<template>
  <div>
    <!-- input search -->
    <div class="custom-search d-flex justify-content-end">
      <b-modal
        id="modal-success"
        v-model="diagramShow"
        ok-only
        ok-variant="success"
        ok-title="Accept"
        modal-class="modal-success"
        centered
        title="Diagram Modal"
        hide-header-close
        size="lg"
      >
        <b-card-text>
          <vue-bpmn
            :xml="diagramXML"
            :activity="activityId"
            :options="options"
            @error="handleError"
          />
        </b-card-text>
      </b-modal>
    </div>
    <!-- table -->
    <!--  eslint-disable vue/attribute-hyphenation -->
    <vue-good-table
      mode="remote"
      :totalRows="totalRecords"
      :isLoading.sync="isLoading"
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
      :sort-options="{
        enabled: false,
      }"
      @on-page-change="onPageChange"
      @on-sort-change="onSortChange"
      @on-column-filter="onColumnFilter"
      @on-per-page-change="onPerPageChange"
    >
      <!--  eslint-enable vue/attribute-hyphenation -->
      <template
        slot="table-row"
        slot-scope="props"
      >

        <!-- Column: Name -->
        <div
          v-if="props.column.field === 'fullName'"
          class="text-nowrap"
        >
          <b-avatar
            :src="props.row.avatar"
            class="mx-1"
          />
          <span class="text-nowrap">{{ props.row.fullName }}</span>
        </div>

        <!-- Column: Role -->
        <span v-else-if="props.column.field === 'role'">
          <b-badge :variant="roleVariant(props.row.task_definition_key)">
            {{ roleByTaskID(props.row.task_definition_key) }}
          </b-badge>
        </span>

        <!-- Column: Read -->
        <span v-else-if="props.column.field === 'read'">
          <feather-icon
            :icon="readIcon(props.row.read)"
            class="mr-25"
          />
        </span>

        <!-- Column: Status -->
        <span v-else-if="props.column.field === 'status'">
          <b-badge :variant="statusVariant(props.row.status)">
            {{ props.row.status }}
          </b-badge>
        </span>

        <!-- Column: Action -->
        <span
          v-else-if="props.column.field === 'action'"
          class="text-nowrap"
        >
          <span>
            <div class="icon-wrapper">
              <feather-icon
                :id="`project-row-${props.row.id}-preview-icon`"
                icon="EyeIcon"
                size="16"
                class="mx-1"
                @click="goToPreview(props.row.id)"
              />
              <b-tooltip
                title="Preview Project"
                :target="`project-row-${props.row.id}-preview-icon`"
              />
              <feather-icon
                :id="`project-row-${props.row.id}-activity-icon`"
                icon="ActivityIcon"
                size="16"
                class="mx-1"
                @click="retrieveDiagrams(props.row.process_definition_id, props.row.task_definition_key)"
              />
              <b-tooltip
                title="Activity Process"
                :target="`project-row-${props.row.id}-activity-icon`"
              />
            </div>
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
  BAvatar, BBadge, BCardText, BPagination, BFormSelect, BTooltip,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'
import 'vue-good-table/dist/vue-good-table.css'
import VueBpmn from '@/views/VueBpmn.vue'
import router from '@/router'

export default {
  components: {
    VueGoodTable,
    VueBpmn,
    BAvatar,
    BCardText,
    BBadge,
    BPagination,
    BFormSelect,
    BTooltip,
  },
  data() {
    return {
      pageLength: 20,
      dir: false,
      columns: [
        {
          label: 'Role',
          field: 'role',
        },
        {
          label: 'Process Name',
          field: 'name',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Process',
          },
        },
        {
          label: 'Certification Type',
          field: 'certification_type',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Certification Type',
          },
        },
        {
          label: 'Building Type',
          field: 'building_type_name',
        },
        {
          label: ' Building Name',
          field: 'building_name',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Building Name',
          },
        },
        {
          label: 'Assignee',
          field: 'assignee',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Assignee',
          },
        },
        {
          label: 'Read',
          field: 'read',
        },
        {
          label: 'Created At',
          field: 'created_at',
        },
        {
          label: 'Status',
          field: 'status',
        },
        {
          label: 'Action',
          field: 'action',
        },
      ],
      rows: [],
      isLoading: false,
      totalRecords: 0,
      serverParams: {
        columnFilters: {
        },
        sort: [
          {
            field: 'created_at',
            type: 'asc',
          },
        ],
        page: 1,
        firstResult: 0,
        perPage: 20,
      },
      taskVariables: [],
      taskDiagrams: {},
      activityInstances: {},
      claim: '',
      searchTerm: '',
      diagramShow: false,
      diagramXML: null,
      activityId: null,
      paymentProps: {
        center: true,
        fluidGrow: true,
        blank: true,
        blankColor: '#bbb',
        class: 'my-5',
      },
      proofOfPaymentUrl: '',
      options: {
        propertiesPanel: {},
        additionalModules: [],
        moddleExtensions: [],
      },
    }
  },
  computed: {
    statusVariant() {
      const statusColor = {
        /* eslint-disable key-spacing */
        approved: 'light-success',
        rejected: 'light-danger',
        pending: 'light-warning',
        /* eslint-enable key-spacing */
      }

      return status => statusColor[status]
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
    readIcon() {
      const statusIcon = {
        /* eslint-disable key-spacing */
        true: 'CheckSquareIcon',
        false: 'SquareIcon',
        /* eslint-enable key-spacing */
      }

      return icon => statusIcon[icon]
    },
    roleByTaskID() {
      const roleTask = {
        /* eslint-disable key-spacing */
        'fill-registration-project': 'client',
        'check-registration-project': 'admin',
        'fill-document-building': 'client',
        'check-document-building': 'admin',
        agreement: 'admin',
        'first-payment': 'client',
        'check-first-payment': 'admin',
        workshop: 'admin',
        'second-payment': 'client',
        'check-second-payment': 'admin',
        'design-recognition-submission': 'client',
        'third-payment': 'client',
        'check-third-payment': 'client',
        'design-recognition-review': 'admin',
        'design-recognition-evaluation-assessment': 'admin',
        'design-recognition-trial': 'admin',
        'design-recognition-trial-revision': 'client',
        'design-recognition-revision-review': 'admin',
        'design-recognition-letter': 'admin',
        'final-assessment-submission': 'client',
        'third-payment-fa': 'client',
        'check-third-payment-fa': 'admin',
        'final-assessment-review': 'admin',
        'on-site-verification': 'admin',
        'on-site-revision-submission': 'client',
        'final-assessment-evaluation-assessment': 'admin',
        'final-assessment-trial-revision': 'client',
        'final-assessment-revision-review': 'admin',
        'final-assessment-letter': 'client',
        /* eslint-enable key-spacing */
      }

      return taskId => roleTask[taskId]
    },
    roleVariant() {
      const roleColor = {
        /* eslint-disable key-spacing */
        'fill-registration-project': 'primary',
        'check-registration-project': 'secondary',
        'fill-document-building': 'primary',
        'check-document-building': 'secondary',
        agreement: 'secondary',
        'first-payment': 'primary',
        'check-first-payment': 'secondary',
        workshop: 'secondary',
        'second-payment': 'primary',
        'check-second-payment': 'secondary',
        'design-recognition-submission': 'primary',
        'third-payment': 'primary',
        'check-third-payment': 'primary',
        'design-recognition-review': 'secondary',
        'design-recognition-evaluation-assessment': 'secondary',
        'design-recognition-trial': 'secondary',
        'design-recognition-trial-revision': 'primary',
        'design-recognition-revision-review': 'secondary',
        'design-recognition-letter': 'secondary',
        'final-assessment-submission': 'primary',
        'third-payment-fa': 'primary',
        'check-third-payment-fa': 'secondary',
        'final-assessment-review': 'secondary',
        'final-assessment-evaluation-assessment': 'secondary',
        'final-assessment-trial-revision': 'primary',
        'final-assessment-revision-review': 'secondary',
        'final-assessment-letter': 'primary',
        /* eslint-enable key-spacing */
      }

      return role => roleColor[role]
    },
  },
  created() {
    this.loadItems()
  },
  methods: {
    retrieveProjects() {
      this.$http.get('engine-rest/new-building/tasks/pagi')
        .then(res => {
          this.rows = res.data.sbh_tasks
          this.totalRecords = res.data.count
        })
    },
    retrieveDiagrams(processDefinitionId, taskDefinitionKey) {
      this.$http.get(`engine-rest/process-definition/${processDefinitionId}/xml`)
        .then(res => {
          this.taskDiagrams = res.data
          this.diagramXML = this.taskDiagrams.bpmn20Xml
        })
      this.activityId = taskDefinitionKey
      this.diagramShow = true
    },
    /* eslint-disable object-shorthand */
    handleError(err) {
      console.error('failed to show diagram', err)
    },
    getImageUrl(imageUrl) {
      if (imageUrl !== undefined) {
        this.paymentProps.blank = false
        this.paymentProps.src = imageUrl
      }
    },
    goToPreview(id) {
      const request = new FormData()
      request.append('task_id', id)
      const config = {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      }
      this.$http.post('engine-rest/new-building/read-task', request, config)
      router.push({ name: 'admin-project-preview', params: { id: id } })
    },
    updateParams(newProps) {
      // eslint-disable-next-line prefer-object-spread
      this.serverParams = Object.assign({}, this.serverParams, newProps)
    },
    onPageChange(params) {
      this.updateParams({ page: params.currentPage })
      this.updateParams({ firstResult: ((params.currentPage - 1) * params.currentPerPage) })
      this.loadItems()
    },
    onPerPageChange(params) {
      this.updateParams({ perPage: params.currentPerPage })
      this.updateParams({ firstResult: ((params.currentPage - 1) * params.currentPerPage) })
      this.loadItems()
    },
    onSortChange(params) {
      this.updateParams({
        sort: [{
          type: params[0].type,
          field: params[0].field,
        }],
      })
      this.loadItems()
    },
    onColumnFilter(params) {
      this.updateParams(params)
      this.loadItems()
    },

    // load items is what brings back the rows from server
    loadItems() {
      const request = {
        page: this.serverParams.firstResult,
        size: this.serverParams.perPage,
        sort: this.serverParams.sort,
        filter: this.serverParams.columnFilters,
      }
      request.filter.buildingTypeName = request.filter.building_type_name
      request.filter.buildingName = request.filter.building_name
      request.filter.certificationType = request.filter.certification_type

      this.$http.post('engine-rest/new-building/tasks/pagi', request)
        .then(res => {
          this.totalRecords = res.data.count
          this.rows = res.data.sbh_tasks
        })
    },
    /* eslint-enable object-shorthand */

  },
}
</script>
