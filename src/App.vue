<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
// 3rd party plugins css
@import "~bootstrap-vue/dist/bootstrap-vue.css";

// Main demo style scss
@import "./assets/sass/style.vue.scss";
</style>

<script>
export default {
  name: 'App',
  mounted() {
    /**
     * this is to override the layout config using saved data from localStorage
     * remove this to use config only from static json (@/core/config/layout.config.json)
     */
  },
};
</script>
