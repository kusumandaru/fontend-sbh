<template>
  <component :is="scoreModifierData === undefined ? 'div' : 'b-card'">

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="scoreModifierData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching score modidifer data
      </h4>
      <div class="alert-body">
        No score modidifer found with this score modidifer id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'admin-criteria-list'}"
        >
          Score Modifier List
        </b-link>
        for other score modifiers.
      </div>
    </b-alert>

    <div>
      <!-- Score Modifier Info: Input Fields -->
      <validation-observer
        #default="{ handleSubmit }"
        ref="refFormObserver"
      >
        <b-form
          @submit.prevent="handleSubmit(onSubmit)"
          @reset.prevent="resetForm"
        >
          <b-row>
            <!-- Title -->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Title"
                rules="required"
              >
                <b-form-group
                  label="Title"
                  label-for="title"
                >
                  <b-form-input
                    id="title"
                    v-model="scoreModifierData.title"
                    :state="getValidationState(validationContext)"
                    trim
                  />

                  <div class="invalid-feedback d-block">
                    {{ validationContext.errors[0] }}
                  </div>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Score Modifier -->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Score Modifier"
                rules="required"
              >
                <b-form-group
                  label="Score Modifier"
                  label-for="score_modifier"
                >
                  <b-form-input
                    id="score_modifier"
                    v-model="scoreModifierData.score_modifier"
                    :state="getValidationState(validationContext)"
                    type="number"
                    trim
                  />

                  <div class="invalid-feedback d-block">
                    {{ validationContext.errors[0] }}
                  </div>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Description -->
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
                  label-for="description"
                >
                  <quill-editor
                    v-model="scoreModifierData.description"
                    :options="editorOption"
                  />
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
                name="Score Modifier Active"
              >
                <b-form-group
                  label="Score Modifier Active"
                  label-for="score-modifier-active"
                >
                  <b-form-checkbox
                    id="score-modifier-active"
                    v-model="scoreModifierData.active"
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
  BTab, BTabs, BCard, BAlert, BLink, BFormInput, BButton, BCol, BFormGroup, BRow, BForm, BFormCheckbox,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref, onUnmounted } from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import Ripple from 'vue-ripple-directive'
import { required } from '@validations'
import vSelect from 'vue-select'
import formValidation from '@core/comp-functions/forms/form-validation'
// eslint-disable-next-line
import 'quill/dist/quill.core.css'
// eslint-disable-next-line
import 'quill/dist/quill.snow.css'
// eslint-disable-next-line
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
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
    vSelect,
    required,
    quillEditor,
  },
  directives: {
    Ripple,
  },
  setup() {
    const blankCriteriaData = {
      scoreModifier: '',
      description: '',
      title: '',
      masterExerciseID: `${router.currentRoute.params.exerciseId}`,
      active: true,
    }

    const editorOption = {
      theme: 'snow',
    }
    const scoreModifierData = ref(JSON.parse(JSON.stringify(blankCriteriaData)))
    const resetscoreModifierData = () => {
      scoreModifierData.value = JSON.parse(JSON.stringify(blankCriteriaData))
    }
    const USER_APP_STORE_MODULE_NAME = 'app-score-modifier'
    const onSubmit = () => {
      scoreModifierData.value.scoreModifier = scoreModifierData.value.score_modifier
      scoreModifierData.value.masterExerciseID = scoreModifierData.value.master_exercise_id

      store.dispatch('app-score-modifier/editScoreModifier', { scoreModifierId: router.currentRoute.params.scoreModifierId, scoreModifierData: scoreModifierData.value })
        .then(() => {
          router.push({ name: 'admin-criteria-list' })
        })
    }

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, masterStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-score-modifier/fetchScoreModifier', { scoreModifierId: router.currentRoute.params.scoreModifierId })
      .then(response => { scoreModifierData.value = response.data })
      .catch(error => {
        if (error.response.status === 404) {
          scoreModifierData.value = undefined
        }
      })

    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resetscoreModifierData)
    return {
      blankCriteriaData,
      scoreModifierData,
      onSubmit,
      resetscoreModifierData,
      refFormObserver,
      getValidationState,
      resetForm,
      editorOption,
    }
  },
  computed: {
  },
  methods: {
    cancel() {
      router.push({ name: 'admin-criteria-list' })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

#add-new-score-modifier-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
