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
    fetchVendor(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/master-project/vendors/${id}`)
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
    fetchTemplates(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get('/engine-rest/master-project/templates', { params: queryParams })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchTemplate(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/engine-rest/master-project/templates/${id}`)
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
  },
}
