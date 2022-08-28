<template>
  <component :is="activityNameData === undefined ? 'div' : 'b-card'">

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="activityNameData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching activity name data
      </h4>
      <div class="alert-body">
        No activity name found with this activity name id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'admin-activity-name-list'}"
        >
          Activity Name List
        </b-link>
        for other activity names.
      </div>
    </b-alert>

    <div>
      <!-- Generate Documnet Info: Input Fields -->
      <validation-observer
        #default="{ handleSubmit }"
        ref="refFormObserver"
      >
        <b-form
          @submit.prevent="handleSubmit(onSubmit)"
          @reset.prevent="resetForm"
        >
          <b-row>
            <!-- Field: Activity Name-->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Activity Name"
                rules="required"
              >
                <b-form-group
                  label="Activity Name"
                  label-for="activity-name"
                >
                  <b-form-input
                    id="activity-name"
                    v-model="activityNameData.name"
                  />
                  <div class="invalid-feedback d-block">
                    {{ validationContext.errors[0] }}
                  </div>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Field: Activity Name Code-->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Activity Name Code"
              >
                <b-form-group
                  label="Activity Code"
                  label-for="activity-name-code"
                >
                  <v-select
                    v-model="activityNameData.activity_id"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="activityNameOptions"
                    :reduce="val => val.activity_id"
                    :clearable="false"
                    :required="true"
                    input-id="activity_id"
                    label="name"
                    code="activity_id"
                  />
                  <div class="invalid-feedback d-block">
                    {{ validationContext.errors[0] }}
                  </div>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Field: Activity Name Active-->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Activity Name Active"
              >
                <b-form-group
                  label="Activity Name Active"
                  label-for="activity-name-active"
                >
                  <b-form-checkbox
                    id="activity-name-active"
                    v-model="activityNameData.active"
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
  BFormCheckbox,
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
    BFormCheckbox,
    ValidationProvider,
    ValidationObserver,
    required,
    vSelect,
  },
  directives: {
    Ripple,
  },
  setup() {
    const blankActivityNameData = {
      name: null,
      active: null,
      activity_id: null,
      master_certification_id: null,

    }
    const activityNameData = ref(JSON.parse(JSON.stringify(blankActivityNameData)))
    const resetactivityNameData = () => {
      activityNameData.value = JSON.parse(JSON.stringify(blankActivityNameData))
    }
    const BUILDING_DOCUMENT_APP_STORE_MODULE_NAME = 'app-activity-name'
    const readOnly = true
    const activityNameOptions = ref(JSON.parse('[]'))

    const onSubmit = () => {
      activityNameData.value.masterCertificationTypeID = activityNameData.value.master_certification_type_id
      activityNameData.value.activityID = activityNameData.value.activity_id

      store.dispatch('app-activity-name/editActivityName', { activityNameId: router.currentRoute.params.activityNameId, activityNameData: activityNameData.value })
        .then(() => {
          router.push({ name: 'admin-template-list' })
        })
    }

    // Register module
    if (!store.hasModule(BUILDING_DOCUMENT_APP_STORE_MODULE_NAME)) store.registerModule(BUILDING_DOCUMENT_APP_STORE_MODULE_NAME, masterStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(BUILDING_DOCUMENT_APP_STORE_MODULE_NAME)) store.unregisterModule(BUILDING_DOCUMENT_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-activity-name/allActivityName')
      .then(response => { activityNameOptions.value = response.data })
      .catch(error => {
        if (error.response.status === 404) {
          activityNameOptions.value = undefined
        }
      })

    store.dispatch('app-activity-name/fetchActivityName', { activityNameId: router.currentRoute.params.activityNameId })
      .then(response => {
        activityNameData.value = response.data
      })
      .catch(error => {
        if (error.response.status === 404) {
          activityNameData.value = undefined
        }
      })

    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resetactivityNameData)
    return {
      blankActivityNameData,
      activityNameData,
      onSubmit,
      resetactivityNameData,
      refFormObserver,
      getValidationState,
      resetForm,
      readOnly,
      activityNameOptions,
    }
  },
  methods: {
    cancel() {
      router.push({ name: 'admin-template-list' })
    },
  },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
</style>
