<template>
  <div class="manage-product-container">
    <div class="manage-product-container__header">
      <Header />
    </div>
    <div class="manage-product-container__options">
      <b-form @submit="searchProduct">
        <div class="manage-product-container__options__search-form">
          <b-form-input
            class="search-form-input"
            placeholder="Tìm kiếm"
            v-model="inputSearch"
          ></b-form-input>
          <b-icon-search
            class="search-form-icon"
            :font-scale="1.5"
            @click="searchProduct"
          ></b-icon-search>
        </div>
      </b-form>
      <div class="manage-product-container__options__button-group">
        <b-icon-trash
          class="btn-group-options"
          variant="danger"
          font-scale="2.5"
          :class="checkCanDelete ? '' : '-disable'"
          v-b-modal.modal-delete-product
          v-if="checkCanDelete"
        >
        </b-icon-trash>
        <b-icon-trash
          class="btn-group-options"
          variant="danger"
          font-scale="2.5"
          :class="checkCanDelete ? '' : '-disable'"
          v-else
        >
        </b-icon-trash>
      </div>
    </div>
    <div class="manage-product-container__table">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">
              <input
                type="checkbox"
                :checked="isSelectedAll"
                @click="setIsSelectedAll"
              />
            </th>
            <th scope="col">Tên sản phẩm</th>
            <th scope="col">Giá gốc</th>
            <th scope="col">Giá sale</th>
            <th scope="col">Mô tả</th>
            <th scope="col">Số lượng</th>
            <th scope="col">Lượt xem</th>
            <th scope="col">% sale</th>
            <th scope="col">Ngày đăng</th>
            <th scope="col">Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in listProduct" :key="index">
            <td>
              <input
                type="checkbox"
                :value="product.id"
                v-model="selectedListProduct"
              />
            </td>
            <template>
              <td v-if="product.name.length <= 50">{{ product.name }}</td>
              <td v-else>{{ product.name.substr(0, 50) + "..." }}</td>
            </template>
            <td>{{ formatNumber(product.price) }}</td>
            <td>{{ formatNumber(product.price_temp) }}</td>
            <template>
              <td v-if="product.description.length <= 50">
                {{ product.description.substr(0, 50) + "..." }}
              </td>
              <td v-else>{{ product.description.substr(0, 50) + "..." }}</td>
            </template>
            <td>{{ formatNumber(product.quantity) }}</td>
            <td>{{ product.view_item }}</td>
            <td>{{ product.sale }}</td>
            <td>{{ formatDate(product.created_at) }}</td>
            <td>
              <div class="show-detail">
                <b-icon-pencil-square
                  variant="light"
                  @click="getDetailProduct(product.id)"
                  v-b-modal.modal-detail-product
                ></b-icon-pencil-square>
                <b-icon-trash
                  variant="light"
                  class="rounded-circle bg-danger p-2"
                  v-b-modal.modal-delete-product
                  @click="getSingleIdProduct(product.id)"
                ></b-icon-trash>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <PopupDeleteProduct
        :titleModal="constants.PRODUCT_CONST.TITLE_POPUP_DELETE"
        :idModal="constants.PRODUCT_CONST.ID_POPUP_DELETE"
        :contentModal="constants.PRODUCT_CONST.CONTENT_POPUP_DELETE"
        :selectedListId="selectedListProduct"
        @updateSelectedListId="updateSelectedListId"
      />
    </div>
    <div>
      <PopupAddProduct
        :titleModal="constants.PRODUCT_CONST.TITLE_POPUP_ADD"
        :idModal="constants.PRODUCT_CONST.ID_POPUP_ADD"
      />
    </div>
    <div>
      <b-modal
        id="modal-detail-product"
        no-close-on-backdrop
        size="lg"
        :title="productDetail.name"
      >
        <PopupDetailProduct
          :productDetail="productDetail"
          @update="updateData"
        />
        <template #modal-footer="">
          <b-button size="sm" variant="danger" @click="cancelModalDetail">
            Hủy bỏ
          </b-button>
          <b-button
            ref="btn_update_product"
            size="sm"
            variant="success"
            @click="editProduct"
            :disabled="!canUpdate"
            :class="{ '-disable': !canUpdate }"
          >
            Thay đổi
          </b-button>
        </template>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';
import Header from '../../components/ManageProduct/Headers/Header.vue';
import PopupDeleteProduct from '../../components/ManageProduct/Popups/PopupDeleteProduct.vue';
import PopupAddProduct from '../../components/ManageProduct/Popups/PopupAddProduct.vue';
import PopupDetailProduct from '../../components/ManageProduct/Popups/PopupDetailProduct.vue';
import constants from '../../constants/index';
import util from '../../utils/index';

