<template>
  <div>
    <!-- Media -->
    <b-media class="mb-2">
      <b-modal
        id="modal-success"
        v-model.lazy="successShow"
        ok-only
        ok-variant="success"
        ok-title="Accept"
        modal-class="modal-success"
        centered
        title="Success Modal"
        hide-header-close
        @ok="reloadPage"
      >
        <b-card-text>
          <h5>Data success to submit</h5>
          <p v-html="resultId" />
        </b-card-text>
      </b-modal>
      <template #aside>
        <b-avatar
          :src="avatarUrl"
          :text="avatarText(userData.fullName)"
          size="90px"
          rounded
        />
      </template>
      <h4 class="mb-1">
        {{ userData.fullName }}
      </h4>
      <div class="d-flex flex-wrap">
        <validation-observer ref="avatarRules">
          <b-form @submit.prevent>
            <validation-provider
              #default="{ errors }"
              name="Avatar"
              rules="required"
            >
              <b-form-file
                v-model="avatar"
                class="mt-1"
                accept="image/*"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
            <b-button
              variant="primary"
              type="submit"
              @click="updateAvatar"
            >
              <span class="d-none d-sm-inline">Update Avatar</span>
              <feather-icon
                icon="EditIcon"
                class="d-inline d-sm-none"
              />
            </b-button>
          </b-form>
        </validation-observer>
      </div>
    </b-media>

    <!-- User Info: Input Fields -->
    <validation-observer
      ref="userRules"
      #default="{ handleSubmit }"
    >
      <b-form
        @submit.prevent="handleSubmit(onSubmit)"
        @reset.prevent="resetForm"
      >
        <b-row>

          <!-- Field: Username -->
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Username"
              label-for="username"
            >
              <b-form-input
                id="id"
                v-model="userData.username"
                :disabled="disabled"
              />
            </b-form-group>
          </b-col>

          <!-- Field: First Name -->
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

          <!-- Field: Last Name -->
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

          <!-- Field: Email -->
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

          <!-- Field: Role -->
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="User Role"
              label-for="user-role"
            >
              <v-select
                v-model="userData.group.id"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="roleOptions"
                :reduce="val => val.value"
                :clearable="false"
                :disabled="disabled"
                input-id="user-role"
              />
            </b-form-group>
          </b-col>

          <!-- Field: Company -->
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Company"
              label-for="company"
            >
              <b-form-input
                id="company"
                v-model="userData.tenant.name"
                :disabled="disabled"
              />
            </b-form-group>
          </b-col>

          <!-- Field: Active -->
          <b-col
            cols="12"
            md="4"
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
                :disabled="disabled"
              >
                Active
              </b-form-checkbox>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>

    <!-- Action Buttons -->
    <b-button
      variant="primary"
      type="submit"
      class="mb-1 mb-sm-0 mr-0 mr-sm-1"
      @click="updateUser"
    >
      Save Changes
    </b-button>
    <b-button
      variant="outline-secondary"
      type="reset"
      @click="resetUser"
    >
      Reset
    </b-button>
  </div>
</template>

<script>
import {
  BButton, BCardText, BMedia, BAvatar, BRow, BCol, BFormGroup, BFormInput, BFormFile, BFormInvalidFeedback, BFormCheckbox, BForm,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import {
  required, email,
} from '@validations'
import {
  ref, onUnmounted,
} from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import { avatarText } from '@core/utils/filter'
import vSelect from 'vue-select'
import userStoreModule from './userStoreModule'

export default {
  components: {
    BButton,
    BCardText,
    BMedia,
    BAvatar,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormFile,
    BFormInvalidFeedback,
    BFormCheckbox,
    BForm,
    ValidationObserver,
    ValidationProvider,
    vSelect,
  },
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      disabled: true,
      avatar: null,
      successShow: false,
      result: {},
      resultId: null,
      isLoading: false,
      required,
      email,
    }
  },
  methods: {
    resetAvatar() {
      this.avatar = null
    },
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
    updateAvatar() {
      this.$refs.avatarRules.validate().then(success => {
        if (success) {
          this.isLoading = true
          const request = new FormData()
          request.append('avatar', this.avatar)

          const config = {
            header: {
              'Content-Type': 'multipart/form-data',
            },
          }
          this.$http.post('/engine-rest/user/profile/avatar', request, config).then(res => {
            this.result = JSON.parse(JSON.stringify(res.data))
            this.successShow = true
            this.isLoading = false
          }).catch(error => {
            this.isLoading = false
            console.error(error)
            this.showToast('danger', 'Cannot Save Avatar', 'There is error when submit data, contact administrator')
          })
        } else {
          this.showToast('danger', 'Cannot Save Avatar', 'There is any empty data')
        }
      })
    },
    updateUser() {
      this.$refs.userRules.validate().then(success => {
        if (success) {
          this.isLoading = true

          this.userData.firstName = this.userData.first_name
          this.userData.lastName = this.userData.last_name

          this.$http.post('/engine-rest/user/profile', this.userData).then(res => {
            this.result = JSON.parse(JSON.stringify(res.data))
            this.successShow = true
            this.isLoading = false
          }).catch(error => {
            this.isLoading = false
            console.error(error)
            this.showToast('danger', 'Cannot Save User', 'There is error when submit data, contact administrator')
          })
        } else {
          this.showToast('danger', 'Cannot Save User', 'There is any empty data')
        }
      })
    },
    resetUser() {
      this.userData.first_name = ''
      this.userData.last_name = ''
      this.userData.email = ''
    },
    reloadPage() {
      router.go()
    },
  },
  setup() {
    const roleOptions = [
      { label: 'User', value: 'user' },
      { label: 'Admin', value: 'admin' },
      { label: 'Verificator', value: 'verificator' },
    ]

    const statusOptions = [
      { label: 'Pending', value: 'pending' },
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ]

    const avatarUrl = ref(null)

    const USER_APP_STORE_MODULE_NAME = 'app-user'

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, userStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-user/fetchUserAvatar')
      .then(response => { avatarUrl.value = response.data.url })
      .catch(error => {
        if (error.response.status === 404) {
          avatarUrl.value = undefined
        }
      })

    return {
      avatarText,
      roleOptions,
      statusOptions,
      avatarUrl,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
