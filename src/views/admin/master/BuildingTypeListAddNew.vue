<template>
  <b-sidebar
    id="add-new-building-sidebar"
    :visible="isAddNewBuildingSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-add-new-building-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Add New Building
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
            name="Code"
            rules="required"
          >
            <b-form-group
              label="Code [cannot change laters]"
              label-for="code"
            >
              <b-form-input
                id="code"
                v-model="buildingData.code"
                :state="getValidationState(validationContext)"
                trim
              />

              <div class="invalid-feedback d-block">
                {{ validationContext.errors[0] }}
              </div>
            </b-form-group>
          </validation-provider>

          <!-- Name ID -->
          <validation-provider
            #default="validationContext"
            name="Name ID"
            rules="required"
          >
            <b-form-group
              label="Indonesian Name"
              label-for="name-id"
            >
              <b-form-input
                id="nameId"
                v-model="buildingData.nameId"
                :state="getValidationState(validationContext)"
                trim
              />

              <div class="invalid-feedback d-block">
                {{ validationContext.errors[0] }}
              </div>
            </b-form-group>
          </validation-provider>

          <!-- Name EN -->
          <validation-provider
            #default="validationContext"
            name="Name En"
            rules="required"
          >
            <b-form-group
              label="English Name"
              label-for="name-en"
            >
              <b-form-input
                id="nameId"
                v-model="buildingData.nameEn"
                :state="getValidationState(validationContext)"
                trim
              />

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
  BSidebar, BForm, BFormGroup, BFormInput, BButton,
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
    BFormGroup,
    BFormInput,
    BButton,
    // Form Validation
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: 'isAddNewBuildingSidebarActive',
    event: 'update:is-add-new-building-sidebar-active',
  },
  props: {
    isAddNewBuildingSidebarActive: {
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
    const blankBuildingData = {
      code: '',
      nameId: '',
      nameEn: '',
    }

    const buildingData = ref(JSON.parse(JSON.stringify(blankBuildingData)))
    const resetbuildingData = () => {
      buildingData.value = JSON.parse(JSON.stringify(blankBuildingData))
    }

    const onSubmit = () => {
      store.dispatch('app-building/addBuilding', buildingData.value)
        .then(() => {
          emit('refetch-data')
          emit('update:is-add-new-building-sidebar-active', false)
        })
    }

    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resetbuildingData)

    return {
      buildingData,
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

#add-new-building-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
