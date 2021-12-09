<template>
  <b-sidebar
    id="sidebar-project-reject"
    sidebar-class="sidebar-lg"
    bg-variant="white"
    shadow
    backdrop
    no-header
    right
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Rejection
        </h5>

        <feather-icon
          class="ml-1 cursor-pointer"
          icon="XIcon"
          size="16"
          @click="hide"
        />

      </div>

      <!-- Body -->
      <b-form
        class="p-2"
        @submit.prevent
      >

        <!-- Note -->
        <b-form-group
          label="Note"
          label-for="rejection-note"
        >
          <b-form-textarea
            id="rejection-note"
            v-model="rejectionData.rejectionNote"
            placeholder="Note"
            rows="5"
            trim
          />
        </b-form-group>

        <!-- Form Actions -->
        <div class="d-flex mt-2">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mr-2"
            type="submit"
            @click="rejectTask"
          >
            Submit
          </b-button>
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="outline-secondary"
            @click="hide"
          >
            Cancel
          </b-button>
        </div>
      </b-form>
    </template>
  </b-sidebar>
</template>

<script>
import {
  BSidebar, BForm, BFormGroup, BFormTextarea, BButton,
} from 'bootstrap-vue'
import { ref } from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'
import store from '@/store'
import router from '@/router'

export default {
  components: {
    BSidebar,
    BForm,
    BFormGroup,
    BFormTextarea,
    BButton,
  },
  directives: {
    Ripple,
  },
  setup() {
    const rejectionData = ref({
      rejectionNote: '',
    })
    const claim = ref(null)

    const rejectTask = () => {
      store.dispatch('app-project/rejectTask', { id: router.currentRoute.params.id, rejectionReason: rejectionData.value.rejectionNote })
        .then(response => {
          claim.value = response.data
        })
        .catch(error => {
          if (error.response.status === 404) {
            claim.value = undefined
          }
          if (error.response.status === 500) {
            claim.value = undefined
          }
        })
        .finally(() => {
          router.push({ name: 'admin-project-list' })
        })
    }

    return {
      rejectionData,
      rejectTask,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
