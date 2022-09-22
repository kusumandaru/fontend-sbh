<template>
  <div>
    <building-category-list-add-new
      :is-add-new-building-category-sidebar-active.sync="isAddNewBuildingCategorySidebarActive"
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
        @click="isAddNewBuildingCategorySidebarActive = true"
      >
        <span class="text-nowrap">Add Building Category</span>
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
          v-if="props.column.field === 'name'"
          class="text-nowrap"
        />

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
                  :id="`master-row-${props.row.id}-building-category-icon-edit`"
                  icon="EditIcon"
                  size="16"
                  class="mx-1"
                  @click="$router.push({ name: 'admin-building-category-edit', params: { categoryId: props.row.id }})"
                />
                <b-tooltip
                  title="Building Category Type Update"
                  :target="`master-row-${props.row.id}-building-category-icon-edit`"
                />
                <feather-icon
                  :id="`master-row-${props.row.id}-building-category-icon-delete`"
                  icon="TrashIcon"
                  size="16"
                  class="mx-1"
                  @click="deleteBuildingCategory(props.row.id)"
                />
                <b-tooltip
                  title="Delete Building Category Type"
                  :target="`master-row-${props.row.id}-building-category-icon-delete`"
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
import useBuildingCategoriesList from './useBuildingCategoriesList'
import masterStoreModule from './masterStoreModule'
import BuildingCategoryListAddNew from './BuildingCategoryListAddNew.vue'

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
    BuildingCategoryListAddNew,
  },
  setup() {
    const BUILDING_APP_STORE_MODULE_NAME = 'app-building-category'

    // Register module
    if (!store.hasModule(BUILDING_APP_STORE_MODULE_NAME)) store.registerModule(BUILDING_APP_STORE_MODULE_NAME, masterStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(BUILDING_APP_STORE_MODULE_NAME)) store.unregisterModule(BUILDING_APP_STORE_MODULE_NAME)
    })

    const isLoading = ref(null)
    const toast = useToast()
    const deleteBuildingCategory = categoryId => {
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

          store.dispatch('app-building-category/deleteBuildingCategory', {
            categoryId,
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

    const isAddNewBuildingCategorySidebarActive = ref(false)

    const {
      refetchData,
      refBuildingCategoryListTable,
    } = useBuildingCategoriesList()
    return {
      // Sidebar
      isAddNewBuildingCategorySidebarActive,
      refBuildingCategoryListTable,
      refetchData,
      deleteBuildingCategory,
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
          label: 'Name',
          field: 'name',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Building Category Name',
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
    this.retrieveBuildingCategoryTypes()
  },
  methods: {
    retrieveBuildingCategoryTypes() {
      this.$http.get('engine-rest/new-building/project/document_building_categories')
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
