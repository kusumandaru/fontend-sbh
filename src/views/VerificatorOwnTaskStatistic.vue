<template>
  <b-card
    no-body
    class="business-card"
  >
    <b-card-header class="pb-1">
      <b-card-title>Pending Task</b-card-title>
      <feather-icon
        icon="MoreVerticalIcon"
        size="18"
        class="cursor-pointer"
      />
    </b-card-header>

    <b-card-body>
      <b-card-text>Count of project</b-card-text>
      <h6 class="mb-75" />
      <div class="business-items">
        <div
          v-for="(value, key) in statisticItems"
          :key="key"
          class="business-item"
        >
          <div class="d-flex align-items-center justify-content-between">
            <h6 class="mb-0">
              {{ key }}
            </h6>
            <b-badge variant="">
              {{ value }}
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
      statisticItems: [],
    }
  },
  created() {
    this.retrieveStatistic()
  },
  methods: {
    retrieveStatistic() {
      this.$http.get('engine-rest/new-building/grouped_pending_task_by_verificator')
        .then(res => { this.statisticItems = res.data })
    },
    toTitleCase(word) {
      return word.split('-').map(item => item.charAt(0).toUpperCase() + item.substring(1)).join(' ')
    },
  },
}
</script>
