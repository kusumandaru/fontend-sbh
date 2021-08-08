<template>
  <div>
    <b-row>
      <b-col
        lg="3"
        sm="6"
      >
        <statistic-card-horizontal
          icon="ShoppingBagIcon"
          color="success"
          statistic-title="Tenant"
          :statistic="tenantCount"
        />
      </b-col>
      <b-col
        lg="3"
        sm="6"
      >
        <statistic-card-horizontal
          icon="UserIcon"
          color="primary"
          statistic-title="User"
          :statistic="userCount"
        />
      </b-col>

      <b-col
        lg="4"
        md="6"
      >
        <card-advance-bussiness-sharks />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
import StatisticCardHorizontal from '@core/components/statistics-cards/StatisticCardHorizontal.vue'
import CardAdvanceBussinessSharks from './CardAdvanceBussinessSharks.vue'

export default {
  components: {
    BRow,
    BCol,
    StatisticCardHorizontal,
    CardAdvanceBussinessSharks,
  },
  data() {
    return {
      userCount: 0,
      tenantCount: 0,
    }
  },
  created() {
    this.retrieveUserCount()
    this.retrieveTenantCount()
  },
  methods: {
    retrieveUserCount() {
      this.$http.get('engine-rest/tenant/count')
        .then(res => { this.userCount = res.data.count })
    },
    retrieveTenantCount() {
      this.$http.get('engine-rest/user/count')
        .then(res => { this.tenantCount = res.data.count })
    },
  },
}
</script>

<style>

</style>
