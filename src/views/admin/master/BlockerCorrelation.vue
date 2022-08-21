<template>
  <component :is="criteriaData === undefined ? 'div' : 'b-card'">

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="criteriaData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching criteria data
      </h4>
      <div class="alert-body">
        No criteria found with this criteria id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'admin-criteria-list'}"
        >
          Criteria List
        </b-link>
        for other criterias.
      </div>
    </b-alert>

    <!-- card 3 -->
    <b-col
      md="6"
      lg="4"
    >
      <b-card
        :header="criteriaData.code"
        :title="criteriaData.exercise_type"
        :footer="criteriaData.description"
        class="text-center"
        footer-class="text-muted"
      >
        <b-card-text>
          {{ criteriaData.code }}
        </b-card-text>
        <b-card-text>
          {{ criteriaData.created_by }}
        </b-card-text>
        <b-card-text>
          {{ criteriaData.created_at }}
        </b-card-text>
      </b-card>
    </b-col>
    <div>
      <!-- Criteria Info: Input Fields -->
      <validation-observer
        #default="{ handleSubmit }"
        ref="refFormObserver"
      >
        <b-form
          @submit.prevent="handleSubmit(onSubmit)"
          @reset.prevent="resetForm"
        >
          <b-row>
            <!-- Blocker -->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Blocker"
              >
                <b-form-group
                  label="Blocker"
                  label-for="blocker"
                >
                  <b-form-checkbox-group
                    v-model="selectedBlocker"
                    :options="blockerData"
                    value-field="id"
                    text-field="code"
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
  BTab, BTabs, BCard, BAlert, BLink, BFormInput, BButton, BCol, BFormGroup, BRow, BForm, BFormCheckbox, BFormCheckboxGroup, BCardText,
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
    BCardText,
    BAlert,
    BLink,
    BFormInput,
    BButton,
    BCol,
    BFormGroup,
    BRow,
    BForm,
    BFormCheckbox,
    BFormCheckboxGroup,
    
    ValidationProvider,
    ValidationObserver,
    required,
  },
  directives: {
    Ripple,
  },
  setup() {
    const blankCriteriaData = {
      exercise_type: '',
      score: '',
      description: '',
      additional_notes: '',
      not_available: false,
      masterExerciseID: `${router.currentRoute.params.exerciseId}`,
    }
    const blankCriteriaBlockerData = {
      id: '',
      code: '',
      description: '',
    }
    const editorOption = {
      theme: 'snow',
    }
    const blankSelectedBlocker = []
    const exerciseTypeOptions = [
      { label: 'Prequisite', value: 'prequisite' },
      { label: 'Score', value: 'score' },
      { label: 'Max Score', value: 'max_score' },
    ]
    const criteriaData = ref(JSON.parse(JSON.stringify(blankCriteriaData)))
    const blockerData = ref(JSON.parse(JSON.stringify(blankCriteriaBlockerData)))
    const selectedBlocker = ref(JSON.parse(JSON.stringify(blankSelectedBlocker)))
    const resetcriteriaData = () => {
      criteriaData.value = JSON.parse(JSON.stringify(blankCriteriaData))
    }
    const USER_APP_STORE_MODULE_NAME = 'app-criteria'
    const onSubmit = () => {
      store.dispatch('app-criteria/updateCriteriaBlocker', { criteriaId: router.currentRoute.params.criteriaId, blockerIds: selectedBlocker.value })
        .then(() => {
          router.push({ name: 'admin-document-list' })
        })
    }

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, masterStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-criteria/fetchCriteria', { criteriaId: router.currentRoute.params.criteriaId })
      .then(response => { criteriaData.value = response.data })
      .catch(error => {
        if (error.response.status === 404) {
          criteriaData.value = undefined
        }
      })

    store.dispatch('app-criteria/fetchBlockerByCriteria', { criteriaId: router.currentRoute.params.criteriaId })
      .then(response => {
        selectedBlocker.value = response.data.map(item => item.blocker.id)
      })
      .catch(error => {
        if (error.response.status === 404) {
          selectedBlocker.value = undefined
        }
      })

    store.dispatch('app-criteria/fetchBlockerByCriteriaOutself', { criteriaId: router.currentRoute.params.criteriaId })
      .then(response => { blockerData.value = response.data })
      .catch(error => {
        if (error.response.status === 404) {
          blockerData.value = undefined
        }
      })

    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resetcriteriaData)
    return {
      blankCriteriaData,
      blankCriteriaBlockerData,
      criteriaData,
      blockerData,
      selectedBlocker,
      onSubmit,
      resetcriteriaData,
      refFormObserver,
      getValidationState,
      resetForm,
      editorOption,
      exerciseTypeOptions,
    }
  },
  computed: {
    validationScore() {
      return this.criteriaData.exercise_type !== 'prequisite'
    },
  },
  methods: {
    cancel() {
      router.push({ name: 'admin-document-list' })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

#add-new-criteria-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
