import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchProjectAssessment(ctx, taskId) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/new-building/design_recognition/${taskId}/project_assessment`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchMasterEvaluation(ctx, taskId) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/new-building/design_recognition/${taskId}/evaluations`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchExerciseAssessment(ctx, projectAssessmentId) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/new-building/design_recognition/${projectAssessmentId}/exercise_assessments`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchCriteriaScoring(ctx, projectAssessmentId) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/new-building/design_recognition/${projectAssessmentId}/criteria_scorings`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
