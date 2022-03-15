<template>
  <component :is="evaluationData === undefined ? 'div' : 'b-card'">

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="evaluationData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching evaluation data
      </h4>
      <div class="alert-body">
        No evaluation found with this evaluation id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'admin-evaluation-list'}"
        >
          Evaluation List
        </b-link>
        for other evaluations.
      </div>
    </b-alert>

    <div>
      <!-- Evaluation Info: Input Fields -->
      <validation-observer
        #default="{ handleSubmit }"
        ref="refFormObserver"
      >
        <b-form
          @submit.prevent="handleSubmit(onSubmit)"
          @reset.prevent="resetForm"
        >
          <b-row>
            <!-- Field: Code -->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Code"
                rules="required"
              >
                <b-form-group
                  label="Code"
                  label-for="code"
                >
                  <b-form-input
                    id="code"
                    v-model="evaluationData.code"
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

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
                    v-model="evaluationData.name"
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
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
                name="Evaluation Active"
              >
                <b-form-group
                  label="Evaluation Active"
                  label-for="evaluation-active"
                >
                  <b-form-checkbox
                    id="evaluation-active"
                    v-model="evaluationData.active"
                    switch
                    inline
                  >
                    Active
                  </b-form-checkbox>
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
  BTab, BTabs, BCard, BAlert, BLink, BFormInput, BButton, BCol, BFormCheckbox, BFormGroup, BRow, BForm, BFormInvalidFeedback,
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
    BFormInvalidFeedback,
    ValidationProvider,
    ValidationObserver,
    vSelect,
    required,
  },
  directives: {
    Ripple,
  },
  setup() {
    const blankEvaluationData = {
      name: '',
      code: '',
      master_template_id: '',
      active: true,
    }

    const evaluationData = ref(JSON.parse(JSON.stringify(blankEvaluationData)))
    const resetevaluationData = () => {
      evaluationData.value = JSON.parse(JSON.stringify(blankEvaluationData))
    }
    const USER_APP_STORE_MODULE_NAME = 'app-evaluation'
    const onSubmit = () => {
      evaluationData.value.masterTemplateID = evaluationData.value.master_template_id

      store.dispatch('app-evaluation/editEvaluation', { evaluationId: router.currentRoute.params.evaluationId, evaluationData: evaluationData.value })
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

    store.dispatch('app-evaluation/fetchEvaluation', { evaluationId: router.currentRoute.params.evaluationId })
      .then(response => { evaluationData.value = response.data })
      .catch(error => {
        if (error.response.status === 404) {
          evaluationData.value = undefined
        }
      })

    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resetevaluationData)
    return {
      blankEvaluationData,
      evaluationData,
      onSubmit,
      resetevaluationData,
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

#add-new-evaluation-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
