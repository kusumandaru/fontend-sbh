<template>
  <b-sidebar
    id="add-new-vendor-sidebar"
    :visible="isAddNewVendorSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-add-new-vendor-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Add New Vendor
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
          <!-- Code -->
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
                v-model="vendorData.vendorCode"
                autofocus
                :state="getValidationState(validationContext)"
                trim
                placeholder="GBCI"
              />

              <div class="invalid-feedback d-block">
                {{ validationContext.errors[0] }}
              </div>
            </b-form-group>
          </validation-provider>

          <!-- Username -->
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
                v-model="vendorData.vendorName"
                :state="getValidationState(validationContext)"
                trim
              />

              <div class="invalid-feedback d-block">
                {{ validationContext.errors[0] }}
              </div>
            </b-form-group>
          </validation-provider>

          <!-- Description -->
          <validation-provider
            #default="validationContext"
            name="Description"
            rules="required"
          >
            <b-form-group
              label="Description"
              label-for="description"
            >
              <b-form-textarea
                id="description"
                v-model="vendorData.description"
                :state="getValidationState(validationContext)"
                trim
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
          >
            <b-form-group
              label="Active"
              label-for="active"
            >
              <b-form-checkbox
                id="vendor-active"
                v-model="vendorData.active"
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
  BSidebar, BForm, BFormCheckbox, BFormGroup, BFormInput, BButton, BFormTextarea,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref } from '@vue/composition-api'
import { required, alphaNum, email } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import Ripple from 'vue-ripple-directive'
import store from '@/store'

export default {
  components: {
    BSidebar,
    BForm,
    BFormCheckbox,
    BFormGroup,
    BFormInput,
    BFormTextarea,
    BButton,
    // Form Validation
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: 'isAddNewVendorSidebarActive',
    event: 'update:is-add-new-vendor-sidebar-active',
  },
  props: {
    isAddNewVendorSidebarActive: {
      type: Boolean,
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
    const blankVendorData = {
      vendorName: '',
      vendorCode: '',
      description: '',
      active: true,
    }

    const vendorData = ref(JSON.parse(JSON.stringify(blankVendorData)))
    const resetvendorData = () => {
      vendorData.value = JSON.parse(JSON.stringify(blankVendorData))
    }

    const onSubmit = () => {
      store.dispatch('app-vendor/addVendor', vendorData.value)
        .then(() => {
          emit('refetch-data')
          emit('update:is-add-new-vendor-sidebar-active', false)
        })
    }

    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resetvendorData)

    return {
      vendorData,
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

#add-new-vendor-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
