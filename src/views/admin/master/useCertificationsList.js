import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'
import { title } from '@core/utils/filter'
import router from '@/router'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useCertificationsList() {
  // Use toast
  const toast = useToast()

  const refCertificationListTable = ref(null)

  // Table Handlers
  const tableColumns = [
    { key: 'user', sortable: true },
    { key: 'email', sortable: true },
    { key: 'role', sortable: true },
    {
      key: 'currentPlan',
      label: 'Plan',
      formatter: title,
      sortable: true,
    },
    { key: 'status', sortable: true },
    { key: 'actions' },
  ]
  const perPage = ref(10)
  const totalCertifications = ref(0)
  const currentPage = ref(1)
  const perPageOptions = [10, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)
  const roleFilter = ref(null)
  const planFilter = ref(null)
  const statusFilter = ref(null)

  const dataMeta = computed(() => {
    const localItemsCount = refCertificationListTable.value ? refCertificationListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalCertifications.value,
    }
  })

  const refetchData = () => {
    /* refCertificationListTable.value.refresh() */
    router.go()
  }

  watch([currentPage, perPage, searchQuery, roleFilter, planFilter, statusFilter], () => {
    refetchData()
  })

  const fetchCertifications = (ctx, callback) => {
    store
      .dispatch('app-certification/fetchCertifications', {
        q: searchQuery.value,
        perPage: perPage.value,
        page: currentPage.value,
        sortBy: sortBy.value,
        sortDesc: isSortDirDesc.value,
        role: roleFilter.value,
        plan: planFilter.value,
        status: statusFilter.value,
      })
      .then(response => {
        const { certifications, total } = response.data

        callback(certifications)
        totalCertifications.value = total
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error fetching certifications list',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
  }

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  const resolveProjectTypeIcon = projectType => {
    if (projectType === 'design_recognition') return 'SettingsIcon'
    if (projectType === 'final_assessment') return 'ServerIcon'
    return 'UserIcon'
  }

  const resolveProjectTypeTranslation = projectType => {
    if (projectType === 'design_recognition') return 'Design Recognition'
    if (projectType === 'final_assessment') return 'Final Assessment'
    return ''
  }

  const resolveProjectTypeVariant = projectType => {
    if (projectType === 'design_recognition') return 'primary'
    if (projectType === 'final_assessment') return 'success'
    return 'primary'
  }

  return {
    fetchCertifications,
    tableColumns,
    perPage,
    currentPage,
    totalCertifications,
    dataMeta,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
    refCertificationListTable,

    resolveProjectTypeIcon,
    resolveProjectTypeVariant,
    resolveProjectTypeTranslation,
    refetchData,

    // Extra Filters
    roleFilter,
    planFilter,
    statusFilter,
  }
}
