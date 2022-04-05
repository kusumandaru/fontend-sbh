<template>
  <b-overlay
    :show="isLoading"
    rounded="sm"
  >
    <!-- review DR -->
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
                <h3
                  v-if="!eligibleApprove.eligible"
                  class="text-secondary"
                >
                  Lakukan penilaian untuk semua task dengan status Under Review
                </h3>
                <h3
                  v-if="eligibleApprove.eligible"
                  class="text-secondary"
                >
                  Setujui atau tolak penilaian
                </h3>
                <h5 v-if="!eligibleApprove.eligible">
                  Terdapat penilaian yang belum direview {{ criteriaCodes }}
                </h5>
                <b-form-group>
                  <b-form-textarea
                    v-if="eligibleApprove.eligible"
                    v-model="reviewReason"
                    placeholder="Reason"
                    rows="3"
                  />
                  <div class="demo-inline-spacing d-flex align-items-center justify-content-center mb-5 pb-50">
                    <b-button
                      v-if="eligibleApprove.eligible"
                      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                      variant="primary"
                      class="mt-2 mt-lg-3"
                      :disabled="!eligibleApprove.eligible"
                      @click="reviewProjectDR('approved')"
                    >
                      Approve
                    </b-button>
                    <b-button
                      v-if="eligibleApprove.eligible"
                      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                      variant="warning"
                      class="mt-2 mt-lg-3"
                      :disabled="!eligibleApprove.eligible"
                      @click="reviewProjectDR('referenced')"
                    >
                      Approve With Reference
                    </b-button>
                    <b-button
                      v-if="eligibleApprove.eligible"
                      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                      variant="danger"
                      class="mt-2 mt-lg-3"
                      :disabled="!eligibleApprove.eligible"
                      @click="reviewProjectDR('rejected')"
                    >
                      Reject Design Recognition
                    </b-button>
                  </div>
                </b-form-group>
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
        hide-header-close
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
  BFormGroup,
  BFormTextarea,
} from 'bootstrap-vue'
import {
  ref, onUnmounted,
} from '@vue/composition-api'
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'
import router from '@/router'
import store from '@/store'
import Ripple from 'vue-ripple-directive'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import masterDrStoreModule from './masterDrStoreModule'

Vue.use(VueSweetalert2)

export default {
  components: {
    BButton,
    BRow,
    BCol,
    BOverlay,
    BModal,
    BCardText,
    BFormGroup,
    BFormTextarea,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      successShow: false,
      isLoading: false,
      resultId: null,
      reviewReason: '',
      approvalOptions: [
        {
          value: false,
          text: 'Rejected',
          icon: 'SlashIcon',
          disabled: false,
        },
        {
          value: true,
          text: 'Accepted',
          icon: 'CheckCircleIcon',
          disabled: false,
        },
      ],
    }
  },
  computed: {
    criteriaCodes() {
      if (this.eligibleApprove.criteria_codes !== undefined) {
        return this.eligibleApprove.criteria_codes.join(',')
      }
      return ''
    },
  },
  setup() {
    const DR_APP_STORE_MODULE_NAME = 'app-dr'
    const eligibleApprove = ref(JSON.parse('{}'))

    // Register module
    if (!store.hasModule(DR_APP_STORE_MODULE_NAME)) store.registerModule(DR_APP_STORE_MODULE_NAME, masterDrStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(DR_APP_STORE_MODULE_NAME)) store.unregisterModule(DR_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-dr/postDREligibleApprove', { taskId: router.currentRoute.params.id })
      .then(response => {
        eligibleApprove.value = response.data
      })
      .catch(error => {
        if (error.response.status === 404) {
          eligibleApprove.value = undefined
        }
      })

    return {
      eligibleApprove,
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
    reviewProjectDR(approvalType) {
      this.$swal({
        title: 'Are you sure?',
        text: 'Approval for Design Recognition',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: approvalType,
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.isLoading = true

          const request = new FormData()
          request.append('approval_type', approvalType)
          request.append('review_reason', this.reviewReason)
          request.append('task_id', router.currentRoute.params.id)
          const config = {
            header: {
              'Content-Type': 'multipart/form-data',
            },
          }
          this.$http.post(`/engine-rest/new-building/design_recognition/${router.currentRoute.params.id}/review_dr`, request, config).then(res => {
            this.result = JSON.parse(JSON.stringify(res.data))
            this.isLoading = false
            this.showToast('success', 'Saved', 'DR successfully reviewed')
            this.successShow = true
          }).catch(() => {
            this.isLoading = false
            this.showToast('danger', 'Cannot Save', 'There is error when submit data, contact administrator')
          })
        }
      })
    },
    gotoIndex() {
      router.push({ name: 'admin-project-list' })
    },
  },
}
</script>
