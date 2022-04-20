<template>
  <b-card no-body>
    <b-card-header>
      <h4 class="mb-0">
        Goal Overview
      </h4>
      <b-card-text class="font-medium-5 mb-0">
        <feather-icon
          icon="HelpCircleIcon"
          size="21"
          class="text-muted cursor-pointer"
        />
      </b-card-text>
    </b-card-header>
    <b-col
      sm="12"
      class="d-flex flex-column flex-wrap text-center"
    >
      <h1 class="font-large-2 font-weight-bolder mt-2 mb-0">
        {{ [Math.round(projectAssessment.approved_score + projectAssessment.submitted_score + projectAssessment.score_modifier)] }}
      </h1>
      <b-card-text>Point Taken from minimum {{ projectAssessment.proposed_level.minimum_score }} score</b-card-text>
    </b-col>

    <!-- Spacer -->
    <hr class="project-spacing">
    <!-- apex chart -->
    <vue-apex-charts
      type="radialBar"
      height="245"
      :options="goalOverviewRadialBar.chartOptions"
      :series="goalOverviewRadialBar.series"
    />
    <!-- button -->
    <b-button
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      variant="flat-primary"
      :disabled="true"
    >
      <span>{{ projectAssessment.proposed_level.name }} </span>
    </b-button>
    <b-row class="text-center mx-0">
      <b-col
        cols="6"
        class="border-top border-right d-flex align-items-between flex-column py-1"
      >
        <b-card-text class="text-muted mb-0">
          Approved Score
        </b-card-text>
        <h3 class="font-weight-bolder mb-50">
          {{ projectAssessment.approved_score }}
        </h3>
      </b-col>

      <b-col
        cols="6"
        class="border-top d-flex align-items-between flex-column py-1"
      >
        <b-card-text class="text-muted mb-0">
          Submitted Score
        </b-card-text>
        <h3 class="font-weight-bolder mb-0">
          {{ projectAssessment.submitted_score }}
        </h3>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BRow, BCol, BCardText, BButton,
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import {
  ref, onUnmounted,
} from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import { $themeColors } from '@themeConfig'
import Ripple from 'vue-ripple-directive'
import masterFaStoreModule from './masterFaStoreModule'

export default {
  components: {
    VueApexCharts,
    BCard,
    BCardHeader,
    BRow,
    BCardText,
    BCol,
    BButton,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
    }
  },
  created() {
  },
  setup() {
    const FA_APP_STORE_MODULE_NAME = 'app-fa'
    const blankProjectAssessment = {
      temporary_score: 0,
      potential_score: 0,
      proposed_level: {
        name: '',
      },
    }
    const projectAssessment = ref(JSON.parse(JSON.stringify(blankProjectAssessment)))
    const goalOverviewRadialBar = ref(JSON.parse('{}'))

    goalOverviewRadialBar.value = {
      series: [0],
      chartOptions: {
        chart: {
          sparkline: {
            enabled: true,
          },
          dropShadow: {
            enabled: true,
            blur: 3,
            left: 1,
            top: 1,
            opacity: 0.1,
          },
        },
        colors: ['#51e5a8'],
        plotOptions: {
          radialBar: {
            offsetY: -10,
            startAngle: -150,
            endAngle: 150,
            hollow: {
              size: '77%',
            },
            track: {
              background: '#ebe9f1',
              strokeWidth: '50%',
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                color: '#5e5873',
                fontSize: '2.86rem',
                fontWeight: '600',
              },
            },
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            gradientToColors: [$themeColors.success],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100],
          },
        },
        stroke: {
          lineCap: 'round',
        },
        grid: {
          padding: {
            bottom: 30,
          },
        },
      },
    }

    // Register module
    if (!store.hasModule(FA_APP_STORE_MODULE_NAME)) store.registerModule(FA_APP_STORE_MODULE_NAME, masterFaStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(FA_APP_STORE_MODULE_NAME)) store.unregisterModule(FA_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-fa/fetchProjectAssessment', { taskId: router.currentRoute.params.id })
      .then(response => {
        // eslint-disable-next-line prefer-destructuring
        projectAssessment.value = response.data[0]
        // goalOverviewRadialBar.value.series = [Math.round(((projectAssessment.value.approved_score + projectAssessment.value.submitted_score) / projectAssessment.value.proposed_level.minimum_score) * 100)]
        let scoreSeries = Math.round(((projectAssessment.value.approved_score + projectAssessment.value.submitted_score + projectAssessment.value.score_modifier) / projectAssessment.value.proposed_level.minimum_score) * 100)
        scoreSeries = scoreSeries > 100.0 ? 100.0 : scoreSeries
        goalOverviewRadialBar.value.series = [scoreSeries]
      })
      .catch(error => {
        if (error.response.status === 404) {
          projectAssessment.value = undefined
        }
      })

    return {
      projectAssessment,
      goalOverviewRadialBar,
    }
  },
  methods: {
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/chart-apex.scss';
</style>
