<template>
  <div>
    <exercise-list-add-new
      :is-add-new-exercise-sidebar-active.sync="isAddNewExerciseSidebarActive"
      :exercise-type-options="exerciseTypeOptions"
      @refetch-data="refetchData"
    />

    <!-- card 3 -->
    <b-col
      md="6"
      lg="4"
    >
      <b-card
        header=""
        :title="evaluation.code"
        :footer="evaluation.name"
        class="text-center"
        footer-class="text-muted"
      >
        <b-card-text>
          {{ evaluation.created_by }}
        </b-card-text>
        <b-card-text>
          {{ evaluation.created_at }}
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
              @click="isAddNewExerciseSidebarActive = true"
            >
              <span class="text-nowrap">Add Exercise</span>
            </b-button>
          </div>
        </b-col>
      </b-form-group>
    </div>
    <!-- table -->
    <vue-good-table
      :ref="refExerciseListTable"
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
                  :id="`project-row-${props.row.id}-exercise-icon`"
                  icon="EyeIcon"
                  size="16"
                  class="mx-1"
                  @click="$router.push({ name: 'admin-criteria-list', params: { vendorId: $router.currentRoute.params.vendorId, templateId: $router.currentRoute.params.templateId, evaluationId: $router.currentRoute.params.evaluationId, exerciseId: props.row.id }})"
                />
                <b-tooltip
                  title="Exercise Detail"
                  :target="`project-row-${props.row.id}-exercise-icon`"
                />

                <feather-icon
                  :id="`project-row-${props.row.id}-exercise-icon-edit`"
                  icon="EditIcon"
                  size="16"
                  class="mx-1"
                  @click="$router.push({ name: 'admin-exercise-edit', params: { exerciseId: props.row.id }})"
                />
                <b-tooltip
                  title="Exercise Update"
                  :target="`project-row-${props.row.id}-exercise-icon-edit`"
                />

                <feather-icon
                  :id="`project-row-${props.row.id}-exercise-icon-delete`"
                  icon="TrashIcon"
                  size="16"
                  class="mx-1"
                  @click="deleteExercise(props.row.id)"
                />
                <b-tooltip
                  title="Delete Exercise"
                  :target="`project-row-${props.row.id}-exercise-icon-delete`"
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
  BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BButton, BCol, BCard, BCardText, BTooltip,
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
import useExercisesList from './useExercisesList'
import masterStoreModule from './masterStoreModule'
import ExerciseListAddNew from './ExerciseListAddNew.vue'

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
    ExerciseListAddNew,
  },
  setup() {
    const EXERCISE_APP_STORE_MODULE_NAME = 'app-exercise'

    // Register module
    if (!store.hasModule(EXERCISE_APP_STORE_MODULE_NAME)) store.registerModule(EXERCISE_APP_STORE_MODULE_NAME, masterStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(EXERCISE_APP_STORE_MODULE_NAME)) store.unregisterModule(EXERCISE_APP_STORE_MODULE_NAME)
    })

    const isAddNewExerciseSidebarActive = ref(false)
    const toast = useToast()
    const isLoading = ref(null)

    const deleteExercise = exerciseId => {
      Vue.swal({
        title: 'Are you sure?',
        text: 'Delete this exercise',
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

          store.dispatch('app-exercise/deleteExercise', {
            exerciseId,
          })
            .then(() => {
              isLoading.value = false
              toast({
                component: ToastificationContent,
                props: {
                  title: 'Success',
                  icon: 'InfoIcon',
                  text: 'Successfully delete exercise',
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
      { label: 'Score', value: 'score' },
      { label: 'Prequisite', value: 'prequisite' },
    ]

    const {
      resolveProjectTypeIcon,
      resolveProjectTypeVariant,
      resolveProjectTypeTranslation,
      refetchData,
      refExerciseListTable,
    } = useExercisesList()
    return {
      // Sidebar
      isAddNewExerciseSidebarActive,
      exerciseTypeOptions,
      refExerciseListTable,
      resolveProjectTypeIcon,
      resolveProjectTypeVariant,
      resolveProjectTypeTranslation,
      refetchData,
      isLoading,
      deleteExercise,
    }
  },
  data() {
    return {
      evaluation: {},
      pageLength: 20,
      dir: false,
      searchTerm: '',
      columns: [
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
    this.retrieveEvaluation()
    this.retrieveExercises()
  },
  methods: {
    retrieveEvaluation() {
      this.$http.get(`engine-rest/master-project/evaluations/${router.currentRoute.params.evaluationId}`, { })
        .then(res => { this.evaluation = res.data })
        .catch(() => {
          useToast({
            component: ToastificationContent,
            props: {
              title: 'Error fetching evaluation',
              icon: 'AlertTriangleIcon',
              variant: 'danger',
            },
          })
        })
    },
    retrieveExercises() {
      this.$http.get(`engine-rest/master-project/evaluations/${router.currentRoute.params.evaluationId}/exercises`)
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
