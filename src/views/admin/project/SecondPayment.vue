<template>
  <validation-observer ref="agreementSecondPaymentRules">
    <b-form @submit.prevent>
      <b-row
        v-if="projectData"
        class="project-preview"
      >
        <!-- Col: Left (project Container) -->
        <b-col
          cols="12"
          xl="12"
          md="12"
        >
          <!-- Header -->
          <b-card
            no-body
            class="project-preview-card"
          >
            <b-card-body class="project-padding pb-0">
              <div class="d-flex justify-content-between flex-md-row flex-column project-spacing mt-0">
                <!-- Header: Left Content -->
                <div>
                  <div class="logo-wrapper">
                    <h3 class="text-primary project-logo">
                      {{ projectData.building_name }}
                    </h3>
                  </div>
                  <p class="card-text mb-25">
                    {{ projectData.building_address }}
                  </p>
                  <p class="card-text mb-25">
                    {{ projectData.city_name }}
                  </p>
                  <p class="card-text mb-25">
                    {{ projectData.province_name }}
                  </p>
                  <p class="card-text mb-25">
                    {{ projectData.postal_code }}
                  </p>
                  <p class="card-text mb-0">
                    <feather-icon icon="PhoneIcon" />
                    Telephone: {{ projectData.telephone }}
                  </p>
                  <p class="card-text mb-0">
                    <feather-icon icon="PhoneIcon" />
                    Handphone: {{ projectData.handphone }}
                  </p>
                  <p class="card-text mb-0">
                    <feather-icon icon="MailIcon" />
                    Email: {{ projectData.email }}
                  </p>
                  <p class="card-text mb-0">
                    <feather-icon icon="PrinterIcon" />
                    Faximile: {{ projectData.faximile }}
                  </p>
                </div>

                <!-- Header: Right Content -->
                <div class="mt-md-0 mt-2">
                  <h4 class="project-title">
                    Project ID
                    <span class="project-number">#{{ projectData.task_id }}</span>
                  </h4>
                  <div class="project-date-wrapper">
                    <p class="project-date-title">
                      Date Created:
                    </p>
                    <p class="project-date">
                      {{ projectData.created_at | moment("dddd, MMMM Do YYYY") }}
                    </p>
                  </div>
                </div>
              </div>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <!-- second payment -->
        <b-col cols="12">
          <b-form-group
            label="Pembayaran Kedua *"
            label-for="secondPayment"
          >
            <validation-provider
              #default="{ errors }"
              name="Second Payment"
              rules="required"
            >
              <b-input-group class="input-group-merge">
                <b-input-group class="input-group-merge">
                  <b-form-checkbox
                    v-model.lazy="projectData.second_payment"
                    name="second-payment"
                  >
                    &nbsp;
                    is paid
                  </b-form-checkbox>
                </b-input-group>
              </b-input-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <!--Design Recognition-->
        <b-col cols="12">
          <b-form-group
            label="Use Design Recognition Phase ?"
            label-for="designRecognition"
            description="Design Recognition adalah proses untuk memasukkan data design bangunan dan dilakukan penilaian sebelum final assesment"
          >
            <validation-provider
              #default="{ errors }"
              rules=""
              name="Design Recogntion"
            >
              <b-input-group class="input-group-merge">
                <b-form-checkbox
                  v-model.lazy="projectData.design_recognition"
                  name="design-recognition"
                >
                  &nbsp;
                  Design Recognition Scoring
                </b-form-checkbox>
              </b-input-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <!--Second Payment Proof Document -->
        <b-col md="12">
          <b-form-group>
            <label>Bukti Pembayaran Kedua</label>
            <validation-provider
              #default="{ errors }"
              name="Bukti Pembayaran Kedua"
            >
              <b-form-file
                v-model.lazy="secondPaymentDocument"
                placeholder="(Optional) Upload bukti pembayaran kedua bila diperlukan..."
                drop-placeholder="Drop file here..."
              />
              <small class="text-danger">{{ errors[0] }}</small>
              <b-card-text class="my-1">
                Selected file: <strong>{{ secondPaymentDocument ? secondPaymentDocument.name : '' }}</strong>
              </b-card-text>
            </validation-provider>
            <b-card-text
              v-if="projectData.second_payment_document"
              class="mb-0"
            >
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="flat-primary"
                @click="downloadFile('second_payment_document')"
              >
                <feather-icon icon="ArchiveIcon" />
                Download Perjanjian Kerjasama
              </b-button>
            </b-card-text>
          </b-form-group>
        </b-col>

        <!-- submit and reset -->
        <b-col>
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            type="submit"
            variant="secondary"
            class="mr-1"
            :disabled="isLoading"
            @click="submitProject"
          >
            <b-spinner
              v-if="isLoading"
              small
              type="grow"
            />
            Submit
          </b-button>
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            type="reset"
            variant="outline-secondary"
            @click="reset"
          >
            Reset
          </b-button>
        </b-col>
      </b-row>

      <b-modal
        id="modal-success"
        v-model.lazy="successShow"
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
    </b-form>
  </validation-observer>
</template>

