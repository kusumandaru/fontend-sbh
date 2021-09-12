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
    fetchProject(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`engine-rest/new-building/variables/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    approveProject(ctx, { id }) {
      return new Promise((resolve, reject) => {
        const request = new FormData()
        request.append('task_id', id)
        const config = {
          header: {
            'Content-Type': 'multipart/form-data',
          },
        }
        axios
          .post('/engine-rest/new-building/accept-register-project', request, config)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    rejectProject(ctx, { id, rejectionReason }) {
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
          .post('/engine-rest/new-building/reject-register-project', request, config)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    downloadLink(ctx, { id, filename }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/new-building/url_file/${id}/${filename}`)
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
    downloadAllFiles(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: `/engine-rest/new-building/archived_files/${id}`,
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
  },
}
