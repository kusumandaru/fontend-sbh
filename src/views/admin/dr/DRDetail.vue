<template>
  <div v-if="options">
    <b-card class="card-app-design">
      <div class="d-flex align-items-center">
        <b-avatar
          rounded
          size="42"
          variant="light-primary"
          class="mr-1"
        >
          <feather-icon
            :icon="options.icon"
            size="20"
          />
        </b-avatar>
        <div>
          <h4 class="mb-0">
            {{ options.title }}
          </h4>
          <span>{{ options.subtitle }}</span>
        </div>

        <div class="design-planning-wrapper" style="position:absolute; right:20px;">
          <div class="design-planning">
            <p class="card-text mb-25">
              Max Score
            </p>
            <h6 class="mb-0">
              {{ options.max_score }}
            </h6>
          </div>
        </div>
      </div>
    </b-card>

    <!-- collapse -->
    <app-collapse
      id="d-r-detail"
      accordion
      type="margin"
      class="mt-2"
    >

      <app-collapse-item
        v-for="( data,index) in options.qandA"
        :key="index"
        :title="data.question"
        :subtitle="data.status"
        :headerBgVariant="data.selected ? 'primary' : 'warning'"
      >
      <p v-html="data.ans"></p>

      <!-- Spacer -->
      <hr class="project-spacing">

      <!-- scoring -->
      <b-form-group
        label-cols="4"
        label-cols-lg="2"
        label="Nilai"
        label-for="input-default"
      >
        <b-form-input
          id="input-default"
          :placeholder="data.reference_score"
        />
      </b-form-group>

      <b-form-group
        label-cols="4"
        label-cols-lg="2"
        label="Nilai Potensial"
        label-for="input-default"
      >
        <b-form-input
          id="input-default"
          :placeholder="data.reference_score"
        />
      </b-form-group>
      <!-- scoring -->

      <!-- Spacer -->
      <hr class="project-spacing">

      <b-table
        :fields="criteriaFields"
        :items="data.criterias"
        responsive
        class="mb-0"
      >
        <template #cell(show_details)="row">
          <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
          <b-form-checkbox
            v-model="row.detailsShowing"
            @change="row.toggleDetails"
            :disabled="!row.item.selected"
          >
            {{ row.detailsShowing ? 'Hide' : 'Show' }}
          </b-form-checkbox>
        </template>

        <!-- full detail on click -->
        <template #row-details="row">
          <b-card>
            <b-row class="mb-2">
              <!-- <b-col
                md="4"
                class="mb-1"
              >
                <strong>Link : </strong>{{ row.item.link }}
              </b-col>

              <b-col
                md="4"
                class="mb-1"
              >
                <strong>Creator : </strong>{{ row.item.uploader }}
              </b-col>

              <b-col
                md="4"
                class="mb-1"
              >
                <strong>Created At : </strong>{{ row.item.created_at }}
              </b-col> -->

              <!-- <b-col
                md="4"
                class="mb-1"
              >
                <b-form-select
                  v-model="selectedStatus"
                  :options="statusOptions"
                />
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  type="submit"
                  variant="primary"
                >
                  Submit
                </b-button>
              </b-col> -->
              <b-table
                responsive
                :items="row.item.documents"
                :fields="documentFields"
                class="mb-0"
              >
                <template #cell(document_name)="data">
                  <a :href="`${data.item.link}`">
                    {{ data.value }}
                  </a>
                </template>
              </b-table>
            </b-row>
          </b-card>
          <b-card>
            <b-button
              size="sm"
              variant="outline-secondary"
              @click="row.toggleDetails"
            >
              Hide Details
            </b-button>
          </b-card>
        </template>
        <template #cell(link)="link">
          <a :href="`${link.value}`">
            download
          </a>
        </template>
        <template #cell(status)="status">
          <b-badge :variant="documentStatus[1][status.value]">
            {{ documentStatus[0][status.value] }}
          </b-badge>
        </template>
        <template #cell(name)="name">
          <div v-html="name.value"></div>
        </template>
      </b-table>

      <!-- explanation  -->
      <div class="apply-job-package bg-light-primary rounded" v-if="data.explanation">
        <div class="text-body">
          <p v-html="data.explanation"></p>
        </div>
      </div>
      <!--/ explanation  -->

      <!-- Spacer -->
      <hr class="project-spacing">

      <!-- placeholder -->
      <div v-if="data.placeholder">
        <label for="textarea-default">Internal Notes</label>
        <quill-editor
          v-model="data.placeholder"
          :options="snowOption"
        />
        <!-- <span v-html="data.placeholder"></span> -->
      </div>
      <!-- placeholder -->

      <!-- status -->
      <p></p>
      <b-col md="6">
        <h6>Approval</h6>
        <b-form-group>
          <v-select
            v-model="selectedStatus"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="statusOptions"
            label="text"
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
        </b-form-group>
      </b-col>
      <!-- status -->

      <!-- save button -->
      <p></p>
      <b-col cols="12">
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="primary"
        >
          Save Review
        </b-button>
      </b-col>
      <!-- save button -->

      <p></p>

      <!-- Spacer -->
      <hr class="project-s  pacing">

      <!-- blog comment -->
      <b-col
        id="blogComment"
        cols="12"
        class="mt-2"
      >
        <h6 class="section-label">
          Comment
        </h6>
        <b-card
          v-for="(comment,index) in comments"
          :key="index"
        >
          <b-media no-body>
            <b-media-aside class="mr-75">
              <b-avatar
                :src="comment.avatar"
                size="38"
              />
            </b-media-aside>
            <b-media-body>
              <h6 class="font-weight-bolder mb-25">
                {{ comment.userFullName }}
                <b-badge :variant="light-success">
                  reviewer
                </b-badge>
              </h6>
              <b-card-text>{{ comment.commentedAt }}</b-card-text>
              <b-card-text>
                {{ comment.commentText }}
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-card>
      </b-col>
      <!--/ blog comment -->

      <!-- Spacer -->
      <hr class="project-s  pacing">

      <!-- Leave a Blog Comment -->
      <b-col
        cols="12"
        class="mt-2"
      >
        <h6 class="section-label">
          Leave a Comment
        </h6>
        <b-card>
          <b-form>
            <b-row>
              <b-col cols="12">
                <b-form-group class="mb-2">
                  <b-form-textarea
                    name="textarea"
                    rows="4"
                    placeholder="Website"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  variant="primary"
                >
                  Post Comment
                </b-button>
              </b-col>
            </b-row>
          </b-form>
        </b-card>
      </b-col>
      <!--/ Leave a Blog Comment -->

      <template #code>
        {{ codeRowDetailsSupport }}
        {{ codeFormatterCallback }}
      </template>
      </app-collapse-item>
    </app-collapse>

    <!--/ collapse -->
  </div>
