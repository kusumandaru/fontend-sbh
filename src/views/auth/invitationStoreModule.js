import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchTenant(ctx, { tenantId }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/user/tenants/${tenantId}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
