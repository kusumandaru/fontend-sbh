<template>
  <component :is="criteriaData === undefined ? 'div' : 'b-card'">

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="criteriaData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching criteria data
      </h4>
      <div class="alert-body">
        No criteria found with this criteria id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'admin-criteria-list'}"
        >
          Criteria List
        </b-link>
        for other criterias.
      </div>
    </b-alert>

    <div>
      <!-- Criteria Info: Input Fields -->
      <validation-observer
        #default="{ handleSubmit }"
        ref="refFormObserver"
      >
        <b-form
          @submit.prevent="handleSubmit(onSubmit)"
          @reset.prevent="resetForm"
        >
          <b-row>
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
                    v-model="criteriaData.exercise_type"
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
            </b-col>

            <!-- Code -->
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
                    v-model="criteriaData.code"
                    :state="getValidationState(validationContext)"
                    placeholder="ASD P1"
                    trim
                  />

                  <div class="invalid-feedback d-block">
                    {{ validationContext.errors[0] }}
                  </div>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Score -->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                v-if="validationScore"
                #default="validationContext"
                name="Score"
                :rules="validationScore ? 'required' : ''"
              >
                <b-form-group
                  label="Score"
                  label-for="score"
                >
                  <b-form-input
                    id="score"
                    v-model="criteriaData.score"
                    :state="getValidationState(validationContext)"
                    type="number"
                    trim
                  />

                  <div class="invalid-feedback d-block">
                    {{ validationContext.errors[0] }}
                  </div>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Description -->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Description"
                rules="required"
              >
                <b-form-group
                  label="Description"
                  label-for="description"
                >
                  <quill-editor
                    v-model="criteriaData.description"
                    :options="editorOption"
                  />
                  <div class="invalid-feedback d-block">
                    {{ validationContext.errors[0] }}
                  </div>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Additional Notes -->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Additional Notes"
                rules=""
              >
                <b-form-group
                  label="Additional Notes"
                  label-for="additional-notes"
                >
                  <quill-editor
                    v-model="criteriaData.additional_notes"
                    :options="editorOption"
                  />
                  <div class="invalid-feedback d-block">
                    {{ validationContext.errors[0] }}
                  </div>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Not Available -->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Not Available"
                rules=""
              >
                <b-form-group
                  label="Not Available"
                  label-for="not-available"
                >
                  <b-form-checkbox
                    v-model="criteriaData.not_available"
                  >
                    No Available / Hide
                  </b-form-checkbox>
                  <div class="invalid-feedback d-block">
                    {{ validationContext.errors[0] }}
                  </div>
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
                name="Criteria Active"
              >
                <b-form-group
                  label="Criteria Active"
                  label-for="criteria-active"
                >
                  <b-form-checkbox
                    id="criteria-active"
                    v-model="criteriaData.active"
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
  BTab, BTabs, BCard, BAlert, BLink, BFormInput, BButton, BCol, BFormGroup, BRow, BForm, BFormCheckbox, 
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref, onUnmounted } from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import Ripple from 'vue-ripple-directive'
import { required } from '@validations'
import vSelect from 'vue-select'
import formValidation from '@core/comp-functions/forms/form-validation'
// eslint-disable-next-line
import 'quill/dist/quill.core.css'
// eslint-disable-next-line
import 'quill/dist/quill.snow.css'
// eslint-disable-next-line
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import masterStoreModule from './masterStoreModule'

export default {
  components: {
    BTab,
    BTabs,
    BCard,
    BAlert,
    BLink,
    BFormInput,
    BButton,
    BCol,
    BFormGroup,
    BRow,
    BForm,
    BFormCheckbox,
    
    ValidationProvider,
    ValidationObserver,
    vSelect,
    required,
    quillEditor,
  },
  directives: {
    Ripple,
  },
  setup() {
    const blankCriteriaData = {
      exercise_type: '',
      score: '',
      description: '',
      additional_notes: '',
      not_available: false,
      masterExerciseID: `${router.currentRoute.params.exerciseId}`,
      active: true,
    }

    const editorOption = {
      theme: 'snow',
    }
    const exerciseTypeOptions = [
      { label: 'Prequisite', value: 'prequisite' },
      { label: 'Score', value: 'score' },
      { label: 'Max Score', value: 'max_score' },
    ]
    const criteriaData = ref(JSON.parse(JSON.stringify(blankCriteriaData)))
    const resetcriteriaData = () => {
      criteriaData.value = JSON.parse(JSON.stringify(blankCriteriaData))
    }
    const USER_APP_STORE_MODULE_NAME = 'app-criteria'
    const onSubmit = () => {
      criteriaData.value.exerciseType = criteriaData.value.exercise_type
      criteriaData.value.additionalNotes = criteriaData.value.additional_notes
      criteriaData.value.notAvailable = criteriaData.value.not_available
      criteriaData.value.masterExerciseID = criteriaData.value.master_exercise_id

      store.dispatch('app-criteria/editCriteria', { criteriaId: router.currentRoute.params.criteriaId, criteriaData: criteriaData.value })
        .then(() => {
          router.push({ name: 'admin-criteria-list' })
        })
    }

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, masterStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-criteria/fetchCriteria', { criteriaId: router.currentRoute.params.criteriaId })
      .then(response => { criteriaData.value = response.data })
      .catch(error => {
        if (error.response.status === 404) {
          criteriaData.value = undefined
        }
      })

    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resetcriteriaData)
    return {
      blankCriteriaData,
      criteriaData,
      onSubmit,
      resetcriteriaData,
      refFormObserver,
      getValidationState,
      resetForm,
      editorOption,
      exerciseTypeOptions,
    }
  },
  computed: {
    validationScore() {
      return this.criteriaData.exercise_type !== 'prequisite'
    },
  },
  methods: {
    cancel() {
      router.push({ name: 'admin-criteria-list' })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

#add-new-criteria-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
