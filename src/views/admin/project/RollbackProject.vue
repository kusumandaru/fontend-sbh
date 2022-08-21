<template>
  <b-sidebar
    id="rollback-sidebar"
    :visible="isRollbackSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-rollback-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Rollback project to specific activity
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
          <!-- Task Type -->
          <validation-provider
            #default="validationContext"
            name="Task Type"
          >
            <b-form-group
              label="Task Type"
              label-for="task-type"
            >
              <v-select
                v-model="rollbackData.selectedTask"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="historyOptions"
                :clearable="false"
                label="activityName"
                code="activityId"
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
              variant="warning"
              class="mr-2"
              type="submit"
            >
              Rollback
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
import vSelect from 'vue-select'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref } from '@vue/composition-api'
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
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import store from '@/store'

export default {
  components: {
    BSidebar,
    BForm,
    BFormGroup,
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
    prop: 'isRollbackSidebarActive',
    event: 'update:is-rollback-sidebar-active',
  },
  props: {
    isRollbackSidebarActive: {
      type: Boolean,
      required: true,
    },
    historyOptions: {
      type: Array,
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
    const blankRollbackData = {
      selectedTask: {},
      taskId: router.currentRoute.params.id,
    }

    const rollbackData = ref(JSON.parse(JSON.stringify(blankRollbackData)))

    const resetRollbackData = () => {
      rollbackData.value = JSON.parse(JSON.stringify(blankRollbackData))
    }

    const toast = useToast()

    const onSubmit = () => {
      store.dispatch('app-project/rollbackProject', { id: rollbackData.value.taskId, startedActivityId: rollbackData.value.selectedTask.activityId, ancestorActivityInstanceId: rollbackData.value.selectedTask.parentActivityInstanceId })
        .then(() => {
          emit('update:is-rollback-sidebar-active', false)
          router.push({ name: 'admin-project-list' })
        }).catch(error => {
          toast({
            component: ToastificationContent,
            props: {
              title: 'Cannot rollback project',
              icon: 'AlertTriangleIcon',
              variant: 'warning',
              text: error.response.data.message,
            },
          })
        })
    }

    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resetRollbackData)

    return {
      rollbackData,
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

#rollback-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