</template>

<script>
import {
  BAvatar,
  BBadge,
  BCard,
  BTable,
  BButton,
  BFormCheckbox,
  BRow,
  BCol,
  // BFormSelect,
  BFormGroup,
  BFormInput,
  BMedia,
  BMediaAside,
  BMediaBody,
  BCardText,
  BForm,
  BFormTextarea,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
// eslint-disable-next-line
import 'quill/dist/quill.core.css'
// eslint-disable-next-line
import 'quill/dist/quill.snow.css'
// eslint-disable-next-line
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItemCustom.vue'
import { codeFormatterCallback, codeRowDetailsSupport } from './code'

export default {
  components: {
    BAvatar,
    BBadge,
    BCard,
    BTable,
    BButton,
    BFormCheckbox,
    BRow,
    BCol,
    // BFormSelect,
    BFormGroup,
    BFormInput,
    AppCollapseItem,
    AppCollapse,
    BMedia,
    BMediaAside,
    BMediaBody,
    BCardText,
    BForm,
    BFormTextarea,
    vSelect,
    quillEditor,
  },
  props: {
    options: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      commentCheckmark: '',
      criteriaFields: [
        'show_details',
        { key: 'name', label: 'Document Name' },
        // { key: 'link', label: 'Document Link' },
        // { key: 'status', label: 'Status' },
      ],
      documentFields: [
        { key: 'document_name', label: 'Document' },
        // { key: 'link', label: 'Document Link' },
        { key: 'uploader', label: 'Creator' },
        { key: 'created_at', label: 'Created At' },
      ],
      documentStatus: [{
        1: 'belum diserahkan', 2: 'belum memenuhi tolok ukur', 3: 'telah memenuhi tolok ukur',
      },
      {
        1: 'light-danger', 2: 'light-warning', 3: 'light-success',
      }],
      statusOptions: [
        { value: 1, text: 'Under Review', icon: 'SearchIcon' },
        { value: 2, text: 'Rejected', icon: 'SlashIcon' },
        { value: 3, text: 'Accepted', icon: 'CheckCircleIcon' },
      ],
      selectedStatus: { value: 1, text: 'Under Review', icon: 'SearchIcon' },
      comments: [
        {
          avatar: '',
          userFullName: 'Chad Alexander',
          commentedAt: 'May 24, 2020',
          commentText:
            'Telah dilakukan pengamatan pada remote audit site. kriteria dapat diterima, video dapat dilihat di https://drive.google.com/drive/folders/1zasdasdhes',
        },
      ],
      codeFormatterCallback,
      codeRowDetailsSupport,
    }
  },
}
</script>

<style lang="scss">
@import "~@core/scss/base/pages/app-email.scss";
@import '~@core/scss/vue/libs/vue-select.scss';
</style>
