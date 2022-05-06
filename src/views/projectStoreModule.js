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
    fetchBuildingDocumentsByMasterTemplateID(ctx, { templateId }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/new-building/project/active_document_buildings/${templateId}`)
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
  },
}
