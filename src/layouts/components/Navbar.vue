<template>
  <div class="navbar-container d-flex content align-items-center">
    <b-card
      v-if="expired()"
      class="card card-congratulations"
    >
      <h5
        class="mb-1 mt-50 text-white"
      >Do you want continue login</h5>
      <b-card-text class="font-small-3">
        It will logout automatically in 2 minutes
      </b-card-text>
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="primary"
        @click="refreshToken"
      >
        Continue
      </b-button>
    </b-card>

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link
          class="nav-link"
          @click="toggleVerticalMenuActive"
        >
          <feather-icon
            icon="MenuIcon"
            size="21"
          />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex">
      <dark-Toggler class="d-none d-lg-block" />
    </div>

    <b-navbar-nav class="nav align-items-center ml-auto">
      <b-nav-item-dropdown
        right
        toggle-class="d-flex align-items-center dropdown-user-link"
        class="dropdown-user"
      >
        <template #button-content>
          <div
            v-if="userData"
            class="d-sm-flex d-none user-nav"
          >
            <p class="user-name font-weight-bolder mb-0">
              {{ userData.full_name || userData.username }}
            </p>
            <span class="user-status">{{ userData.group.name }}</span>
            <span
              v-if="userData.tenant"
              class="user-status"
            >
              {{ userData.tenant.name }}
            </span>
          </div>
          <b-avatar
            size="40"
            variant="light-primary"
            badge
            :src="avatarUrl"
            class="badge-minimal"
            badge-variant="success"
          />
        </template>

        <b-dropdown-item
          link-class="d-flex align-items-center"
          @click="profileShow"
        >
          <feather-icon
            size="16"
            icon="UserIcon"
            class="mr-50"
          />
          <span>Profile</span>
        </b-dropdown-item>

        <b-dropdown-divider />

        <b-dropdown-item
          link-class="d-flex align-items-center"
          @click="logout"
        >
          <feather-icon
            size="16"
            icon="LogOutIcon"
            class="mr-50"
          />
          <span>Logout</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </div>
</template>

<script>
import {
  BLink, BNavbarNav, BNavItemDropdown, BDropdownItem, BDropdownDivider, BAvatar, BButton, BCardText, BCard,
} from 'bootstrap-vue'
import DarkToggler from '@core/layouts/components/app-navbar/components/DarkToggler.vue'
import { initialAbility } from '@/libs/acl/config'
import {
  ref, onUnmounted,
} from '@vue/composition-api'
import router from '@/router'
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import store from '@/store'
import Ripple from 'vue-ripple-directive'
import useJwt from '@/auth/jwt/useJwt'
import userStoreModule from './userStoreModule'

export default {
  components: {
    BLink,
    BNavbarNav,
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,
    BButton,
    BCardText,
    BCard,

    // Navbar Components
    DarkToggler,
  },
  directives: {
    Ripple,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      showExpirationToken: false,
    }
  },
  created() {
    this.interval = setInterval(() => { this.showExpirationToken = this.expired() }, 10000)
  },
  setup() {
    const avatarUrl = ref(null)
    const userData = ref(null)
    const toast = useToast()

    const USER_APP_STORE_MODULE_NAME = 'app-user'

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, userStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-user/fetchUser')
      .then(response => {
        userData.value = response.data
        if (userData.value.avatar_url) {
          store.dispatch('app-user/fetchUserAvatar')
            .then(resp => { avatarUrl.value = resp.data.url })
            .catch(error => {
              if (error.response.status === 404) {
                avatarUrl.value = undefined
              }
            })
        }
      })
      .catch(error => {
        if (error.message === 'Network Error') {
          localStorage.removeItem(useJwt.jwtConfig.storageTokenKeyName)
          localStorage.removeItem(useJwt.jwtConfig.storageRefreshTokenKeyName)

          // Remove userData from localStorage
          localStorage.removeItem('userData')

          // Reset ability
          this.$ability.update(initialAbility)

          // Redirect to login page
          this.$router.push({ name: 'auth-login' })
        }
        if (error.response.status === 404) {
          userData.value = undefined
        }
      })

    const refreshToken = () => {
      store.dispatch('app-user/getNewToken', null, { root: true })
        .then(response => {
          toast({
            component: ToastificationContent,
            props: {
              title: 'Success',
              icon: 'InfoIcon',
              text: 'Successfully refresh token',
              variant: 'success',
            },
          })
          useJwt.setToken(response.data.accessToken)
          router.go()
        })
        .catch(error => {
          toast({
            component: ToastificationContent,
            props: {
              title: 'Cannot refresh token',
              icon: 'AlertTriangleIcon',
              text: error.response.data.message,
              variant: 'danger',
            },
          })
        })
    }

    return {
      avatarUrl,
      userData,
      refreshToken,
    }
  },
  methods: {
    logout() {
      // Remove userData from localStorage
      // ? You just removed token from localStorage. If you like, you can also make API call to backend to blacklist used token
      localStorage.removeItem(useJwt.jwtConfig.storageTokenKeyName)
      localStorage.removeItem(useJwt.jwtConfig.storageRefreshTokenKeyName)

      // Remove userData from localStorage
      localStorage.removeItem('userData')

      // Reset ability
      this.$ability.update(initialAbility)

      // Redirect to login page
      this.$router.push({ name: 'auth-login' })
    },
    profileShow() {
      this.$router.push({ name: 'user-edit' })
    },
    parseJwt(token) {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(Buffer.from(base64, 'base64').toString('ascii').split('')
        // eslint-disable-next-line prefer-template
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''))

      return JSON.parse(jsonPayload)
    },
    jwtPayload() {
      const accessToken = useJwt.getToken()
      const payload = this.parseJwt(accessToken)
      return payload
    },
    addHours(numOfHours, date = new Date()) {
      date.setTime(date.getTime() + (numOfHours * 60 * 60 * 1000))

      return date
    },
    addMinutes(numOfMinutes, date = new Date()) {
      date.setTime(date.getTime() + (numOfMinutes * 60 * 1000))

      return date
    },
    expired() {
      if (useJwt.getToken() === null) {
        return true
      }

      const payload = this.jwtPayload()
      const expiredTime = payload.exp
      const limitTime = (this.addMinutes(-2).getTime() / 1000)
      const expired = (limitTime > expiredTime)

      return expired
    },
  },
}
</script>
