<template>
  <div>
    <!-- faq search section -->
    <section id="faq-search-filter">
      <b-card
        no-body
        class="faq-search"
        :style="{backgroundImage:`url(${require('@/assets/images/banner/banner.png')})`}"
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

        <b-card-body class="text-center">
          <h1 class="text-primary">
            Design Recognition
          </h1>
          <b-card-text class="mb-2">
            <h2 class="text-primary">
              Appropriate Site Development
            </h2>
          </b-card-text>
        </b-card-body>
      </b-card>
    </section>
    <!--/ faq search section -->

    <!-- frequently asked questions tabs pills -->
    <section id="faq-tabs">
      <b-tabs
        vertical
        content-class="col-12 col-md-8 col-lg-9"
        pills
        nav-wrapper-class="faq-navigation col-md-4 col-lg-3 col-12"
        nav-class="nav-left"
      >

        <!-- payment tab -->
        <b-tab
          v-for="(categoryObj, categoryName, index) in faqData"
          :key="categoryName"
          :active="!index"
          :disabled="!categoryObj.selected"
        >

          <!-- title -->
          <template #title>
            <feather-icon
              :icon="categoryObj.icon"
              size="18"
              class="mr-1"
            />
            <span class="font-weight-bold">{{ categoryObj.title }}</span>
          </template>

          <faq-question-answer :options="categoryObj" />
        </b-tab>
        <!--/ payment tab -->

        <!-- sitting lady image -->
        <template #tabs-end>
          <b-img
            fluid
            :src="require('@/assets/images/illustration/faq-illustrations.svg')"
            class="d-none d-md-block mt-auto"
          />
        </template>
        <!--/ sitting lady image -->
      </b-tabs>
    </section>
    <!--/ frequently asked questions tabs pills -->

  </div>
</template>

<script>
import {
  BCard, BCardBody, BCardText, BTabs, BTab, BImg,
} from 'bootstrap-vue'
import {
  ref, onUnmounted,
} from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import Ripple from 'vue-ripple-directive'
import projectStoreModule from '@/views/projectStoreModule'
import FaqQuestionAnswer from './FaqQuestionAnswer.vue'

