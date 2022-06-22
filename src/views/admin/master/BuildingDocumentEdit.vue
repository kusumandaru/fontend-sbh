<template>
  <component :is="buildingDocumentData === undefined ? 'div' : 'b-card'">

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="buildingDocumentData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching building document data
      </h4>
      <div class="alert-body">
        No building document found with this building document id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'admin-building-document-list'}"
        >
          Building Document List
        </b-link>
        for other building documents.
      </div>
    </b-alert>

    <div>
      <!-- Building Documnet Info: Input Fields -->
      <validation-observer
        #default="{ handleSubmit }"
        ref="refFormObserver"
      >
        <b-form
          @submit.prevent="handleSubmit(onSubmit)"
          @reset.prevent="resetForm"
        >
          <b-row>
            <!-- Field: Building Document Name-->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Building Document Name"
                rules="required"
              >
                <b-form-group
                  label="Building Document Name"
                  label-for="building-document-name"
                >
                  <b-form-input
                    id="building-document-name"
                    v-model="buildingDocumentData.name"
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Field: Building Document Code-->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Building Document Code"
              >
                <b-form-group
                  label="Building Document Code"
                  label-for="building-document-code"
                >
                  <b-form-input
                    id="building-document-code"
                    v-model="buildingDocumentData.code"
                    :readonly="readOnly"
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Field: Building Document Placeholder-->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Building Document Placeholder"
                rules="required"
              >
                <b-form-group
                  label="Building Document Placeholder"
                  label-for="building-document-placeholder"
                >
                  <b-form-input
                    id="building-document-placeholder"
                    v-model="buildingDocumentData.placeholder"
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Field: Building Document Mandatory-->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Building Document Mandatory"
              >
                <b-form-group
                  label="Building Document Mandatory"
                  label-for="building-document-mandatory"
                >
                  <b-form-checkbox
                    id="building-document-mandatory"
                    v-model="buildingDocumentData.mandatory"
                    switch
                    inline
                  >
                    Mandatory
                  </b-form-checkbox>
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Field: Building Document Active-->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Building Document Active"
              >
                <b-form-group
                  label="Building Document Active"
                  label-for="building-document-active"
                >
                  <b-form-checkbox
                    id="building-document-active"
                    v-model="buildingDocumentData.active"
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
  BFormInvalidFeedback,
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
    BFormInvalidFeedback,
    ValidationProvider,
    ValidationObserver,
    required,
    vSelect,
  },
  directives: {
    Ripple,
  },
  setup() {
    const blankBuildingDocumentData = {
      name: null,
      active: null,
      mandatory: null,
      code: null,
      placeholder: null,
      object_type: null,
      master_certification_id: null,

    }
    const buildingDocumentData = ref(JSON.parse(JSON.stringify(blankBuildingDocumentData)))
    const resetbuildingDocumentData = () => {
      buildingDocumentData.value = JSON.parse(JSON.stringify(blankBuildingDocumentData))
    }
    const BUILDING_DOCUMENT_APP_STORE_MODULE_NAME = 'app-building-document'
    const readOnly = true

    const onSubmit = () => {
      buildingDocumentData.value.masterCertificationTypeID = buildingDocumentData.value.master_certification_type_id
      buildingDocumentData.value.objectType = buildingDocumentData.value.object_type

      store.dispatch('app-building-document/editBuildingDocument', { buildingDocumentId: router.currentRoute.params.buildingDocumentId, buildingDocumentData: buildingDocumentData.value })
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

    store.dispatch('app-building-document/fetchBuildingDocument', { buildingDocumentId: router.currentRoute.params.buildingDocumentId })
      .then(response => { buildingDocumentData.value = response.data })
      .catch(error => {
        if (error.response.status === 404) {
          buildingDocumentData.value = undefined
        }
      })

    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resetbuildingDocumentData)
    return {
      blankBuildingDocumentData,
      buildingDocumentData,
      onSubmit,
      resetbuildingDocumentData,
      refFormObserver,
      getValidationState,
      resetForm,
      readOnly,
    }
  },
  methods: {
    cancel() {
      router.push({ name: 'admin-evaluation-list' })
    },
  },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
</style>
