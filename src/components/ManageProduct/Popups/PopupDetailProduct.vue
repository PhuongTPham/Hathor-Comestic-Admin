<template>
  <div class="popup-add-product">
      <div class="form-input">
        <label for="name">Tên sản phẩm:</label>
        <b-form-input placeholder="" id="name" v-model="dataSubmit.name"></b-form-input>
      </div>
      <div class="form-input">
        <label for="role">Loại sản phẩm:</label>
        <select id="role" class="b-dropdown" v-model="dataSubmit.categoryId">
          <option :value="item.id" v-for="item in listCategory" :key="item.id">
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="form-input">
        <label for="role">Nhà cung cấp:</label>
        <select id="role" class="b-dropdown" v-model="dataSubmit.supplierId">
          <option :value="item.id" v-for="item in listSupplier" :key="item.id">
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="form-input">
        <label for="price">Giá tiền:</label>
        <b-form-input placeholder="" id="price" v-model="dataSubmit.price"></b-form-input>
      </div>
      <div class="form-input">
        <label for="price_temp">Giá sale:</label>
        <b-form-input
          placeholder=""
          id="price_temp"
          v-model="dataSubmit.priceTemp"
        ></b-form-input>
      </div>
      <div class="form-input">
        <label for="description">Mô tả:</label>
        <b-form-input
          placeholder=""
          id="description"
          v-model="dataSubmit.description"
        ></b-form-input>
      </div>
      <div class="form-input">
        <label for="shortDescription">Mô tả ngắn:</label>
        <b-form-input
          placeholder=""
          id="shortDescription"
          v-model="dataSubmit.shortDescription"
        ></b-form-input>
      </div>
      <div class="form-input">
        <label for="quantity">Số lượng:</label>
        <b-form-input
          placeholder=""
          id="quantity"
          v-model="dataSubmit.quantity"
        ></b-form-input>
      </div>
    </div>
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
    },
    productDetail: {
      type: Object,
    },
  },
  data() {
    return {
      dataSubmit: {
        name: this.productDetail.name,
        description: this.productDetail.description,
        price: this.productDetail.price,
        priceTemp: this.productDetail.price_temp,
        shortDescription: this.productDetail.short_description,
        quantity: this.productDetail.quantity,
        categoryId: this.productDetail.category,
        supplierId: this.productDetail.supplier,
      },
    };
  },
  created() {
    this.$store.dispatch('getListCategory', '');
    this.$store.dispatch('getListSupplier', '');
  },
  computed: {
    ...mapGetters(['getlistCategory', 'getlistSupplier']),
    listCategory() {
      return this.getlistCategory;
    },
    listSupplier() {
      return this.getlistSupplier;
    },
  },
  watch: {
    dataSubmit: {
      handler(val) {
        this.$emit('update', val);
      },
      deep: true,
    },
  },
  methods: {
    submit() {
    },
    cancel() {
      this.$bvModal.hide('modal-detail-category');
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
