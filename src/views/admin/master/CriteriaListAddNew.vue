<criteria>
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
    <criteria #default="{ hide }">
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
                v-model="criteriaData.projectType"
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
                v-model="criteriaData.projectVersion"
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
    </criteria>
  </b-sidebar>
</criteria>

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
    prop: 'isAddNewCriteriaSidebarActive',
    event: 'update:is-add-new-criteria-sidebar-active',
  },
  props: {
    isAddNewCriteriaSidebarActive: {
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
    const blankCriteriaData = {
      projectType: '',
      projectVersion: '',
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

#add-new-criteria-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
