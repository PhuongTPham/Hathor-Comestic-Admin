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
        <label for="sale">% SALE:</label>
        <b-form-input
          placeholder=""
          id="sale"
          v-model="dataSubmit.sale"
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
      <div class="form-input">
        <label for="quantity">Ảnh:</label>
        <div id="image">
          <b-form-file v-model="image" @input="handleSelectFile()">
          </b-form-file>
          <div class="image_container" v-if="productDetail.image">
            <b-img
            class="item_image"
            :src="dataSubmit.image"
            fluid alt="Responsive image"
            style="height: 100px, width: 200px"
            ></b-img>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

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
        sale: this.productDetail.sale,
        image: this.productDetail.image.replace(/"/g, ''),
      },
      image: [],
    };
  },
  created() {
    this.$store.dispatch('getListCategory', '');
    this.$store.dispatch('getListSupplier', '');
  },
  computed: {
    ...mapGetters(['getlistCategory', 'getlistSupplier', 'getImagesUrl']),
    listCategory() {
      return this.getlistCategory;
    },
    listSupplier() {
      return this.getlistSupplier;
    },
    uploadImageUrl() {
      return this.getImagesUrl;
    },
  },
  watch: {
    dataSubmit: {
      handler(val) {
        this.$emit('update', val);
      },
      deep: true,
    },
    uploadImageUrl(val) {
      this.dataSubmit.image = val;
    },
  },
  methods: {
    submit() {
    },
    cancel() {
      this.$bvModal.hide('modal-detail-category');
    },
    handleSelectFile() {
      const formData = new FormData();
      formData.append('image', this.image);
      formData.append('type', 1);
      this.$store.dispatch('uploadImage', formData);
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
    .image_container {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: 10px;
    }
    .item_image  {
      height: 100px;
      width: auto;
    }
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
