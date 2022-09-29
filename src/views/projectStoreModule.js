import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchProjects(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get('/apps/project/projects', { params: queryParams })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchAdminProject(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`engine-rest/new-building/variables/admin/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchClientProject(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`engine-rest/new-building/variables/client/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchUser() {
      return new Promise((resolve, reject) => {
        axios
          .get('engine-rest/user/profile')
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    approveTask(ctx, { id }) {
      return new Promise((resolve, reject) => {
        const request = new FormData()
        request.append('task_id', id)
        const config = {
          header: {
            'Content-Type': 'multipart/form-data',
          },
        }
        axios
          .post('/engine-rest/new-building/accept-task', request, config)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    rejectTask(ctx, { id, rejectionReason }) {
      return new Promise((resolve, reject) => {
        const request = new FormData()
        request.append('task_id', id)
        request.append('rejected_reason', rejectionReason)

        const config = {
          header: {
            'Content-Type': 'multipart/form-data',
          },
        }
        axios
          .post('/engine-rest/new-building/reject-task', request, config)
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
    getAttachmentsByType(ctx, { taskId, fileType }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/new-building/project/attachments/${taskId}/${fileType}/files`)
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
    downloadMasterLink(ctx, { filename }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/master/url_file/${filename}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    downloadEligibleStatement(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/new-building/eligibility_statement/${id}`, {
            responseType: 'blob',
          })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    downloadRegisteredProject(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/new-building/registered_project/${id}`, {
            responseType: 'blob',
          })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    downloadRegisteredProjectAttachment() {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: '/engine-rest/master/registered_project_attachment',
          responseType: 'arraybuffer',
        }).then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    downloadAllFiles(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: `/engine-rest/new-building/project/attachments/${id}/archived_files`,
          responseType: 'arraybuffer',
        }).then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchClients() {
      return new Promise((resolve, reject) => {
        axios
          .get('/apps/project/clients')
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchAdminData() {
      return new Promise((resolve, reject) => {
        axios
          .get('engine-rest/master/master_admins')
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchProjectAttachments(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`engine-rest/new-building/project/attachments/${id}`)
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
    fetchBuildingDocumentsByMasterCertificationTypeID(ctx, { masterCertificationTypeID }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/new-building/project/active_document_buildings/${masterCertificationTypeID}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchGenerateDocumentsByMasterCertificationTypeID(ctx, { masterCertificationTypeID }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/new-building/project/active_document_generates/${masterCertificationTypeID}`)
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
    fetchProjectAttachmentsByFileType(ctx, { taskId, fileType }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/new-building/project_attachments/${taskId}/file_type/${fileType}`)
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
    deleteProject(ctx, { id, reason }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/engine-rest/new-building/tasks/${id}/reason/${reason}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchHistory(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`engine-rest/new-building/tasks/history/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    rollbackProject(ctx, { id, startedActivityId, ancestorActivityInstanceId }) {
      return new Promise((resolve, reject) => {
        const request = new FormData()
        request.append('task_id', id)
        request.append('started_activity_id', startedActivityId)
        request.append('ancestor_activity_instance_id', ancestorActivityInstanceId)

        const config = {
          header: {
            'Content-Type': 'multipart/form-data',
          },
        }
        axios
          .post('/engine-rest/new-building/tasks/rollback', request, config)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchViewer(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`engine-rest/user/project_users_by_process_instance_id/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    deleteViewer(ctx, { userId }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/engine-rest/user/project_users/${userId}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addViewer(ctx, { id, viewerData }) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/engine-rest/user/project_users/${id}`, viewerData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchVerificators() {
      return new Promise((resolve, reject) => {
        axios
          .get('engine-rest/user/verificators')
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchVerificator(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`engine-rest/user/project_verificators_by_process_instance_id/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    deleteVerificator(ctx, { userId }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/engine-rest/user/project_verificators/${userId}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addVerificator(ctx, { id, verificatorData }) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/engine-rest/user/project_verificators/${id}`, verificatorData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchCertificationTypes() {
      return new Promise((resolve, reject) => {
        axios
          .get('engine-rest/master-project/certification_types')
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchCertificationType(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`engine-rest/master-project/certification_types/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