export default {
  components: {
    BCard,
    BCardBody,
    BCardText,
    BTabs,
    BTab,
    BImg,
    FaqQuestionAnswer,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      faqSearchQuery: '',
      faqData: {},
    }
  },
  computed: {
    statusVariant() {
      const statusColor = {
        /* eslint-disable key-spacing */
        1 : 'light-primary',
        2 : 'light-success',
        3 : 'light-danger',
        /* eslint-enable key-spacing */
      }

      return status => statusColor[status]
    },
  },
  watch: {
    faqSearchQuery: {
      immediate: true,
      handler() {
        this.fetchData()
      },
    },
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
  methods: {
    fetchData() {
      // this.$http.get('/faq/data', { params: { q: this.faqSearchQuery } }).then(res => { this.faqData = res.data })
      const data = {
        faqData: {
          // payment
          asdp: {
            icon: 'CreditCardIcon',
            title: 'ASD P',
            subtitle: 'Basic Green Area',
            max_score: 'P',
            selected: true,
            qandA: [
              {
                question: 'ASD P1',
                ans: 'Adanya area lansekap berupa vegetasi (softscape) yang bebas dari struktur bangunan dan struktur sederhana bangunan taman (hardscape) di atas permukaan tanah atau di bawah tanah. <ul> <li>Untuk konstruksi baru, luas areanya adalah minimal 10% dari luas total lahan. </li> <li> Untuk  major renovation, luas areanya adalah minimal 50% dari ruang terbuka yang bebas basement dalam tapak.</li></ul>',
                reference_score: 'P',
                preliminary: true,
                status: 'Accepted',
                selected: true,
                criterias: [
                  {
                    name: 'Perhitungan rencana yang menunjukan persentase area lansekap berupa vegetasi (softscape).',
                    selected: true,
                    documents: [
                      {
                        link: 'http://www.africau.edu/images/default/sample.pdf',
                        document_name: 'doc1.pdf',
                        uploader: 'Henni Setiawan',
                        status: 3,
                        created_at: '2020-02-01',
                      },
                      {
                        link: 'http://www.africau.edu/images/default/sample.pdf',
                        document_name: 'doc2.pdf',
                        uploader: 'Julia Clifford',
                        status: 3,
                        created_at: '2020-02-10',
                      },
                    ],
                  },
                  {
                    name: 'Gambar Design Development lansekap yang memuat informasi area dasar hijau.',
                    selected: false,
                    documents: [
                      {
                        link: 'http://www.africau.edu/images/default/sample.pdf',
                        document_name: 'doc1.pdf',
                        uploader: 'Henni Setiawan',
                        status: 3,
                        created_at: '2020-02-01',
                      },
                      {
                        link: 'http://www.africau.edu/images/default/sample.pdf',
                        document_name: 'doc2.pdf',
                        uploader: 'Julia Clifford',
                        status: 3,
                        created_at: '2020-02-10',
                      },
                    ],
                  },
                  {
                    name: 'Gambar tender potongan tapak lahan proyek yang dapat menunjukkan posisi basement*.',
                    selected: true,
                    documents: [
                      {
                        link: 'http://www.africau.edu/images/default/sample.pdf',
                        document_name: 'doc1.pdf',
                        uploader: 'Henni Setiawan',
                        status: 3,
                        created_at: '2020-02-01',
                      },
                      {
                        link: 'http://www.africau.edu/images/default/sample.pdf',
                        document_name: 'doc2.pdf',
                        uploader: 'Julia Clifford',
                        status: 3,
                        created_at: '2020-02-10',
                      },
                    ],
                  },
                ],
                explanation: '(*) Apabila gedung tidak memiliki basement, dokumen ini dapat menjadi bukti bahwa proyek tidak memiliki basement atau fasilitas bawah tanah.',
                placeholder: '<ul><li>Basement: Ada /Tdk</li><li>Luas Area : ………………</li><li>Luas RTH Bebas basement : …………………</li><li>Luas RTH Total : ……………</li></ul>',
                conjunction: 'and',
              },
              {
                question: 'ASD P2',
                ans: 'Area ini memiliki vegetasi mengikuti Permendagri No 1 tahun 2007 Pasal 13 (2a) dengan komposisi 50% lahan tertutupi luasan pohon ukuran kecil, ukuran sedang, ukuran besar, perdu setengah pohon, perdu, semak dalam ukuran dewasa dengan jenis tanaman sesuai dengan Permen PU No. 5/PRT/M/2008 mengenai Ruang Terbuka Hijau (RTH) Pasal  2.3.1  tentang Kriteria Vegetasi untuk Pekarangan.',
                reference_score: 'P',
                preliminary: true,
                status: 'Under Review',
                selected: true,
                criterias: [
                  {
                    name: 'Perhitungan rencana yang menunjukan komposisi vegetasi.',
                    selected: true,
                    documents: [
                      {
                        link: 'http://www.africau.edu/images/default/sample.pdf',
                        document_name: 'doc1.pdf',
                        uploader: 'Henni Setiawan',
                        status: 3,
                        created_at: '2020-02-01',
                      },
                      {
                        link: 'http://www.africau.edu/images/default/sample.pdf',
                        document_name: 'doc2.pdf',
                        uploader: 'Julia Clifford',
                        status: 3,
                        created_at: '2020-02-10',
                      },
                    ],
                  },
                  {
                    name: 'Gambar skematik (Design Development) lansekap yang memuat informasi mengenai formasi vegetasi.',
                    selected: true,
                    documents: [
                      {
                        link: 'http://www.africau.edu/images/default/sample.pdf',
                        document_name: 'doc1.pdf',
                        uploader: 'Henni Setiawan',
                        status: 3,
                        created_at: '2020-02-01',
                      },
                      {
                        link: 'http://www.africau.edu/images/default/sample.pdf',
                        document_name: 'doc2.pdf',
                        uploader: 'Julia Clifford',
                        status: 3,
                        created_at: '2020-02-10',
                      },
                    ],
                  },
                  {
                    name: 'Daftar vegetasi yang direncanakan akan digunakan pada lahan mencakup informasi jenis tanaman, luas tajuk dan fungsinya, yang sesuai dengan:<ul><li>Komposisi vegetasi mengikuti Peraturan Menteri Dalam Negeri  No.1 tahun 2007 pasal 13 (2a)</li><li>Vegetasi memiliki kriteria berdasarkan Peraturan Menteri Pekerjaan Umum No. 5/PRT/M/2008</li></ul>',
                    selected: true,
                    documents: [
                      {
                        link: 'http://www.africau.edu/images/default/sample.pdf',
                        document_name: 'doc1.pdf',
                        uploader: 'Henni Setiawan',
                        status: 3,
                        created_at: '2020-02-01',
                      },
                      {
                        link: 'http://www.africau.edu/images/default/sample.pdf',
                        document_name: 'doc2.pdf',
                        uploader: 'Julia Clifford',
                        status: 3,
                        created_at: '2020-02-10',
                      },
                    ],
                  },
                ],
                explanation: '',
                placeholder: '<ul><li>Luas Semak :……………..</li><li>Luas Tajuk perdu + semak : ………….</li><li>Luas Tajuk Pohon : ………………..</li></ul>',
                conjunction: '',
              },
            ],
            reviews: [
              {
                user: 'Giandra Gautama',
                role: 'user',
                notes: 'Data dokumen pendukung sudah diserahkan melalui lampiran',
                created_at: '2021-10-02',
              },
              {
                user: 'Fanni Wijaya',
                role: 'reviewer',
                notes: 'Telah dilakukan pengamatan kepada site<p> Kriteria diterima dapat dilihat pada https://www.youtube.com/watch?v=-Xn3_Zi7nxk&list=RD-Xn3_Zi7nxk',
                created_at: '2021-10-04',
              },
            ],
          },
          // delivery
          asd1: {
            icon: 'ShoppingBagIcon',
            title: 'ASD 1',
            subtitle: 'Site Selection',
            max_score: 2,
            selected: true,
            qandA: [
              {
                question: 'ASD 1-1A',
                ans:
                  'Memilih daerah pembangunan yang dilengkapi minimal delapan dari 12 prasarana sarana kota.  1.Jaringan Jalan. 2. Jaringan penerangan dan Listrik. 3. Jaringan Drainase. 4. STP Kawasan. 5. Sistem Pembuangan Sampah.  6. Sistem Pemadam Kebakaran.  7. Jaringan Fiber Optik.  8. Danau Buatan (Minimal 1% luas area).  9. Jalur Pejalan Kaki Kawasan.  10. Jalur Pemipaan Gas.  11. Jaringan Telepon. 12. Jaringan Air bersih.',
                reference_score: 1,
                preliminary: false,
                status: 'Under Review',
                selected: true,
              },
              {
                question: 'ASD 1-1B',
                ans:
                  'Tart gummies dragée lollipop fruitcake pastry oat cake. Cookie jelly jelly macaroon icing jelly beans soufflé cake sweet. Macaroon sesame snaps cheesecake tart cake sugar plum. Dessert jelly-o sweet muffin chocolate candy pie tootsie roll marzipan.',
                reference_score: 1,
                preliminary: false,
                status: 'Under Review',
                selected: false,
              },
              {
                question: 'ASD 1-2',
                ans:
                  'Cheesecake muffin cupcake dragée lemon drops tiramisu cake gummies chocolate cake. Marshmallow tart croissant. Tart dessert tiramisu marzipan lollipop lemon drops. Cake bonbon bonbon gummi bears topping jelly beans brownie jujubes muffin. Donut croissant jelly-o cake marzipan. Liquorice marzipan cookie wafer tootsie roll. Tootsie roll sweet cupcake.',
                reference_score: 1,
                preliminary: false,
                status: 'Under Review',
                selected: true,
              },
            ],
            reviews: [],
          },
          // cancellation and return
          asd2: {
            icon: 'RefreshCwIcon',
            title: 'ASD 2',
            subtitle: 'Which license do I need?',
            selected: false,
            qandA: [
              {
                question: 'Can my security guard or neighbour receive my shipment if I am not available?',
                ans:
                  'Pastry pudding cookie toffee bonbon jujubes jujubes powder topping. Jelly beans gummi bears sweet roll bonbon muffin liquorice. Wafer lollipop sesame snaps. Brownie macaroon cookie muffin cupcake candy caramels tiramisu. Oat cake chocolate cake sweet jelly-o brownie biscuit marzipan. Jujubes donut marzipan chocolate bar. Jujubes sugar plum jelly beans tiramisu icing cheesecake.',
              },
              {
                question: 'How can I get the contact number of my delivery agent?',
                ans:
                  'Sweet pie candy jelly. Sesame snaps biscuit sugar plum. Sweet roll topping fruitcake. Caramels liquorice biscuit ice cream fruitcake cotton candy tart. Donut caramels gingerbread jelly-o gingerbread pudding. Gummi bears pastry marshmallow candy canes pie. Pie apple pie carrot cake.',
              },
              {
                question: 'How can I cancel my shipment?',
                ans:
                  'Tart gummies dragée lollipop fruitcake pastry oat cake. Cookie jelly jelly macaroon icing jelly beans soufflé cake sweet. Macaroon sesame snaps cheesecake tart cake sugar plum. Dessert jelly-o sweet muffin chocolate candy pie tootsie roll marzipan.',
              },
              {
                question: 'I have received a defective/damaged product. What do I do?',
                ans:
                  'Cheesecake muffin cupcake dragée lemon drops tiramisu cake gummies chocolate cake. Marshmallow tart croissant. Tart dessert tiramisu marzipan lollipop lemon drops. Cake bonbon bonbon gummi bears topping jelly beans brownie jujubes muffin. Donut croissant jelly-o cake marzipan. Liquorice marzipan cookie wafer tootsie roll. Tootsie roll sweet cupcake.',
              },
              {
                question: 'How do I change my delivery address?',
                ans:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
              },
              {
                question: 'What documents do I need to carry for self-collection of my shipment?',
                ans:
                  'At tempor commodo ullamcorper a lacus vestibulum. Ultrices neque ornare aenean euismod. Dui vivamus arcu felis bibendum. Turpis in eu mi bibendum neque egestas congue. Nullam ac tortor vitae purus faucibus ornare suspendisse sed. Commodo viverra maecenas accumsan lacus vel facilisis volutpat est velit. Tortor consequat id porta nibh. Id aliquet lectus proin nibh nisl condimentum id venenatis a. Faucibus nisl tincidunt eget nullam non nisi. Enim nunc faucibus a pellentesque. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus. Nec nam aliquam sem et tortor consequat id. Fringilla est ullamcorper eget nulla facilisi. Morbi tristique senectus et netus et.',
              },
              {
                question: 'What are the timings for self-collecting shipments from the Delhivery Branch?',
                ans:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Euismod lacinia at quis risus sed vulputate odio ut enim. Dictum at tempor commodo ullamcorper a lacus vestibulum.',
              },
            ],
            reviews: [],
          },
          // my orders
          asd3: {
            icon: 'PackageIcon',
            title: 'ASD 3',
            subtitle: 'Which license do I need?',
            selected: false,
            qandA: [
              {
                question: 'Can I avail of an open delivery?',
                ans:
                  'Pastry pudding cookie toffee bonbon jujubes jujubes powder topping. Jelly beans gummi bears sweet roll bonbon muffin liquorice. Wafer lollipop sesame snaps. Brownie macaroon cookie muffin cupcake candy caramels tiramisu. Oat cake chocolate cake sweet jelly-o brownie biscuit marzipan. Jujubes donut marzipan chocolate bar. Jujubes sugar plum jelly beans tiramisu icing cheesecake.',
              },
              {
                question: 'I haven’t received the refund of my returned shipment. What do I do?',
                ans:
                  'Sweet pie candy jelly. Sesame snaps biscuit sugar plum. Sweet roll topping fruitcake. Caramels liquorice biscuit ice cream fruitcake cotton candy tart. Donut caramels gingerbread jelly-o gingerbread pudding. Gummi bears pastry marshmallow candy canes pie. Pie apple pie carrot cake.',
              },
              {
                question: 'How can I ship my order to an international location?',
                ans:
                  'Tart gummies dragée lollipop fruitcake pastry oat cake. Cookie jelly jelly macaroon icing jelly beans soufflé cake sweet. Macaroon sesame snaps cheesecake tart cake sugar plum. Dessert jelly-o sweet muffin chocolate candy pie tootsie roll marzipan.',
              },
              {
                question: 'I missed the delivery of my order today. What should I do?',
                ans:
                  'Cheesecake muffin cupcake dragée lemon drops tiramisu cake gummies chocolate cake. Marshmallow tart croissant. Tart dessert tiramisu marzipan lollipop lemon drops. Cake bonbon bonbon gummi bears topping jelly beans brownie jujubes muffin. Donut croissant jelly-o cake marzipan. Liquorice marzipan cookie wafer tootsie roll. Tootsie roll sweet cupcake.',
              },
              {
                question: 'The delivery of my order is delayed. What should I do?',
                ans:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
              },
            ],
            reviews: [],
          },
          // product and services
          asd4: {
            icon: 'SettingsIcon',
            title: 'ASD 4',
            subtitle: 'Which license do I need?',
            selected: false,
            qandA: [
              {
                question: 'How can I register a complaint against the courier executive who came to deliver my order?',
                ans:
                  'Pastry pudding cookie toffee bonbon jujubes jujubes powder topping. Jelly beans gummi bears sweet roll bonbon muffin liquorice. Wafer lollipop sesame snaps. Brownie macaroon cookie muffin cupcake candy caramels tiramisu. Oat cake chocolate cake sweet jelly-o brownie biscuit marzipan. Jujubes donut marzipan chocolate bar. Jujubes sugar plum jelly beans tiramisu icing cheesecake.',
              },
              {
                question: 'The status for my shipment shows as ‘not picked up’. What do I do?',
                ans:
                  'Sweet pie candy jelly. Sesame snaps biscuit sugar plum. Sweet roll topping fruitcake. Caramels liquorice biscuit ice cream fruitcake cotton candy tart. Donut caramels gingerbread jelly-o gingerbread pudding. Gummi bears pastry marshmallow candy canes pie. Pie apple pie carrot cake.',
              },
              {
                question: 'How can I get a proof of delivery for my shipment?',
                ans:
                  'Tart gummies dragée lollipop fruitcake pastry oat cake. Cookie jelly jelly macaroon icing jelly beans soufflé cake sweet. Macaroon sesame snaps cheesecake tart cake sugar plum. Dessert jelly-o sweet muffin chocolate candy pie tootsie roll marzipan.',
              },
              {
                question: 'How can I avail your services?',
                ans:
                  'Cheesecake muffin cupcake dragée lemon drops tiramisu cake gummies chocolate cake. Marshmallow tart croissant. Tart dessert tiramisu marzipan lollipop lemon drops. Cake bonbon bonbon gummi bears topping jelly beans brownie jujubes muffin. Donut croissant jelly-o cake marzipan. Liquorice marzipan cookie wafer tootsie roll. Tootsie roll sweet cupcake.',
              },
            ],
            reviews: [],
          },
        },
      }
      const queryLowered = ''
      const filteredData = {}

      Object.entries(data.faqData).forEach(entry => {
        const [categoryName, categoryObj] = entry
        // eslint-disable-next-line arrow-body-style
        const filteredQAndAOfCategory = categoryObj.qandA.filter(qAndAObj => {
          return qAndAObj.question.toLowerCase().includes(queryLowered)
        })
        if (filteredQAndAOfCategory.length) {
          filteredData[categoryName] = { ...categoryObj, qandA: filteredQAndAOfCategory }
        }
      })
      this.faqData = filteredData
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-faq.scss';
</style>
