<template>
  <div class="d-flex flex-column flex-root" v-if="true">
    <!-- begin:: Header Mobile -->
    <HeaderMobile></HeaderMobile>
    <!-- end:: Header Mobile -->

    <!-- <Loader v-if="loaderEnabled" v-bind:logo="loaderLogo"></Loader> -->

    <!-- begin::Body -->
    <div class="d-flex flex-row flex-column-fluid page">
      <!-- begin:: Aside Left -->
      <Aside v-if="true"></Aside>
      <!-- end:: Aside Left -->

      <div id="_wrapper" class="d-flex flex-column flex-row-fluid wrapper">
        <!-- begin:: Content -->
        <div
          id="_content"
          class="content d-flex flex-column flex-column-fluid"
        >
          <!-- begin:: Content Head -->

          <!-- begin:: Content Body -->
          <div class="d-flex flex-column-fluid">
            <div
              :class="{
                'container-fluid': contentFluid,
                container: !contentFluid
              }"
            >
              <transition name="fade-in-up">
                <router-view />
              </transition>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Aside from '@/layout/aside/Aside.vue';
import HeaderMobile from '@/layout/header/HeaderMobile.vue';
import HtmlClass from '@/core/services/htmlclass.service';

// import Loader from '@/components/Loader.vue';
import {
  ADD_BODY_CLASSNAME,
  REMOVE_BODY_CLASSNAME,
} from '@/core/services/store/htmlclass.module';

export default {
  name: 'Layout',
  components: {
    Aside,
    HeaderMobile,
    // Loader,
  },
  beforeMount() {
    // show page loading
    this.$store.dispatch(ADD_BODY_CLASSNAME, 'page-loading');

    // initialize html element classes
    HtmlClass.init(this.layoutConfig());
  },
  mounted() {
    // check if current user is authenticated

    // Simulate the delay page loading
    setTimeout(() => {
      // Remove page loader after some time
      this.$store.dispatch(REMOVE_BODY_CLASSNAME, 'page-loading');
    }, 2000);
  },
  methods: {},
  computed: {
    ...mapGetters([
      'layoutConfig',
    ]),

    /**
     * Check if the page loader is enabled
     * @returns {boolean}
     */
    loaderEnabled() {
      return !/false/.test(this.layoutConfig('loader.type'));
    },

    /**
     * Check if container width is fluid
     * @returns {boolean}
     */
    contentFluid() {
      return this.layoutConfig('content.width') === 'fluid';
    },
  },
};
</script>
