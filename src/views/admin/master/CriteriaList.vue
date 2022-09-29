<template>
  <div>
    <criteria-list-add-new
      :is-add-new-criteria-sidebar-active.sync="isAddNewCriteriaSidebarActive"
      :exercise-type-options="exerciseTypeOptions"
      @refetch-data="refetchData"
    />
    <score-modifier-list-add-new
      :is-add-new-score-modifier-sidebar-active.sync="isAddNewScoreModifierSidebarActive"
      @refetch-data="refetchData"
    />

    <!-- card 3 -->
    <b-col
      md="6"
      lg="4"
    >
      <b-card
        header=""
        :title="exercise.name"
        :footer="exercise.code"
        class="text-center"
        footer-class="text-muted"
      >
        <b-card-text>
          {{ exercise.exercise_type }}
        </b-card-text>
        <b-card-text>
          {{ exercise.created_by }}
        </b-card-text>
        <b-card-text>
          {{ exercise.created_at }}
        </b-card-text>
      </b-card>
    </b-col>

    <!-- Criteria -->
    <b-card-body>
      <b-card-title>Criteria</b-card-title>
      <b-card-sub-title>Field for set criterial</b-card-sub-title>
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
              @click="isAddNewCriteriaSidebarActive = true"
            >
              <span class="text-nowrap">Add Criteria</span>
            </b-button>
          </div>
        </b-col>
      </b-form-group>
    </div>
    <!-- table -->
    <vue-good-table
      :ref="refCriteriaListTable"
      :columns="criteriaColumns"
      :rows="criteriaRows"
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
        <!-- Column: Exercise Type -->
        <div
          v-if="props.column.field === 'exercise'"
          class="text-nowrap"
        >
          <b-badge :variant="resolveExerciseTypeVariant(props.row.exercise_type)">
            {{ resolveExerciseTypeTranslation(props.row.exercise_type) }}
          </b-badge>
        </div>

        <!-- Column: Description -->
        <div
          v-if="props.column.field === 'desc'"
        >
          <span v-html="props.row.description" />
        </div>

        <!-- Column: Additional Notes -->
        <div
          v-if="props.column.field === 'note'"
        >
          <span v-html="props.row.additional_notes" />
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
                  :id="`project-row-${props.row.id}-criteria-icon`"
                  icon="EyeIcon"
                  size="16"
                  class="mx-1"
                  @click="$router.push({ name: 'admin-document-list', params: { vendorId: $router.currentRoute.params.vendorId, templateId: $router.currentRoute.params.templateId, evaluationId: $router.currentRoute.params.evaluationId, exerciseId: $router.currentRoute.params.exerciseId, criteriaId: props.row.id }})"
                />
                <b-tooltip
                  title="Criteria Detail"
                  :target="`project-row-${props.row.id}-criteria-icon`"
                />

                <feather-icon
                  :id="`project-row-${props.row.id}-criteria-icon-edit`"
                  icon="EditIcon"
                  size="16"
                  class="mx-1"
                  @click="$router.push({ name: 'admin-criteria-edit', params: { criteriaId: props.row.id }})"
                />
                <b-tooltip
                  title="Criteria Update"
                  :target="`project-row-${props.row.id}-criteria-icon-edit`"
                />

                <feather-icon
                  :id="`project-row-${props.row.id}-criteria-icon-delete`"
                  icon="TrashIcon"
                  size="16"
                  class="mx-1"
                  @click="deleteCriteria(props.row.id)"
                />
                <b-tooltip
                  title="Delete Criteria"
                  :target="`project-row-${props.row.id}-criteria-icon-delete`"
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

    <!-- Score Modifier -->
    <b-card-body>
      <b-card-title>Score Modifier</b-card-title>
      <b-card-sub-title>Field for set score modifier</b-card-sub-title>
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
              @click="isAddNewScoreModifierSidebarActive = true"
            >
              <span class="text-nowrap">Add Score Modifier</span>
            </b-button>
          </div>
        </b-col>
      </b-form-group>
    </div>
    <!-- table -->
    <vue-good-table
      :ref="refScoreModifierListTable"
      :columns="scoreModifierColumns"
      :rows="scoreModifierRows"
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
        <!-- Column: Description -->
        <div
          v-if="props.column.field === 'desc'"
        >
          <span v-html="props.row.description" />
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
                  :id="`project-row-${props.row.id}-score-modifier-icon-edit`"
                  icon="EditIcon"
                  size="16"
                  class="mx-1"
                  @click="$router.push({ name: 'admin-score-modifier-edit', params: { scoreModifierId: props.row.id }})"
                />
                <b-tooltip
                  title="Score Modifier Update"
                  :target="`project-row-${props.row.id}-score-modifier-icon-edit`"
                />

                <feather-icon
                  :id="`project-row-${props.row.id}-score-modifier-icon-delete`"
                  icon="TrashIcon"
                  size="16"
                  class="mx-1"
                  @click="deleteScoreModifier(props.row.id)"
                />
                <b-tooltip
                  title="Delete Score Modifier"
                  :target="`project-row-${props.row.id}-score-modifier-icon-delete`"
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
  BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BButton, BCol, BCard, BCardText, BTooltip, BBadge, BCardBody, BCardTitle, BCardSubTitle,
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
import useCriteriasList from './useCriteriasList'
import useScoreModifiersList from './useScoreModifiersList'
import masterStoreModule from './masterStoreModule'
import CriteriaListAddNew from './CriteriaListAddNew.vue'
import ScoreModifierListAddNew from './ScoreModifierListAddNew.vue'

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
    BCardBody,
    BCardTitle,
    BCardSubTitle,
    BCardText,
    BTooltip,
    BBadge,
    CriteriaListAddNew,
    ScoreModifierListAddNew,
  },
  setup() {
    const CRITERIA_APP_STORE_MODULE_NAME = 'app-criteria'

    // Register module
    if (!store.hasModule(CRITERIA_APP_STORE_MODULE_NAME)) store.registerModule(CRITERIA_APP_STORE_MODULE_NAME, masterStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(CRITERIA_APP_STORE_MODULE_NAME)) store.unregisterModule(CRITERIA_APP_STORE_MODULE_NAME)
    })

    const isAddNewCriteriaSidebarActive = ref(false)
    const isAddNewScoreModifierSidebarActive = ref(false)
    const toast = useToast()
    const isLoading = ref(null)

    const deleteCriteria = criteriaId => {
      Vue.swal({
        title: 'Are you sure?',
        text: 'Delete this criteria',
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

          store.dispatch('app-criteria/deleteCriteria', {
            criteriaId,
          })
            .then(() => {
              isLoading.value = false
              toast({
                component: ToastificationContent,
                props: {
                  title: 'Success',
                  icon: 'InfoIcon',
                  text: 'Successfully delete criteria',
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

    const deleteScoreModifier = scoreModifierId => {
      Vue.swal({
        title: 'Are you sure?',
        text: 'Delete this score modifier',
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

          store.dispatch('app-criteria/deleteScoreModifier', {
            scoreModifierId,
          })
            .then(() => {
              isLoading.value = false
              toast({
                component: ToastificationContent,
                props: {
                  title: 'Success',
                  icon: 'InfoIcon',
                  text: 'Successfully delete score modifier',
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

    const exerciseTypeOptions = [
      { label: 'Prequisite', value: 'prequisite' },
      { label: 'Score', value: 'score' },
      { label: 'Max Score', value: 'max_score' },
    ]

    const {
      resolveExerciseTypeIcon,
      resolveExerciseTypeVariant,
      resolveExerciseTypeTranslation,
      refetchData,
      refCriteriaListTable,
    } = useCriteriasList()

    const {
      refScoreModifierListTable,
    } = useScoreModifiersList()

    return {
      // Sidebar
      exerciseTypeOptions,
      isAddNewCriteriaSidebarActive,
      isAddNewScoreModifierSidebarActive,
      refCriteriaListTable,
      refScoreModifierListTable,
      resolveExerciseTypeIcon,
      resolveExerciseTypeVariant,
      resolveExerciseTypeTranslation,
      refetchData,
      isLoading,
      deleteCriteria,
      deleteScoreModifier,
    }
  },
  data() {
    return {
      exercise: {},
      pageLength: 20,
      dir: false,
      searchTerm: '',
      criteriaColumns: [
        {
          label: 'Code',
          field: 'code',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Code',
          },
        },
        {
          label: 'Exercise Type',
          field: 'exercise',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Type',
          },
        },
        {
          label: 'Score',
          field: 'score',
          type: 'number',
        },
        {
          label: 'Description',
          field: 'desc',
        },
        {
          label: 'Additional Notes',
          field: 'note',
        },
        {
          label: 'Not Available',
          field: 'not_available',
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
      scoreModifierColumns: [
        {
          label: 'Title',
          field: 'title',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Title',
          },
        },
        {
          label: 'Score Modifier',
          field: 'score_modifier',
          type: 'number',
        },
        {
          label: 'Description',
          field: 'desc',
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
      criteriaRows: [],
      scoreModifierRows: [],
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
  created() {
    this.retrieveExercise()
    this.retrieveCriterias()
    this.retrieveScoreModifiers()
  },
  methods: {
    retrieveExercise() {
      this.$http.get(`engine-rest/master-project/exercises/${router.currentRoute.params.exerciseId}`, { })
        .then(res => { this.exercise = res.data })
        .catch(() => {
          useToast({
            component: ToastificationContent,
            props: {
              title: 'Error fetching exercise',
              icon: 'AlertTriangleIcon',
              variant: 'danger',
            },
          })
        })
    },
    retrieveCriterias() {
      this.$http.get(`engine-rest/master-project/exercises/${router.currentRoute.params.exerciseId}/criterias`)
        .then(res => { this.criteriaRows = res.data })
    },
    retrieveScoreModifiers() {
      this.$http.get(`engine-rest/master-project/exercises/${router.currentRoute.params.exerciseId}/score_modifiers`)
        .then(res => { this.scoreModifierRows = res.data })
    },
    /* eslint-disable object-shorthand */
    handleError(err) {
      console.error('failed to show diagram', err)
    },
    /* eslint-enable object-shorthand */
  },
}
</script>
