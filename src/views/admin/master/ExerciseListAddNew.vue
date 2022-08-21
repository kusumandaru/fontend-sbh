<template>
  <b-sidebar
    id="add-new-exercise-sidebar"
    :visible="isAddNewExerciseSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-add-new-exercise-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Add New Exercise
        </h5>

        <feather-icon
          class="ml-1 cursor-pointer"
          icon="XIcon"
          size="16"
          @click="hide"
        />

      </div>

      <!-- BODY -->
      <validation-observer
        #default="{ handleSubmit }"
        ref="refFormObserver"
      >
        <!-- Form -->
        <b-form
          class="p-2"
          @submit.prevent="handleSubmit(onSubmit)"
          @reset.prevent="resetForm"
        >

          <!-- Code -->
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
                :state="getValidationState(validationContext)"
                trim
              />

              <div class="invalid-feedback d-block">
                {{ validationContext.errors[0] }}
              </div>
            </b-form-group>
          </validation-provider>

          <!-- Name -->
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
                :state="getValidationState(validationContext)"
                trim
              />

              <div class="invalid-feedback d-block">
                {{ validationContext.errors[0] }}
              </div>
            </b-form-group>
          </validation-provider>

          <!-- Exercise Type -->
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
                v-model="exerciseData.exerciseType"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="exerciseTypeOptions"
                :reduce="val => val.value"
                :clearable="false"
                input-id="exercise-type"
              />

              <div class="invalid-feedback d-block">
                {{ validationContext.errors[0] }}
              </div>
            </b-form-group>
          </validation-provider>

          <!-- Max Score -->
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
                v-model="exerciseData.maxScore"
                :state="getValidationState(validationContext)"
                type="number"
                trim
              />

              <div class="invalid-feedback d-block">
                {{ validationContext.errors[0] }}
              </div>
            </b-form-group>
          </validation-provider>

          <!--Score Modifier-->
          <validation-provider
            v-if="validationMaxScore"
            #default="validationContext"
            name="Score Modifier"
            :rules="validationMaxScore ? 'required' : ''"
          >
            <b-form-group
              label="Score Modifier"
              label-for="score-modifier"
            >
              <b-form-input
                id="score"
                v-model="exerciseData.scoreModifier"
                :state="getValidationState(validationContext)"
                type="number"
                trim
              />

              <div class="invalid-feedback d-block">
                {{ validationContext.errors[0] }}
              </div>
            </b-form-group>
          </validation-provider>

          <!-- Active -->
          <validation-provider
            #default="validationContext"
            name="Active"
          >
            <b-form-group
              label="Active"
              label-for="active"
            >
              <b-form-checkbox
                id="exercise-active"
                v-model="exerciseData.active"
                switch
                inline
              >
                Active
              </b-form-checkbox>
              <div class="invalid-feedback d-block">
                {{ validationContext.errors[0] }}
              </div>
            </b-form-group>
          </validation-provider>

          <!-- Form Actions -->
          <div class="d-flex mt-2">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="mr-2"
              type="submit"
            >
              Add
            </b-button>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="button"
              variant="outline-secondary"
              @click="hide"
            >
              Cancel
            </b-button>
          </div>

        </b-form>
      </validation-observer>
    </template>
  </b-sidebar>
</template>

<script>
import {
  BSidebar, BForm, BFormCheckbox, BFormGroup, BFormInput, BButton,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref } from '@vue/composition-api'
import { required, alphaNum, email } from '@validations'
import router from '@/router'
import formValidation from '@core/comp-functions/forms/form-validation'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import store from '@/store'

export default {
  components: {
    BSidebar,
    BForm,
    BFormCheckbox,
    BFormGroup,
    BFormInput,
    
    BButton,
    vSelect,
    // Form Validation
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: 'isAddNewExerciseSidebarActive',
    event: 'update:is-add-new-exercise-sidebar-active',
  },
  props: {
    isAddNewExerciseSidebarActive: {
      type: Boolean,
      required: true,
    },
    exerciseTypeOptions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      required,
      alphaNum,
      email,
    }
  },
  setup(props, { emit }) {
    const blankExerciseData = {
      code: '',
      name: '',
      masterEvaluationID: `${router.currentRoute.params.evaluationId}`,
      active: true,
      maxScore: null,
      exerciseType: 'score',
      scoreModifier: 0,
      createdBy: 'system',
    }

    const exerciseData = ref(JSON.parse(JSON.stringify(blankExerciseData)))
    const resetexerciseData = () => {
      exerciseData.value = JSON.parse(JSON.stringify(blankExerciseData))
    }

    const onSubmit = () => {
      store.dispatch('app-exercise/addExercise', exerciseData.value)
        .then(() => {
          emit('refetch-data')
          emit('update:is-add-new-exercise-sidebar-active', false)
        })
    }

    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resetexerciseData)

    return {
      exerciseData,
      onSubmit,

      refFormObserver,
      getValidationState,
      resetForm,
    }
  },
  computed: {
    validationMaxScore() {
      return this.exerciseData.exerciseType !== 'prequisite'
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
