<template>
  <b-modal :id="idModal" no-close-on-backdrop size="lg" :title="titleModal">
    <div class="popup-add-product">
      <div class="form-input">
        <label for="name">Tên sản phẩm:</label>
        <b-form-input placeholder="" id="name" v-model="name" ></b-form-input>
      </div>
      <div class="form-input">
        <label for="role">Loại sản phẩm:</label>
        <select id="role" class="b-dropdown" v-model="categoryId" >
          <option :value="item.id" v-for="item in listCategory" :key="item.id">{{item.name}}</option>
        </select>
      </div>
      <div class="form-input">
        <label for="role">Nhà cung cấp:</label>
        <select id="role" class="b-dropdown" v-model="supplierId" >
          <option :value="item.id" v-for="item in listSupplier" :key="item.id">{{item.name}}</option>
        </select>
      </div>
      <div class="form-input">
        <label for="price">Giá tiền:</label>
        <b-form-input placeholder="" id="price" v-model="price" ></b-form-input>
      </div>
      <div class="form-input">
        <label for="price_temp">Giá sale:</label>
        <b-form-input placeholder="" id="price_temp" v-model="priceTemp" ></b-form-input>
      </div>
      <div class="form-input">
        <label for="description">Mô tả:</label>
        <b-form-input placeholder="" id="description" v-model="description" ></b-form-input>
      </div>
      <div class="form-input">
        <label for="shortDescription">Mô tả ngắn:</label>
        <b-form-input placeholder="" id="shortDescription" v-model="shortDescription" ></b-form-input>
      </div>
      <div class="form-input">
        <label for="quantity">Số lượng:</label>
        <b-form-input placeholder="" id="quantity" v-model="quantity" ></b-form-input>
      </div>
    </div>
    <template #modal-footer="">
      <b-button size="sm" variant="danger" @click="cancel" >
        Hủy bỏ
      </b-button>
      <b-button size="sm" variant="success" @click="submit" >
        Thêm sản phẩm
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    idModal: {
      type: String,
    },
    titleModal: {
      type: String,
    }
  },
  data() {
    return {
      name: '',
      description: '',
      price: '',
      priceTemp: '',
      shortDescription: '',
      quantity: '',
      categoryId: '',
      supplierId: ''
    };
  },
  created() {
    this.$store.dispatch('getListCategory', '');
    this.$store.dispatch('getListSupplier', '');
  },
  computed: {
    ...mapGetters(['getlistCategory', 'getlistSupplier']),
    listCategory() {
      return this.getlistCategory
    },
    listSupplier() {
      return this.getlistSupplier
    }
  },
  methods: {
    clearData() {
      this.name = '';
      this.description = '';
      this.price = '';
      this.priceTemp = '';
      this.shortDescription = '';
      this.quantity = '';
      this.categoryId = '';
      this.supplierId = '';
    },
    cancel() {
      this.$bvModal.hide(this.idModal);
    },
    async submit() {
      const payload = {
        name: this.name,
        description: this.description,
        category_id: this.categoryId,
        supplier_id: this.supplierId,
        quantity: this.quantity,
        short_description: this.shortDescription,
        price_temp: this.priceTemp,
        price: this.price,
        image: {}
      };
      await this.$store.dispatch('addProduct', payload);
      this.$bvModal.hide(this.idModal);
      this.clearData();
      await this.$store.dispatch('getProduct', '');
    },
  },
};
</script>

<style lang='scss' scoped>
.popup-add-product {
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