<script>
import {
  BCardText,
  BRow,
  BCard,
  BCardBody,
  BCol,
  BFormCheckbox,
  BFormFile,
  BFormGroup,
  BForm,
  BInputGroup,
  BButton,
  BModal,
  BSpinner,
} from 'bootstrap-vue'
import {
  ref, onUnmounted,
} from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import Ripple from 'vue-ripple-directive'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  required, email, confirmed, url, between, alpha, integer, password, min, digits, alphaDash, length,
} from '@validations'
import projectStoreModule from '@/views/projectStoreModule'

export default {
  components: {
    BCardText,
    BRow,
    BCard,
    BCardBody,
    BCol,
    BFormCheckbox,
    BFormFile,
    BFormGroup,
    BForm,
    BInputGroup,
    BButton,
    BModal,
    BSpinner,
    ValidationObserver,
    ValidationProvider,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      secondPaymentDocument: null,
      maxChar: 200,
      successShow: false,
      result: {},
      resultId: null,
      isLoading: false,
      options: {
        number: {
          numeral: true,
          numeralThousandsGroupStyle: 'thousand',
        },
        phone: {
          phone: true,
          phoneRegionCode: 'ID',
        },
        time: {
          time: true,
          timePattern: ['h', 'm', 's'],
        },
        date: {
          date: true,
          delimiter: '-',
          datePattern: ['Y', 'm', 'd'],
        },
        prefix: {
          prefix: '+63',
          blocks: [3, 3, 3, 4],
          uppercase: true,
        },
        required,
        confirmed,
        password,
        email,
        min,
        integer,
        url,
        alpha,
        between,
        digits,
        length,
        alphaDash,
      },
    }
  },
  setup() {
    const projectData = ref({})
    const PROJECT_APP_STORE_MODULE_NAME = 'app-project'

    // Register module
    if (!store.hasModule(PROJECT_APP_STORE_MODULE_NAME)) store.registerModule(PROJECT_APP_STORE_MODULE_NAME, projectStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(PROJECT_APP_STORE_MODULE_NAME)) store.unregisterModule(PROJECT_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-project/fetchProject', { id: router.currentRoute.params.id })
      .then(response => {
        projectData.value = response.data
      })
      .catch(error => {
        if (error.response.status === 404) {
          projectData.value = undefined
        }
        if (error.response.status === 500) {
          projectData.value = undefined
        }
      })

    const downloadFile = fileName => {
      store.dispatch('app-project/downloadLink', {
        id: projectData.value.task_id,
        filename: fileName,
      })
        .then(response => {
          window.open(response.data.url)
        })
        .catch(error => {
          if (error.response.status === 404) {
            console.error(error)
          }
          if (error.response.status === 500) {
            console.error(error)
          }
        })
    }

    return {
      projectData,
      downloadFile,
    }
  },
  computed: {
    validationAgreementLetter() {
      return this.projectData.agreement_letter !== undefined
    },
  },
  methods: {
    reset() {
      this.projectData = {}
    },
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
    submitProject() {
      this.$refs.agreementSecondPaymentRules.validate().then(success => {
        if (success) {
          this.isLoading = true
          const request = new FormData()
          request.append('task_id', router.currentRoute.params.id)
          request.append('second_payment_document', this.secondPaymentDocument)
          request.append('second_payment', this.projectData.second_payment)
          request.append('design_recognition', this.projectData.design_recognition)

          const config = {
            header: {
              'Content-Type': 'multipart/form-data',
            },
          }
          this.$http.post('/engine-rest/new-building/second_payment', request, config).then(res => {
            this.result = JSON.parse(JSON.stringify(res.data))
            this.successShow = true
            this.isLoading = false
          }).catch(error => {
            this.isLoading = false
            console.error(error)
            this.showToast('danger', 'Cannot Save', 'There is error when submit data, contact administrator')
          })
        } else {
          this.showToast('danger', 'Cannot Save', 'There is any empty data')
        }
      })
    },
    gotoIndex() {
      router.push({ name: 'admin-project-list' })
    },
  },
}
</script>

<style lang="scss" scoped>
@import "~@core/scss/base/pages/app-project.scss";
@import '@core/scss/vue/libs/vue-select.scss';
</style>

<style lang="scss">
@media print {

  // Global Styles
  body {
    background-color: transparent !important;
  }
  nav.header-navbar {
    display: none;
  }
  .main-menu {
    display: none;
  }
  .header-navbar-shadow {
    display: none !important;
  }
  .content.app-content {
    margin-left: 0;
    padding-top: 2rem !important;
  }
  footer.footer {
    display: none;
  }
  .card {
    background-color: transparent;
    box-shadow: none;
  }
  .customizer-toggle {
    display: none !important;
  }

  // project Specific Styles
  .project-preview-wrapper {
    .row.project-preview {
      .col-md-8 {
        max-width: 100%;
        flex-grow: 1;
      }

      .project-preview-card {
        .card-body:nth-of-type(2) {
          .row {
              > .col-12 {
              max-width: 50% !important;
            }

            .col-12:nth-child(2) {
              display: flex;
              align-items: flex-start;
              justify-content: flex-end;
              margin-top: 0 !important;
            }
          }
        }
      }
    }

    // Action Right Col
    .project-actions {
      display: none;
    }
  }
}
</style>
