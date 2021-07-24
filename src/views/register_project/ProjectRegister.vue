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
          <h6>Jenis Gedung *</h6>
          <b-form-group>
            <validation-provider
              #default="{ errors }"
              name="Building Type"
              rules="required"
            >
              <v-select
                id="buildingType"
                v-model="selectedBuilding"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="name"
                :options="buildingOption"
                :selectable="option => ! option.id.includes('select_value')"
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
                  id="buildingName"
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
            label="Pemilik"
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

        <!-- gross floor area -->
        <b-col cols="12">
          <b-form-group
            label="Gross floor area *"
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

        <!--Proof of payment -->
        <b-col md="12">
          <b-form-group>
            <label>Proof of Payment</label>
            <b-form-file
              v-model="proofOfPayment"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
            />

            <b-card-text class="my-1">
              Selected file: <strong>{{ proofOfPayment ? proofOfPayment.name : '' }}</strong>
            </b-card-text>
          </b-form-group>
        </b-col>

        <!-- submit and reset -->
        <b-col>
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            type="submit"
            variant="primary"
            class="mr-1"
            @click="submitProject"
            :disabled="isLoading"
          >
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
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  required, email, confirmed, url, between, alpha, integer, password, min, digits, alphaDash, length,
} from '@validations'

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
      buildingOption: [
        { id: 'office', name: 'Office' },
        { id: 'mall', name: 'Mall' },
        { id: 'hotel', name: 'Hotel' },
        { id: 'hospital', name: 'Hospital' },
        { id: 'apartment', name: 'Apartment' },
      ],
      selectedProvince: '',
      provinceOption: [],
      selectedCity: '',
      cityOption: [],
      buildingAddress: '',
      telephone: '',
      faximile: '',
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
      isLoading: null,
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
  created() {
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
      this.buildingAddress = ''
      this.telephone = ''
      this.faximile = ''
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
        console.log(error)
      })
    },
    getCities(value) {
      this.$http.get(`/engine-rest/master/provinces/${value.id}/cities`).then(res => {
        this.cityOption = JSON.parse(JSON.stringify(res.data))
      }).catch(error => {
        console.log(error)
      })
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
          request.append('faximile', this.faximile)
          request.append('postal_code', this.postalCode)
          request.append('file', this.proofOfPayment)
          request.append('gross_floor_area', this.grossFloorArea)
          const config = {
            header: {
              'Content-Type': 'multipart/form-data',
            },
          }
          this.$http.post('/engine-rest/new-building/create-project', request, config).then(res => {
            this.result = JSON.parse(JSON.stringify(res.data))
            this.resultId = this.result.id
            console.log(this.result)
            this.successShow = true
            this.isLoading = false
          }).catch(function (error) {
            this.isLoading = false
            console.log(error)
          })
        }
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
