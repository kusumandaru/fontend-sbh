<template>
  <component :is="generateDocumentData === undefined ? 'div' : 'b-card'">

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="generateDocumentData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching generate document data
      </h4>
      <div class="alert-body">
        No generate document found with this generate document id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'admin-generate-document-list'}"
        >
          Generate Document List
        </b-link>
        for other generate documents.
      </div>
    </b-alert>

    <div>
      <!-- Generate Documnet Info: Input Fields -->
      <validation-observer
        #default="{ handleSubmit }"
        ref="refFormObserver"
      >
        <b-form
          @submit.prevent="handleSubmit(onSubmit)"
          @reset.prevent="resetForm"
        >
          <b-row>
            <!-- Field: Generate Document Name-->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Generate Document Name"
                rules="required"
              >
                <b-form-group
                  label="Generate Document Name"
                  label-for="generate-document-name"
                >
                  <b-form-input
                    id="generate-document-name"
                    v-model="generateDocumentData.name"
                  />
                  <div class="invalid-feedback d-block">
                    {{ validationContext.errors[0] }}
                  </div>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Field: Generate Document Code-->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Generate Document Code"
              >
                <b-form-group
                  label="Generate Document Code"
                  label-for="generate-document-code"
                >
                  <v-select
                    v-model="generateDocumentData.code"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="generateCategoryOptions"
                    :reduce="val => val.code"
                    :clearable="false"
                    :required="true"
                    input-id="code"
                    label="name"
                    code="code"
                  />
                  <div class="invalid-feedback d-block">
                    {{ validationContext.errors[0] }}
                  </div>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Category Type -->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Category Type Mandatory"
                rules="required"
              >
                <b-form-group
                  label="Category Type"
                  label-for="category-type"
                >
                  <v-select
                    v-model="generateDocumentData.project_document_category_id"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="categoryOptions"
                    :reduce="val => val.id"
                    :clearable="false"
                    :required="!generateDocumentData.project_document_category_id"
                    input-id="project_document_category_id"
                    label="name"
                    code="id"
                  />
                  <div class="invalid-feedback d-block">
                    {{ validationContext.errors[0] }}
                  </div>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Field: Generate Document Active-->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Generate Document Active"
              >
                <b-form-group
                  label="Generate Document Active"
                  label-for="generate-document-active"
                >
                  <b-form-checkbox
                    id="generate-document-active"
                    v-model="generateDocumentData.active"
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
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref, onUnmounted } from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import Ripple from 'vue-ripple-directive'
import { required } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import vSelect from 'vue-select'
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
    required,
    vSelect,
  },
  directives: {
    Ripple,
  },
  setup() {
    const blankGenerateDocumentData = {
      name: null,
      active: null,
      code: null,
      object_type: null,
      master_certification_id: null,

    }
    const generateDocumentData = ref(JSON.parse(JSON.stringify(blankGenerateDocumentData)))
    const resetgenerateDocumentData = () => {
      generateDocumentData.value = JSON.parse(JSON.stringify(blankGenerateDocumentData))
    }
    const BUILDING_DOCUMENT_APP_STORE_MODULE_NAME = 'app-generate-document'
    const readOnly = true
    const categoryOptions = ref([])
    const generateCategoryOptions = ref(JSON.parse('[]'))

    const onSubmit = () => {
      generateDocumentData.value.masterCertificationTypeID = generateDocumentData.value.master_certification_type_id
      generateDocumentData.value.objectType = generateDocumentData.value.object_type
      generateDocumentData.value.projectDocumentCategoryID = generateDocumentData.value.project_document_category_id

      store.dispatch('app-generate-document/editGenerateDocument', { generateDocumentId: router.currentRoute.params.generateDocumentId, generateDocumentData: generateDocumentData.value })
        .then(() => {
          router.push({ name: 'admin-template-list' })
        })
    }

    // Register module
    if (!store.hasModule(BUILDING_DOCUMENT_APP_STORE_MODULE_NAME)) store.registerModule(BUILDING_DOCUMENT_APP_STORE_MODULE_NAME, masterStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(BUILDING_DOCUMENT_APP_STORE_MODULE_NAME)) store.unregisterModule(BUILDING_DOCUMENT_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-generate-document/allBuildingDocumentCategory')
      .then(response => { categoryOptions.value = response.data })
      .catch(error => {
        if (error.response.status === 404) {
          categoryOptions.value = undefined
        }
      })

    store.dispatch('app-generate-document/allGenerateDocumentCategory')
      .then(response => { generateCategoryOptions.value = response.data })
      .catch(error => {
        if (error.response.status === 404) {
          generateCategoryOptions.value = undefined
        }
      })

    store.dispatch('app-generate-document/fetchGenerateDocument', { generateDocumentId: router.currentRoute.params.generateDocumentId })
      .then(response => {
        generateDocumentData.value = response.data
      })
      .catch(error => {
        if (error.response.status === 404) {
          generateDocumentData.value = undefined
        }
      })

    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resetgenerateDocumentData)
    return {
      blankGenerateDocumentData,
      generateDocumentData,
      onSubmit,
      resetgenerateDocumentData,
      refFormObserver,
      getValidationState,
      resetForm,
      readOnly,
      categoryOptions,
      generateCategoryOptions,
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
@import '~@core/scss/vue/libs/vue-select.scss';
</style>
