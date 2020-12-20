<template>
  <b-modal :id="idModal" no-close-on-backdrop size="lg" :title="titleModal">
    <div class="popup-add-account">
      <div class="form-input">
        <label for="name">Tên danh mục sản phẩm:</label>
        <b-form-input placeholder="" id="name" v-model="name" ></b-form-input>
      </div>
      <div class="form-input">
        <label for="description">Miêu tả:</label>
        <b-form-input placeholder="" id="description" v-model="description" ></b-form-input>
      </div>
      <div class="form-input">
        <label for="address">Địa chỉ:</label>
        <b-form-input placeholder="" id="address" v-model="address" ></b-form-input>
      </div>
    </div>
    <template #modal-footer="">
      <b-button size="sm" variant="danger" @click="cancel" >
        Hủy bỏ
      </b-button>
      <b-button size="sm" variant="success" @click="submit" >
        Thêm nhà cung cấp
      </b-button>
    </template>
  </b-modal>
</template>

<script>

export default {
  props: {
    idModal: {
      type: String,
    },
    titleModal: {
      type: String,
    },
  },
  data() {
    return {
      name: '',
      description: '',
      address: '',
    };
  },
  computed: {
  },
  methods: {
    clearData() {
      this.name = '';
      this.description = '';
      this.address = '';
    },
    cancel() {
      this.$bvModal.hide(this.idModal);
    },
    async submit() {
      const payload = {
        name: this.name,
        description: this.description,
        address: this.address,
      };
      await this.$store.dispatch('addSupplier', payload);
      this.$bvModal.hide(this.idModal);
      this.clearData();
      await this.$store.dispatch('getListSupplier');
    },
  },
};
</script>

<style lang='scss' scoped>
.popup-add-account {
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
