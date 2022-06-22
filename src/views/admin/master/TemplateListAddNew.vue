<template>
  <b-sidebar
    id="add-new-template-sidebar"
    :visible="isAddNewTemplateSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-add-new-template-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Add New Template
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
                v-model="templateData.projectType"
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
                v-model="templateData.projectVersion"
                :state="getValidationState(validationContext)"
                trim
              />

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
                v-model="templateData.active"
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
import { required, alphaNum, email } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import router from '@/router'
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
    prop: 'isAddNewTemplateSidebarActive',
    event: 'update:is-add-new-template-sidebar-active',
  },
  props: {
    isAddNewTemplateSidebarActive: {
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
    const blankTemplateData = {
      projectType: '',
      projectVersion: '',
      masterVendorID: `${router.currentRoute.params.vendorId}`,
      masterCertificationTypeID: `${router.currentRoute.params.certificationTypeId}`,
      active: true,
    }

    const templateData = ref(JSON.parse(JSON.stringify(blankTemplateData)))
    const resettemplateData = () => {
      templateData.value = JSON.parse(JSON.stringify(blankTemplateData))
    }

    const onSubmit = () => {
      store.dispatch('app-template/addTemplate', templateData.value)
        .then(() => {
          emit('refetch-data')
          emit('update:is-add-new-template-sidebar-active', false)
        })
    }

    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resettemplateData)

    return {
      templateData,
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

#add-new-template-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
