<template>
  <component :is="cityData === undefined ? 'div' : 'b-card'">

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="cityData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching city data
      </h4>
      <div class="alert-body">
        No city found with this city id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'admin-city-list'}"
        >
          City List
        </b-link>
        for other citys.
      </div>
    </b-alert>

    <div>
      <!-- City Info: Input Fields -->
      <validation-observer
        #default="{ handleSubmit }"
        ref="refFormObserver"
      >
        <b-form
          @submit.prevent="handleSubmit(onSubmit)"
          @reset.prevent="resetForm"
        >
          <b-row>

            <!-- Province -->
            <b-col
              cols="12"
              md="4"
            >
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
                    v-model="cityData.province_id"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="provinceOptions"
                    :reduce="val => val.id"
                    :clearable="false"
                    :required="!cityData.province_id"
                    input-id="province"
                    label="name"
                    code="id"
                  />

                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Field: City Name-->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="City Name"
                rules="required"
              >
                <b-form-group
                  label="City Name"
                  label-for="city-name"
                >
                  <b-form-input
                    id="city-name"
                    v-model="cityData.name"
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
    const blankCityData = {
      name: '',
      province_id: '',
    }
    const provinceOptions = ref(JSON.parse('[]'))
    const cityData = ref(JSON.parse(JSON.stringify(blankCityData)))
    const resetcityData = () => {
      cityData.value = JSON.parse(JSON.stringify(blankCityData))
    }
    const USER_APP_STORE_MODULE_NAME = 'app-city'

    const onSubmit = () => {
      cityData.value.provinceId = cityData.value.province_id

      store.dispatch('app-city/editCity', { cityId: router.currentRoute.params.cityId, cityData: cityData.value })
        .then(() => {
          router.push({ name: 'admin-city-list' })
        })
    }

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, masterStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-city/fetchCity', { cityId: router.currentRoute.params.cityId })
      .then(response => { cityData.value = response.data })
      .catch(error => {
        if (error.response.status === 404) {
          cityData.value = undefined
        }
      })

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
      blankCityData,
      cityData,
      onSubmit,
      resetcityData,
      refFormObserver,
      getValidationState,
      resetForm,
      provinceOptions,
    }
  },
  methods: {
    cancel() {
      router.push({ name: 'admin-city-list' })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
