<evaluation>
  <b-sidebar
    id="add-new-evaluation-sidebar"
    :visible="isAddNewEvaluationSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-add-new-evaluation-sidebar-active', val)"
  >
    <evaluation #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Add New Evaluation
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

          <!-- Project Type -->
          <validation-provider
            #default="validationContext"
            name="Project Type"
            rules="required"
          >
            <b-form-group
              label="Project Type"
              label-for="project-type"
            >
              <v-select
                v-model="evaluationData.projectType"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="projectTypeOptions"
                :reduce="val => val.value"
                :clearable="false"
                input-id="project-type"
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Project Version -->
          <validation-provider
            #default="validationContext"
            name="Project Version"
            rules="required"
          >
            <b-form-group
              label="Project Version"
              label-for="project-version"
            >
              <b-form-input
                id="project-version"
                v-model="evaluationData.projectVersion"
                :state="getValidationState(validationContext)"
                trim
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
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
    </evaluation>
  </b-sidebar>
</evaluation>

<script>
import {
  BSidebar, BForm, BFormGroup, BFormInput, BFormInvalidFeedback, BButton,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref } from '@vue/composition-api'
import { required, alphaNum, email } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import store from '@/store'

export default {
  components: {
    BSidebar,
    BForm,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
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
    prop: 'isAddNewEvaluationSidebarActive',
    event: 'update:is-add-new-evaluation-sidebar-active',
  },
  props: {
    isAddNewEvaluationSidebarActive: {
      type: Boolean,
      required: true,
    },
    projectTypeOptions: {
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
    const blankEvaluationData = {
      projectType: '',
      projectVersion: '',
    }

    const evaluationData = ref(JSON.parse(JSON.stringify(blankEvaluationData)))
    const resetevaluationData = () => {
      evaluationData.value = JSON.parse(JSON.stringify(blankEvaluationData))
    }

    const onSubmit = () => {
      store.dispatch('app-evaluation/addEvaluation', evaluationData.value)
        .then(() => {
          emit('refetch-data')
          emit('update:is-add-new-evaluation-sidebar-active', false)
        })
    }

    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resetevaluationData)

    return {
      evaluationData,
      onSubmit,

      refFormObserver,
      getValidationState,
      resetForm,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

#add-new-evaluation-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
