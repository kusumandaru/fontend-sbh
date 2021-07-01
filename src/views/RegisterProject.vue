<template>
  <b-form @submit.prevent>
    <b-row>
      <!-- Certification Type -->
      <b-col md="6">
        <h6>Jenis Sertifikasi *</h6>
        <b-form-group>
          <v-select
            v-model="selectedCertification"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="certificationType"
            :options="certificationOption"
          />
        </b-form-group>
      </b-col>

      <!-- Building Type -->
      <b-col md="6">
        <h6>Jenis Gedung *</h6>
        <b-form-group>
          <v-select
            v-model="selectedBuilding"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="buildingType"
            :options="buildingOption"
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
            v-model="selectedProvince"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="provinceType"
            :options="provinceOption"
          />
        </b-form-group>
      </b-col>

      <!-- City -->
      <b-col md="6">
        <h6>Kabupaten/Kota Madya *</h6>
        <b-form-group>
          <v-select
            v-model="selectedCity"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="cityType"
            :options="cityOption"
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

      <!-- submit and reset -->
      <b-col>
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          type="submit"
          variant="primary"
          class="mr-1"
          @click="submitProject"
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
      selectedCertification: { certificationType: 'New Building' },
      certificationOption: [{ certificationType: 'New Building' }],
      selectedBuilding: { buildingType: 'Office' },
      buildingOption: [{ buildingType: 'Office' }, { buildingType: 'Mall' }, { buildingType: 'Hotel' }, { buildingType: 'Hospital' }, { buildingType: 'Apartment' }],
      selectedProvince: { provinceType: 'DKI Jakarta' },
      provinceOption: [{ provinceType: 'DKI Jakarta' }, { provinceType: 'Jawa Timur' }, { provinceType: 'Jawa Barat' }, { provinceType: 'Jawa Tengah' }],
      selectedCity: { cityType: 'Jakarta Selatan' },
      cityOption: [{ cityType: 'Jakarta Selatan' }, { cityType: 'Jakarta Timur' }, { cityType: 'Jakarta Barat' }, { cityType: 'Jakarta Utara' }, { cityType: 'Jakarta Pusat' }],
      buildingAddress: '',
      telephone: '',
      faximile: '',
      postalCode: '',
      buildingName: '',
      owner: '',
      personInCharge: '',
      maxChar: 200,
      required,
      successShow: false,
      result: {},
      resultId: null,
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
      const request = {
        variables: {
          certification_type: {
            value: this.selectedCertification.certificationType, type: 'String',
          },
          building_type: {
            value: this.selectedBuilding.buildingType, type: 'String',
          },
          building_name: {
            value: this.buildingName, type: 'String',
          },
          owner: {
            value: this.owner, type: 'String',
          },
          person_in_charge: {
            value: this.personInCharge, type: 'String',
          },
          province: {
            value: this.selectedProvince.provinceType, type: 'String',
          },
          city: {
            value: this.selectedCity.cityType, type: 'String',
          },
          building_address: {
            value: this.buildingAddress, type: 'String',
          },
          telephone: {
            value: this.telephone, type: 'String',
          },
          faximile: {
            value: this.faximile, type: 'String',
          },
          postalCode: {
            value: this.postalCode, type: 'String',
          },
        },
      }
      this.$http.post('/engine-rest/process-definition/key/new-building-process/submit-form', request).then(res => {
        this.result = JSON.parse(JSON.stringify(res.data))
        this.resultId = this.result.id
        console.log(this.result)
        this.successShow = true
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
