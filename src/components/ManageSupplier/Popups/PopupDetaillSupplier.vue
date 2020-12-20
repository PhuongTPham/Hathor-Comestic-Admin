<template>
  <div class="popup-detail-account">
    <div class="form-input">
      <label for="supplier_id">Mã nhà cung cấp sản phẩm:</label>
      <b-form-input placeholder="" id="supplier_id" v-model="dataSubmit.supplier_id" disabled></b-form-input>
    </div>
    <div class="form-input">
      <label for="name">Têm danh mục sản phẩm:</label>
      <b-form-input placeholder="" id="name" v-model="dataSubmit.name"></b-form-input>
    </div>
     <div class="form-input">
      <label for="description">Miêu tả:</label>
      <b-form-input placeholder="" id="description" v-model="dataSubmit.description"></b-form-input>
    </div>
    <div class="form-input">
      <label for="address">Địa chỉ:</label>
      <b-form-input placeholder="" id="address" v-model="dataSubmit.address"></b-form-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupDetailSupplier',
  props: {
    userSupplier: {
      type: Object,
    },
  },
  components: {
  },
  data() {
    return {
      dataSubmit: {
        supplier_id: this.userSupplier.id,
        name: this.userSupplier.name,
        description: this.userSupplier.description,
        address: this.userSupplier.address,
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
  computed: {
  },
  methods: {
    submit() {
    },
    cancel() {
      this.$bvModal.hide('modal-detail-supplier');
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
