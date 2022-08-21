<template>
  <component :is="buildingData === undefined ? 'div' : 'b-card'">

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="buildingData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching building data
      </h4>
      <div class="alert-body">
        No building found with this building id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'admin-building-type-list'}"
        >
          Building List
        </b-link>
        for other buildings.
      </div>
    </b-alert>

    <div>
      <!-- Building Info: Input Fields -->
      <validation-observer
        #default="{ handleSubmit }"
        ref="refFormObserver"
      >
        <b-form
          @submit.prevent="handleSubmit(onSubmit)"
          @reset.prevent="resetForm"
        >
          <b-row>
            <!-- Field: Building Code -->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Building Code"
                rules="required"
              >
                <b-form-group
                  label="Building Code"
                  label-for="building-code"
                >
                  <b-form-input
                    id="building-code"
                    v-model="buildingData.code"
                  />
                  <div class="invalid-feedback d-block">
                    {{ validationContext.errors[0] }}
                  </div>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Field: Building Name ID -->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Building Name ID"
                rules="required"
              >
                <b-form-group
                  label="Building Name ID"
                  label-for="building-name-id"
                >
                  <b-form-input
                    id="building-name"
                    v-model="buildingData.name_id"
                  />
                  <div class="invalid-feedback d-block">
                    {{ validationContext.errors[0] }}
                  </div>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Field: Building Name EN -->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Building Name EN"
                rules="required"
              >
                <b-form-group
                  label="Building Name EN"
                  label-for="building-name-en"
                >
                  <b-form-input
                    id="building-name"
                    v-model="buildingData.name_en"
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
    const blankBuildingData = {
      code: '',
      name_id: '',
      name_en: '',
    }

    const buildingData = ref(JSON.parse(JSON.stringify(blankBuildingData)))
    const resetbuildingData = () => {
      buildingData.value = JSON.parse(JSON.stringify(blankBuildingData))
    }
    const USER_APP_STORE_MODULE_NAME = 'app-building'

    const onSubmit = () => {
      buildingData.value.nameId = buildingData.value.name_id
      buildingData.value.nameEn = buildingData.value.name_en

      store.dispatch('app-building/editBuilding', { buildingId: router.currentRoute.params.buildingId, buildingData: buildingData.value })
        .then(() => {
          router.push({ name: 'admin-building-type-list' })
        })
    }

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, masterStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-building/fetchBuilding', { buildingId: router.currentRoute.params.buildingId })
      .then(response => { buildingData.value = response.data })
      .catch(error => {
        if (error.response.status === 404) {
          buildingData.value = undefined
        }
      })

    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resetbuildingData)
    return {
      blankBuildingData,
      buildingData,
      onSubmit,
      resetbuildingData,
      refFormObserver,
      getValidationState,
      resetForm,
    }
  },
  methods: {
    cancel() {
      router.push({ name: 'admin-building-type-list' })
    },
  },
}
</script>

<style>

</style>
