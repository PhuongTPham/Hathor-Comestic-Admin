<template>
  <div class="d-flex flex-column flex-root vh-100">
    <div
      class="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-row-fluid bg-white"
      id="login"
    >
      <div
        class="login-aside d-flex flex-row-auto bgi-size-cover bgi-no-repeat p-10 p-lg-15"
        :style="{ backgroundImage: `url(${backgroundImage})` }"
      >
        <div class="d-flex flex-row-fluid flex-column justify-content-between">
          <a href="#" class="flex-column-auto">
            <img src="media/logos/real-estate-1.png" class="h-25" />
          </a>
          <div
            class="flex-column-fluid d-flex flex-column justify-content-center"
          >
            <h3 class="font-size-h1 mt-10 mb-5 text-white">
              Welcome to Hathor Comestic Admin!
            </h3>
          </div>
        </div>
      </div>

      <div
        class="flex-row-fluid d-flex flex-column position-relative p-7 overflow-hidden"
      >
        <div class="d-flex flex-column-fluid flex-center mt-30 mt-lg-0">
          <router-view></router-view>
        </div>
      </div>
      <!--end::Content-->
    </div>
  </div>
</template>

<style lang="scss">
@import "../../assets/sass/pages/login/login-1.scss";
</style>

<script>
export default {
  name: 'auth',
  data() {
    return {
      a: 'phong@gmail.com',
    };
  },
  methods: {},
  computed: {
    backgroundImage() {
      return 'media/bg/bg-4.jpg';
    },
  },
};
</script>
