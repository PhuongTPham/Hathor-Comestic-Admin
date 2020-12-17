<template>
  <div class="header-container">
    <div class="header-container__title">{{ constants.HEADER_MANAGE_ACCOUNT_ADMIN }}</div>
    <div>
      <!-- <b-button v-b-modal.modal-add-account @click="getTenant">{{ constants.TITLE_MANAGE_ACCOUNT }}</b-button> -->
    </div>
  </div>
</template>

<script>
import constants from '../../../constants/index';

export default {
  name: 'Header',
  components: {},
  data() {
    return {
      constants,
    };
  },
  methods: {
    getTenant() {
      this.$store.dispatch('getTenant', '');
    },
  },
};
</script>

<style lang="scss" scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  background: #28C5BD;
  opacity: 0.7;
  padding: 10px;
  &__title {
    display: flex;
    align-items: center;
    font-weight: 900;
    font-size: 18px;
  }
}
</style>
