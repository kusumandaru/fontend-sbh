<template>
  <b-tabs
    id="f-a-tab"
    content-class="mt-1"
  >

    <!-- This tabs content will not be mounted until the tab is shown -->
    <!-- and will be un-mounted when hidden -->
    <b-tab
      v-for="(evaluation,index) in masterEvaluations"
      :key="index"
      :title="evaluation.name"
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

      <section id="fa-tabs">
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
                  class="pull-up"
                  size="sm"
                  title="Under Review"
                  :text="exerciseCountString(exercise, 2)"
                  variant="info"
                />
                <b-avatar
                  v-if="exerciseCount(exercise, 4) > 0"
                  v-b-tooltip.hover
                  class="pull-up"
                  size="sm"
                  title="Approved"
                  :text="exerciseCountString(exercise, 4)"
                  variant="success"
                />
                <b-avatar
                  v-if="exerciseCount(exercise, 3) > 0"
                  v-b-tooltip.hover
                  class="pull-up"
                  title="Rejected"
                  size="sm"
                  :text="exerciseCountString(exercise, 3)"
                  variant="danger"
                />
              </div>
            </template>
            <f-a-detail
              :key="criteriaKey"
              :exercise="exercise"
              :rerender-score-parent="rerenderScore"
              :rerender-criteria-parent="forceRerenderCriteria"
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
import masterFaStoreModule from './masterFaStoreModule'
import FADetail from './FADetail.vue'

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
    FADetail,
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  props: {
    rerenderScoreParent: {
      type: Function,
      default: () => {},
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
    const FA_APP_STORE_MODULE_NAME = 'app-fa'
    const transactionFetch = ref(JSON.parse('{}'))
    const projectAssessments = ref(JSON.parse('{}'))
    const masterEvaluations = ref(JSON.parse('[]'))
    const faData = ref(JSON.parse('{}'))

    // Register module
    if (!store.hasModule(FA_APP_STORE_MODULE_NAME)) store.registerModule(FA_APP_STORE_MODULE_NAME, masterFaStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(FA_APP_STORE_MODULE_NAME)) store.unregisterModule(FA_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-fa/fetchFinalAssessment', { taskId: router.currentRoute.params.id })
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
      faData,
    }
  },
  methods: {
    rerenderScore() {
      this.rerenderScoreParent()
    },
    forceRerenderCriteria() {
      this.$http.get(`/engine-rest/new-building/final_assessment/${router.currentRoute.params.id}`)
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
