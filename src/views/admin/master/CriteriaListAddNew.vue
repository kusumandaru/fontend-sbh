<template>
  <b-sidebar
    id="add-new-criteria-sidebar"
    :visible="isAddNewCriteriaSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-add-new-criteria-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Add New Criteria
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
                v-model="criteriaData.exerciseType"
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

          <!-- Score -->
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

          <!-- Description -->
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

          <!-- Additional Notes -->
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
                v-model="criteriaData.additionalNotes"
                :options="editorOption"
              />
              <div class="invalid-feedback d-block">
                {{ validationContext.errors[0] }}
              </div>
            </b-form-group>
          </validation-provider>

          <!-- Not Available -->
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
                v-model="criteriaData.notAvailable"
              >
                No Available / Hide
              </b-form-checkbox>
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
  BSidebar, BForm, BFormGroup, BFormInput, BButton, BFormCheckbox,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref } from '@vue/composition-api'
import { required, alphaNum, email } from '@validations'
import router from '@/router'
import formValidation from '@core/comp-functions/forms/form-validation'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import store from '@/store'
// eslint-disable-next-line
import 'quill/dist/quill.core.css'
// eslint-disable-next-line
import 'quill/dist/quill.snow.css'
// eslint-disable-next-line
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    BSidebar,
    BForm,
    BFormGroup,
    BFormInput,
    
    BButton,
    BFormCheckbox,
    vSelect,
    // Form Validation
    ValidationProvider,
    ValidationObserver,
    quillEditor,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: 'isAddNewCriteriaSidebarActive',
    event: 'update:is-add-new-criteria-sidebar-active',
  },
  props: {
    isAddNewCriteriaSidebarActive: {
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
    const blankCriteriaData = {
      exerciseType: '',
      score: '',
      description: '',
      additionalNotes: '',
      notAvailable: false,
      masterExerciseID: `${router.currentRoute.params.exerciseId}`,
      active: true,
    }

    const editorOption = {
      theme: 'snow',
    }

    const criteriaData = ref(JSON.parse(JSON.stringify(blankCriteriaData)))
    const resetcriteriaData = () => {
      criteriaData.value = JSON.parse(JSON.stringify(blankCriteriaData))
    }

    const onSubmit = () => {
      store.dispatch('app-criteria/addCriteria', criteriaData.value)
        .then(() => {
          emit('refetch-data')
          emit('update:is-add-new-criteria-sidebar-active', false)
        })
    }

    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resetcriteriaData)

    return {
      criteriaData,
      editorOption,
      onSubmit,

      refFormObserver,
      getValidationState,
      resetForm,
    }
  },
  computed: {
    validationScore() {
      return this.criteriaData.exerciseType !== 'prequisite'
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
