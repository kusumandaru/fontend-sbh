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
    fetchUser(ctx, { userId }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/user/members/${userId}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addUser(ctx, userData) {
      return new Promise((resolve, reject) => {
        axios
          .post('/engine-rest/user/members', userData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    editUser(ctx, { userId, userData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/engine-rest/user/members/${userId}`, userData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
