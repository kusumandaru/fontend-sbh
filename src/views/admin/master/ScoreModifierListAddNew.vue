<template>
  <b-sidebar
    id="add-new-score-modifier-sidebar"
    :visible="isAddNewScoreModifierSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-add-new-score-modifier-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Add New Score Modifier
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
          <!-- Title -->
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

          <!-- Score Modifier -->
          <validation-provider
            v-if="validationScore"
            #default="validationContext"
            name="Score"
            :rules="validationScore ? 'required' : ''"
          >
            <b-form-group
              label="Score"
              label-for="score_modifier"
            >
              <b-form-input
                id="score_modifier"
                v-model="scoreModifierData.scoreModifier"
                :state="getValidationState(validationContext)"
                type="number"
                trim
              />

              <div class="invalid-feedback d-block">
                {{ validationContext.errors[0] }}
              </div>
            </b-form-group>
          </validation-provider>

          <!-- Description -->
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
                id="scoreModifier-active"
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
  BSidebar, BForm, BFormGroup, BFormInput, BButton, BFormCheckbox,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref } from '@vue/composition-api'
import { required, alphaNum, email } from '@validations'
import router from '@/router'
import formValidation from '@core/comp-functions/forms/form-validation'
import Ripple from 'vue-ripple-directive'
import store from '@/store'
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
// eslint-disable-next-line
import 'quill/dist/quill.core.css'
// eslint-disable-next-line
import 'quill/dist/quill.snow.css'
// eslint-disable-next-line
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

Vue.use(VueSweetalert2)

export default {
  components: {
    BSidebar,
    BForm,
    BFormGroup,
    BFormInput,

    BButton,
    BFormCheckbox,
    // Form Validation
    ValidationProvider,
    ValidationObserver,
    quillEditor,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: 'isAddNewScoreModifierSidebarActive',
    event: 'update:is-add-new-score-modifier-sidebar-active',
  },
  props: {
    isAddNewScoreModifierSidebarActive: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      required,
      alphaNum,
      email,
    }
  },
  setup(props, { emit }) {
    const blankScoreModifierData = {
      exerciseType: '',
      score: '',
      description: '',
      additionalNotes: '',
      notAvailable: false,
      masterExerciseID: `${router.currentRoute.params.exerciseId}`,
      active: true,
    }

    const editorOption = {
      theme: 'snow',
    }

    const toast = useToast()
    const scoreModifierData = ref(JSON.parse(JSON.stringify(blankScoreModifierData)))
    const resetscoreModifierData = () => {
      scoreModifierData.value = JSON.parse(JSON.stringify(blankScoreModifierData))
    }

    const onSubmit = () => {
      store.dispatch('app-criteria/addScoreModifier', scoreModifierData.value)
        .then(() => {
          emit('refetch-data')
          emit('update:is-add-new-score-modifier-sidebar-active', false)
        }).catch(error => {
          toast({
            component: ToastificationContent,
            props: {
              title: 'Cannot Add Score Modifier',
              icon: 'AlertTriangleIcon',
              text: error.response.data.message,
              variant: 'danger',
            },
          })
        })
    }

    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resetscoreModifierData)

    return {
      scoreModifierData,
      editorOption,
      onSubmit,

      refFormObserver,
      getValidationState,
      resetForm,
    }
  },
  computed: {
    validationScore() {
      return this.scoreModifierData.exerciseType !== 'prequisite'
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
