<template>
  <!--begin::Brand-->
  <div
    class="aside-brand d-flex flex-column align-items-center flex-column-auto py-5 py-lg-12"
  >
    <!--begin::Logo-->
    <router-link to="/dashboard">
       <img src="../../../public/media/logos/real-estate-1.png" alt="Logo" class="max-h-50px" />
    </router-link>
    <!--end::Logo-->
  </div>
  <!--end::Brand-->
</template>

<style lang="scss" scoped>
.aside-toggle {
  outline: none;
}
</style>

<script>
import { mapGetters } from 'vuex';
import objectPath from 'object-path';

export default {
  name: 'Brand',
  mounted() {},
  methods: {
    siteLogo() {
      const menuAsideLeftSkin = this.layoutConfig('brand.self.theme');
      // set brand logo
      const logoObject = this.layoutConfig('self.logo');

      let logo;
      if (typeof logoObject === 'string') {
        logo = logoObject;
      }
      if (typeof logoObject === 'object') {
        logo = objectPath.get(logoObject, `${menuAsideLeftSkin}`);
      }
      if (typeof logo === 'undefined') {
        const logos = this.layoutConfig('self.logo');
        logo = logos[Object.keys(logos)[0]];
      }
      return process.env.BASE_URL + logo;
    },
  },
  computed: {
    ...mapGetters(['layoutConfig']),

    allowMinimize() {
      return !!this.layoutConfig('aside.self.minimize.toggle');
    },
  },
};
</script>
