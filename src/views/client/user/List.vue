<template>
  <div>
    <user-list-add-new
      :is-add-new-user-sidebar-active.sync="isAddNewUserSidebarActive"
      @refetch-data="refetchData"
    />
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
import 'vue-good-table/dist/vue-good-table.css'
import useUsersList from './useUsersList'
import masterUserStoreModule from './masterUserStoreModule'
import UserListAddNew from './UserListAddNew.vue'

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

    const {
      refetchData,
      refUserListTable,
    } = useUsersList()
    return {
      // Sidebar
      isAddNewUserSidebarActive,
      refUserListTable,
      refetchData,
    }
  },
  data() {
    return {
      pageLength: 20,
      dir: false,
      searchTerm: '',
      rows: [],
      user: null,
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
    retrieveUsers() {
      this.$http.get('engine-rest/user/members')
        .then(res => { this.rows = res.data })
    },
    retrieveUser() {
      this.$http.get('engine-rest/user/profile')
        .then(res => { this.user = res.data })
    },
    /* eslint-disable object-shorthand */
    handleError(err) {
      console.error('failed to show diagram', err)
    },
    /* eslint-enable object-shorthand */
  },
}
</script>
