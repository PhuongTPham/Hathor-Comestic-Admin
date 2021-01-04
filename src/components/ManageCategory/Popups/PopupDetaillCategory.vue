<template>
  <div class="popup-detail-account">
    <div class="form-input">
      <label for="category_id">Mã danh mục sản phẩm:</label>
      <b-form-input
        placeholder=""
        id="category_id"
        v-model="dataSubmit.category_id"
        disabled
      ></b-form-input>
    </div>
    <div class="form-input">
      <label for="name">Têm danh mục sản phẩm:</label>
      <b-form-input
        placeholder=""
        id="name"
        v-model="dataSubmit.name"
      ></b-form-input>
    </div>
    <div class="form-input">
      <label for="description">Miêu tả:</label>
      <b-form-input
        placeholder=""
        id="description"
        v-model="dataSubmit.description"
      ></b-form-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupDetailCategory',
  props: {
    userDetail: {
      type: Object,
    },
  },
  components: {},
  data() {
    return {
      dataSubmit: {
        category_id: this.userDetail.id,
        name: this.userDetail.name,
        description: this.userDetail.description,
      },
    };
  },
  watch: {
    dataSubmit: {
      handler(val) {
        this.$emit('update', val);
      },
      deep: true,
    },
  },
  computed: {},
  methods: {
    submit() {},
    cancel() {
      this.$bvModal.hide('modal-detail-category');
    },
  },
};
</script>

<style lang='scss' scoped>
.popup-detail-account {
  .form-input {
    display: grid;
    grid-template-columns: 20% 80%;
    margin-bottom: 12px;
    .b-dropdown {
      width: 130px;
      border: 1px solid #dcdcdc;
      outline: none;
    }
  }
  &__button-wrapper {
    display: flex;
    justify-content: flex-end;
    button {
      margin-right: 7px;
    }
    button:last-child {
      margin-right: 0px;
    }
  }
}
</style>
