<template>
  <div>
    <template-list-add-new
      :is-add-new-template-sidebar-active.sync="isAddNewTemplateSidebarActive"
      :project-type-options="projectTypeOptions"
      @refetch-data="refetchData"
    />
    <building-document-list-add-new
      :is-add-new-building-document-sidebar-active.sync="isAddNewBuildingDocumentSidebarActive"
      @refetch-data="refetchData"
    />
    <generate-document-list-add-new
      :is-add-new-generate-document-sidebar-active.sync="isAddNewGenerateDocumentSidebarActive"
      @refetch-data="refetchData"
    />
    <activity-name-list-add-new
      :is-add-new-activity-name-sidebar-active.sync="isAddNewActivityNameSidebarActive"
      @refetch-data="refetchData"
    />

    <!-- card 3 -->
    <b-col
      md="6"
      lg="4"
    >
      <b-card
        header=""
        :title="vendor.vendor_name"
        :footer="vendor.description"
        class="text-center"
        footer-class="text-muted"
      >
        <b-card-text>
          {{ vendor.vendor_code }}
        </b-card-text>
        <b-card-text>
          {{ vendor.created_by }}
        </b-card-text>
        <b-card-text>
          {{ vendor.created_at }}
        </b-card-text>
      </b-card>
    </b-col>

    <b-button
      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
      v-b-tooltip.hover.v-dark
      :title="certification.certification_name"
      variant="outline-dark"
    >
      {{ certification.certification_name }}
    </b-button>

    <!-- input search -->
    <div class="custom-search d-flex justify-content-end">
      <b-form-group>
        <!-- Search -->
        <b-col
          cols="18"
          md="18"
        >
          <div class="d-flex align-items-center justify-content-end">
            <b-form-input
              v-model="searchTerm"
              class="d-inline-block mr-1"
              placeholder="Search..."
            />
            <b-button
              variant="primary"
              @click="isAddNewTemplateSidebarActive = true"
            >
              <span class="text-nowrap">Add Template</span>
            </b-button>
          </div>
        </b-col>
      </b-form-group>
    </div>
    <!-- table -->
    <vue-good-table
      :ref="refTemplateListTable"
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
        <!-- Column: Project Type -->
        <div
          v-if="props.column.field === 'project_type'"
          class="text-nowrap"
        >
          <b-badge :variant="resolveProjectTypeVariant(props.row.project_type)">
            {{ resolveProjectTypeTranslation(props.row.project_type) }}
          </b-badge>
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
                  :id="`project-row-${props.row.id}-template-icon`"
                  icon="EyeIcon"
                  size="16"
                  class="mx-1"
                  @click="$router.push({ name: 'admin-evaluation-list', params: { vendorId: $router.currentRoute.params.vendorId, templateId: props.row.id }})"
                />
                <b-tooltip
                  title="Template Detail"
                  :target="`project-row-${props.row.id}-template-icon`"
                />

                <feather-icon
                  :id="`project-row-${props.row.id}-template-icon-edit`"
                  icon="EditIcon"
                  size="16"
                  class="mx-1"
                  @click="$router.push({ name: 'admin-template-edit', params: { vendorId: $router.currentRoute.params.vendorId, templateId: props.row.id }})"
                />
                <b-tooltip
                  title="Template Update"
                  :target="`project-row-${props.row.id}-template-icon-edit`"
                />

                <feather-icon
                  :id="`project-row-${props.row.id}-template-icon-delete`"
                  icon="TrashIcon"
                  size="16"
                  class="mx-1"
                  @click="deleteTemplate(props.row.id)"
                />
                <b-tooltip
                  title="Delete Template"
                  :target="`project-row-${props.row.id}-template-icon-delete`"
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

    <!-- Building Document -->
    <b-card-body>
      <b-card-title>Building Document</b-card-title>
      <b-card-sub-title>Field for setup building document</b-card-sub-title>
    </b-card-body>
    <!-- input search -->
    <div class="custom-search d-flex justify-content-end">
      <b-form-group>
        <!-- Search -->
        <b-col
          cols="18"
          md="18"
        >
          <div class="d-flex align-items-center justify-content-end">
            <b-form-input
              v-model="searchTerm"
              class="d-inline-block mr-1"
              placeholder="Search..."
            />
            <b-button
              variant="primary"
              @click="isAddNewBuildingDocumentSidebarActive = true"
            >
              <span class="text-nowrap">Add Building Document</span>
            </b-button>
          </div>
        </b-col>
      </b-form-group>
    </div>
    <!-- table -->
    <vue-good-table
      :ref="refBuildingDocumentListTable"
      :columns="buildingDocumentColumns"
      :rows="buildingDocumentRows"
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
        <!-- Column: Project Type -->
        <div
          v-if="props.column.field === 'project_type'"
          class="text-nowrap"
        >
          <b-badge :variant="resolveProjectTypeVariant(props.row.project_type)">
            {{ resolveProjectTypeTranslation(props.row.project_type) }}
          </b-badge>
        </div>

        <!-- Column: Category -->
        <div
          v-if="props.column.field === 'category'"
          class="text-nowrap"
        >
          <span class="text-nowrap">{{ props.row.category.name }}</span>
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
                  :id="`project-row-${props.row.id}-building-document-icon-edit`"
                  icon="EditIcon"
                  size="16"
                  class="mx-1"
                  @click="$router.push({ name: 'admin-building-document-edit', params: { buildingDocumentId: props.row.id }})"
                />
                <b-tooltip
                  title="Building Document Update"
                  :target="`project-row-${props.row.id}-building-document-icon-edit`"
                />

                <feather-icon
                  :id="`project-row-${props.row.id}-building-document-icon-delete`"
                  icon="TrashIcon"
                  size="16"
                  class="mx-1"
                  @click="deleteBuildingDocument(props.row.id)"
                />
                <b-tooltip
                  title="Delete Building Document"
                  :target="`project-row-${props.row.id}-building-document-icon-delete`"
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

    <!-- Generate Document -->
    <b-card-body>
      <b-card-title>Generate Document</b-card-title>
      <b-card-sub-title>Field for setup generate document</b-card-sub-title>
    </b-card-body>
    <!-- input search -->
    <div class="custom-search d-flex justify-content-end">
      <b-form-group>
        <!-- Search -->
        <b-col
          cols="18"
          md="18"
        >
          <div class="d-flex align-items-center justify-content-end">
            <b-form-input
              v-model="searchTerm"
              class="d-inline-block mr-1"
              placeholder="Search..."
            />
            <b-button
              variant="primary"
              @click="isAddNewGenerateDocumentSidebarActive = true"
            >
              <span class="text-nowrap">Add Generate Document</span>
            </b-button>
          </div>
        </b-col>
      </b-form-group>
    </div>
    <!-- table -->
    <vue-good-table
      :ref="refGenerateDocumentListTable"
      :columns="generateDocumentColumns"
      :rows="generateDocumentRows"
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
        <!-- Column: Project Type -->
        <div
          v-if="props.column.field === 'project_type'"
          class="text-nowrap"
        >
          <b-badge :variant="resolveProjectTypeVariant(props.row.project_type)">
            {{ resolveProjectTypeTranslation(props.row.project_type) }}
          </b-badge>
        </div>

        <!-- Column: Category -->
        <div
          v-if="props.column.field === 'category'"
          class="text-nowrap"
        >
          <span class="text-nowrap">{{ props.row.category.name }}</span>
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
                  :id="`project-row-${props.row.id}-generate-document-icon-edit`"
                  icon="EditIcon"
                  size="16"
                  class="mx-1"
                  @click="$router.push({ name: 'admin-generate-document-edit', params: { generateDocumentId: props.row.id }})"
                />
                <b-tooltip
                  title="Generate Document Update"
                  :target="`project-row-${props.row.id}-generate-document-icon-edit`"
                />

                <feather-icon
                  :id="`project-row-${props.row.id}-generate-document-icon-delete`"
                  icon="TrashIcon"
                  size="16"
                  class="mx-1"
                  @click="deleteGenerateDocument(props.row.id)"
                />
                <b-tooltip
                  title="Delete Generate Document"
                  :target="`project-row-${props.row.id}-generate-document-icon-delete`"
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

    <!-- Activity Name -->
    <b-card-body>
      <b-card-title>Activity Name</b-card-title>
      <b-card-sub-title>Field for setup activity name</b-card-sub-title>
    </b-card-body>
    <!-- input search -->
    <div class="custom-search d-flex justify-content-end">
      <b-form-group>
        <!-- Search -->
        <b-col
          cols="18"
          md="18"
        >
          <div class="d-flex align-items-center justify-content-end">
            <b-form-input
              v-model="searchTerm"
              class="d-inline-block mr-1"
              placeholder="Search..."
            />
            <b-button
              variant="primary"
              @click="isAddNewActivityNameSidebarActive = true"
            >
              <span class="text-nowrap">Add Activity Name</span>
            </b-button>
          </div>
        </b-col>
      </b-form-group>
    </div>
    <!-- table -->
    <vue-good-table
      :ref="refActivityNameListTable"
      :columns="activityNameColumns"
      :rows="activityNameRows"
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
        <!-- Column: Project Type -->
        <div
          v-if="props.column.field === 'project_type'"
          class="text-nowrap"
        >
          <b-badge :variant="resolveProjectTypeVariant(props.row.project_type)">
            {{ resolveProjectTypeTranslation(props.row.project_type) }}
          </b-badge>
        </div>

        <!-- Column: Category -->
        <div
          v-if="props.column.field === 'category'"
          class="text-nowrap"
        >
          <span class="text-nowrap">{{ props.row.category.name }}</span>
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
                  :id="`project-row-${props.row.id}-activity-name-icon-edit`"
                  icon="EditIcon"
                  size="16"
                  class="mx-1"
                  @click="$router.push({ name: 'admin-activity-name-edit', params: { activityNameId: props.row.id }})"
                />
                <b-tooltip
                  title="Activity Name Update"
                  :target="`project-row-${props.row.id}-activity-name-icon-edit`"
                />

                <feather-icon
                  :id="`project-row-${props.row.id}-activity-name-icon-delete`"
                  icon="TrashIcon"
                  size="16"
                  class="mx-1"
                  @click="deleteActivityName(props.row.id)"
                />
                <b-tooltip
                  title="Delete Generate Document"
                  :target="`project-row-${props.row.id}-activity-name-icon-delete`"
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
  BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BButton, BCol, BCard, BCardText, BBadge, BTooltip, VBTooltip, BCardBody, BCardTitle, BCardSubTitle,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'
