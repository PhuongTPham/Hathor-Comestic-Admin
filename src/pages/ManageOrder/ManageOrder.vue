<template>
  <div class="manage-account-container">
    <div class="manage-account-container__header">
      <Header />
    </div>
    <div class="manage-account-container__options">
      <b-form @submit="searchOrder">
        <div class="manage-account-container__options__search-form">
          <b-form-input
            class="search-form-input"
            placeholder="Tìm kiếm"
            v-model="inputSearch"
          ></b-form-input>
          <b-icon-search
            class="search-form-icon"
            :font-scale="1.5"
            @click="searchOrder"
          ></b-icon-search>
        </div>
      </b-form>
    </div>
    <div class="manage-account-container__table">
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
            <th scope="col">ORDER ID</th>
            <th scope="col">NAME</th>
            <th scope="col">PHONE</th>
            <th scope="col">ADDRESS</th>
            <th scope="col">USER_ID</th>
            <th scope="col">PAYMENT</th>
            <th scope="col">STATUS</th>
            <th scope="col">CREATED_AT</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(account, index) in orders" :key="index">
            <td>
              <input
                type="checkbox"
                :value="account.id"
                v-model="selectedListAccount"
              />
            </td>
            <td>{{ account.id }}</td>
            <td>{{ account.name }}</td>
            <td>{{ account.phone }}</td>
            <td>{{ account.address }}</td>
            <td>{{ account.user }}</td>
            <td>{{ account.payment_type }}</td>
            <td>{{ account.status }}</td>
            <td>{{ account.created_at }}</td>
            <td>
              <div class="show-detail">
                <b-icon-pencil-square
                  variant="light"
                  @click="getDetailOrder(account.id)"
                  v-b-modal.modal-detail-order
                ></b-icon-pencil-square>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      <b-modal
        id="modal-detail-order"
        no-close-on-backdrop
        size="lg"
        :title="orderDetail.name"
      >
        <PopupDetailOrder
          :userDetail="orderDetail"
          @update="updateData"
          :options="constants.ORDER_STATUS"
        />
        <template #modal-footer="">
          <b-button size="sm" variant="danger" @click="cancel">
            Hủy bỏ
          </b-button>
          <b-button
            ref="btn_update_order"
            size="sm"
            variant="success"
            @click="submit"
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
import Header from '../../components/ManageOrder/Headers/Header.vue';
import PopupDetailOrder from '../../components/ManageOrder/Popups/PopupDetailOrder.vue';
import constants from '../../constants/index';

export default {
  name: 'ManageOrder',
  components: {
    Header,
    PopupDetailOrder,
  },
  data() {
    return {
      orderDetail: {},
      canUpdate: false,
      dataChanged: {},
      isSelectedAll: false,
      selectedListAccount: [],
      constants,
      inputSearch: '',
    };
  },
  watch: {
    // check status isSelectedAll
    selectedListAccount: {
      handler() {
        if (this.selectedListAccount.length === this.listIdOrder.length) {
          this.isSelectedAll = true;
        } else {
          this.isSelectedAll = false;
        }
      },
    },
  },
  computed: {
    ...mapGetters(['getOrders', 'getErrorCodeOrder']),
    orders() {
      const result = [];
      this.getOrders.forEach((item) => {
        result.push({
          id: item.id,
          name: item.name,
          phone: item.phone,
          address: item.address,
          user: item.user,
          status: item.status,
          payment_type: item.payment_type,
          created_at: item.created_at,
        });
      });
      return result;
    },
    listIdOrder() {
      const result = [];
      this.orders.forEach((item) => {
        result.push(item.id);
      });
      return result;
    },
    checkCanDelete() {
      let result;
      if (this.selectedListAccount.length > 0) result = true;
      else result = false;
      return result;
    },
  },
  methods: {
    setIsSelectedAll() {
      this.isSelectedAll = !this.isSelectedAll;
      if (this.isSelectedAll) {
        this.selectedListAccount = this.listIdOrder;
      } else {
        this.selectedListAccount = [];
      }
    },
    updateData(newData) {
      const oldData = {
        order_id: this.orderDetail.id,
        status: this.orderDetail.status,
      };
      if (JSON.stringify(oldData) === JSON.stringify(newData)) {
        this.canUpdate = false;
      } else {
        this.canUpdate = true;
      }
      this.dataChanged = {
        order_id: newData.order_id,
        status: newData.status,
      };
    },
    getDetailOrder(id) {
      this.selectedListAccount = [id];
      this.orderDetail = this.getOrders.find((item) => item.id === id);
    },
    makeToastMessage(message, status) {
      this.$bvToast.toast(message, {
        title: 'Thông báo',
        variant: status,
        autoHideDelay: 2000,
        solid: true,
      });
    },
    async submit() {
      // update category
      const submitButton = this.$refs.btn_update_order;
      submitButton.classList.add('spinner', 'spinner-light', 'spinner-right');
      await this.$store.dispatch('updateStatusOrder', this.dataChanged);
      if (this.getErrorCodeOrder === 0) {
        this.$bvModal.hide(constants.ORDER_CONST.ID_POPUP_DETAIL);
        await this.$store.dispatch('getOrders', '');
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
    searchOrder(event) {
      event.preventDefault();
      this.$store.dispatch('getOrders', this.inputSearch);
    },
    cancel() {
      this.$bvModal.hide(constants.ORDER_CONST.ID_POPUP_DETAIL);
      this.canUpdate = false;
    },
  },
};
</script>

<style lang='scss' scoped>
.manage-account-container {
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
.op {
  display: flex;
  align-items: center;
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #dcdcdc;
    margin-right: 4px;
    &.green {
      background: #45d1d1;
    }
    &.red {
      background: #fc9c95;
    }
    &.yellow {
      background: #f8bf2d;
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
