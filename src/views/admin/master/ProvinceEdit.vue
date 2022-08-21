<template>
  <component :is="provinceData === undefined ? 'div' : 'b-card'">

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="provinceData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching province data
      </h4>
      <div class="alert-body">
        No province found with this province id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'admin-province-list'}"
        >
          Province List
        </b-link>
        for other provinces.
      </div>
    </b-alert>

    <div>
      <!-- Province Info: Input Fields -->
      <validation-observer
        #default="{ handleSubmit }"
        ref="refFormObserver"
      >
        <b-form
          @submit.prevent="handleSubmit(onSubmit)"
          @reset.prevent="resetForm"
        >
          <b-row>
            <!-- Field: Province Code -->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Province Name"
                rules="required"
              >
                <b-form-group
                  label="Province Name"
                  label-for="province-name"
                >
                  <b-form-input
                    id="province-name"
                    v-model="provinceData.name"
                  />
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
  BTab, BTabs, BCard, BAlert, BLink, BFormInput, BButton, BCol, BFormGroup, BRow, BForm,
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
    BButton,
    BCol,
    BFormGroup,
    BRow,
    BForm,
    ValidationProvider,
    ValidationObserver,
    required,
  },
  directives: {
    Ripple,
  },
  setup() {
    const blankProvinceData = {
      name: '',
    }

    const provinceData = ref(JSON.parse(JSON.stringify(blankProvinceData)))
    const resetprovinceData = () => {
      provinceData.value = JSON.parse(JSON.stringify(blankProvinceData))
    }
    const USER_APP_STORE_MODULE_NAME = 'app-province'

    const onSubmit = () => {
      store.dispatch('app-province/editProvince', { provinceId: router.currentRoute.params.provinceId, provinceData: provinceData.value })
        .then(() => {
          router.push({ name: 'admin-province-list' })
        })
    }

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, masterStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-province/fetchProvince', { provinceId: router.currentRoute.params.provinceId })
      .then(response => { provinceData.value = response.data })
      .catch(error => {
        if (error.response.status === 404) {
          provinceData.value = undefined
        }
      })

    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resetprovinceData)
    return {
      blankProvinceData,
      provinceData,
      onSubmit,
      resetprovinceData,
      refFormObserver,
      getValidationState,
      resetForm,
    }
  },
  methods: {
    cancel() {
      router.push({ name: 'admin-province-list' })
    },
  },
}
</script>

<style>

</style>
