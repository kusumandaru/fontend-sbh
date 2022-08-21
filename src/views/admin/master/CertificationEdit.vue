<template>
  <component :is="certificationData === undefined ? 'div' : 'b-card'">

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="certificationData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching certification data
      </h4>
      <div class="alert-body">
        No certification found with this certification id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'admin-certification-list'}"
        >
          Certification List
        </b-link>
        for other certifications.
      </div>
    </b-alert>

    <div>
      <!-- Certification Info: Input Fields -->
      <validation-observer
        #default="{ handleSubmit }"
        ref="refFormObserver"
      >
        <b-form
          @submit.prevent="handleSubmit(onSubmit)"
          @reset.prevent="resetForm"
        >
          <b-row>
            <!-- Field: Certification Code -->
            <b-col
              cols="12"
              md="4"
            >
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
                    v-model="certificationData.certification_code"
                  />
                  <div class="invalid-feedback d-block">
                    {{ validationContext.errors[0] }}
                  </div>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Field: Certification Name -->
            <b-col
              cols="12"
              md="4"
            >
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
                    v-model="certificationData.certification_name"
                  />
                  <div class="invalid-feedback d-block">
                    {{ validationContext.errors[0] }}
                  </div>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Field: Show Design Recognition -->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Show Design Recognition"
              >
                <b-form-group
                  label="Show Design Recognition?"
                  label-for="certification-design-recognition"
                >
                  <b-form-checkbox
                    id="certification-design-recognition"
                    v-model="certificationData.design_recognition"
                    switch
                    inline
                  >
                    Need Design Recognition?
                  </b-form-checkbox>
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
                name="Certification Active"
              >
                <b-form-group
                  label="Certification Active"
                  label-for="certification-active"
                >
                  <b-form-checkbox
                    id="certification-active"
                    v-model="certificationData.active"
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
  BTab, BTabs, BCard, BAlert, BLink, BFormInput, BButton, BCol, BFormGroup, BRow, BForm, BFormCheckbox,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref, onUnmounted } from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import Ripple from 'vue-ripple-directive'
import { required, alphaDash } from '@validations'
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
    alphaDash,
  },
  directives: {
    Ripple,
  },
  setup() {
    const blankCertificationData = {
      certification_name: '',
      certification_code: '',
      master_vendor_id: '',
      active: true,
      design_recognition: true,
    }

    const certificationData = ref(JSON.parse(JSON.stringify(blankCertificationData)))
    const resetCertificationData = () => {
      certificationData.value = JSON.parse(JSON.stringify(blankCertificationData))
    }
    const USER_APP_STORE_MODULE_NAME = 'app-certification'
    const onSubmit = () => {
      certificationData.value.certificationName = certificationData.value.certification_name
      certificationData.value.certificationCode = certificationData.value.certification_code
      certificationData.value.masterVendorID = certificationData.value.master_vendor_id
      certificationData.value.designRecognition = certificationData.value.design_recognition

      store.dispatch('app-certification/editCertification', { certificationTypeId: router.currentRoute.params.certificationTypeId, certificationData: certificationData.value })
        .then(() => {
          router.push({ name: 'admin-certification-list' })
        })
    }

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, masterStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-certification/fetchCertification', { certificationTypeId: router.currentRoute.params.certificationTypeId })
      .then(response => { certificationData.value = response.data })
      .catch(error => {
        if (error.response.status === 404) {
          certificationData.value = undefined
        }
      })

    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resetCertificationData)
    return {
      blankCertificationData,
      certificationData,
      onSubmit,
      resetCertificationData,
      refFormObserver,
      getValidationState,
      resetForm,
    }
  },
  methods: {
    cancel() {
      router.push({ name: 'admin-certification-list' })
    },
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
