<template>
  <b-sidebar
    id="add-new-certification-sidebar"
    :visible="isAddNewCertificationSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-add-new-certification-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Add New Certification
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

          <!-- Certification Code -->
          <validation-provider
            #default="validationContext"
            name="Certification Code"
            rules="required|alpha-dash"
          >
            <b-form-group
              label="Certification Code"
              label-for="certification-code"
              description="use alphabet and underscore"
            >
              <b-form-input
                id="certification-code"
                v-model="certificationData.certificationCode"
                :state="getValidationState(validationContext)"
                trim
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Certification Name -->
          <validation-provider
            #default="validationContext"
            name="Certification Name"
            rules="required"
          >
            <b-form-group
              label="Certification Name"
              label-for="certification-name"
            >
              <b-form-input
                id="certification-name"
                v-model="certificationData.certificationName"
                :state="getValidationState(validationContext)"
                trim
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Need Design Recognition -->
          <validation-provider
            #default="validationContext"
            name="Need Design Recognition"
          >
            <b-form-group
              label="Need Design Recognition"
              label-for="need-design-recognition"
            >
              <b-form-checkbox
                id="need-design-recognition"
                v-model="certificationData.designRecognition"
                switch
                inline
              >
                Need Design Recognition?
              </b-form-checkbox>
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
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
                id="template-active"
                v-model="certificationData.active"
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
  BSidebar, BForm, BFormCheckbox, BFormGroup, BFormInput, BFormInvalidFeedback, BButton,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref } from '@vue/composition-api'
import {
  required,
  alphaNum,
  email,
  alphaDash,
} from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import router from '@/router'
import Ripple from 'vue-ripple-directive'
import store from '@/store'

export default {
  components: {
    BSidebar,
    BForm,
    BFormCheckbox,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BButton,
    // Form Validation
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: 'isAddNewCertificationSidebarActive',
    event: 'update:is-add-new-certification-sidebar-active',
  },
  props: {
    isAddNewCertificationSidebarActive: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      required,
      alphaNum,
      email,
      alphaDash,
    }
  },
  setup(props, { emit }) {
    const blankCertificationData = {
      certificationCode: '',
      certificationName: '',
      masterVendorID: `${router.currentRoute.params.vendorId}`,
      designRecognition: true,
      active: true,
    }

    const certificationData = ref(JSON.parse(JSON.stringify(blankCertificationData)))
    const resetCertificationData = () => {
      certificationData.value = JSON.parse(JSON.stringify(blankCertificationData))
    }

    const onSubmit = () => {
      store.dispatch('app-certification/addCertification', certificationData.value)
        .then(() => {
          emit('refetch-data')
          emit('update:is-add-new-certification-sidebar-active', false)
        })
    }

    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resetCertificationData)

    return {
      certificationData,
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

#add-new-certification-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
