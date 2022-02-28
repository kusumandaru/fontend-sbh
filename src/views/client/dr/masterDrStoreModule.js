import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchDesignRecognition(ctx, { taskId }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/new-building/design_recognition/${taskId}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    submitCriteria(ctx, { criteriaScoringId }) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/engine-rest/new-building/design_recognition/criteria_submission/${criteriaScoringId}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchProjectAssessment(ctx, { taskId }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/new-building/design_recognition/${taskId}/project_assessment`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchProjectAttachments(ctx, { taskId }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/new-building/design_recognition/${taskId}/assessment_attachments`)
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
    postDREligibleSubmission(ctx, { taskId }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/new-building/design_recognition/${taskId}/eligible_submit`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchMasterLevel() {
      return new Promise((resolve, reject) => {
        axios
          .get('/engine-rest/master-project/levels')
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchMasterEvaluation(ctx, { taskId }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/new-building/design_recognition/${taskId}/evaluations`)
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
    downloadLink(ctx, { taskId }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/new-building/design_recognition/${taskId}/assessment_attachment`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    getLatestAttachmentByType(ctx, { taskId, fileType }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/new-building/project/attachments/${taskId}/${fileType}/latest`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    downloadLinkByAttachmentId(ctx, { taskId, attachmentId }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/new-building/project/attachments/${taskId}/${attachmentId}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
