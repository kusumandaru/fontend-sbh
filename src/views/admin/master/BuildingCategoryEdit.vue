<template>
  <component :is="buildingCategoryData === undefined ? 'div' : 'b-card'">

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="buildingCategoryData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching building category data
      </h4>
      <div class="alert-body">
        No building category found with this building category id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'admin-building-category-list'}"
        >
          Building Category List
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
                    v-model="buildingCategoryData.code"
                  />
                  <div class="invalid-feedback d-block">
                    {{ validationContext.errors[0] }}
                  </div>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Field: Building Name -->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Building Name"
                rules="required"
              >
                <b-form-group
                  label="Building Name"
                  label-for="building-name"
                >
                  <b-form-input
                    id="building-name"
                    v-model="buildingCategoryData.name"
                  />
                  <div class="invalid-feedback d-block">
                    {{ validationContext.errors[0] }}
                  </div>
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
                  label-for="building-description"
                >
                  <b-form-input
                    id="building-description"
                    v-model="buildingCategoryData.description"
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
      name: '',
      description: '',
    }

    const buildingCategoryData = ref(JSON.parse(JSON.stringify(blankBuildingData)))
    const resetbuildingCategoryData = () => {
      buildingCategoryData.value = JSON.parse(JSON.stringify(blankBuildingData))
    }
    const USER_APP_STORE_MODULE_NAME = 'app-building-category'

    const onSubmit = () => {
      store.dispatch('app-building-category/editBuildingCategory', { categoryId: router.currentRoute.params.categoryId, buildingCategoryData: buildingCategoryData.value })
        .then(() => {
          router.push({ name: 'admin-building-category-list' })
        })
    }

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, masterStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-building-category/fetchBuildingCategory', { categoryId: router.currentRoute.params.categoryId })
      .then(response => { buildingCategoryData.value = response.data })
      .catch(error => {
        if (error.response.status === 404) {
          buildingCategoryData.value = undefined
        }
      })

    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resetbuildingCategoryData)
    return {
      blankBuildingData,
      buildingCategoryData,
      onSubmit,
      resetbuildingCategoryData,
      refFormObserver,
      getValidationState,
      resetForm,
    }
  },
  methods: {
    cancel() {
      router.push({ name: 'admin-building-category-list' })
    },
  },
}
</script>

<style>

</style>
