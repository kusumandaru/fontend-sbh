<template>
  <b-sidebar
    id="add-viewer-sidebar"
    :visible="isAddNewViewerSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-add-viewer-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Add New Viewer
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
          <!-- Email -->
          <validation-provider
            #default="validationContext"
            name="Viewer Email"
            rules="required|email"
          >
            <b-form-group
              label="Viewer Email"
              label-for="email"
            >
              <b-form-input
                id="email"
                v-model="viewerData.email"
                :state="getValidationState(validationContext)"
                trim
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
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
  BSidebar, BForm, BFormGroup, BFormInput, BFormInvalidFeedback, BButton,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref } from '@vue/composition-api'
import { required, alphaNum, email } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import Ripple from 'vue-ripple-directive'
import { useToast } from 'vue-toastification/composition'
import store from '@/store'
import router from '@/router'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BSidebar,
    BForm,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BButton,

    // Form Validation
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: 'isAddNewViewerSidebarActive',
    event: 'update:is-add-new-viewer-sidebar-active',
  },
  props: {
    isAddNewViewerSidebarActive: {
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
    const toast = useToast()

    const blankViewerData = {
      email: '',
    }

    const viewerData = ref(JSON.parse(JSON.stringify(blankViewerData)))
    const resetviewerData = () => {
      viewerData.value = JSON.parse(JSON.stringify(blankViewerData))
    }

    const onSubmit = () => {
      store.dispatch('app-project/addViewer', { id: router.currentRoute.params.id, viewerData: viewerData.value })
        .then(() => {
          emit('refetch-data')
          emit('update:is-add-viewer-sidebar-active', false)
        }).catch(err => {
          toast({
            component: ToastificationContent,
            props: {
              title: err.response.data.message,
              icon: 'BellIcon',
              text: 'Error occured',
              variant: 'danger',
            },
          })
        })
    }

    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resetviewerData)

    return {
      viewerData,
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

#add-viewer-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
