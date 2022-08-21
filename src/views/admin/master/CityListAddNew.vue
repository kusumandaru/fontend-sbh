<template>
  <b-sidebar
    id="add-new-city-sidebar"
    :visible="isAddNewCitySidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-add-new-city-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Add New City
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
          <!-- Province -->
          <validation-provider
            #default="validationContext"
            name="province"
            rules="required"
          >
            <b-form-group
              label="province"
              label-for="code"
            >
              <v-select
                v-model="cityData.provinceId"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="provinceOptions"
                :reduce="val => val.id"
                :clearable="false"
                :required="!cityData.provinceId"
                input-id="province"
                label="name"
                code="id"
              />

              <div class="invalid-feedback d-block">
                {{ validationContext.errors[0] }}
              </div>
            </b-form-group>
          </validation-provider>

          <!-- Name -->
          <validation-provider
            #default="validationContext"
            name="Name"
            rules="required"
          >
            <b-form-group
              label="City Name"
              label-for="name"
            >
              <b-form-input
                id="nameId"
                v-model="cityData.name"
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
import vSelect from 'vue-select'

export default {
  components: {
    BSidebar,
    BForm,
    BFormGroup,
    BFormInput,
    
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
    prop: 'isAddNewCitySidebarActive',
    event: 'update:is-add-new-city-sidebar-active',
  },
  props: {
    isAddNewCitySidebarActive: {
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
    const blankCityData = {
      provinceId: '',
      name: '',
    }
    const provinceOptions = ref(JSON.parse('[]'))
    const cityData = ref(JSON.parse(JSON.stringify(blankCityData)))
    const resetcityData = () => {
      cityData.value = JSON.parse(JSON.stringify(blankCityData))
    }

    const onSubmit = () => {
      store.dispatch('app-city/addCity', cityData.value)
        .then(() => {
          emit('refetch-data')
          emit('update:is-add-new-city-sidebar-active', false)
        })
    }

    store.dispatch('app-city/fetchProvinces')
      .then(response => {
        provinceOptions.value = response.data
      })
      .catch(error => {
        if (error.response.status === 404) {
          provinceOptions.value = undefined
        }
      })

    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resetcityData)

    return {
      cityData,
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

#add-new-city-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
