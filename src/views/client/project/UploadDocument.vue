<template>
  <validation-observer ref="uploadDocumentRules">
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

        <!--Building Plan -->
        <b-col md="12">
          <b-form-group>
            <label>Gambar denah bangunan</label>
            <validation-provider
              #default="{ errors }"
              name="Gambar Denah Bangunan"
              :rules="validationBuildingPlan ? '' : 'required'"
            >
              <b-form-file
                v-model.lazy="buildingPlan"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
              />
              <small class="text-danger">{{ errors[0] }}</small>
              <b-card-text class="my-1">
                Selected file: <strong>{{ buildingPlan ? buildingPlan.name : '' }}</strong>
              </b-card-text>
            </validation-provider>
            <b-card-text
              v-if="projectData.building_plan"
              class="mb-0"
            >
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="flat-primary"
                @click="downloadFile('building_plan')"
              >
                <feather-icon icon="ArchiveIcon" />
                Download Gambar denah bangunan
              </b-button>
            </b-card-text>
          </b-form-group>
        </b-col>

        <!--RT / RW -->
        <b-col md="12">
          <b-form-group>
            <label>Peta RT/RW</label>
            <validation-provider
              #default="{ errors }"
              name="Peta RT/RW"
              :rules="validationRtRw ? '' : 'required'"
            >
              <b-form-file
                v-model.lazy="rtRw"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
              />
              <small class="text-danger">{{ errors[0] }}</small>
              <b-card-text class="my-1">
                Selected file: <strong>{{ rtRw ? rtRw.name : '' }}</strong>
              </b-card-text>
            </validation-provider>
            <b-card-text
              v-if="projectData.rt_rw"
              class="mb-0"
            >
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="flat-primary"
                @click="downloadFile('rt_rw')"
              >
                <feather-icon icon="ArchiveIcon" />
                Download Peta RT/RW
              </b-button>
            </b-card-text>
          </b-form-group>
        </b-col>

        <!--UPL dan UKL -->
        <b-col md="12">
          <b-form-group>
            <label>Salinan UPL/UKL</label>
            <validation-provider
              #default="{ errors }"
              name="Salinan UPL/UKL"
              :rules="validationUplUkl ? '' : 'required'"
            >
              <b-form-file
                v-model.lazy="uplUkl"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
              />
              <small class="text-danger">{{ errors[0] }}</small>
              <b-card-text class="my-1">
                Selected file: <strong>{{ uplUkl ? uplUkl.name : '' }}</strong>
              </b-card-text>
            </validation-provider>
            <b-card-text
              v-if="projectData.upl_ukl"
              class="mb-0"
            >
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="flat-primary"
                @click="downloadFile('upl_ukl')"
              >
                <feather-icon icon="ArchiveIcon" />
                Download Salinan UPL/UKL
              </b-button>
            </b-card-text>
          </b-form-group>
        </b-col>

        <!--Syarat tahan gempa -->
        <b-col md="12">
          <b-form-group>
            <label>Syarat Tahan Gempa</label>
            <validation-provider
              #default="{ errors }"
              name="Syarat tahan gempa"
              :rules="validationEarthquakeResistance ? '' : 'required'"
            >
              <b-form-file
                v-model.lazy="earthquakeResistance"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
              />
              <small class="text-danger">{{ errors[0] }}</small>
              <b-card-text class="my-1">
                Selected file: <strong>{{ earthquakeResistance ? earthquakeResistance.name : '' }}</strong>
              </b-card-text>
            </validation-provider>
            <b-card-text
              v-if="projectData.earthquake_resistance"
              class="mb-0"
            >
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="flat-primary"
                @click="downloadFile('earthquake_resistance')"
              >
                <feather-icon icon="ArchiveIcon" />
                Download Syarat Tahan Gempa
              </b-button>
            </b-card-text>
          </b-form-group>
        </b-col>

        <!--Syarat Penyandang Cacat -->
        <b-col md="12">
          <b-form-group>
            <label>Syarat Penyandang Cacat</label>
            <validation-provider
              #default="{ errors }"
              name="Syarat penyandang cacat"
              :rules="validationDisabilityFriendly ? '' : 'required'"
            >
              <b-form-file
                v-model.lazy="disabilityFriendly"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
              />
              <small class="text-danger">{{ errors[0] }}</small>
              <b-card-text class="my-1">
                Selected file: <strong>{{ disabilityFriendly ? disabilityFriendly.name : '' }}</strong>
              </b-card-text>
            </validation-provider>
            <b-card-text
              v-if="projectData.disability_friendly"
              class="mb-0"
            >
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="flat-primary"
                @click="downloadFile('disability_friendly')"
              >
                <feather-icon icon="ArchiveIcon" />
                Download Syarat Penyandang Cacat
              </b-button>
            </b-card-text>
          </b-form-group>
        </b-col>

        <!--Syarat Keselamatan dan Kebakaran -->
        <b-col md="12">
          <b-form-group>
            <label>Syarat Keselamatan dan Kebakaran</label>
            <validation-provider
              #default="{ errors }"
              name="Syarat Keselamatan dan kebakaran"
              :rules="validationSafetyAndFireRequirement ? '' : 'required'"
            >
              <b-form-file
                v-model.lazy="safetyAndFireRequirement"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
              />
              <small class="text-danger">{{ errors[0] }}</small>
              <b-card-text class="my-1">
                Selected file: <strong>{{ safetyAndFireRequirement ? safetyAndFireRequirement.name : '' }}</strong>
              </b-card-text>
            </validation-provider>
            <b-card-text
              v-if="projectData.safety_and_fire_requirement"
              class="mb-0"
            >
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="flat-primary"
                @click="downloadFile('safety_and_fire_requirement')"
              >
                <feather-icon icon="ArchiveIcon" />
                Download Syarat Keselamatan dan Kebakaran
              </b-button>
            </b-card-text>
          </b-form-group>
        </b-col>

        <!--Pernyataan Bersedia Studi Kasus -->
        <b-col md="12">
          <b-form-group>
            <label>Pernyataan Bersedia Studi Kasus</label>
            <validation-provider
              #default="{ errors }"
              name="Pernyataan bersedia studi kasus"
              :rules="validationStudyCaseReadiness ? '' : 'required'"
            >
              <b-form-file
                v-model.lazy="studyCaseReadiness"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
              />
              <small class="text-danger">{{ errors[0] }}</small>
              <b-card-text class="my-1">
                Selected file: <strong>{{ studyCaseReadiness ? studyCaseReadiness.name : '' }}</strong>
              </b-card-text>
            </validation-provider>
            <b-card-text
              v-if="projectData.study_case_readiness"
              class="mb-0"
            >
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="flat-primary"
                @click="downloadFile('study_case_readiness')"
              >
                <feather-icon icon="ArchiveIcon" />
                Download Pernyataan Bersedia Studi Kasus
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
            @click="submitProject"
            :disabled="isLoading"
          >
            <b-spinner
              small
              type="grow"
              v-if="isLoading"
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
        ok-only
        ok-variant="success"
        ok-title="Accept"
        @ok="gotoIndex"
        modal-class="modal-success"
        centered
        title="Success Modal"
        v-model.lazy="successShow"
      >
        <b-card-text>
          <h5>Data success to submit</h5>
          <p v-html="resultId"></p>
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
  BFormFile,
  BFormGroup,
  BForm,
  BButton,
  BModal,
  BSpinner,
} from 'bootstrap-vue'
import {
  ref, onUnmounted, reactive,
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
    BFormFile,
    BFormGroup,
    BForm,
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
      buildingPlan: null,
      rtRw: null,
      uplUkl: null,
      earthquakeResistance: null,
      disabilityFriendly: null,
      safetyAndFireRequirement: null,
      studyCaseReadiness: null,
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

    const paymentProps = reactive({
      center: true,
      fluidGrow: true,
      blank: true,
      blankColor: '#bbb',
      class: 'my-5',
    })

    // Register module
    if (!store.hasModule(PROJECT_APP_STORE_MODULE_NAME)) store.registerModule(PROJECT_APP_STORE_MODULE_NAME, projectStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(PROJECT_APP_STORE_MODULE_NAME)) store.unregisterModule(PROJECT_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-project/fetchProject', { id: router.currentRoute.params.id })
      .then(response => {
        projectData.value = response.data
        paymentProps.blank = false
        paymentProps.src = response.data.proof_of_payment_url
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
    validationBuildingPlan() {
      return this.projectData.building_plan !== undefined
    },
    validationRtRw() {
      return this.projectData.rt_rw !== undefined
    },
    validationUplUkl() {
      return this.projectData.upl_ukl !== undefined
    },
    validationEarthquakeResistance() {
      return this.projectData.earthquake_resistance !== undefined
    },
    validationDisabilityFriendly() {
      return this.projectData.disability_friendly !== undefined
    },
    validationSafetyAndFireRequirement() {
      return this.projectData.safety_and_fire_requirement !== undefined
    },
    validationStudyCaseReadiness() {
      return this.projectData.study_case_readiness !== undefined
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
      this.$refs.uploadDocumentRules.validate().then(success => {
        if (success) {
          this.isLoading = true
          const request = new FormData()
          request.append('task_id', router.currentRoute.params.id)
          request.append('building_plan', this.buildingPlan)
          request.append('rt_rw', this.rtRw)
          request.append('upl_ukl', this.uplUkl)
          request.append('earthquake_resistance', this.earthquakeResistance)
          request.append('disability_friendly', this.disabilityFriendly)
          request.append('safety_and_fire_requirement', this.safetyAndFireRequirement)
          request.append('study_case_readiness', this.studyCaseReadiness)

          const config = {
            header: {
              'Content-Type': 'multipart/form-data',
            },
          }
          this.$http.post('/engine-rest/new-building/upload-eligibility-document', request, config).then(res => {
            this.result = JSON.parse(JSON.stringify(res.data))
            console.log(this.result)
            this.successShow = true
            this.isLoading = false
          }).catch(function (error) {
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
      router.push({ name: 'client-project-list' })
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