export default {
  name: 'ManageProduct',
  components: {
    Header,
    PopupDeleteProduct,
    PopupAddProduct,
    PopupDetailProduct,
  },
  data() {
    return {
      styleCss: 'background: #FFFFFF;color:#333333;',
      productDetail: {},
      fields: [
        { key: 'name', label: 'Tên sản phẩm' },
        { key: 'price', label: 'Giá gốc' },
        { key: 'price_temp', label: 'Giá sale' },
        { key: 'description', label: 'Mô tả' },
        { key: 'quantity', label: 'Số lượng' },
        { key: 'view_item', label: 'Lượt xem' },
        { key: 'sale', label: '% sale' },
        { key: 'created_at', label: 'Ngày đăng' },
      ],
      canUpdate: false,
      search: '',
      isSelectedAll: false,
      selectedListProduct: [],
      inputSearch: '',
      constants,
      formatNumber: util.formatNumber,
    };
  },
  watch: {
    selectedListProduct: {
      handler() {
        if (this.selectedListProduct.length === this.listIdProduct.length) {
          this.isSelectedAll = true;
        } else {
          this.isSelectedAll = false;
        }
      },
    },
  },
  computed: {
    ...mapGetters(['getListProducts', 'getErrorCodeProduct']),
    listProduct() {
      // set list account
      const result = [];
      this.getListProducts.forEach((item) => {
        result.push({
          id: item.id,
          name: item.name,
          price: item.price,
          price_temp: item.price_temp,
          description: item.description,
          quantity: item.quantity,
          view_item: item.view_item,
          sale: item.sale,
          created_at: item.created_at,
        });
      });
      return result;
    },
    listIdProduct() {
      const result = [];
      this.listProduct.forEach((item) => {
        result.push(item.id);
      });
      return result;
    },
    checkCanDelete() {
      let result;
      if (this.selectedListProduct.length > 0) result = true;
      else result = false;
      return result;
    },
  },
  methods: {
    setIsSelectedAll() {
      this.isSelectedAll = !this.isSelectedAll;
      if (this.isSelectedAll) {
        this.selectedListProduct = this.listIdProduct;
      } else {
        this.selectedListProduct = [];
      }
    },
    setItemsTableWithSearch() {
      this.$store.dispatch('getProduct', this.search);
    },
    async editProduct() {
      // update product
      const submitButton = this.$refs.btn_update_product;
      submitButton.classList.add('spinner', 'spinner-light', 'spinner-right');
      await this.$store.dispatch('updateProduct', this.dataChanged);
      if (this.getErrorCodeProduct === 0) {
        this.$bvModal.hide(constants.PRODUCT_CONST.ID_POPUP_DETAIL);
        await this.$store.dispatch('getProduct', '');
        this.makeToastMessage(
          constants.COMMON_CONST.MESSAGE_UPDATE_SUCCEED,
          'success',
        );
        this.canUpdate = false;
      } else {
        this.makeToastMessage(
          constants.COMMON_CONST.MESSAGE_UPDATE_FAILED,
          'danger',
        );
      }
      submitButton.classList.remove(
        'spinner',
        'spinner-light',
        'spinner-right',
      );
    },
    cancelModalDetail() {
      this.$bvModal.hide('modal-detail-product');
    },
    searchProduct(event) {
      event.preventDefault();
      this.$store.dispatch('getProduct', this.inputSearch);
    },
    formatDate(date) {
      if (date) {
        return moment(date).format('YYYY-MM-DD');
      }
      return '';
    },
    updateSelectedListId(value) {
      this.selectedListProduct = value;
    },
    getSingleIdProduct(productId) {
      // set id when delete single
      this.selectedListProduct = [productId];
    },
    updateData(newData) {
      const oldData = {
        name: this.productDetail.name,
        description: this.productDetail.description,
        category_id: this.productDetail.categoryId,
        supplier_id: this.productDetail.supplierId,
        quantity: this.productDetail.quantity,
        short_description: this.productDetail.shortDescription,
        price_temp: this.productDetail.priceTemp,
        price: this.productDetail.price,
        sale: this.productDetail.sale,
        image: this.productDetail.image,
        image2: this.productDetail.image2,
        image3: this.productDetail.image3,
      };
      if (JSON.stringify(oldData) === JSON.stringify(newData)) {
        this.canUpdate = false;
      } else {
        this.canUpdate = true;
      }
      this.dataChanged = {
        data: {
          item_id: this.productDetail.id,
          name: newData.name,
          description: newData.description,
          category_id: newData.categoryId,
          supplier_id: newData.supplierId,
          quantity: newData.quantity,
          short_description: newData.shortDescription,
          price_temp: newData.priceTemp,
          price: newData.price,
          image: newData.image,
          image2: newData.image2,
          image3: newData.image3,
          sale: newData.sale,
        },
      };
    },
    getDetailProduct(id) {
      this.selectedListProduct = [id];
      this.productDetail = this.getListProducts.find((item) => item.id === id);
    },
    makeToastMessage(message, status) {
      this.$bvToast.toast(message, {
        title: 'Thông báo',
        variant: status,
        autoHideDelay: 2000,
        solid: true,
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.manage-product-container {
  &__header {
    margin-bottom: 12px;
  }
  &__options {
    display: grid;
    grid-template-columns: 50% 50%;
    &__search-form {
      display: flex;
      align-items: center;
      padding: 12px 0px;
      position: relative;
      .search-form-input {
        padding-left: 35px;
      }
      .search-form-icon {
        position: absolute;
        cursor: pointer;
        left: 10px;
      }
    }
    &__button-group {
      margin: 12px 0px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .btn-group-options {
        margin: 0px 5px;
        cursor: pointer;
      }
      .btn-group-options:first-child {
        margin-left: 0px;
      }
      .btn-group-options:last-child {
        margin-right: 0px;
      }
      .-disable {
        opacity: 0.2;
        cursor: default;
      }
    }
  }
  &__table {
    .show-detail {
      svg {
        border-radius: 50%;
        background: #1a9fed;
        padding: 5px;
        width: 32px;
        height: 32px;
        margin-right: 5px;
        cursor: pointer;
      }
    }
  }
}
</style>
<style lang='scss'>
th {
  background: #dcdcdc;
}
td {
  vertical-align: middle !important;
  padding: 10px !important;
}
.-disable {
  cursor: default !important;
}
</style>
