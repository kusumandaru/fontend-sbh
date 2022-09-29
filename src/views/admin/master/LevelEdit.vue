<template>
  <component :is="levelData === undefined ? 'div' : 'b-card'">
    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="levelData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching level data
      </h4>
      <div class="alert-body">
        No level found with this level id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'admin-level-list'}"
        >
          Level List
        </b-link>
        for other levels.
      </div>
    </b-alert>

    <div>
      <!-- Level Info: Input Fields -->
      <validation-observer
        #default="{ handleSubmit }"
        ref="refFormObserver"
      >
        <b-form
          @submit.prevent="handleSubmit(onSubmit)"
          @reset.prevent="resetForm"
        >
          <b-row>
            <!-- Field: Name -->
            <b-col
              cols="12"
              md="4"
            >
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
                  />
                  <div class="invalid-feedback d-block">
                    {{ validationContext.errors[0] }}
                  </div>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Field: Percentage -->
            <b-col
              cols="12"
              md="4"
            >
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
                  />
                  <div class="invalid-feedback d-block">
                    {{ validationContext.errors[0] }}
                  </div>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Field: Rounddown score-->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Rounddown score"
              >
                <b-form-group
                  label="Rounddown score"
                  label-for="level-active"
                >
                  <b-form-checkbox
                    id="level-rounddown"
                    v-model="levelData.rounddown"
                    switch
                    inline
                  >
                    Round down score
                  </b-form-checkbox>
                  <div class="invalid-feedback d-block">
                    {{ validationContext.errors[0] }}
                  </div>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Field: Active-->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Level Active"
              >
                <b-form-group
                  label="Level Active"
                  label-for="level-active"
                >
                  <b-form-checkbox
                    id="level-active"
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
  BTab, BTabs, BCard, BAlert, BLink, BFormInput, BButton, BCol, BFormCheckbox, BFormGroup, BRow, BForm,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref, onUnmounted } from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import Ripple from 'vue-ripple-directive'
import { required } from '@validations'
import vSelect from 'vue-select'
import formValidation from '@core/comp-functions/forms/form-validation'
import masterStoreModule from './masterStoreModule'

export default {
  components: {
    BTab,
    BTabs,
    BCard,
    BAlert,
    BLink,
    BFormCheckbox,
    BFormInput,
    BButton,
    BCol,
    BFormGroup,
    BRow,
    BForm,
    ValidationProvider,
    ValidationObserver,
    vSelect,
    required,
  },
  directives: {
    Ripple,
  },
  setup() {
    const blankLevelData = {
      name: '',
      percentage: 0,
      master_template_id: `${router.currentRoute.params.templateId}`,
      active: true,
      rounddown: false,
    }

    const levelData = ref(JSON.parse(JSON.stringify(blankLevelData)))
    const resetlevelData = () => {
      levelData.value = JSON.parse(JSON.stringify(blankLevelData))
    }
    const USER_APP_STORE_MODULE_NAME = 'app-level'
    const onSubmit = () => {
      levelData.value.masterTemplateID = levelData.value.master_template_id
      store.dispatch('app-level/editLevel', { levelId: router.currentRoute.params.levelId, levelData: levelData.value })
        .then(() => {
          router.push({ name: 'admin-evaluation-list' })
        })
    }

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, masterStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-level/fetchLevel', { levelId: router.currentRoute.params.levelId })
      .then(response => { levelData.value = response.data })
      .catch(error => {
        if (error.response.status === 404) {
          levelData.value = undefined
        }
      })

    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resetlevelData)
    return {
      blankLevelData,
      levelData,
      onSubmit,
      resetlevelData,
      refFormObserver,
      getValidationState,
      resetForm,
    }
  },
  methods: {
    cancel() {
      router.push({ name: 'admin-evaluation-list' })
    },
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