import { ref, onUnmounted } from '@vue/composition-api'
import 'vue-good-table/dist/vue-good-table.css'
import router from '@/router'
import Ripple from 'vue-ripple-directive'
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import useTemplatesList from './useTemplatesList'
import masterStoreModule from './masterStoreModule'
import TemplateListAddNew from './TemplateListAddNew.vue'
import BuildingDocumentListAddNew from './BuildingDocumentListAddNew.vue'
import GenerateDocumentListAddNew from './GenerateDocumentListAddNew.vue'
import ActivityNameListAddNew from './ActivityNameListAddNew.vue'

Vue.use(VueSweetalert2)

export default {
  components: {
    VueGoodTable,
    BDropdown,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BButton,
    BCol,
    BCard,
    BCardBody,
    BCardTitle,
    BCardSubTitle,
    BCardText,
    BBadge,
    BTooltip,
    TemplateListAddNew,
    BuildingDocumentListAddNew,
    GenerateDocumentListAddNew,
    ActivityNameListAddNew,
  },
  setup() {
    const TEMPLATE_APP_STORE_MODULE_NAME = 'app-template'

    // Register module
    if (!store.hasModule(TEMPLATE_APP_STORE_MODULE_NAME)) store.registerModule(TEMPLATE_APP_STORE_MODULE_NAME, masterStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(TEMPLATE_APP_STORE_MODULE_NAME)) store.unregisterModule(TEMPLATE_APP_STORE_MODULE_NAME)
    })

    const isAddNewTemplateSidebarActive = ref(false)
    const isAddNewBuildingDocumentSidebarActive = ref(false)
    const isAddNewGenerateDocumentSidebarActive = ref(false)
    const isAddNewActivityNameSidebarActive = ref(false)
    const toast = useToast()
    const isLoading = ref(null)

    const deleteTemplate = templateId => {
      Vue.swal({
        title: 'Are you sure?',
        text: 'Delete this template',
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

          store.dispatch('app-template/deleteTemplate', {
            templateId,
          })
            .then(() => {
              isLoading.value = false
              toast({
                component: ToastificationContent,
                props: {
                  title: 'Success',
                  icon: 'InfoIcon',
                  text: 'Successfully delete template',
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

    const deleteBuildingDocument = buildingDocumentId => {
      Vue.swal({
        title: 'Are you sure?',
        text: 'Delete this building document',
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

          store.dispatch('app-template/deleteBuildingDocument', {
            buildingDocumentId,
          })
            .then(() => {
              isLoading.value = false
              toast({
                component: ToastificationContent,
                props: {
                  title: 'Success',
                  icon: 'InfoIcon',
                  text: 'Successfully delete building document',
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

    const deleteGenerateDocument = generateDocumentId => {
      Vue.swal({
        title: 'Are you sure?',
        text: 'Delete this generate document',
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

          store.dispatch('app-template/deleteGenerateDocument', {
            generateDocumentId,
          })
            .then(() => {
              isLoading.value = false
              toast({
                component: ToastificationContent,
                props: {
                  title: 'Success',
                  icon: 'InfoIcon',
                  text: 'Successfully delete generate document',
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

    const deleteActivityName = activityNameId => {
      Vue.swal({
        title: 'Are you sure?',
        text: 'Delete this activity document',
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

          store.dispatch('app-template/deleteActivityName', {
            activityNameId,
          })
            .then(() => {
              isLoading.value = false
              toast({
                component: ToastificationContent,
                props: {
                  title: 'Success',
                  icon: 'InfoIcon',
                  text: 'Successfully delete activity document',
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

    const projectTypeOptions = [
      { label: 'Design Recognition', value: 'design_recognition' },
      { label: 'Final Assessment', value: 'final_assessment' },
    ]

    const {
      resolveProjectTypeIcon,
      resolveProjectTypeVariant,
      resolveProjectTypeTranslation,
      refetchData,
      refTemplateListTable,
      refBuildingDocumentListTable,
      refGenerateDocumentListTable,
      refActivityNameListTable,
    } = useTemplatesList()
    return {
      // Sidebar
      projectTypeOptions,
      isAddNewTemplateSidebarActive,
      isAddNewBuildingDocumentSidebarActive,
      isAddNewGenerateDocumentSidebarActive,
      isAddNewActivityNameSidebarActive,
      refTemplateListTable,
      refBuildingDocumentListTable,
      refGenerateDocumentListTable,
      refActivityNameListTable,
      resolveProjectTypeIcon,
      resolveProjectTypeVariant,
      resolveProjectTypeTranslation,
      refetchData,
      deleteTemplate,
      deleteBuildingDocument,
      deleteGenerateDocument,
      deleteActivityName,
      isLoading,
    }
  },
  directives: {
    'b-tooltip': VBTooltip,
    Ripple,
  },
  data() {
    return {
      vendor: {},
      certification: {},
      pageLength: 20,
      dir: false,
      searchTerm: '',
      columns: [
        {
          label: 'Project Type',
          field: 'project_type',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Template',
          },
        },
        {
          label: 'Project Version',
          field: 'project_version',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Template',
          },
        },
        {
          label: 'Active',
          field: 'active',
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
      buildingDocumentColumns: [
        {
          label: 'Building Document Name',
          field: 'name',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Building Document',
          },
        },
        {
          label: 'Category',
          field: 'category',
        },
        {
          label: 'Mandatory',
          field: 'mandatory',
        },
        {
          label: 'Active',
          field: 'active',
        },
        {
          label: 'Action',
          field: 'action',
        },
      ],
      generateDocumentColumns: [
        {
          label: 'Code',
          field: 'code',
        },
        {
          label: 'Generate Document Name',
          field: 'name',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Generate Document',
          },
        },
        {
          label: 'Category',
          field: 'category',
        },
        {
          label: 'Active',
          field: 'active',
        },
        {
          label: 'Action',
          field: 'action',
        },
      ],
      activityNameColumns: [
        {
          label: 'Activity ID',
          field: 'activity_id',
        },
        {
          label: 'Activity Name',
          field: 'name',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Activity Name',
          },
        },
        {
          label: 'Active',
          field: 'active',
        },
        {
          label: 'Action',
          field: 'action',
        },
      ],
      buildingDocumentRows: [],
      generateDocumentRows: [],
      activityNameRows: [],
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
    this.retrieveVendor()
    this.retrieveCertification()
    this.retrieveTemplates()
    this.retrieveBuildingDocument()
    this.retrieveGenerateDocument()
    this.retrieveActivityName()
  },
  methods: {
    retrieveVendor() {
      this.$http.get(`engine-rest/master-project/vendors/${router.currentRoute.params.vendorId}`, { })
        .then(res => { this.vendor = res.data })
        .catch(() => {
          useToast({
            component: ToastificationContent,
            props: {
              title: 'Error fetching vendor',
              icon: 'AlertTriangleIcon',
              variant: 'danger',
            },
          })
        })
    },
    retrieveCertification() {
      this.$http.get(`engine-rest/master-project/certification_types/${router.currentRoute.params.certificationTypeId}`, { })
        .then(res => { this.certification = res.data })
        .catch(() => {
          useToast({
            component: ToastificationContent,
            props: {
              title: 'Error fetching certification',
              icon: 'AlertTriangleIcon',
              variant: 'danger',
            },
          })
        })
    },
    retrieveTemplates() {
      this.$http.get(`engine-rest/master-project/certification_types/${router.currentRoute.params.certificationTypeId}/templates`)
        .then(res => { this.rows = res.data })
    },
    retrieveBuildingDocument() {
      this.$http.get(`engine-rest/new-building/project/document_buildings/${router.currentRoute.params.certificationTypeId}/master_certification_type`)
        .then(res => { this.buildingDocumentRows = res.data })
    },
    retrieveGenerateDocument() {
      this.$http.get(`engine-rest/new-building/project/document_generates/${router.currentRoute.params.certificationTypeId}/master_certification_type`)
        .then(res => { this.generateDocumentRows = res.data })
    },
    retrieveActivityName() {
      this.$http.get(`engine-rest/master-project/activity_names/${router.currentRoute.params.certificationTypeId}/master_certification_type`)
        .then(res => { this.activityNameRows = res.data })
    },
    /* eslint-disable object-shorthand */
    handleError(err) {
      console.error('failed to show diagram', err)
    },
    /* eslint-enable object-shorthand */
  },
}
</script>
