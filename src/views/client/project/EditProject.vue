<template>
  <validation-observer ref="editRules">
    <b-form @submit.prevent>
      <b-row>
        <!-- Certification Type -->
        <b-col md="6">
          <h6>Jenis Sertifikasi *</h6>
          <b-form-group>
            <validation-provider
              #default="{ errors }"
              name="Certification Type"
              rules="required"
            >
              <v-select
                id="certificationType"
                v-model="selectedCertification"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="name"
                :options="certificationOption"
                :selectable="option => ! option.id.includes('select_value')"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <!-- Building Type -->
        <b-col md="6">
          <h6>Fungsi Gedung *</h6>
          <b-form-group>
            <validation-provider
              #default="{ errors }"
              name="Building Type"
              rules="required"
            >
              <v-select
                id="building_type"
                v-model="selectedBuilding"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="name_id"
                :options="buildingOption"
                :selectable="option => ! option.code.includes('select_value')"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <!-- building -->
        <b-col cols="12">
          <b-form-group
            label="Nama Gedung *"
            label-for="buildingName"
          >
            <validation-provider
              #default="{ errors }"
              name="Building Name"
              rules="required"
            >
              <b-input-group class="input-group-merge">
                <b-input-group-prepend is-text>
                  <feather-icon icon="HomeIcon" />
                </b-input-group-prepend>
                <b-form-input
                  id="building_name"
                  v-model.lazy="projectData.building_name"
                  type="text"
                  placeholder="Enter Building Name"
                />
              </b-input-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <!-- pic -->
        <b-col cols="12">
          <b-form-group
            label="Penanggung Jawab *"
            label-for="personInCharge"
          >
            <validation-provider
              #default="{ errors }"
              name="Penanggung Jawab"
              rules="required"
            >
              <b-input-group class="input-group-merge">
                <b-input-group-prepend is-text>
                  <feather-icon icon="UserCheckIcon" />
                </b-input-group-prepend>
                <b-form-input
                  id="personInCharge"
                  v-model.lazy="projectData.person_in_charge"
                  type="text"
                  placeholder="Enter PIC Name"
                />
              </b-input-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <!-- owner -->
        <b-col cols="12">
          <b-form-group
            label="Pemilik Gedung"
            label-for="owner"
          >
            <b-input-group class="input-group-merge">
              <b-input-group-prepend is-text>
                <feather-icon icon="UserIcon" />
              </b-input-group-prepend>
              <b-form-input
                id="owner"
                v-model.lazy="projectData.owner"
                type="text"
                placeholder="Enter Owner"
              />
            </b-input-group>
          </b-form-group>
        </b-col>

        <!-- building_address -->
        <b-col cols="12">
          <b-form-group
            label="Alamat Gedung *"
            label-for="buildingAddress"
          >
            <validation-provider
              #default="{ errors }"
              name="Alamat Gedung"
              rules="required"
            >
              <b-input-group class="input-group-merge">
                <b-input-group-prepend is-text>
                  <feather-icon icon="MapIcon" />
                </b-input-group-prepend>
                <b-form-textarea
                  id="building-address"
                  v-model.lazy="projectData.building_address"
                  :state="buildingAddress.length <= 400"
                  placeholder="Enter maximum 400 characters"
                  rows="3"
                />
              </b-input-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <!-- Province -->
        <b-col md="6">
          <h6>Provinsi *</h6>
          <b-form-group>
            <validation-provider
              #default="{ errors }"
              name="Provinsi"
              rules="required"
            >
              <v-select
                id="provinceType"
                v-model="selectedProvince"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="name"
                :options="provinceOption"
                @input="getCities"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <!-- City -->
        <b-col md="6">
          <h6>Kabupaten/Kota Madya *</h6>
          <b-form-group>
            <validation-provider
              #default="{ errors }"
              name="Kabupaten/Kota Madya"
              rules="required"
            >
              <v-select
                id="cityType"
                v-model="selectedCity"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="name"
                :options="cityOption"
              />
               <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <!-- Kode Pos -->
        <b-col md="12">
          <b-form-group>
            <label>Kode Pos</label>
            <validation-provider
              #default="{ errors }"
              rules="required|integer|min:5"
              name="PostalCode"
            >
              <b-form-input
                v-model.lazy="projectData.postal_code"
                :state="errors.length > 0 ? false:null"
                placeholder="Enter Number Only"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <!--Telephone-->
        <b-col md="6">
          <b-form-group>
            <label>Telepon</label>
            <validation-provider
              #default="{ errors }"
              rules="required|integer"
              name="Telephone"
            >
              <b-form-input
                v-model.lazy="projectData.telephone"
                :state="errors.length > 0 ? false:null"
                placeholder="Enter phone number"
                :raw="false"
                :options="options.number"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <!--Faximile -->
        <b-col md="6">
          <b-form-group>
            <label>Faximile</label>
            <validation-provider
              #default="{ errors }"
              rules="integer"
              name="Faximile"
            >
              <b-form-input
                v-model.lazy="projectData.faximile"
                :state="errors.length > 0 ? false:null"
                placeholder="Enter fax number"
                :raw="false"
                :options="options.number"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <!--Handphone-->
        <b-col md="6">
          <b-form-group>
            <label>Handphone</label>
            <validation-provider
              #default="{ errors }"
              rules="required|integer"
              name="Handphone"
            >
              <b-form-input
                v-model.lazy="projectData.handphone"
                :state="errors.length > 0 ? false:null"
                placeholder="Enter mobile phone number"
                :raw="false"
                :options="options.number"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <!--Telephone-->
        <b-col md="6">
          <b-form-group>
            <label>Email</label>
            <validation-provider
              #default="{ errors }"
              rules="required|email"
              name="Email"
            >
              <b-form-input
                v-model.lazy="projectData.email"
                :state="errors.length > 0 ? false:null"
                placeholder="Enter email address"
                :raw="false"
                :options="options.email"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <!-- gross floor area -->
        <b-col cols="12">
          <b-form-group
            label="Total Luas Lantai Gedung (Gross floor area) *"
            label-for="grossFloorArea"
            description="total luas lantai dari semua lantai bangunan dihitung dengan dimensi luar bangunan termasuk struktur, sekat, koridor, tangga"
          >
            <validation-provider
              #default="{ errors }"
              rules="integer"
              name="Gross Floor Area"
            >
              <b-input-group class="input-group-merge">
                <b-input-group-prepend is-text>
                  <feather-icon icon="GlobeIcon" />
                </b-input-group-prepend>
                <b-form-input
                  id="grossFloorArea"
                  v-model.lazy="projectData.gross_floor_area"
                  :raw="false"
                  :options="options.number"
                  placeholder="Fill gross floor area here"
                />
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
              <v-select
                id="certification_type"
                v-model="selectedDesignRecognition"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="name"
                :options="designRecognitionOption"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <!--Proof of payment -->
        <b-col md="12">
          <b-form-group>
            <label>Bukti Pembayaran (Proof of Payment)</label>
            <b-form-file
              v-model="proofOfPayment"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
            />
            <b-card-text class="my-1">
              Selected file: <strong>{{ proofOfPayment ? proofOfPayment.name : '' }}</strong>
            </b-card-text>

            <b-card-text
              v-if="projectData.proof_of_payment"
              class="mb-0"
            >
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="flat-primary"
                @click="downloadFile('proof_of_payment')"
              >
                <feather-icon icon="ArchiveIcon" />
                Download Bukti Pembayaran
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
            type="cancel"
            variant="outline-secondary"
            @click="goToPreview"
          >
            Cancel
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
        v-model="successShow"
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
  BCol,
  BFormFile,
  BFormGroup,
  BFormInput,
  BForm,
  BButton,
  BFormTextarea,
  BInputGroup,
  BInputGroupPrepend,
  BModal,
  BSpinner,
} from 'bootstrap-vue'
import {
  ref, onUnmounted, reactive,
} from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
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
    BCol,
    BFormFile,
    BFormGroup,
    BInputGroup,
    BInputGroupPrepend,
    BFormInput,
    BForm,
    BFormTextarea,
    BButton,
    BModal,
    BSpinner,
    ValidationProvider,
    ValidationObserver,
    vSelect,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      certificationOption: [
        { id: 'new_building', name: 'New Building' },
      ],
      buildingOption: [],
      provinceOption: [],
      cityOption: [],
      // designRecognitionOption: [
      //   { id: 'true', name: 'Need Design Recognition' },
      //   { id: 'false', name: 'Skip Design Recognition' },
      // ],
      proofOfPayment: null,
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

    let buildingAddress = ref('')
    const selectedCertification = reactive({
      id: 'new_building',
      name: 'New Building',
    })
    const selectedBuilding = reactive({
      id: '',
      name_id: '',
    })
    const selectedProvince = reactive({
      id: '',
      name: '',
    })
    const selectedCity = reactive({
      id: '',
      name: '',
    })
    const selectedDesignRecognition = reactive({
      id: '',
      name: '',
    })
    const designRecognitionOption = reactive([
      { id: 'true', name: 'Need Design Recognition' },
      { id: 'false', name: 'Skip Design Recognition' },
    ])

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
        selectedProvince.id = response.data.province
        selectedProvince.name = response.data.province_name
        selectedCity.id = response.data.city
        selectedCity.name = response.data.city_name
        selectedBuilding.id = response.data.building_type
        selectedBuilding.name_id = response.data.building_type_name
        buildingAddress = response.data.building_address
        selectedDesignRecognition.id = response.data.design_recognition.toString()
        selectedDesignRecognition.name = response.data.design_recognition ? 'Need Design Recognition' : 'Skip Design Recognition'
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
      selectedBuilding,
      selectedCertification,
      selectedProvince,
      selectedCity,
      selectedDesignRecognition,
      designRecognitionOption,
      paymentProps,
      downloadFile,
      buildingAddress,
    }
  },
  created() {
    this.getBuildingTypes()
    this.getProvinces()
  },
  computed: {
    validation() {
      return this.userId.length > 4 && this.userId.length < 13
    },
    validationOccupation() {
      return this.occupationID.length > 1
    },
  },
  methods: {
    reset() {
      this.projectData = {}
      this.selectedProvince = {}
      this.selectedCity = {}
      this.selectedBuilding = {}
      this.selectedDesignRecognition = {}
    },
    getProvinces() {
      this.$http.get('/engine-rest/master/provinces').then(res => {
        this.provinceOption = JSON.parse(JSON.stringify(res.data))
      }).catch(error => {
        console.error(error)
      })
    },
    getCities(value) {
      this.$http.get(`/engine-rest/master/provinces/${value.id}/cities`).then(res => {
        this.cityOption = JSON.parse(JSON.stringify(res.data))
        this.selectedCity = {}
      }).catch(error => {
        console.error(error)
      })
    },
    getBuildingTypes() {
      this.$http.get('/engine-rest/master/building_types').then(res => {
        this.buildingOption = JSON.parse(JSON.stringify(res.data))
      }).catch(error => {
        console.error(error)
      })
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
      this.$refs.editRules.validate().then(success => {
        if (success) {
          this.isLoading = true
          const request = new FormData()
          request.append('certification_type', this.selectedCertification.id)
          request.append('building_type', this.selectedBuilding.id)
          request.append('building_name', this.projectData.building_name)
          request.append('owner', this.projectData.owner)
          request.append('person_in_charge', this.projectData.person_in_charge)
          request.append('province', this.selectedProvince.id)
          request.append('city', this.selectedCity.id)
          request.append('building_address', this.projectData.building_address)
          request.append('telephone', this.projectData.telephone)
          request.append('handphone', this.projectData.handphone)
          request.append('email', this.projectData.email)
          request.append('faximile', this.projectData.faximile)
          request.append('postal_code', this.projectData.postal_code)
          request.append('file', this.proofOfPayment)
          request.append('design_recognition', this.stringToBoolean(this.selectedDesignRecognition.id))
          request.append('gross_floor_area', this.projectData.gross_floor_area)
          const config = {
            header: {
              'Content-Type': 'multipart/form-data',
            },
          }
          this.$http.patch(`/engine-rest/new-building/edit-project/${router.currentRoute.params.id}`, request, config).then(res => {
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
    goToPreview() {
      router.push({ name: 'client-project-preview', params: { id: router.currentRoute.params.id } })
    },
    stringToBoolean(value) {
      switch (value.toLowerCase().trim()) {
        case 'true': case 'yes': case '1': return true
        case 'false': case 'no': case '0': case null: return false
        default: return Boolean(value)
      }
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
