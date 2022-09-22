<template>
  <div>
    <building-list-add-new
      :is-add-new-building-sidebar-active.sync="isAddNewBuildingSidebarActive"
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
        @click="isAddNewBuildingSidebarActive = true"
      >
        <span class="text-nowrap">Add Building</span>
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
          v-if="props.column.field === 'name_en'"
          class="text-nowrap"
        >
          <!-- <span class="text-nowrap">{{ props.row.name }}</span> -->
        </div>

        <!-- Column: Name -->
        <div
          v-if="props.column.field === 'name_id'"
          class="text-nowrap"
        >
          <!-- <span class="text-nowrap">{{ props.row.name }}</span> -->
        </div>

        <!-- Column: Action -->
        <span v-if="props.column.field === 'action'">
          <span>
            <b-dropdown
              variant="link"
              toggle-class="text-decoration-none"
              no-caret
            >
              <template v-slot:button-content>
                <feather-icon
                  :id="`master-row-${props.row.id}-building-icon-edit`"
                  icon="EditIcon"
                  size="16"
                  class="mx-1"
                  @click="$router.push({ name: 'admin-building-edit', params: { buildingId: props.row.id }})"
                />
                <b-tooltip
                  title="Building Type Update"
                  :target="`master-row-${props.row.id}-building-icon-edit`"
                />
                <feather-icon
                  :id="`master-row-${props.row.id}-building-icon-delete`"
                  icon="TrashIcon"
                  size="16"
                  class="mx-1"
                  @click="deleteBuilding(props.row.id)"
                />
                <b-tooltip
                  title="Delete Building Type"
                  :target="`master-row-${props.row.id}-building-icon-delete`"
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
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { useToast } from 'vue-toastification/composition'
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'
import 'vue-good-table/dist/vue-good-table.css'
import useBuildingsList from './useBuildingsList'
import masterStoreModule from './masterStoreModule'
import BuildingListAddNew from './BuildingTypeListAddNew.vue'

Vue.use(VueSweetalert2)

export default {
  components: {
    VueGoodTable,
    BDropdown,
    BPagination,
    BFormInput,
    BFormSelect,
    BButton,
    BTooltip,
    BuildingListAddNew,
  },
  setup() {
    const BUILDING_APP_STORE_MODULE_NAME = 'app-building'

    // Register module
    if (!store.hasModule(BUILDING_APP_STORE_MODULE_NAME)) store.registerModule(BUILDING_APP_STORE_MODULE_NAME, masterStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(BUILDING_APP_STORE_MODULE_NAME)) store.unregisterModule(BUILDING_APP_STORE_MODULE_NAME)
    })

    const isLoading = ref(null)
    const toast = useToast()
    const deleteBuilding = buildingId => {
      Vue.swal({
        title: 'Are you sure?',
        text: 'Delete this document building',
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

          store.dispatch('app-building/deleteBuilding', {
            buildingId,
          })
            .then(() => {
              isLoading.value = false
              toast({
                component: ToastificationContent,
                props: {
                  title: 'Success',
                  icon: 'InfoIcon',
                  text: 'Successfully delete building type',
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

    const isAddNewBuildingSidebarActive = ref(false)

    const {
      refetchData,
      refBuildingListTable,
    } = useBuildingsList()
    return {
      // Sidebar
      isAddNewBuildingSidebarActive,
      refBuildingListTable,
      refetchData,
      deleteBuilding,
      isLoading,
    }
  },
  data() {
    return {
      pageLength: 20,
      dir: false,
      searchTerm: '',
      columns: [
        {
          label: 'English Name',
          field: 'name_en',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Building Type',
          },
        },
        {
          label: 'Indonesia Name',
          field: 'name_id',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Building Type',
          },
        },
        {
          label: 'Created At',
          field: 'created_at',
        },
        {
          label: 'Action',
          field: 'action',
        },
      ],
      rows: [],
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
    this.retrieveBuildingTypes()
  },
  methods: {
    retrieveBuildingTypes() {
      this.$http.get('engine-rest/master/building_types')
        .then(res => { this.rows = res.data })
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
    /* eslint-disable object-shorthand */
    handleError(err) {
      console.error('failed to show diagram', err)
    },
    /* eslint-enable object-shorthand */
  },
}
</script>
