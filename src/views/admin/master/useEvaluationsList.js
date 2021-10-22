import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'
import { title } from '@core/utils/filter'
import router from '@/router'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useEvaluationsList() {
  // Use toast
  const toast = useToast()

  const refEvaluationListTable = ref(null)

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
  const totalEvaluations = ref(0)
  const currentPage = ref(1)
  const perPageOptions = [10, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)
  const roleFilter = ref(null)
  const planFilter = ref(null)
  const statusFilter = ref(null)

  const dataMeta = computed(() => {
    const localItemsCount = refEvaluationListTable.value ? refEvaluationListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalEvaluations.value,
    }
  })

  const refetchData = () => {
    /* refEvaluationListTable.value.refresh() */
    router.go()
  }

  watch([currentPage, perPage, searchQuery, roleFilter, planFilter, statusFilter], () => {
    refetchData()
  })

  const fetchEvaluations = (ctx, callback) => {
    store
      .dispatch('app-evaluation/fetchEvaluations', {
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
        const { evaluations, total } = response.data

        callback(evaluations)
        totalEvaluations.value = total
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error fetching evaluations list',
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
    fetchEvaluations,
    tableColumns,
    perPage,
    currentPage,
    totalEvaluations,
    dataMeta,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
    refEvaluationListTable,

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
