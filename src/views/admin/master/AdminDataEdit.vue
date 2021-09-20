<template>
  <validation-observer ref="editAdminData">
    <b-form @submit.prevent>
      <b-row>
        <!-- manager namee -->
        <b-col cols="12">
          <b-form-group
            label="Manager Name"
            label-for="manager_name"
          >
            <validation-provider
              #default="{ errors }"
              name="Manager Name"
              rules="required"
            >
              <b-input-group class="input-group-merge">
                <b-input-group-prepend is-text>
                  <feather-icon icon="UserIcon" />
                </b-input-group-prepend>
                <b-form-input
                  id="manager_name"
                  v-model.lazy="adminData.manager_name"
                  type="text"
                  placeholder="Enter Manager Name"
                />
              </b-input-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <!--Manager Signature -->
        <b-col md="12">
          <b-form-group>
            <label>Tanda tangan manager</label>
            <b-form-file
              v-model="managerSignature"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
            />
            <b-card-text
              v-if="adminData.manager_signature"
              class="mb-0"
            >
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="flat-primary"
                @click="downloadFile('manager_signature')"
              >
                <feather-icon icon="ArchiveIcon" />
                old file : {{ adminData.manager_signature }}
              </b-button>
            </b-card-text>
            <b-card-text class="my-1">
              Selected file: <strong>{{ managerSignature ? managerSignature.name : '' }}</strong>
            </b-card-text>
          </b-form-group>
        </b-col>

        <!--Registration letter -->
        <b-col md="12">
          <b-form-group>
            <label>Perjanjian Kerjasama</label>
            <b-form-file
              v-model="registrationLetter"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
            />
            <b-card-text
              v-if="adminData.registration_letter"
              class="mb-0"
            >
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="flat-primary"
                @click="downloadFile('registration_letter')"
              >
                <feather-icon icon="ArchiveIcon" />
                old file : {{ adminData.registration_letter }}
              </b-button>
            </b-card-text>
            <b-card-text class="my-1">
              Selected file: <strong>{{ registrationLetter ? registrationLetter.name : '' }}</strong>
            </b-card-text>
          </b-form-group>
        </b-col>

        <!--First Attachment -->
        <b-col md="12">
          <b-form-group>
            <label>Lampiran Pertama</label>
            <b-form-file
              v-model="firstAttachment"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
            />
            <b-card-text
              v-if="adminData.first_attachment"
              class="mb-0"
            >
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="flat-primary"
                @click="downloadFile('first_attachment')"
              >
                <feather-icon icon="ArchiveIcon" />
                old file : {{ adminData.first_attachment }}
              </b-button>
            </b-card-text>
            <b-card-text class="my-1">
              Selected file: <strong>{{ firstAttachment ? firstAttachment.name : '' }}</strong>
            </b-card-text>
          </b-form-group>
        </b-col>

        <!--Second Attachment -->
        <b-col md="12">
          <b-form-group>
            <label>Lampiran Kedua</label>
            <b-form-file
              v-model="secondAttachment"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
            />
            <b-card-text
              v-if="adminData.second_attachment"
              class="mb-0"
            >
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="flat-primary"
                @click="downloadFile('second_attachment')"
              >
                <feather-icon icon="ArchiveIcon" />
                old file : {{ adminData.second_attachment }}
              </b-button>
            </b-card-text>
            <b-card-text class="my-1">
              Selected file: <strong>{{ secondAttachment ? secondAttachment.name : '' }}</strong>
            </b-card-text>
          </b-form-group>
        </b-col>

        <!--Third Attachment -->
        <b-col md="12">
          <b-form-group>
            <label>Lampiran Ketiga</label>
            <b-form-file
              v-model="thirdAttachment"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
            />
            <b-card-text
              v-if="adminData.third_attachment"
              class="mb-0"
            >
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="flat-primary"
                @click="downloadFile('third_attachment')"
              >
                <feather-icon icon="ArchiveIcon" />
                old file : {{ adminData.third_attachment }}
              </b-button>
            </b-card-text>
            <b-card-text class="my-1">
              Selected file: <strong>{{ thirdAttachment ? thirdAttachment.name : '' }}</strong>
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
            @click="submitAdminData"
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
            @click="showAdminData"
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
        @ok="showAdminData"
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
import store from '@/store/index'
import 'vue-good-table/dist/vue-good-table.css'
import {
  ref, onUnmounted,
} from '@vue/composition-api'
import {
  BRow,
  BCol,
  BCardText,
  BButton,
  BSpinner,
  BFormFile,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupPrepend,
  BModal,
  BForm,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import projectStoreModule from '@/views/projectStoreModule'
import router from '@/router'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  required, confirmed,
} from '@validations'

export default {
  directives: {
    Ripple,
  },
  components: {
    BRow,
    BCol,
    BButton,
    BSpinner,
    BCardText,
    BFormFile,
    BFormGroup,
    BInputGroup,
    BInputGroupPrepend,
    BFormInput,
    BForm,
    BModal,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      pageLength: 20,
      dir: false,
      managerSignature: null,
      registrationLetter: null,
      firstAttachment: null,
      secondAttachment: null,
      thirdAttachment: null,
      successShow: false,
      result: {},
      resultId: null,
      isLoading: false,
      options: {
        propertiesPanel: {},
        additionalModules: [],
        moddleExtensions: [],
      },
      required,
      confirmed,

    }
  },
  computed: {
    direction() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = true
        return this.dir
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = false
      return this.dir
    },
  },
  setup() {
    const adminData = ref({})
    const PROJECT_APP_STORE_MODULE_NAME = 'app-project'

    // Register module
    if (!store.hasModule(PROJECT_APP_STORE_MODULE_NAME)) store.registerModule(PROJECT_APP_STORE_MODULE_NAME, projectStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(PROJECT_APP_STORE_MODULE_NAME)) store.unregisterModule(PROJECT_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-project/fetchAdminData')
      .then(response => {
        adminData.value = response.data
      })
      .catch(error => {
        if (error.response.status === 404) {
          adminData.value = undefined
        }
        if (error.response.status === 500) {
          adminData.value = undefined
        }
      })

    const downloadFile = fileName => {
      store.dispatch('app-project/downloadMasterLink', {
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

    const updateAdminData = () => {
      router.push({ name: 'admin-data-edit' })
    }

    const showAdminData = () => {
      router.push({ name: 'admin-data' })
    }

    return {
      downloadFile,
      adminData,
      updateAdminData,
      showAdminData,
    }
  },
  methods: {
    retrieveAdminData() {
      this.$http.get('engine-rest/master/master_admins')
        .then(res => {
          this.adminData = res.data
        })
    },
    /* eslint-disable object-shorthand */
    handleError(err) {
      console.error('failed to show diagram', err)
    },
    /* eslint-enable object-shorthand */
    submitAdminData() {
      this.$refs.editAdminData.validate().then(success => {
        if (success) {
          this.isLoading = true
          const request = new FormData()
          request.append('manager_name', this.adminData.manager_name)
          request.append('manager_signature', this.managerSignature)
          request.append('registration_letter', this.registrationLetter)
          request.append('first_attachment', this.firstAttachment)
          request.append('second_attachment', this.secondAttachment)
          request.append('third_attachment', this.thirdAttachment)

          const config = {
            header: {
              'Content-Type': 'multipart/form-data',
            },
          }
          this.$http.post('/engine-rest/master/master_admins', request, config).then(res => {
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
  },
}
</script>

<style lang="scss" scoped>
@import "~@core/scss/base/pages/app-project.scss";
</style>
