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
        axios
          .get(`/engine-rest/new-building/accept-register-project/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    rejectProject(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/new-building/reject-register-project/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    downloadLink(ctx, { url }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${url}`)
          .then(response => resolve(response))
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
    // addUser(ctx, userData) {
    //   return new Promise((resolve, reject) => {
    //     axios
    //       .post('/apps/user/users', { user: userData })
    //       .then(response => resolve(response))
    //       .catch(error => reject(error))
    //   })
    // },
  },
}
