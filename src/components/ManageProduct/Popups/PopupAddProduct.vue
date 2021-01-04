<template>
  <b-modal :id="idModal" no-close-on-backdrop size="lg" :title="titleModal">
    <div class="popup-add-product">
      <div class="form-input">
        <label for="name">Tên sản phẩm:</label>
        <b-form-input placeholder="" id="name" v-model="name"></b-form-input>
      </div>
      <div class="form-input">
        <label for="role">Loại sản phẩm:</label>
        <select id="role" class="b-dropdown" v-model="categoryId">
          <option :value="item.id" v-for="item in listCategory" :key="item.id">
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="form-input">
        <label for="role">Nhà cung cấp:</label>
        <select id="role" class="b-dropdown" v-model="supplierId">
          <option :value="item.id" v-for="item in listSupplier" :key="item.id">
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="form-input">
        <label for="price">Giá tiền:</label>
        <b-form-input placeholder="" id="price" v-model="price"></b-form-input>
      </div>
      <div class="form-input">
        <label for="price_temp">Giá sale:</label>
        <b-form-input
          placeholder=""
          id="price_temp"
          v-model="priceTemp"
        ></b-form-input>
      </div>
      <div class="form-input">
        <label for="description">Mô tả:</label>
        <b-form-input
          placeholder=""
          id="description"
          v-model="description"
        ></b-form-input>
      </div>
      <div class="form-input">
        <label for="shortDescription">Mô tả ngắn:</label>
        <b-form-input
          placeholder=""
          id="shortDescription"
          v-model="shortDescription"
        ></b-form-input>
      </div>
      <div class="form-input">
        <label for="sale">% SALE:</label>
        <b-form-input placeholder="" id="sale" v-model="sale"></b-form-input>
      </div>
      <div class="form-input">
        <label for="quantity">Số lượng:</label>
        <b-form-input
          placeholder=""
          id="quantity"
          v-model="quantity"
        ></b-form-input>
      </div>
      <div class="form-input">
        <label for="image">Ảnh 1:</label>
        <div id="image">
          <b-form-file
            accept="image/*"
            v-model="image"
            @input="handleSelectFile()"
          >
          </b-form-file>
          <div class="image_container" v-if="getImagesUrl">
            <b-img
              class="item_image"
              :src="getImagesUrl"
              fluid
              alt="Responsive image"
              style="height: 100px, width: 200px"
            ></b-img>
          </div>
        </div>
      </div>
      <div class="form-input">
        <label for="image">Ảnh 2:</label>
        <div id="image2">
          <b-form-file
            accept="image/*"
            v-model="image2"
            @input="handleSelectFile()"
          >
          </b-form-file>
          <div class="image_container" v-if="getImagesUrl">
            <b-img
              class="item_image"
              :src="getImagesUrl"
              fluid
              alt="Responsive image"
              style="height: 100px, width: 200px"
            ></b-img>
          </div>
        </div>
      </div>
      <div class="form-input">
        <label for="image">Ảnh 3:</label>
        <div id="image3">
          <b-form-file
            accept="image/*"
            v-model="image3"
            @input="handleSelectFile()"
          >
          </b-form-file>
          <div class="image_container" v-if="getImagesUrl">
            <b-img
              class="item_image"
              :src="getImagesUrl"
              fluid
              alt="Responsive image"
              style="height: 100px, width: 200px"
            ></b-img>
          </div>
        </div>
      </div>
    </div>
    <template #modal-footer="">
      <b-button size="sm" variant="danger" @click="cancel"> Hủy bỏ </b-button>
      <b-button size="sm" variant="success" @click="submit">
        Thêm sản phẩm
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

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
      price: '',
      priceTemp: '',
      shortDescription: '',
      quantity: '',
      categoryId: '',
      supplierId: '',
      image: [],
      image2: [],
      image3: [],
      sale: '',
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
  },
  methods: {
    ...mapMutations(['RESET_IMAGES_URL']),
    clearData() {
      this.name = '';
      this.description = '';
      this.price = '';
      this.priceTemp = '';
      this.shortDescription = '';
      this.quantity = '';
      this.categoryId = '';
      this.supplierId = '';
      this.sale = '';
      this.RESET_IMAGES_URL();
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
        sale: this.sale,
        image: this.getImagesUrl,
        image2: this.getImagesUrl,
        image3: this.getImagesUrl,
      };
      await this.$store.dispatch('addProduct', payload);
      this.$bvModal.hide(this.idModal);
      this.clearData();
      await this.$store.dispatch('getProduct', '');
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
    .b-dropdown {
      width: 130px;
      border: 1px solid #dcdcdc;
      outline: none;
    }
    .image_container {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: 10px;
    }
    .item_image {
      height: 100px;
      width: auto;
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
