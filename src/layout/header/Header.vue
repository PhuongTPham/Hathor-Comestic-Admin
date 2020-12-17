<template>
  <!-- begin:: Header -->
  <div
    id="header"
    ref="header"
    class="header"
    v-bind:class="headerClasses"
  >
    <div
      class="d-flex align-items-center justify-content-between"
      v-bind:class="{ 'container-fluid': widthFluid, container: !widthFluid }"
    >
      <div class="d-flex align-items-stretch mr-3">
        <div class="header-logo">
          <router-link to="/dashboard">
            <img
              alt="Logo"
              :src="layoutConfig('self.logo.default')"
              class="logo-default max-h-40px"
            />
            <img
              alt="Logo"
              :src="layoutConfig('self.logo.sticky')"
              class="logo-sticky max-h-40px"
            />
          </router-link>
        </div>
        <!-- begin:: Header Menu -->
        <div
          class="header-menu-wrapper header-menu-wrapper-left"
          ref="header_menu_wrapper"
        >
          <div
            v-if="headerMenuEnabled"
            id="header_menu"
            ref="header_menu"
            class="header-menu header-menu-mobile"
            v-bind:class="headerMenuClasses"
          >
            <!-- example static menu here -->
            <Menu></Menu>
          </div>
        </div>
        <!-- end:: Header Menu -->
      </div>

      <Topbar></Topbar>
    </div>
  </div>
  <!-- end:: Header -->
</template>

<script>
import { mapGetters } from 'vuex';
import Topbar from '@/view/layout/header/Topbar.vue';
import Menu from '@/view/layout/header/Menu.vue';

export default {
  name: 'Header',
  components: {
    Topbar,
    Menu,
  },
  mounted() {},
  computed: {
    ...mapGetters(['layoutConfig', 'getClasses']),

    /**
     * Check if the header menu is enabled
     * @returns {boolean}
     */
    headerMenuEnabled() {
      return !!this.layoutConfig('header.menu.self.display');
    },

    /**
     * Get extra classes for header based on the options
     * @returns {null|*}
     */
    headerClasses() {
      const classes = this.getClasses('header');
      if (typeof classes !== 'undefined') {
        return classes.join(' ');
      }
      return null;
    },

    /**
     * Get extra classes for header menu based on the options
     * @returns {null|*}
     */
    headerMenuClasses() {
      const classes = this.getClasses('header_menu');
      if (typeof classes !== 'undefined') {
        return classes.join(' ');
      }
      return null;
    },

    /**
     * Check if header container is fluid
     */
    widthFluid() {
      return this.layoutConfig('header.self.width') === 'fluid';
    },
  },
};
</script>
