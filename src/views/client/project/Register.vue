<template>
  <validation-observer ref="registerRules">
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
                id="certification_type"
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
                  v-model.lazy="buildingName"
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
                  v-model.lazy="personInCharge"
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
                v-model.lazy="owner"
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
                  v-model.lazy="buildingAddress"
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

        <b-col md="12">
          <b-form-group>
            <label>Kode Pos</label>
            <validation-provider
              #default="{ errors }"
              rules="required|integer|min:5"
              name="PostalCode"
            >
              <b-form-input
                v-model.lazy="postalCode"
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
                v-model.lazy="telephone"
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
                v-model.lazy="faximile"
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
                v-model.lazy="handphone"
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
                v-model.lazy="email"
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
                  v-model.lazy="grossFloorArea"
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
            <validation-provider
              #default="{ errors }"
              name="Bukti Pembayaran"
              rules="required"
            >
              <b-form-file
                v-model="proofOfPayment"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
              />
              <small class="text-danger">{{ errors[0] }}</small>
              <b-card-text class="my-1">
                Selected file: <strong>{{ proofOfPayment ? proofOfPayment.name : '' }}</strong>
              </b-card-text>
            </validation-provider>
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
import router from '@/router'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  required, email, confirmed, url, between, alpha, integer, password, min, digits, alphaDash, length,
} from '@validations'
import useJwt from '@/auth/jwt/useJwt'

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
      selectedCertification: '',
      certificationOption: [
        { id: 'new_building', name: 'New Building' },
      ],
      selectedBuilding: '',
      buildingOption: [],
      selectedProvince: '',
      provinceOption: [],
      selectedCity: '',
      cityOption: [],
      selectedDesignRecognition: '',
      designRecognitionOption: [
        { id: 'true', name: 'Need Design Recognition' },
        { id: 'false', name: 'Skip Design Recognition' },
      ],
      buildingAddress: '',
      telephone: '',
      faximile: '',
      handphone: '',
      email: '',
      postalCode: '',
      buildingName: '',
      owner: '',
      personInCharge: '',
      grossFloorArea: 0,
      proofOfPayment: null,
      maxChar: 200,
      successShow: false,
      result: {},
      provinces: {},
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
  computed: {
    validation() {
      return this.userId.length > 4 && this.userId.length < 13
    },
    validationOccupation() {
      return this.occupationID.length > 1
    },
  },
  created() {
    this.getBuildingTypes()
    this.getProvinces()
  },
  methods: {
    reset() {
      this.buildingAddress = ''
      this.telephone = ''
      this.faximile = ''
      this.handphone = ''
      this.email = ''
      this.postalCode = ''
      this.buildingName = ''
      this.owner = ''
      this.personInCharge = ''
      this.grossFloorArea = 0
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
    stringToBoolean(value) {
      switch (value.toLowerCase().trim()) {
        case 'true': case 'yes': case '1': return true
        case 'false': case 'no': case '0': case null: return false
        default: return Boolean(value)
      }
    },
    submitProject() {
      this.$refs.registerRules.validate().then(success => {
        if (success) {
          this.isLoading = true
          const request = new FormData()
          request.append('certification_type', this.selectedCertification.id)
          request.append('building_type', this.selectedBuilding.id)
          request.append('building_name', this.buildingName)
          request.append('owner', this.owner)
          request.append('person_in_charge', this.personInCharge)
          request.append('province', this.selectedProvince.id)
          request.append('city', this.selectedCity.id)
          request.append('building_address', this.buildingAddress)
          request.append('telephone', this.telephone)
          request.append('handphone', this.handphone)
          request.append('email', this.email)
          request.append('faximile', this.faximile)
          request.append('postal_code', this.postalCode)
          request.append('file', this.proofOfPayment)
          request.append('gross_floor_area', this.grossFloorArea)
          request.append('design_recognition', this.stringToBoolean(this.selectedDesignRecognition.id))
          const config = {
            header: {
              'Content-Type': 'multipart/form-data',
              Authorization: useJwt.getToken,
            },
          }
          this.$http.post('/engine-rest/new-building/create-project', request, config).then(res => {
            this.result = JSON.parse(JSON.stringify(res.data))
            this.successShow = true
            this.isLoading = false
          }).catch(error => {
            console.error(error)
            this.isLoading = false
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

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
