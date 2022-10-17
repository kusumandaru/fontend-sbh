import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchUser() {
      return new Promise((resolve, reject) => {
        axios
          .get('engine-rest/user/profile')
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchUserAvatar() {
      return new Promise((resolve, reject) => {
        axios
          .get('engine-rest/user/profile/avatar')
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    getNewToken() {
      return new Promise((resolve, reject) => {
        axios
          .get('engine-rest/user/refresh_token')
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
