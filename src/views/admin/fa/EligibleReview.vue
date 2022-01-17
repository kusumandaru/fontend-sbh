<template>
  <b-overlay
    :show="isLoading"
    rounded="sm"
  >
    <!-- review FA -->
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
                  Lakukan penilaian untuk semua task dengan status Under Review
                </h3>
                <h5 v-if="!eligibleApprove.eligible">
                  Prequisite code harus direview {{ criteriaCodes }}
                </h5>
                <b-form-group>
                  <v-select
                    v-if="eligibleApprove.eligible"
                    v-model="approvalStatus"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="approvalOptions"
                    :reduce="val => val.value"
                    :clearable="false"
                    :disabled="!eligibleApprove.eligible"
                    input-id="approval-status"
                    label="text"
                    code="value"
                  >
                    <template #option="{ text, icon }">
                      <feather-icon
                        :icon="icon"
                        size="16"
                        class="align-middle mr-50"
                      />
                      <span> {{ text }}</span>
                    </template>
                  </v-select>
                  <b-form-textarea
                    v-if="!approvalStatus"
                    v-model="rejectedReason"
                    placeholder="Rejected Reason"
                    rows="3"
                  />
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    :variant="eligibleApprove.eligible ? 'primary' : 'danger'"
                    class="mt-2 mt-lg-3"
                    :disabled="!eligibleApprove.eligible"
                    @click="reviewProjectFA"
                  >
                    Submit Design Recognition
                  </b-button>
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
        @ok="gotoIndex"
      >
        <b-card-text>
          <h5>Data success to submit</h5>
          <p v-html="resultId" />
        </b-card-text>
      </b-modal>
    </b-col>
    <!--/ submit FA -->
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
import vSelect from 'vue-select'
import router from '@/router'
import store from '@/store'
import Ripple from 'vue-ripple-directive'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import masterFaStoreModule from './masterFaStoreModule'

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
    vSelect,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      successShow: false,
      isLoading: false,
      resultId: null,
      approvalStatus: true,
      rejectedReason: '',
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
    const FA_APP_STORE_MODULE_NAME = 'app-fa'
    const eligibleApprove = ref(JSON.parse('{}'))

    // Register module
    if (!store.hasModule(FA_APP_STORE_MODULE_NAME)) store.registerModule(FA_APP_STORE_MODULE_NAME, masterFaStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(FA_APP_STORE_MODULE_NAME)) store.unregisterModule(FA_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-fa/postFAEligibleApprove', { taskId: router.currentRoute.params.id })
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
    reviewProjectFA() {
      this.isLoading = true

      const request = new FormData()
      request.append('approval_status', this.approvalStatus)
      request.append('rejected_reason', this.rejectedReason)
      request.append('task_id', router.currentRoute.params.id)
      const config = {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      }
      this.$http.post(`/engine-rest/new-building/final_assessment/${router.currentRoute.params.id}/review_fa`, request, config).then(res => {
        this.result = JSON.parse(JSON.stringify(res.data))
        this.isLoading = false
        this.showToast('success', 'Saved', 'FA successfully reviewed')
        this.successShow = true
      }).catch(() => {
        this.isLoading = false
        this.showToast('danger', 'Cannot Save', 'There is error when submit data, contact administrator')
      })
    },
    gotoIndex() {
      router.push({ name: 'admin-project-list' })
    },
  },
}
</script>
