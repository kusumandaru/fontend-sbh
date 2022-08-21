import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchBuilding(ctx, { buildingId }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/master/building_types/${buildingId}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addBuilding(ctx, buildingData) {
      return new Promise((resolve, reject) => {
        axios
          .post('/engine-rest/master/building_types', buildingData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    editBuilding(ctx, { buildingId, buildingData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/engine-rest/master/building_types/${buildingId}`, buildingData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchBuildingCategory(ctx, { categoryId }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/new-building/project/document_building_categories/${categoryId}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addBuildingCategory(ctx, buildingCategoryData) {
      return new Promise((resolve, reject) => {
        axios
          .post('/engine-rest/new-building/project/document_building_categories', buildingCategoryData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    editBuildingCategory(ctx, { categoryId, buildingCategoryData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/engine-rest/new-building/project/document_building_categories/${categoryId}`, buildingCategoryData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    deleteBuildingCategory(ctx, { categoryId }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/engine-rest/new-building/project/document_building_categories/${categoryId}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    deleteBuildingType(ctx, { buildingId }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/engine-rest/master/building_types/${buildingId}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchCity(ctx, { cityId }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/master/cities/${cityId}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addCity(ctx, cityData) {
      return new Promise((resolve, reject) => {
        axios
          .post('/engine-rest/master/cities', cityData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    editCity(ctx, { cityId, cityData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/engine-rest/master/cities/${cityId}`, cityData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    allBuildingDocumentCategory() {
      return new Promise((resolve, reject) => {
        axios
          .get('/engine-rest/new-building/project/document_building_categories')
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    allGenerateDocumentCategory() {
      return new Promise((resolve, reject) => {
        axios
          .get('/engine-rest/new-building/project/generate_building_categories')
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchBuildingDocument(ctx, { buildingDocumentId }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/new-building/project/document_buildings/${buildingDocumentId}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    deleteBuildingDocument(ctx, { buildingDocumentId }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/engine-rest/new-building/project/document_buildings/${buildingDocumentId}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addBuildingDocument(ctx, buildingDocumentData) {
      return new Promise((resolve, reject) => {
        axios
          .post('/engine-rest/new-building/project/document_buildings', buildingDocumentData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    editBuildingDocument(ctx, { buildingDocumentId, buildingDocumentData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/engine-rest/new-building/project/document_buildings/${buildingDocumentId}`, buildingDocumentData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchGenerateDocument(ctx, { generateDocumentId }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/new-building/project/document_generates/${generateDocumentId}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    deleteGenerateDocument(ctx, { generateDocumentId }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/engine-rest/new-building/project/document_generates/${generateDocumentId}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addGenerateDocument(ctx, generateDocumentData) {
      return new Promise((resolve, reject) => {
        axios
          .post('/engine-rest/new-building/project/document_generates', generateDocumentData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    editGenerateDocument(ctx, { generateDocumentId, generateDocumentData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/engine-rest/new-building/project/document_generates/${generateDocumentId}`, generateDocumentData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchProvinces(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get('/engine-rest/master/provinces', { params: queryParams })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchProvince(ctx, { provinceId }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/master/provinces/${provinceId}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addProvince(ctx, provinceData) {
      return new Promise((resolve, reject) => {
        axios
          .post('/engine-rest/master/provinces', provinceData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    editProvince(ctx, { provinceId, provinceData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/engine-rest/master/provinces/${provinceId}`, provinceData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
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
    deleteVendor(ctx, { vendorId }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/engine-rest/master-project/vendors/${vendorId}`)
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
    fetchCertifications(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get('/engine-rest/master-project/certification_types', { params: queryParams })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchCertification(ctx, { certificationTypeId }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/master-project/certification_types/${certificationTypeId}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    deleteCertification(ctx, { certificationId }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/engine-rest/master-project/certification_types/${certificationId}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addCertification(ctx, certificationData) {
      return new Promise((resolve, reject) => {
        axios
          .post('/engine-rest/master-project/certification_types', certificationData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    editCertification(ctx, { certificationTypeId, certificationData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/engine-rest/master-project/certification_types/${certificationTypeId}`, certificationData)
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
    deleteTemplate(ctx, { templateId }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/engine-rest/master-project/templates/${templateId}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchLevels() {
      return new Promise((resolve, reject) => {
        axios
          .get('/engine-rest/master-project/levels')
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
    deleteEvaluation(ctx, { evaluationId }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/engine-rest/master-project/evaluations/${evaluationId}`)
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
    fetchLevel(ctx, { levelId }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/master-project/levels/${levelId}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    deleteLevel(ctx, { levelId }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/engine-rest/master-project/levels/${levelId}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addLevel(ctx, levelData) {
      return new Promise((resolve, reject) => {
        axios
          .post('/engine-rest/master-project/levels', levelData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    editLevel(ctx, { levelId, levelData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/engine-rest/master-project/levels/${levelId}`, levelData)
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
    deleteExercise(ctx, { exerciseId }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/engine-rest/master-project/exercises/${exerciseId}`)
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
    deleteCriteria(ctx, { criteriaId }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/engine-rest/master-project/criterias/${criteriaId}`)
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
    deleteDocument(ctx, { documentId }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/engine-rest/master-project/documents/${documentId}`)
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
    deleteBlocker(ctx, { blockerId }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/engine-rest/master-project/blockers/${blockerId}`)
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
