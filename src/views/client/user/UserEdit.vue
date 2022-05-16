<template>
  <component :is="userData === undefined ? 'div' : 'b-card'">

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="userData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching user data
      </h4>
      <div class="alert-body">
        No user found with this user id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'admin-user-list'}"
        >
          User List
        </b-link>
        for other users.
      </div>
    </b-alert>

    <div>
      <!-- User Info: Input Fields -->
      <validation-observer
        #default="{ handleSubmit }"
        ref="refFormObserver"
      >
        <b-form
          @submit.prevent="handleSubmit(onSubmit)"
          @reset.prevent="resetForm"
        >
          <b-row>
            <!-- Field: First Name-->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="First Name"
                rules="required"
              >
                <b-form-group
                  label="First Name"
                  label-for="first-name"
                >
                  <b-form-input
                    id="first-name"
                    v-model="userData.first_name"
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Field: Last Name-->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Last Name"
                rules="required"
              >
                <b-form-group
                  label="Last Name"
                  label-for="last-name"
                >
                  <b-form-input
                    id="last-name"
                    v-model="userData.last_name"
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Field: Email-->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Email"
                rules="required|email"
              >
                <b-form-group
                  label="Email"
                  label-for="email"
                >
                  <b-form-input
                    id="email"
                    v-model="userData.email"
                    type="email"
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
                name="Active"
              >
                <b-form-group
                  label="Active"
                  label-for="active"
                >
                  <b-form-checkbox
                    id="active"
                    v-model="userData.active"
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

            <!-- Field: Owner-->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Owner"
              >
                <b-form-group
                  label="Owner"
                  label-for="owner"
                >
                  <b-form-checkbox
                    id="owner"
                    v-model="userData.tenant_owner"
                    switch
                    inline
                  >
                    Owner
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
  BTab,
  BTabs,
  BCard,
  BAlert,
  BLink,
  BFormInput,
  BFormCheckbox,
  BButton,
  BCol,
  BFormGroup,
  BRow,
  BForm,
  BFormInvalidFeedback,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref, onUnmounted } from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import Ripple from 'vue-ripple-directive'
import { required } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import vSelect from 'vue-select'
import masterUserStoreModule from './masterUserStoreModule'

export default {
  components: {
    BTab,
    BTabs,
    BCard,
    BAlert,
    BLink,
    BFormInput,
    BFormCheckbox,
    BButton,
    BCol,
    BFormGroup,
    BRow,
    BForm,
    BFormInvalidFeedback,
    ValidationProvider,
    ValidationObserver,
    required,
    vSelect,
  },
  directives: {
    Ripple,
  },
  setup() {
    const blankUserData = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      active: true,
    }
    const userData = ref(JSON.parse(JSON.stringify(blankUserData)))
    const resetuserData = () => {
      userData.value = JSON.parse(JSON.stringify(blankUserData))
    }
    const USER_APP_STORE_MODULE_NAME = 'app-user-tenant'

    const onSubmit = () => {
      userData.value.firstName = userData.value.first_name
      userData.value.lastName = userData.value.last_name
      userData.value.tenantOwner = userData.value.tenant_owner

      store.dispatch('app-user-tenant/editUser', { userId: router.currentRoute.params.userId, userData: userData.value })
        .then(() => {
          router.push({ name: 'client-user-list' })
        })
    }

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, masterUserStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-user-tenant/fetchUser', { userId: router.currentRoute.params.userId })
      .then(response => { userData.value = response.data })
      .catch(error => {
        if (error.response.status === 404) {
          userData.value = undefined
        }
      })

    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resetuserData)
    return {
      blankUserData,
      userData,
      onSubmit,
      resetuserData,
      refFormObserver,
      getValidationState,
      resetForm,
    }
  },
  methods: {
    cancel() {
      router.push({ name: 'client-user-list' })
    },
  },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
</style>
