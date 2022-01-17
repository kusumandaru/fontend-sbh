import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchFinalAssessment(ctx, { taskId }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/new-building/final_assessment/${taskId}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    submitCriteria(ctx, { criteriaScoringId }) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/engine-rest/new-building/final_assessment/criteria_submission/${criteriaScoringId}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchProjectAssessment(ctx, { taskId }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/new-building/final_assessment/${taskId}/project_assessment`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchMasterEvaluation(ctx, { taskId }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/new-building/final_assessment/${taskId}/evaluations`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchExerciseAssessment(ctx, { projectAssessmentId }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/new-building/project_assessment/${projectAssessmentId}/exercise_assessments`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchCriteriaScoring(ctx, { projectAssessmentId }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/new-building/project_assessment/${projectAssessmentId}/criteria_scorings`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchDocumentFile(ctx, { projectAssessmentId }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/new-building/project_assessment/${projectAssessmentId}/document_files`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchComment(ctx, { criteriaId }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/new-building/criteria_scoring/${criteriaId}/comments`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    submitComment(ctx, { criteriaScoringId, commentData }) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/engine-rest/new-building/criteria_scoring/${criteriaScoringId}/comments`, commentData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    postFAEligibleApprove(ctx, { taskId }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/new-building/final_assessment/${taskId}/eligible_approve`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchProjectAttachments(ctx, { taskId }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/new-building/final_assessment/${taskId}/assessment_attachments`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchProjectAttachmentsByFileType(ctx, { taskId, fileType }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/new-building/project_attachments/${taskId}/file_type/${fileType}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
