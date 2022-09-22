<template>
  <div>
    <user-list-add-new
      :is-add-new-user-sidebar-active.sync="isAddNewUserSidebarActive"
      @refetch-data="refetchData"
    />

    <!-- Invitation Link -->
    <b-button
      variant="primary"
      @click="copyUrl"
    >
      Copy Invitation
    </b-button>

    <!-- Spacer -->
    <hr class="project-spacing">

    <!-- input search -->
    <div class="d-flex align-items-center justify-content-end">
      <b-form-input
        v-model="searchTerm"
        class="d-inline-block mr-1"
        placeholder="Search..."
      />
      <b-button
        variant="primary"
        @click="isAddNewUserSidebarActive = true"
      >
        <span class="text-nowrap">Add User</span>
      </b-button>
    </div>
    <!-- table -->
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :rtl="direction"
      :theme="skinLayout"
      :search-options="{
        enabled: true,
        externalQuery: searchTerm }"
      :pagination-options="{
        enabled: true,
        perPage:pageLength
      }"
    >
      <template
        slot="table-row"
        slot-scope="props"
      >

        <!-- Column: Name -->
        <div
          v-if="props.column.field === 'email'"
          class="text-nowrap"
        >
          <span class="text-nowrap">{{ props.row.email }}</span>
        </div>

        <!-- Column: Action -->
        <span v-else-if="props.column.field === 'action'">
          <span>
            <b-dropdown
              variant="link"
              toggle-class="text-decoration-none"
              no-caret
            >
              <template v-slot:button-content>
                <feather-icon
                  :id="`master-row-${props.row.id}-user-icon-edit`"
                  icon="EditIcon"
                  size="16"
                  class="mx-1"
                  @click="$router.push({ name: 'client-user-edit', params: { userId: props.row.id }})"
                />
                <b-tooltip
                  title="User Update"
                  :target="`master-row-${props.row.id}-user-icon-edit`"
                />

                <feather-icon
                  :id="`master-row-${props.row.id}-user-icon-delete`"
                  icon="DeleteIcon"
                  size="16"
                  class="mx-1"
                  @click="deleteUser(props.row.id)"
                />
                <b-tooltip
                  title="User Delete"
                  :target="`master-row-${props.row.id}-user-icon-delete`"
                />
              </template>
            </b-dropdown>
          </span>
        </span>

        <!-- Column: Common -->
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>

      <!-- pagination -->
      <template
        slot="pagination-bottom"
        slot-scope="props"
      >
        <div class="d-flex justify-content-between flex-wrap">
          <div class="d-flex align-items-center mb-0 mt-1">
            <span class="text-nowrap">
              Showing 1 to
            </span>
            <b-form-select
              v-model="pageLength"
              :options="['10','20','50']"
              class="mx-1"
              @input="(value)=>props.perPageChanged({currentPerPage:value})"
            />
            <span class="text-nowrap "> of {{ props.total }} entries </span>
          </div>
          <div>
            <b-pagination
              :value="1"
              :total-rows="props.total"
              :per-page="pageLength"
              first-number
              last-number
              align="right"
              prev-class="prev-item"
              next-class="next-item"
              class="mt-1 mb-0"
              @input="(value)=>props.pageChanged({currentPage:value})"
            >
              <template #prev-text>
                <feather-icon
                  icon="ChevronLeftIcon"
                  size="18"
                />
              </template>
              <template #next-text>
                <feather-icon
                  icon="ChevronRightIcon"
                  size="18"
                />
              </template>
            </b-pagination>
          </div>
        </div>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
import {
  BPagination, BFormInput, BFormSelect, BDropdown, BButton, BTooltip,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import { ref, onUnmounted } from '@vue/composition-api'
import store from '@/store/index'
import router from '@/router'
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'vue-good-table/dist/vue-good-table.css'
import { useToast } from 'vue-toastification/composition'
import useUsersList from './useUsersList'
import masterUserStoreModule from './masterUserStoreModule'
import UserListAddNew from './UserListAddNew.vue'

Vue.use(VueSweetalert2)

export default {
  components: {
    VueGoodTable,
    BPagination,
    BDropdown,
    BFormInput,
    BFormSelect,
    BButton,
    BTooltip,
    UserListAddNew,
  },
  setup() {
    const USER_APP_STORE_MODULE_NAME = 'app-user-tenant'
    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, masterUserStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })

    const isAddNewUserSidebarActive = ref(false)
    const toast = useToast()
    const isLoading = ref(null)

    const deleteUser = userId => {
      Vue.swal({
        title: 'Are you sure?',
        text: 'Delete this user',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        customClass: {
          confirmButton: 'btn btn-danger',
          cancelButton: 'btn btn-outline-primary ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          isLoading.value = true

          store.dispatch('app-user-tenant/deleteUser', {
            userId,
          })
            .then(() => {
              isLoading.value = false
              toast({
                component: ToastificationContent,
                props: {
                  title: 'Success',
                  icon: 'InfoIcon',
                  text: 'Successfully delete user',
                  variant: 'success',
                },
              })
              router.go()
            })
            .catch(error => {
              isLoading.value = false
              toast({
                component: ToastificationContent,
                props: {
                  title: 'Cannot delete',
                  icon: 'AlertTriangleIcon',
                  text: error.response.data.message,
                  variant: 'danger',
                },
              })
            })
        }
      })
    }

    const {
      refetchData,
      refUserListTable,
    } = useUsersList()
    return {
      // Sidebar
      isAddNewUserSidebarActive,
      refUserListTable,
      refetchData,
      deleteUser,
      isLoading,
    }
  },
  data() {
    return {
      pageLength: 20,
      dir: false,
      searchTerm: '',
      rows: [],
      user: null,
      invitationLink: '',
      columns: [
        {
          label: 'First Name',
          field: 'first_name',
          filterOptions: {
            enabled: true,
            placeholder: 'Search First Name',
          },
        },
        {
          label: 'Last Name',
          field: 'last_name',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Last Name',
          },
        },
        {
          label: 'Email',
          field: 'email',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Email',
          },
        },
        {
          label: 'Owner',
          field: 'tenant_owner',
        },
        {
          label: 'Action',
          field: 'action',
        },
      ],
      options: {
        propertiesPanel: {},
        additionalModules: [],
        moddleExtensions: [],
      },
    }
  },
  computed: {
    skinLayout() {
      console.log(store.state.appConfig.layout.skin)
      const statusColor = {
        /* eslint-disable key-spacing */
        light: 'default',
        dark: 'nocturnal',
        /* eslint-enable key-spacing */
      }
      return statusColor[store.state.appConfig.layout.skin]
    },
    direction() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = true
        return this.dir
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = false
      return this.dir
    },
  },
  created() {
    this.retrieveUsers()
    this.retrieveUser()
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
    retrieveUsers() {
      this.$http.get('engine-rest/user/members')
        .then(res => { this.rows = res.data })
    },
    retrieveUser() {
      this.$http.get('engine-rest/user/profile')
        .then(res => {
          this.user = res.data
          this.invitationLink = `${window.location.origin}/invitation/${res.data.tenant.id}`
        })
    },
    async copyUrl() {
      try {
        await navigator.clipboard.writeText(this.invitationLink)
        this.showToast('success', 'Copied', 'Invitation Link copied')
      } catch (err) {
        this.showToast('danger', 'Cannot Copy', 'There is error copied link')
      }
    },
    /* eslint-disable object-shorthand */
    handleError(err) {
      console.error('failed to show diagram', err)
    },
    /* eslint-enable object-shorthand */
  },
}
</script>
