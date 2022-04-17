<template>
  <b-tabs
    id="d-r-tab"
    content-class="mt-1"
  >

    <!-- This tabs content will not be mounted until the tab is shown -->
    <!-- and will be un-mounted when hidden -->
    <b-tab
      v-for="(evaluation,index) in masterEvaluations"
      :key="index"
      :title="evaluation.name"
      :read-only="readOnly"
      lazy
    >
      <b-alert
        variant="primary"
        show
        class="mb-0"
      >
        <div class="alert-body">
          <span><strong>{{ evaluation.code }} - {{ evaluation.name }}</strong></span>
        </div>
      </b-alert>

      <!-- evaluation tabs pills -->
      <hr class="project-spacing">

      <section id="dr-tabs">
        <b-tabs
          vertical
          content-class="col-12 col-md-8 col-lg-9"
          pills
          nav-wrapper-class="faq-navigation col-md-4 col-lg-3 col-12"
          nav-class="nav-left"
        >

          <!-- exercise tab -->
          <b-tab
            v-for="(exercise, idx) in evaluation.exercises"
            :key="exercise.id"
            :active="!idx"
          >
            <!-- title -->
            <!-- :icon="exercise.icon" -->
            <template #title>
              <b-media no-body>
                <b-media-aside>
                  <b-badge
                    v-b-tooltip.hover
                    title="Taken Score"
                    variant="light-secondary"
                  >
                    {{ exercise.submitted_score + exercise.approved_score }}
                  </b-badge>
                </b-media-aside>
                <b-media-body>
                  <span class="   font-weight-bold">{{ exercise.exercise.code }} - {{ exercise.exercise.name }}</span>
                </b-media-body>
              </b-media>
              <div
                class="font-weight-bolder"
                style="margin-left: auto; margin-right: 0"
              >
                <b-avatar
                  v-if="exerciseCount(exercise, 2) > 0"
                  v-b-tooltip.hover
                  size="sm"
                  class="pull-up"
                  title="Under Review"
                  :text="exerciseCountString(exercise, 2)"
                  variant="info"
                />
                <b-avatar
                  v-if="exerciseCount(exercise, 4) > 0"
                  v-b-tooltip.hover
                  size="sm"
                  class="pull-up"
                  title="Approved"
                  :text="exerciseCountString(exercise, 4)"
                  variant="success"
                />
                <b-avatar
                  v-if="exerciseCount(exercise, 3) > 0"
                  v-b-tooltip.hover
                  size="sm"
                  class="pull-up"
                  title="Rejected"
                  :text="exerciseCountString(exercise, 3)"
                  variant="danger"
                />
              </div>
            </template>
            <d-r-detail
              :key="criteriaKey"
              :exercise="exercise"
              :rerender-score-parent="rerenderScore"
              :rerender-criteria-parent="forceRerenderCriteria"
              :read-only="readOnly"
            />
          </b-tab>
          <!--/ payment tab -->

          <!-- sitting lady image -->
          <template #tabs-end>
            <b-img
              fluid
              :src="require('@/assets/images/illustration/faq-illustrations.svg')"
              class="d-none d-md-block mt-auto"
            />
          </template>
          <!--/ sitting lady image -->
        </b-tabs>
      </section>
      <!--/ evaluations tabs pills -->
    </b-tab>
  </b-tabs>
</template>

<script>
import {
  BAvatar,
  BTabs,
  BTab,
  BAlert,
  BImg,
  BBadge,
  BMedia,
  BMediaBody,
  BMediaAside,
  VBTooltip,
} from 'bootstrap-vue'
import {
  ref, onUnmounted,
} from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import masterDrStoreModule from './masterDrStoreModule'
import DRDetail from './DRDetail.vue'

export default {
  components: {
    BAvatar,
    BTabs,
    BTab,
    BAlert,
    BImg,
    BBadge,
    BMedia,
    BMediaBody,
    BMediaAside,
    DRDetail,
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  props: {
    rerenderScoreParent: {
      type: Function,
      default: () => {},
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      criteriaKey: 0,
    }
  },
  watch: {
  },
  created() {
  },
  setup() {
    const DR_APP_STORE_MODULE_NAME = 'app-dr-tab'
    const transactionFetch = ref(JSON.parse('{}'))
    const projectAssessments = ref(JSON.parse('{}'))
    const masterEvaluations = ref(JSON.parse('[]'))
    const drData = ref(JSON.parse('{}'))

    // Register module
    if (!store.hasModule(DR_APP_STORE_MODULE_NAME)) store.registerModule(DR_APP_STORE_MODULE_NAME, masterDrStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(DR_APP_STORE_MODULE_NAME)) store.unregisterModule(DR_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-dr-tab/fetchDesignRecognition', { taskId: router.currentRoute.params.id })
      .then(response => {
        transactionFetch.value = response.data
        // eslint-disable-next-line prefer-destructuring
        projectAssessments.value = transactionFetch.value.projectAssessments
        // eslint-disable-next-line prefer-destructuring
        masterEvaluations.value = projectAssessments.value[0].masterEvaluations
      })
      .catch(error => {
        if (error.response.status === 404) {
          transactionFetch.value = undefined
        }
      })
    return {
      transactionFetch,
      projectAssessments,
      masterEvaluations,
      drData,
    }
  },
  methods: {
    rerenderScore() {
      this.rerenderScoreParent()
    },
    forceRerenderCriteria() {
      this.$http.get(`/engine-rest/new-building/design_recognition/${router.currentRoute.params.id}`)
        .then(response => {
          // eslint-disable-next-line prefer-destructuring
          this.masterEvaluations = response.data.projectAssessments[0].masterEvaluations
          this.criteriaKey += 1
        })
        .catch(error => {
          if (error.response.status === 404) {
            this.transactionFetch.value = undefined
          }
        })
    },
    exerciseCount(exercise, approvalStatus) {
      // eslint-disable-next-line arrow-body-style
      const underReviews = exercise.criterias.filter(c => {
        // eslint-disable-next-line
        return c.approval_status === approvalStatus
      })
      return underReviews.length
    },
    exerciseCountString(exercise, approvalStatus) {
      return this.exerciseCount(exercise, approvalStatus).toString()
    },
  },
}
</script>
