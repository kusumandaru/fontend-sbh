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
        title="Detail Project"
        v-model="variableShow"
      >
        <b-card-text>
          <b-row>
            <b-col cols="12">
              <b-form-group label="Tipe Sertifikasi">
                <div class="form-control">{{ taskVariables['certification_type'] }}</div>
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Fungsi Gedung">
                <div class="form-control">{{ taskVariables['building_type'] }}</div>
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Nama Gedung">
                <div class="form-control">{{ taskVariables['building_name'] }}</div>
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Pemilik Gedung">
                <div class="form-control">{{ taskVariables['owner'] }}</div>
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Alamat Gedung">
                <div class="form-control">{{ taskVariables['building_address'] }}</div>
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Provinsi">
                <div class="form-control">{{ taskVariables['province_name'] }}</div>
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Kota/Kabupaten">
                <div class="form-control">{{ taskVariables['city_name'] }}</div>
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Kode Pos">
                <div class="form-control">{{ taskVariables['postal_code'] }}</div>
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Telepon">
                <div class="form-control">{{ taskVariables['telephone'] }}</div>
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Fax">
                <div class="form-control">{{ taskVariables['faximile'] }}</div>
              </b-form-group>
            </b-col>

             <b-col cols="12">
              <b-form-group label="Gross Floor Area">
                <div class="form-control">{{ taskVariables['gross_floor_area'] }}</div>
              </b-form-group>
            </b-col>

          </b-row>
        </b-card-text>
        <template>
          <b-img v-bind="paymentProps" fluid alt="Proof of Payment" />
        </template>
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
        size="lg"
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
                  :id="`project-row-${props.row.id}-preview-icon`"
                  icon="EyeIcon"
                  size="16"
                  class="mx-1"
                  @click="$router.push({ name: 'project-preview', params: { id: props.row.id }})"
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
                  @click="retrieveDiagrams(props.row.processDefinitionId, props.row.taskDefinitionKey)"
                />
                <b-tooltip
                  title="Activity Process"
                  :target="`project-row-${props.row.id}-activity-icon`"
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
  BAvatar, BBadge, BCardText, BCol, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BImg, BRow, BTooltip,
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
    BCol,
    BBadge,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BDropdown,
    BTooltip,
    BImg,
    BRow,
  },
  data() {
    return {
      pageLength: 20,
      dir: false,
      columns: [
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
          field: 'certificationType',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Certification Type',
          },
        },
        {
          label: 'Building Type',
          field: 'buildingType',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Building Type',
          },
        },
        {
          label: ' Building Name',
          field: 'buildingName',
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
          label: 'Created At',
          field: 'createTime',
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
      this.$http.get('engine-rest/new-building/tasks/admin')
        .then(res => { this.rows = res.data })
    },
    approveProject(taskId) {
      this.$http.get(`/engine-rest/new-building/accept-register-project/${taskId}`)
        .then(res => { this.claim = res.data })
      this.$router.go(this.$router.currentRoute)
    },
    rejectProject(taskId) {
      this.$http.get(`/engine-rest/new-building/reject-register-project/${taskId}`)
        .then(res => { this.claim = res.data })
      this.$router.go(this.$router.currentRoute)
    },
    retrieveVariables(taskId) {
      this.taskVariables = {}
      this.paymentProps.blank = true
      this.$http.get(`engine-rest/new-building/variables/${taskId}`)
        .then(res => {
          this.taskVariables = res.data
          const results = { ...this.taskVariables }
          if (Object.keys(results).length > 0) {
            this.getImageUrl(results.proof_of_payment_url)
            this.$delete(this.taskVariables, 'proof_of_payment_url')
            this.$delete(this.taskVariables, 'proof_of_payment')
          }
        })
      this.variableShow = true
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
    handleError: function (err) {
      console.error('failed to show diagram', err)
    },
    handleShown: function () {
      console.log('diagram shown')
    },
    handleLoading: function () {
      console.log('diagram loading')
    },
    getImageUrl(imageUrl) {
      if (imageUrl !== undefined) {
        this.paymentProps.blank = false
        this.paymentProps.src = imageUrl
      }
    },
    /* eslint-enable object-shorthand */

  },
}
</script>
