<template>
  <component :is="templateData === undefined ? 'div' : 'b-card'">

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="templateData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching template data
      </h4>
      <div class="alert-body">
        No template found with this template id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'admin-template-list'}"
        >
          Template List
        </b-link>
        for other templates.
      </div>
    </b-alert>

    <div>
      <!-- Template Info: Input Fields -->
      <validation-observer
        #default="{ handleSubmit }"
        ref="refFormObserver"
      >
        <b-form
          @submit.prevent="handleSubmit(onSubmit)"
          @reset.prevent="resetForm"
        >
          <b-row>
            <!-- Field: Project Type -->
            <b-col
              cols="12"
              md="4"
            >
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
                    v-model="templateData.project_type"
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
            </b-col>

            <!-- Field: Project Version -->
            <b-col
              cols="12"
              md="4"
            >
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
                    v-model="templateData.project_version"
                  />
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
  BTab, BTabs, BCard, BAlert, BLink, BFormInput, BButton, BCol, BFormGroup, BRow, BForm, BFormInvalidFeedback,
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
    const blankTemplateData = {
      project_version: '',
      project_type: '',
      master_vendor_id: '',
    }

    const templateData = ref(JSON.parse(JSON.stringify(blankTemplateData)))
    const resettemplateData = () => {
      templateData.value = JSON.parse(JSON.stringify(blankTemplateData))
    }
    const USER_APP_STORE_MODULE_NAME = 'app-template'
    const projectTypeOptions = [
      { label: 'Design Recognition', value: 'design_recognition' },
      { label: 'Final Assessment', value: 'final_assessment' },
    ]
    const onSubmit = () => {
      templateData.value.projectVersion = templateData.value.project_version
      templateData.value.projectType = templateData.value.project_type
      templateData.value.masterVendorID = templateData.value.master_vendor_id

      store.dispatch('app-template/editTemplate', { templateId: router.currentRoute.params.templateId, templateData: templateData.value })
        .then(() => {
          router.push({ name: 'admin-template-list' })
        })
    }

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, masterStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-template/fetchTemplate', { templateId: router.currentRoute.params.templateId })
      .then(response => { templateData.value = response.data })
      .catch(error => {
        if (error.response.status === 404) {
          templateData.value = undefined
        }
      })

    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resettemplateData)
    return {
      blankTemplateData,
      templateData,
      onSubmit,
      resettemplateData,
      refFormObserver,
      getValidationState,
      resetForm,
      projectTypeOptions,
    }
  },
  methods: {
    cancel() {
      router.push({ name: 'admin-template-list' })
    },
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
