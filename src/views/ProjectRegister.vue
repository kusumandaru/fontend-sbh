<template>
  <b-form @submit.prevent>
    <b-row>
      <!-- Certification Type -->
      <b-col md="6">
        <h6>Jenis Sertifikasi *</h6>
        <b-form-group>
          <v-select
            id="certificationType"
            v-model="selectedCertification"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="text"
            :options="certificationOption"
            :selectable="option => ! option.value.includes('select_value')"
          />
        </b-form-group>
      </b-col>

      <!-- Building Type -->
      <b-col md="6">
        <h6>Jenis Gedung *</h6>
        <b-form-group>
          <v-select
            id="buildingType"
            v-model="selectedBuilding"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="text"
            :options="buildingOption"
            :selectable="option => ! option.value.includes('select_value')"
          />
        </b-form-group>
      </b-col>

      <!-- pic -->
      <b-col cols="12">
        <b-form-group
          label="Nama Gedung *"
          label-for="buildingName"
        >
          <b-input-group class="input-group-merge">
            <b-input-group-prepend is-text>
              <feather-icon icon="HomeIcon" />
            </b-input-group-prepend>
            <b-form-input
              id="buildingName"
              v-model="buildingName"
              type="text"
              placeholder="Enter Building Name"
            />
          </b-input-group>
        </b-form-group>
      </b-col>

      <!-- pic -->
      <b-col cols="12">
        <b-form-group
          label="Penanggung Jawab *"
          label-for="personInCharge"
        >
          <b-input-group class="input-group-merge">
            <b-input-group-prepend is-text>
              <feather-icon icon="UserIcon" />
            </b-input-group-prepend>
            <b-form-input
              id="personInCharge"
              v-model="personInCharge"
              type="text"
              placeholder="Enter PIC Name"
            />
          </b-input-group>
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
              v-model="owner"
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
          <b-input-group class="input-group-merge">
            <b-input-group-prepend is-text>
              <feather-icon icon="HomeIcon" />
            </b-input-group-prepend>
            <b-form-textarea
              id="building-address"
              v-model="buildingAddress"
              :state="buildingAddress.length <= 200"
              placeholder="Enter maximum 200 characters"
              rows="3"
            />
          </b-input-group>
        </b-form-group>
      </b-col>

      <!-- Province -->
      <b-col md="6">
        <h6>Propinsi *</h6>
        <b-form-group>
          <v-select
            id="provinceType"
            v-model="selectedProvince"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="text"
            :options="provinceOption"
            :selectable="option => ! option.value.includes('select_value')"
          />
        </b-form-group>
      </b-col>

      <!-- City -->
      <b-col md="6">
        <h6>Kabupaten/Kota Madya *</h6>
        <b-form-group>
          <v-select
            id="cityType"
            v-model="selectedCity"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="text"
            :options="cityOption"
            :selectable="option => ! option.value.includes('select_value')"
          />
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
              v-model="postalCode"
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
            rules="required|alpha-dash"
            name="Telephone"
          >
            <b-form-input
              v-model="telephone"
              :state="errors.length > 0 ? false:null"
              placeholder="Enter Character, Numbers, Dash, Underscores"
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
            rules="required|alpha-dash"
            name="Faximile"
          >
            <b-form-input
              v-model="faximile"
              :state="errors.length > 0 ? false:null"
              placeholder="Enter Character, Numbers, Dash, Underscores"
            />
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
import { ValidationProvider } from 'vee-validate'
import {
  required,
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
    vSelect,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      selectedCertification: '',
      certificationOption: [
        { value: 'select_value', text: 'Select Value' },
        { value: 'new_building', text: 'New Building' },
      ],
      selectedBuilding: '',
      buildingOption: [
        { value: 'office', text: 'Office' },
        { value: 'mall', text: 'Mall' },
        { value: 'hotel', text: 'Hotel' },
        { value: 'hospital', text: 'Hospital' },
        { value: 'apartment', text: 'Apartment' },
      ],
      selectedProvince: '',
      provinceOption: [
        { value: 'dki_jakarta', text: 'DKI Jakarta' },
        { value: 'east_java', text: 'Jawa Timur' },
        { value: 'west_java', text: 'Jawa Barat' },
        { value: 'central_java', text: 'Jawa Tengah' },
      ],
      selectedCity: '',
      cityOption: [
        { value: 'south_jakarta', text: 'Jakarta Selatan' },
        { value: 'east_jakarta', text: 'Jakarta Timur' },
        { value: 'west_jakarta', text: 'Jakarta Barat' },
        { value: 'north_jakarta', text: 'Jakarta Utara' },
        { value: 'central_jakarta', text: 'Jakarta Pusat' },
      ],
      buildingAddress: '',
      telephone: '',
      faximile: '',
      postalCode: '',
      buildingName: '',
      owner: '',
      personInCharge: '',
      proofOfPayment: null,
      maxChar: 200,
      required,
      successShow: false,
      result: {},
      resultId: null,
      isLoading: null,
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
  methods: {
    reset() {
      this.buildingAddress = ''
      this.telephone = ''
      this.faximile = ''
      this.postalCode = ''
      this.buildingName = ''
      this.owner = ''
      this.personInCharge = ''
    },
    submitProject() {
      this.isLoading = true
      const request = new FormData()
      request.append('certification_type', this.certification_type)
      request.append('selected_building', this.selectedBuilding)
      request.append('building_name', this.buildingName)
      request.append('owner', this.owner)
      request.append('person_in_charge', this.personInCharge)
      request.append('selected_province', this.selectedProvince)
      request.append('selected_city', this.selectedCity)
      request.append('building_address', this.buildingAddress)
      request.append('telephone', this.telephone)
      request.append('faximile', this.faximile)
      request.append('postal_code', this.postalCode)
      request.append('file', this.proofOfPayment)

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
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
