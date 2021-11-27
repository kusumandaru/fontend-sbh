<template>
  <div>
    <!-- Stats Card Vertical -->
    <b-row class="match-height">
      <b-col
        v-for="evaluation in evaluations"
        :key="evaluation.id"
        xl="2"
        md="4"
        sm="6"
      >
        <statistic-card-vertical
          color="success"
          icon="ActivityIcon"
          :statistic="evaluation.approved_score+evaluation.submitted_score"
          :statistic-title="evaluation.code"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
import StatisticCardVertical from '@core/components/statistics-cards/StatisticCardVertical.vue'
import { kFormatter } from '@core/utils/filter'
import router from '@/router'

export default {
  components: {
    BRow,
    BCol,
    StatisticCardVertical,
  },
  data() {
    return {
      // charts
      evaluations: {},
    }
  },
  created() {
    this.$http.get(`/engine-rest/new-building/design_recognition/${router.currentRoute.params.id}/evaluation_scores`)
      .then(response => { this.evaluations = response.data })
      .catch(error => {
        if (error.response.status === 404) {
          this.evaluations.value = undefined
        }
      })
  },
  methods: {
    kFormatter,
  },
}
</script>
