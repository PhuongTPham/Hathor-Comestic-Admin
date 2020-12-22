<template>
  <div class="header-container">
    <div class="header-container__title">QUẢN LÝ SẢN PHẨM</div>
    <div>
      <Button :title="title" :styleCss="styleCss" v-b-modal.modal-add-product/>
      <!-- <b-button v-b-modal.modal-add-category >{{ constants.CATEGORY_CONST.TITLE_MANAGE }}</b-button> -->
    </div>
  </div>
</template>

<script>
import Button from '../Buttons/Button.vue';

export default {
  name: 'Header',
  components: {
    Button,
  },
  data() {
    return {
      title: 'Thêm sản phẩm',
      styleCss: 'background: #FFFFFF;color:#333333;',
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
  }
}
</style>
