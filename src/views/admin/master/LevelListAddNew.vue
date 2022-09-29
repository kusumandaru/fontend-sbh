<template>
  <b-sidebar
    id="add-new-level-sidebar"
    :visible="isAddNewLevelSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-add-new-level-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Add New Level
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
              label="Name"
              label-for="name"
            >
              <b-form-input
                id="name"
                v-model="levelData.name"
                :state="getValidationState(validationContext)"
                trim
              />

              <div class="invalid-feedback d-block">
                {{ validationContext.errors[0] }}
              </div>
            </b-form-group>
          </validation-provider>

          <!-- Percentage -->
          <validation-provider
            #default="validationContext"
            name="Percentage"
            rules="required|integer"
          >
            <b-form-group
              label="Percentage"
              label-for="percentage"
            >
              <b-form-input
                id="percentage"
                v-model="levelData.percentage"
                :state="getValidationState(validationContext)"
                trim
              />

              <div class="invalid-feedback d-block">
                {{ validationContext.errors[0] }}
              </div>
            </b-form-group>
          </validation-provider>

          <!-- Rounddown score -->
          <validation-provider
            #default="validationContext"
            name="Rounddown score"
          >
            <b-form-group
              label="Rounddown score"
              label-for="rounddown"
            >
              <b-form-checkbox
                id="Level-rounddown"
                v-model="levelData.rounddown"
                switch
                inline
              >
                Rounddown score
              </b-form-checkbox>
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
                id="Level-active"
                v-model="levelData.active"
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
import { ref } from '@vue/composition-api'
import {
  required,
  alphaNum,
  email,
  integer,
} from '@validations'
import router from '@/router'
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
    BButton,
    // Form Validation
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: 'isAddNewLevelSidebarActive',
    event: 'update:is-add-new-level-sidebar-active',
  },
  props: {
    isAddNewLevelSidebarActive: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      required,
      alphaNum,
      email,
      integer,
    }
  },
  setup(props, { emit }) {
    const blankLevelData = {
      name: '',
      percentage: 0,
      masterTemplateID: `${router.currentRoute.params.templateId}`,
      active: true,
      rounddown: false,
    }

    const levelData = ref(JSON.parse(JSON.stringify(blankLevelData)))
    const resetLevelData = () => {
      levelData.value = JSON.parse(JSON.stringify(blankLevelData))
    }

    const onSubmit = () => {
      store.dispatch('app-evaluation/addLevel', levelData.value)
        .then(() => {
          emit('refetch-data')
          emit('update:is-add-new-level-sidebar-active', false)
        })
    }

    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resetLevelData)

    return {
      levelData,
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

#add-new-level-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
