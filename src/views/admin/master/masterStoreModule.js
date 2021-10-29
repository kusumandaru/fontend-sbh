import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchVendors(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get('/engine-rest/master-project/vendors', { params: queryParams })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchVendor(ctx, { vendorId }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/master-project/vendors/${vendorId}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addVendor(ctx, vendorData) {
      return new Promise((resolve, reject) => {
        axios
          .post('/engine-rest/master-project/vendors', vendorData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    editVendor(ctx, { vendorId, vendorData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/engine-rest/master-project/vendors/${vendorId}`, vendorData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchTemplates(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get('/engine-rest/master-project/templates', { params: queryParams })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchTemplate(ctx, { templateId }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/master-project/templates/${templateId}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addTemplate(ctx, templateData) {
      return new Promise((resolve, reject) => {
        axios
          .post('/engine-rest/master-project/templates', templateData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    editTemplate(ctx, { templateId, templateData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/engine-rest/master-project/templates/${templateId}`, templateData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchEvaluation(ctx, { evaluationId }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/master-project/evaluations/${evaluationId}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addEvaluation(ctx, evaluationData) {
      return new Promise((resolve, reject) => {
        axios
          .post('/engine-rest/master-project/evaluations', evaluationData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    editEvaluation(ctx, { evaluationId, evaluationData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/engine-rest/master-project/evaluations/${evaluationId}`, evaluationData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchExercise(ctx, { exerciseId }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/master-project/exercises/${exerciseId}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addExercise(ctx, exerciseData) {
      return new Promise((resolve, reject) => {
        axios
          .post('/engine-rest/master-project/exercises', exerciseData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    editExercise(ctx, { exerciseId, exerciseData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/engine-rest/master-project/exercises/${exerciseId}`, exerciseData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchCriteria(ctx, { criteriaId }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/master-project/criterias/${criteriaId}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addCriteria(ctx, criteriaData) {
      return new Promise((resolve, reject) => {
        axios
          .post('/engine-rest/master-project/criterias', criteriaData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    editCriteria(ctx, { criteriaId, criteriaData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/engine-rest/master-project/criterias/${criteriaId}`, criteriaData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchDocument(ctx, { documentId }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/master-project/documents/${documentId}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addDocument(ctx, documentData) {
      return new Promise((resolve, reject) => {
        axios
          .post('/engine-rest/master-project/documents', documentData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    editDocument(ctx, { documentId, documentData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/engine-rest/master-project/documents/${documentId}`, documentData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchBlocker(ctx, { blockerId }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/master-project/blockers/${blockerId}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addBlocker(ctx, blockerData) {
      return new Promise((resolve, reject) => {
        axios
          .post('/engine-rest/master-project/blockers', blockerData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    editBlocker(ctx, { blockerId, blockerData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/engine-rest/master-project/blockers/${blockerId}`, blockerData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchBlockerByCriteriaOutself(ctx, { criteriaId }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/master-project/criterias/${criteriaId}/outside`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchBlockerByCriteria(ctx, { criteriaId }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/master-project/criterias/${criteriaId}/blockers`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateCriteriaBlocker(ctx, { criteriaId, blockerIds }) {
      return new Promise((resolve, reject) => {
        const request = new URLSearchParams()
        request.append('blocker_ids', blockerIds.join(','))
        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
        axios
          .patch(`/engine-rest/master-project/correlation_criteria_blockers/${criteriaId}`, request, config)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
