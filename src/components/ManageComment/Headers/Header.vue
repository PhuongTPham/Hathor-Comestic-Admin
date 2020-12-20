<template>
  <div class="header-container">
    <div class="header-container__title">{{ constants.COMMENT_CONST.HEADER_MANAGE}}</div>
    <div>
      <b-button>{{ constants.COMMENT_CONST.TITLE_MANAGE}}</b-button>
    </div>
  </div>
</template>

<script>
import Button from '../Buttons/Button.vue';
import constants from '../../../constants/index'

export default {
  name: 'Header',
  components: {
    Button,
  },
  data() {
    return {
      constants
    };
  },
  methods: {},
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
    color: whitesmoke;
  }
}
</style>
