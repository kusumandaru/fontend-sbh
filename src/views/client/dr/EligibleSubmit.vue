<template>
  <b-overlay
    :show="isLoading"
    rounded="sm"
  >
    <!-- submit DR -->
    <b-col md="12">
      <div class="pricing-free-trial">
        <b-row>
          <b-col
            lg="10"
            offset-lg="3"
            class="mx-auto"
          >
            <div class="pricing-trial-content justify-content-between">
              <div class="text-center mt-3">
                <h3 class="text-secondary">
                  Minimum nilai skor bronze, pemilihan penilaian prequisite dan form penilaian yang telah diupload diperlukan untuk submit Design Recognition
                </h3>
                <h5 v-if="!eligibleSubmission.attachment">
                  Form Penilaian belum diupload
                </h5>
                <h5 v-if="!eligibleSubmission.score">
                  Skor minimal bronze belum terpenuhi
                </h5>
                <h5 v-if="!eligibleSubmission.prequisite">
                  Prequisite code harus dipilih {{ prequisiteCodes }}
                </h5>
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  :variant="eligibleSubmission.eligible ? 'primary' : 'danger'"
                  class="mt-2 mt-lg-3"
                  :disabled="!eligibleSubmission.eligible"
                  @click="submitProjectDR"
                >
                  Submit Design Recognition
                </b-button>
              </div>
            </div>
          </b-col>
        </b-row>
      </div>

      <b-modal
        id="modal-success"
        v-model="successShow"
        ok-only
        ok-variant="success"
        ok-title="Accept"
        modal-class="modal-success"
        centered
        title="Success Modal"
        @ok="gotoIndex"
      >
        <b-card-text>
          <h5>Data success to submit</h5>
          <p v-html="resultId" />
        </b-card-text>
      </b-modal>
    </b-col>
    <!--/ submit DR -->
  </b-overlay>
</template>

<script>
import {
  BButton,
  BRow,
  BCol,
  BOverlay,
  BModal,
  BCardText,
} from 'bootstrap-vue'
import {
  ref, onUnmounted,
} from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import Ripple from 'vue-ripple-directive'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import masterDrStoreModule from './masterDrStoreModule'

export default {
  components: {
    BButton,
    BRow,
    BCol,
    BOverlay,
    BModal,
    BCardText,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      successShow: false,
      isLoading: false,
      resultId: null,
    }
  },
  computed: {
    prequisiteCodes() {
      if (this.eligibleSubmission.prequisite_codes !== undefined) {
        return this.eligibleSubmission.prequisite_codes.join(',')
      }
      return ''
    },
  },
  setup() {
    const DR_APP_STORE_MODULE_NAME = 'app-dr'
    const eligibleSubmission = ref(JSON.parse('{}'))

    // Register module
    if (!store.hasModule(DR_APP_STORE_MODULE_NAME)) store.registerModule(DR_APP_STORE_MODULE_NAME, masterDrStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(DR_APP_STORE_MODULE_NAME)) store.unregisterModule(DR_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-dr/postDREligibleSubmission', { taskId: router.currentRoute.params.id })
      .then(response => {
        eligibleSubmission.value = response.data
      })
      .catch(error => {
        if (error.response.status === 404) {
          eligibleSubmission.value = undefined
        }
      })

    return {
      eligibleSubmission,
    }
  },
  methods: {
    showToast(variant, titleToast, description) {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: titleToast,
          icon: 'BellIcon',
          text: description,
          variant,
        },
      })
    },
    submitProjectDR() {
      this.isLoading = true

      this.$http.post(`/engine-rest/new-building/design_recognition/${router.currentRoute.params.id}/submission`).then(res => {
        this.result = JSON.parse(JSON.stringify(res.data))
        this.isLoading = false
        this.showToast('success', 'Saved', 'DR successfully submitted')
        this.successShow = true
      }).catch(() => {
        this.isLoading = false
        this.showToast('danger', 'Cannot Save', 'There is error when submit data, contact administrator')
      })
    },
    gotoIndex() {
      router.push({ name: 'client-project-list' })
    },
  },
}
</script>
