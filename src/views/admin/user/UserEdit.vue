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
                  <div class="invalid-feedback d-block">
                    {{ validationContext.errors[0] }}
                  </div>
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
                  <div class="invalid-feedback d-block">
                    {{ validationContext.errors[0] }}
                  </div>
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
                  <div class="invalid-feedback d-block">
                    {{ validationContext.errors[0] }}
                  </div>
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
                  <div class="invalid-feedback d-block">
                    {{ validationContext.errors[0] }}
                  </div>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Field: Group-->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Group"
                rules="required"
              >
                <b-form-group
                  label="Group"
                  label-for="group"
                >
                  <v-select
                    v-model="userData.group_id"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="groupOptions"
                    :reduce="val => val.id"
                    :clearable="false"
                    label="name"
                    code="id"
                  >
                    <template #option="{ name }">
                      <span> {{ name }}</span>
                    </template>
                  </v-select>
                  <div class="invalid-feedback d-block">
                    {{ validationContext.errors[0] }}
                  </div>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Field: Tenant-->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Tenant"
              >
                <b-form-group
                  label="Tenant"
                  label-for="tenant"
                >
                  <v-select
                    v-model="userData.tenant_id"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="tenantOptions"
                    :reduce="val => val.id"
                    :clearable="false"
                    label="name"
                    code="id"
                  >
                    <template #option="{ name }">
                      <span> {{ name }}</span>
                    </template>
                  </v-select>
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

      <!-- PERMISSION TABLE -->
      <b-card
        v-if="isVerificator"
        no-body
        class="border mt-1"
      >
        <b-card-header class="p-1">
          <b-card-title class="font-medium-2">
            <feather-icon
              icon="LockIcon"
              size="18"
            />
            <span class="align-middle ml-50">Verificator Project Permission</span>
          </b-card-title>
        </b-card-header>
        <b-form-checkbox
          v-model="selectAllTenantTask"
        >
          Select All Tenant
        </b-form-checkbox>
        <b-table
          striped
          responsive
          class="mb-0"
          :items="tenantTaskData"
          :fields="tenantFields"
        >
          <template #cell(filename)="doc">
            {{ doc.value }}
          </template>
          <template #cell(selected_process_instance)="row">
            <b-form-checkbox
              v-model="row.item.assigned"
            />
          </template>
        </b-table>
        <div class="d-flex mt-2">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mr-2"
            @click="assignProject"
          >
            Assign Project
          </b-button>
        </div>
      </b-card>
    </div>
  </component>
</template>

<script>
import {
  BTab,
  BTabs,
  BCard,
  BCardHeader,
  BCardTitle,
  BTable,
  BAlert,
  BLink,
  BFormInput,
  BFormCheckbox,
  BButton,
  BCol,
  BFormGroup,
  BRow,
  BForm,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref, onUnmounted } from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import Ripple from 'vue-ripple-directive'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { required } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import vSelect from 'vue-select'
import masterUserStoreModule from './masterUserStoreModule'

export default {
  components: {
    BTab,
    BTabs,
    BCard,
    BCardHeader,
    BCardTitle,
    BTable,
    BAlert,
    BLink,
    BFormInput,
    BFormCheckbox,
    BButton,
    BCol,
    BFormGroup,
    BRow,
    BForm,
    ValidationProvider,
    ValidationObserver,
    required,
    vSelect,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      tenantFields: [
        { key: 'selected_process_instance', label: 'Assign' },
        { key: 'name', label: 'Task Name' },
        { key: 'certification_type', label: 'Certification Type' },
        { key: 'tenant_name', label: 'Tenant' },
        { key: 'building_name', label: 'Building Name' },
        { key: 'building_type_name', label: 'Building Type' },
      ],
    }
  },
  computed: {
    isVerificator() {
      return this.userData.group_id === 'verificator'
    },
    selectAllTenantTask: {
      /* eslint-disable object-shorthand */
      get() {
        const assignedTenantTaskData = this.tenantTaskData.filter(tenantTask => tenantTask.assigned === true)
        return this.tenantTaskData ? assignedTenantTaskData.length === this.tenantTaskData.length : false
      },
      set(value) {
        if (value) {
          this.tenantTaskData.forEach(taskData => { taskData.assigned = value }) // eslint-disable-line no-param-reassign
        }
      },
      /* eslint-enable object-shorthand */
    },
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
    const tenantTaskData = ref(JSON.parse('[]'))
    const groupOptions = ref(JSON.parse('[]'))
    const tenantOptions = ref(JSON.parse('[]'))

    const resetuserData = () => {
      userData.value = JSON.parse(JSON.stringify(blankUserData))
    }
    const USER_APP_STORE_MODULE_NAME = 'app-user-admin'

    const onSubmit = () => {
      userData.value.firstName = userData.value.first_name
      userData.value.lastName = userData.value.last_name
      userData.value.tenantOwner = userData.value.tenant_owner
      userData.value.groupId = userData.value.group_id
      userData.value.tenantId = userData.value.tenant_id
      userData.value.tenant = null
      userData.value.group = null

      store.dispatch('app-user-admin/editUser', { userId: router.currentRoute.params.userId, userData: userData.value })
        .then(() => {
          router.push({ name: 'admin-user-list' })
        })
    }

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, masterUserStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-user-admin/fetchUser', { userId: router.currentRoute.params.userId })
      .then(response => { userData.value = response.data })
      .catch(error => {
        if (error.response.status === 404) {
          userData.value = undefined
        }
      })

    store.dispatch('app-user-admin/fetchGroups')
      .then(response => { groupOptions.value = response.data })
      .catch(error => {
        if (error.response.status === 404) {
          groupOptions.value = undefined
        }
      })

    store.dispatch('app-user-admin/fetchTenants')
      .then(response => { tenantOptions.value = response.data })
      .catch(error => {
        if (error.response.status === 404) {
          tenantOptions.value = undefined
        }
      })

    store.dispatch('app-user-admin/fetchTasksById', { userId: router.currentRoute.params.userId })
      .then(response => { tenantTaskData.value = response.data })
      .catch(error => {
        if (error.response.status === 404) {
          tenantTaskData.value = undefined
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
      tenantTaskData,
      onSubmit,
      resetuserData,
      refFormObserver,
      getValidationState,
      resetForm,
      groupOptions,
      tenantOptions,
    }
  },
  methods: {
    showToast(variant, titleToast, description) {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: titleToast,
          icon: 'BellIcon',
          text: description,
          variant,
        },
      })
    },
    cancel() {
      router.push({ name: 'admin-user-list' })
    },
    assignProject() {
      const processInstanceIds = this.tenantTaskData.filter(tenantTask => tenantTask.assigned === true).map(tenantTask => tenantTask.process_instance_id)
      const request = new URLSearchParams()
      request.append('project_ids', processInstanceIds.join(','))

      const config = {
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
      this.$http.patch(`/engine-rest/user/project_verificators/${router.currentRoute.params.userId}`, request, config).then(() => {
        this.isLoading = false
        this.showToast('success', 'Saved', 'Assign project successfully saved')
        router.go()
      }).catch(() => {
        this.showToast('danger', 'Cannot Save', 'There is error when assign project, contact administrator')
      })
    },
  },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
</style>
