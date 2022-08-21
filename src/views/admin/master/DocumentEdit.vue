<template>
  <component :is="documentData === undefined ? 'div' : 'b-card'">

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="documentData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching document data
      </h4>
      <div class="alert-body">
        No document found with this document id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'admin-document-list'}"
        >
          Document List
        </b-link>
        for other documents.
      </div>
    </b-alert>

    <div>
      <!-- Document Info: Input Fields -->
      <validation-observer
        #default="{ handleSubmit }"
        ref="refFormObserver"
      >
        <b-form
          @submit.prevent="handleSubmit(onSubmit)"
          @reset.prevent="resetForm"
        >
          <b-row>
            <!-- Field: Name -->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Name"
                rules="required"
              >
                <b-form-group
                  label="Name"
                  label-for="name"
                >
                  <b-form-input
                    id="name"
                    v-model="documentData.name"
                  />
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
                name="Document Active"
              >
                <b-form-group
                  label="Document Active"
                  label-for="document-active"
                >
                  <b-form-checkbox
                    id="document-active"
                    v-model="documentData.active"
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
  BTab, BTabs, BCard, BAlert, BLink, BFormInput, BButton, BCol, BFormGroup, BFormCheckbox, BRow, BForm,
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
    BFormCheckbox,
    BButton,
    BCol,
    BFormGroup,
    BRow,
    BForm,

    ValidationProvider,
    ValidationObserver,
    vSelect,
    required,
  },
  directives: {
    Ripple,
  },
  setup() {
    const blankDocumentData = {
      name: '',
      active: true,
    }

    const documentData = ref(JSON.parse(JSON.stringify(blankDocumentData)))
    const resetdocumentData = () => {
      documentData.value = JSON.parse(JSON.stringify(blankDocumentData))
    }
    const USER_APP_STORE_MODULE_NAME = 'app-document'
    const onSubmit = () => {
      documentData.value.masterCriteriaID = documentData.value.master_criteria_id
      documentData.value.criteriaCode = documentData.value.criteria_code
      store.dispatch('app-document/editDocument', { documentId: router.currentRoute.params.documentId, documentData: documentData.value })
        .then(() => {
          router.push({ name: 'admin-document-list' })
        })
    }

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, masterStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-document/fetchDocument', { documentId: router.currentRoute.params.documentId })
      .then(response => { documentData.value = response.data })
      .catch(error => {
        if (error.response.status === 404) {
          documentData.value = undefined
        }
      })

    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resetdocumentData)
    return {
      blankDocumentData,
      documentData,
      onSubmit,
      resetdocumentData,
      refFormObserver,
      getValidationState,
      resetForm,
    }
  },
  methods: {
    cancel() {
      router.push({ name: 'admin-document-list' })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

#add-new-document-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
