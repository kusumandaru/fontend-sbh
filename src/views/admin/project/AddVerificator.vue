<template>
  <b-sidebar
    id="add-verificator-sidebar"
    :visible="isAddNewVerificatorSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-add-verificator-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Add New Verificator
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
          <!-- Verificator -->
          <validation-provider
            #default="validationContext"
            name="verificator"
            rules="required"
          >
            <b-form-group
              label="verificator"
              label-for="verificator"
            >
              <v-select
                v-model="verificatorData.id"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="verificatorOptions"
                :reduce="val => val.id"
                :clearable="false"
                :required="!verificatorData.id"
                input-id="verificator_id"
                label="email"
                code="id"
              />

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
  BSidebar, BForm, BFormGroup, BButton,
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
import vSelect from 'vue-select'

export default {
  components: {
    BSidebar,
    BForm,
    BFormGroup,
    BButton,
    vSelect,
    // Form Validation
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: 'isAddNewVerificatorSidebarActive',
    event: 'update:is-add-new-verificator-sidebar-active',
  },
  props: {
    isAddNewVerificatorSidebarActive: {
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

    const blankVerificatorData = {
      id: '',
    }

    const verificatorOptions = ref(JSON.parse('[]'))
    const verificatorData = ref(JSON.parse(JSON.stringify(blankVerificatorData)))
    const resetverificatorData = () => {
      verificatorData.value = JSON.parse(JSON.stringify(blankVerificatorData))
    }

    store.dispatch('app-project/fetchVerificators')
      .then(response => {
        verificatorOptions.value = response.data
      })
      .catch(error => {
        if (error.response.status === 404) {
          verificatorOptions.value = undefined
        }
      })

    const onSubmit = () => {
      store.dispatch('app-project/addVerificator', { id: router.currentRoute.params.id, verificatorData: verificatorData.value })
        .then(() => {
          emit('refetch-data')
          emit('update:is-add-verificator-sidebar-active', false)
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
    } = formValidation(resetverificatorData)

    return {
      verificatorData,
      verificatorOptions,
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

#add-verificator-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
