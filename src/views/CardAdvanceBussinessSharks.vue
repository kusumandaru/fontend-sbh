<template>
  <b-card
    no-body
    class="business-card"
  >
    <b-card-header class="pb-1">
      <b-card-title>Project Progress</b-card-title>
      <feather-icon
        icon="MoreVerticalIcon"
        size="18"
        class="cursor-pointer"
      />
    </b-card-header>

    <b-card-body>
      <b-card-text>List of current process</b-card-text>
      <h6 class="mb-75">
      </h6>
      <div class="business-items">
        <div
          v-for="businessItem in businessItems"
          :key="businessItem.id"
          class="business-item"
        >
          <div class="d-flex align-items-center justify-content-between">
            <h6 class="mb-0">
              {{ businessItem.id }}
            </h6>
            <b-badge :variant="businessItem.badgeColor">
              {{ businessItem.instances }}
            </b-badge>
          </div>
        </div>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardTitle, BCardBody, BCardText, BBadge,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BCard,
    BBadge,
    BCardHeader,
    BCardTitle,
    BCardBody,
    BCardText,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      businessItems: [
        {
          option: 'Option #1', money: '+$39', badgeColor: 'light-success', checked: false,
        },
        {
          option: 'Option #2', money: '+85', badgeColor: 'light-primary', checked: true,
        },
        {
          option: 'Option #3', money: '+$199', badgeColor: 'light-success', checked: false,
        },
        {
          option: 'Option #4', money: '+$459', badgeColor: 'light-success', checked: false,
        },
      ],
    }
  },
  created() {
    this.retrieveStatistic()
  },
  methods: {
    retrieveStatistic() {
      this.$http.get('engine-rest/process-definition/key/new-building-process/statistics')
        .then(res => { this.businessItems = res.data })
    },
  },
}
</script>
