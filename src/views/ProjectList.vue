<template>
  <div>
    <!-- input search -->
    <div class="custom-search d-flex justify-content-end">
      <b-form-group>
        <div class="d-flex align-items-center">
          <label class="mr-1">Search</label>
          <b-form-input
            v-model="searchTerm"
            placeholder="Search"
            type="text"
            class="d-inline-block"
          />
        </div>
      </b-form-group>
      <b-modal
        id="modal-success"
        ok-only
        ok-variant="success"
        ok-title="Accept"
        modal-class="modal-success"
        centered
        title="Variable Modal"
        v-model="variableShow"
      >
        <b-card-text>
          <ul>
            <li v-for="(value, name) in taskVariables" :key="value">
              {{ name }} : {{ value.value }}
            </li>
          </ul>
        </b-card-text>
      </b-modal>
      <b-modal
        id="modal-success"
        ok-only
        ok-variant="success"
        ok-title="Accept"
        modal-class="modal-success"
        centered
        title="Diagram Modal"
        v-model="diagramShow"
      >
        <b-card-text>
          <vue-bpmn
            :xml="diagramXML"
            :activity="activityId"
            :options="options"
            v-on:error="handleError"
            v-on:shown="handleShown"
            v-on:loading="handleLoading"
          ></vue-bpmn>
        </b-card-text>
      </b-modal>
    </div>
    <!-- table -->
    <vue-good-table
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
          v-if="props.column.field === 'fullName'"
          class="text-nowrap"
        >
          <b-avatar
            :src="props.row.avatar"
            class="mx-1"
          />
          <span class="text-nowrap">{{ props.row.fullName }}</span>
        </div>

        <!-- Column: Status -->
        <span v-else-if="props.column.field === 'status'">
          <b-badge :variant="statusVariant(props.row.status)">
            {{ props.row.status }}
          </b-badge>
        </span>

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
                  icon="MoreVerticalIcon"
                  size="16"
                  class="text-body align-middle mr-25"
                />
              </template>
              <b-dropdown-item @click="retrieveVariables(props.row.id)">
                <feather-icon
                  icon="Edit2Icon"
                  class="mr-50"
                />
                <span>Detail</span>
              </b-dropdown-item>
              <b-dropdown-item @click="claimProject(props.row.id)">
                <feather-icon
                  icon="Edit2Icon"
                  class="mr-50"
                />
                <span>Claim</span>
              </b-dropdown-item>
              <b-dropdown-item @click="completeProject(props.row.id)">
                <feather-icon
                  icon="CheckIcon"
                  class="mr-50"
                />
                <span>Complete</span>
              </b-dropdown-item>
              <b-dropdown-item @click="retrieveDiagrams(props.row.processDefinitionId, props.row.processInstanceId)">
                <feather-icon
                  icon="ActivityIcon"
                  class="mr-50"
                />
                <span>Diagram</span>
              </b-dropdown-item>
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
              :options="['3','5','10']"
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
  BAvatar, BBadge, BCardText, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'
import 'vue-good-table/dist/vue-good-table.css'
import VueBpmn from '@/views/VueBpmn.vue'

export default {
  components: {
    VueGoodTable,
    VueBpmn,
    BAvatar,
    BCardText,
    BBadge,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BDropdown,
    BDropdownItem,
  },
  data() {
    return {
      pageLength: 3,
      dir: false,
      columns: [
        {
          label: 'ID',
          field: 'id',
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
          label: 'Assignee',
          field: 'assignee',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Assignee',
          },
        },
        {
          label: 'Created At',
          field: 'created',
        },
        {
          label: 'Action',
          field: 'action',
        },
      ],
      rows: [],
      taskVariables: [],
      taskDiagrams: {},
      activityInstances: {},
      claim: '',
      searchTerm: '',
      variableShow: false,
      diagramShow: false,
      diagramXML: null,
      activityId: null,
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
        Current      : 'light-primary',
        Professional : 'light-success',
        Rejected     : 'light-danger',
        Resigned     : 'light-warning',
        Applied      : 'light-info',
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
  },
  created() {
    this.retrieveProjects()
  },
  methods: {
    retrieveProjects() {
      this.$http.get('engine-rest/task')
        .then(res => { this.rows = res.data })
    },
    claimProject(taskId) {
      const request = {
        userId: 'admin',
      }
      this.$http.post(`/engine-rest/task/${taskId}/claim`, request)
        .then(res => { this.claim = res.data })
      this.$router.go(this.$router.currentRoute)
    },
    completeProject(taskId) {
      const request = {
        userId: 'admin',
      }
      this.$http.post(`/engine-rest/task/${taskId}/complete`, request)
        .then(res => { this.claim = res.data })
      this.$router.go(this.$router.currentRoute)
    },
    retrieveVariables(taskId) {
      this.$http.get(`engine-rest/task/${taskId}/variables`)
        .then(res => { this.taskVariables = res.data })
      this.variableShow = true
    },
    retrieveDiagrams(processDefinitionId, processInstanceId) {
      this.$http.get(`engine-rest/process-definition/${processDefinitionId}/xml`)
        .then(res => {
          this.taskDiagrams = res.data
          this.diagramXML = this.taskDiagrams.bpmn20Xml
        })
      this.$http.get(`engine-rest/process-instance/${processInstanceId}/activity-instances`)
        .then(res => {
          this.activityInstances = res.data
          this.activityId = this.activityInstances.childActivityInstances[0].activityId
        })
      this.diagramShow = true
    },
    /* eslint-disable object-shorthand */
    handleError: function (err) {
      console.error('failed to show diagram', err)
    },
    handleShown: function () {
      console.log('diagram shown')
    },
    handleLoading: function () {
      console.log('diagram loading')
    },
    /* eslint-enable object-shorthand */

  },
}
</script>
