<template>
  <component :is="exerciseData === undefined ? 'div' : 'b-card'">

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="exerciseData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching exercise data
      </h4>
      <div class="alert-body">
        No exercise found with this exercise id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'admin-exercise-list'}"
        >
          Exercise List
        </b-link>
        for other exercises.
      </div>
    </b-alert>

    <div>
      <!-- Exercise Info: Input Fields -->
      <validation-observer
        #default="{ handleSubmit }"
        ref="refFormObserver"
      >
        <b-form
          @submit.prevent="handleSubmit(onSubmit)"
          @reset.prevent="resetForm"
        >
          <b-row>
            <!-- Field: Code -->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Code"
                rules="required"
              >
                <b-form-group
                  label="Code"
                  label-for="code"
                >
                  <b-form-input
                    id="code"
                    v-model="exerciseData.code"
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Field: Name -->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Name"
                rules="required"
              >
                <b-form-group
                  label="Name"
                  label-for="name"
                >
                  <b-form-input
                    id="name"
                    v-model="exerciseData.name"
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Exercise Type -->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Exercise Type"
                rules="required"
              >
                <b-form-group
                  label="Exercise Type"
                  label-for="exercise-type"
                >
                  <v-select
                    v-model="exerciseData.exercise_type"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="exerciseTypeOptions"
                    :reduce="val => val.value"
                    :clearable="false"
                    input-id="exercise-type"
                  />

                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Max Score -->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                v-if="validationMaxScore"
                #default="validationContext"
                name="Score"
                :rules="validationMaxScore ? 'required' : ''"
              >
                <b-form-group
                  label="Max Score"
                  label-for="max-score"
                >
                  <b-form-input
                    id="score"
                    v-model="exerciseData.max_score"
                    :state="getValidationState(validationContext)"
                    type="number"
                    trim
                  />

                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Field: Active-->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Exercise Active"
              >
                <b-form-group
                  label="Exercise Active"
                  label-for="exercise-active"
                >
                  <b-form-checkbox
                    id="exercise-active"
                    v-model="exerciseData.active"
                    switch
                    inline
                  >
                    Active
                  </b-form-checkbox>
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

          </b-row>
          <div class="d-flex mt-2">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="mr-2"
              type="submit"
            >
              Update
            </b-button>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="button"
              variant="outline-secondary"
              @click="cancel"
            >
              Cancel
            </b-button>
          </div>
        </b-form>
      </validation-observer>
    </div>
  </component>
</template>

<script>
import {
  BTab, BTabs, BCard, BAlert, BLink, BFormInput, BButton, BCol, BFormCheckbox, BFormGroup, BRow, BForm, BFormInvalidFeedback,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref, onUnmounted } from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import Ripple from 'vue-ripple-directive'
import { required } from '@validations'
import vSelect from 'vue-select'
import formValidation from '@core/comp-functions/forms/form-validation'
import masterStoreModule from './masterStoreModule'

export default {
  components: {
    BTab,
    BTabs,
    BCard,
    BAlert,
    BLink,
    BFormCheckbox,
    BFormInput,
    BButton,
    BCol,
    BFormGroup,
    BRow,
    BForm,
    BFormInvalidFeedback,
    ValidationProvider,
    ValidationObserver,
    vSelect,
    required,
  },
  directives: {
    Ripple,
  },
  setup() {
    const blankExerciseData = {
      code: '',
      name: '',
      master_evaluation_id: '',
      active: true,
      max_score: null,
      exercise_type: '',
    }

    const exerciseData = ref(JSON.parse(JSON.stringify(blankExerciseData)))
    const resetexerciseData = () => {
      exerciseData.value = JSON.parse(JSON.stringify(blankExerciseData))
    }
    const exerciseTypeOptions = [
      { label: 'Prequisite', value: 'prequisite' },
      { label: 'Score', value: 'score' },
    ]
    const USER_APP_STORE_MODULE_NAME = 'app-exercise'
    const onSubmit = () => {
      exerciseData.value.masterEvaluationID = exerciseData.value.master_evaluation_id
      exerciseData.value.exerciseType = exerciseData.value.exercise_type
      exerciseData.value.maxScore = exerciseData.value.max_score

      store.dispatch('app-exercise/editExercise', { exerciseId: router.currentRoute.params.exerciseId, exerciseData: exerciseData.value })
        .then(() => {
          router.push({ name: 'admin-exercise-list' })
        })
    }

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, masterStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-exercise/fetchExercise', { exerciseId: router.currentRoute.params.exerciseId })
      .then(response => { exerciseData.value = response.data })
      .catch(error => {
        if (error.response.status === 404) {
          exerciseData.value = undefined
        }
      })

    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resetexerciseData)
    return {
      blankExerciseData,
      exerciseData,
      exerciseTypeOptions,
      onSubmit,
      resetexerciseData,
      refFormObserver,
      getValidationState,
      resetForm,
    }
  },
  computed: {
    validationMaxScore() {
      return this.exerciseData.exercise_type !== 'prequisite'
    },
  },
  methods: {
    cancel() {
      router.push({ name: 'admin-exercise-list' })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

#add-new-exercise-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
