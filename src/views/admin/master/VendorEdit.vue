<template>
  <component :is="vendorData === undefined ? 'div' : 'b-card'">

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="vendorData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching vendor data
      </h4>
      <div class="alert-body">
        No vendor found with this vendor id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'admin-vendor-list'}"
        >
          Vendor List
        </b-link>
        for other vendors.
      </div>
    </b-alert>

    <div>
      <!-- Vendor Info: Input Fields -->
      <validation-observer
        #default="{ handleSubmit }"
        ref="refFormObserver"
      >
        <b-form
          @submit.prevent="handleSubmit(onSubmit)"
          @reset.prevent="resetForm"
        >
          <b-row>
            <!-- Field: Vendor Code -->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Vendor Code"
                rules="required"
              >
                <b-form-group
                  label="Vendor Code"
                  label-for="vendor-code"
                >
                  <b-form-input
                    id="vendor-code"
                    v-model="vendorData.vendor_code"
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Field: Vendor Name -->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Vendor Name"
                rules="required"
              >
                <b-form-group
                  label="Vendor Name"
                  label-for="vendor-name"
                >
                  <b-form-input
                    id="vendor-name"
                    v-model="vendorData.vendor_name"
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Field: Description -->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Description"
                rules="required"
              >
                <b-form-group
                  label="Description"
                  label-for="description"
                >
                  <b-form-input
                    id="description"
                    v-model="vendorData.description"
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
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
                name="Vendor Active"
              >
                <b-form-group
                  label="Vendor Active"
                  label-for="vendor-active"
                >
                  <b-form-checkbox
                    id="vendor-active"
                    v-model="vendorData.active"
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
  BTab, BTabs, BCard, BAlert, BLink, BFormInput, BButton, BCol, BFormGroup, BRow, BForm, BFormInvalidFeedback, BFormCheckbox,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref, onUnmounted } from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import Ripple from 'vue-ripple-directive'
import { required } from '@validations'
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
    BFormInvalidFeedback,
    ValidationProvider,
    ValidationObserver,
    required,
  },
  directives: {
    Ripple,
  },
  setup() {
    const blankVendorData = {
      vendor_name: '',
      vendor_code: '',
      description: '',
      active: true,
    }

    const vendorData = ref(JSON.parse(JSON.stringify(blankVendorData)))
    const resetvendorData = () => {
      vendorData.value = JSON.parse(JSON.stringify(blankVendorData))
    }
    const USER_APP_STORE_MODULE_NAME = 'app-vendor'

    const onSubmit = () => {
      vendorData.value.vendorName = vendorData.value.vendor_name
      vendorData.value.vendorCode = vendorData.value.vendor_code

      store.dispatch('app-vendor/editVendor', { vendorId: router.currentRoute.params.vendorId, vendorData: vendorData.value })
        .then(() => {
          router.push({ name: 'admin-vendor-list' })
        })
    }

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, masterStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-vendor/fetchVendor', { vendorId: router.currentRoute.params.vendorId })
      .then(response => { vendorData.value = response.data })
      .catch(error => {
        if (error.response.status === 404) {
          vendorData.value = undefined
        }
      })

    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resetvendorData)
    return {
      blankVendorData,
      vendorData,
      onSubmit,
      resetvendorData,
      refFormObserver,
      getValidationState,
      resetForm,
    }
  },
  methods: {
    cancel() {
      router.push({ name: 'admin-vendor-list' })
    },
  },
}
</script>

<style>

</style>
