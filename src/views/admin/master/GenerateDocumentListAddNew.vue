<template>
  <b-sidebar
    id="add-new-generate-document-sidebar"
    :visible="isAddNewGenerateDocumentSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-add-new-generate-document-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Add New Generate Document
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
          <!-- Name -->
          <validation-provider
            #default="validationContext"
            name="Name"
            rules="required"
          >
            <b-form-group
              label="Generate Document Name"
              label-for="name"
            >
              <b-form-input
                id="nameId"
                v-model="generateDocumentData.name"
                :state="getValidationState(validationContext)"
                trim
              />

              <div class="invalid-feedback d-block">
                {{ validationContext.errors[0] }}
              </div>
            </b-form-group>
          </validation-provider>

          <!-- Document Code -->
          <validation-provider
            #default="validationContext"
            name="Code"
            rules="required"
          >
            <b-form-group
              label="Building Code"
              label-for="code"
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

          <!-- Category Code -->
          <validation-provider
            #default="validationContext"
            name="Category Code"
            rules="required"
          >
            <b-form-group
              label="Building Document Category Code"
              label-for="category-code"
            >
              <v-select
                v-model="generateDocumentData.projectDocumentCategoryID"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="categoryOptions"
                :reduce="val => val.id"
                :clearable="false"
                :required="true"
                input-id="project_document_category_id"
                label="name"
                code="id"
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
            rules="required"
          >
            <b-form-group
              label="Generate Document Active"
              label-for="active"
            >
              <b-form-checkbox
                id="active"
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
import { ref, onUnmounted } from '@vue/composition-api'
import {
  required,
  regex,
  alphaNum,
  alphaDash,
  email,
} from '@validations'
import router from '@/router'
import formValidation from '@core/comp-functions/forms/form-validation'
import Ripple from 'vue-ripple-directive'
import store from '@/store'
import vSelect from 'vue-select'
import masterStoreModule from './masterStoreModule'

export default {
  components: {
    BSidebar,
    BForm,
    BFormCheckbox,
    BFormGroup,
    BFormInput,
    BButton,
    // Form Validation
    ValidationProvider,
    ValidationObserver,
    vSelect,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: 'isAddNewGenerateDocumentSidebarActive',
    event: 'update:is-add-new-generate-document-sidebar-active',
  },
  props: {
    isAddNewGenerateDocumentSidebarActive: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      required,
      regex,
      alphaNum,
      alphaDash,
      email,
    }
  },
  setup(props, { emit }) {
    const blankGenerateDocumentData = {
      name: '',
      code: '',
      placeholder: '',
      masterCertificationTypeID: router.currentRoute.params.certificationTypeId,
      projectDocumentCategoryID: null,
      objectType: 'file',
      active: true,
    }
    const provinceOptions = ref(JSON.parse('[]'))
    const categoryOptions = ref(JSON.parse('[]'))
    const generateCategoryOptions = ref(JSON.parse('[]'))
    const generateDocumentData = ref(JSON.parse(JSON.stringify(blankGenerateDocumentData)))
    const BUILDING_DOCUMENT_APP_STORE_MODULE_NAME = 'app-building-document'

    // Register module
    if (!store.hasModule(BUILDING_DOCUMENT_APP_STORE_MODULE_NAME)) store.registerModule(BUILDING_DOCUMENT_APP_STORE_MODULE_NAME, masterStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(BUILDING_DOCUMENT_APP_STORE_MODULE_NAME)) store.unregisterModule(BUILDING_DOCUMENT_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-building-document/allBuildingDocumentCategory')
      .then(response => { categoryOptions.value = response.data })
      .catch(error => {
        if (error.response.status === 404) {
          categoryOptions.value = undefined
        }
      })

    store.dispatch('app-building-document/allGenerateDocumentCategory')
      .then(response => { generateCategoryOptions.value = response.data })
      .catch(error => {
        if (error.response.status === 404) {
          generateCategoryOptions.value = undefined
        }
      })

    const resetGenerateData = () => {
      generateDocumentData.value = JSON.parse(JSON.stringify(blankGenerateDocumentData))
    }

    const onSubmit = () => {
      store.dispatch('app-template/addGenerateDocument', generateDocumentData.value)
        .then(() => {
          emit('refetch-data')
          emit('update:is-add-new-generate-document-sidebar-active', false)
        })
    }

    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resetGenerateData)

    return {
      generateDocumentData,
      categoryOptions,
      generateCategoryOptions,
      onSubmit,

      refFormObserver,
      getValidationState,
      resetForm,
      provinceOptions,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

#add-new-generate-document-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
