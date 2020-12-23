<template>
  <div
    id="header_mobile"
    class="header-mobile align-items-center"
  >
    <!--begin::Logo-->
    <a href="/dashboard">
       <img alt="Logo" src="../../../public/media/logos/real-estate-1.png" class="logo-default max-h-50px" />
    </a>
    <!--end::Logo-->
    <!--begin::Toolbar-->
    <div class="d-flex align-items-center">
      <button
        class="btn p-0 burger-icon burger-icon-left"
        id="aside_mobile_toggle"
      >
        <span></span>
      </button>
    </div>
    <!--end::Toolbar-->
  </div>
</template>

<script>
export default {
  name: 'HeaderMobile',
  components: {},
  mounted() {},
  computed: {

  },
};
</script>
