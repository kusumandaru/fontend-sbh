import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchProfile() {
      return new Promise((resolve, reject) => {
        axios
          .get('/engine-rest/user/profile')
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchGroups() {
      return new Promise((resolve, reject) => {
        axios
          .get('/engine-rest/user/groups')
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchTenants() {
      return new Promise((resolve, reject) => {
        axios
          .get('/engine-rest/user/tenants')
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchTasksById(ctx, { userId }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/new-building/tasks/admin/${userId}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchUser(ctx, { userId }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/user/users/${userId}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addUser(ctx, userData) {
      return new Promise((resolve, reject) => {
        axios
          .post('/engine-rest/user/users', userData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    editUser(ctx, { userId, userData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/engine-rest/user/users/${userId}`, userData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
