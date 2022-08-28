<template>
  <b-sidebar
    id="add-new-activity-name-sidebar"
    :visible="isAddNewActivityNameSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-add-new-activity-name-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Add New Activity Name
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
          <!-- Name -->
          <validation-provider
            #default="validationContext"
            name="Name"
            rules="required"
          >
            <b-form-group
              label="Activity Name"
              label-for="name"
            >
              <b-form-input
                id="nameId"
                v-model="activityNameData.name"
                :state="getValidationState(validationContext)"
                trim
              />

              <div class="invalid-feedback d-block">
                {{ validationContext.errors[0] }}
              </div>
            </b-form-group>
          </validation-provider>

          <!-- Activity Id -->
          <validation-provider
            #default="validationContext"
            name="activity_id"
            rules="required"
          >
            <b-form-group
              label="Activity Id"
              label-for="code"
            >
              <v-select
                v-model="activityNameData.activityID"
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

          <!-- Active -->
          <validation-provider
            #default="validationContext"
            name="Active"
            rules="required"
          >
            <b-form-group
              label="Activity Name Active"
              label-for="active"
            >
              <b-form-checkbox
                id="active"
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
  BSidebar, BForm, BFormCheckbox, BFormGroup, BFormInput, BButton,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref, onUnmounted } from '@vue/composition-api'
import {
  required,
  regex,
  alphaNum,
  alphaDash,
  email,
} from '@validations'
import router from '@/router'
import formValidation from '@core/comp-functions/forms/form-validation'
import Ripple from 'vue-ripple-directive'
import store from '@/store'
import vSelect from 'vue-select'
import masterStoreModule from './masterStoreModule'

export default {
  components: {
    BSidebar,
    BForm,
    BFormCheckbox,
    BFormGroup,
    BFormInput,
    BButton,
    // Form Validation
    ValidationProvider,
    ValidationObserver,
    vSelect,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: 'isAddNewActivityNameSidebarActive',
    event: 'update:is-add-new-activity-name-sidebar-active',
  },
  props: {
    isAddNewActivityNameSidebarActive: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      required,
      regex,
      alphaNum,
      alphaDash,
      email,
    }
  },
  setup(props, { emit }) {
    const blankActivityNameData = {
      name: '',
      code: '',
      placeholder: '',
      masterCertificationTypeID: router.currentRoute.params.certificationTypeId,
      projectDocumentCategoryID: null,
      objectType: 'file',
      active: true,
    }
    const provinceOptions = ref(JSON.parse('[]'))
    const activityNameOptions = ref(JSON.parse('[]'))
    const activityNameData = ref(JSON.parse(JSON.stringify(blankActivityNameData)))
    const BUILDING_DOCUMENT_APP_STORE_MODULE_NAME = 'app-activity-name'

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

    const resetActivityNameData = () => {
      activityNameData.value = JSON.parse(JSON.stringify(blankActivityNameData))
    }

    const onSubmit = () => {
      store.dispatch('app-template/addActivityName', activityNameData.value)
        .then(() => {
          emit('refetch-data')
          emit('update:is-add-new-activity-name-sidebar-active', false)
        })
    }

    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resetActivityNameData)

    return {
      activityNameData,
      activityNameOptions,
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

#add-new-activity-name-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
