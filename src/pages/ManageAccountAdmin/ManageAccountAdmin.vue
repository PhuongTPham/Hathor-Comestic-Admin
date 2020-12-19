<template>
  <div class="manage-account-container">
    <div class="manage-account-container__header">
      <Header />
    </div>
    <div class="manage-account-container__options">
      <b-form @submit="searchAccount" >
        <div class="manage-account-container__options__search-form" >
          <b-form-input class="search-form-input" placeholder="Tìm kiếm" v-model="inputSearch" ></b-form-input>
          <b-icon-search class="search-form-icon" :font-scale="1.5" @click="searchAccount"></b-icon-search>
        </div>
      </b-form>
      <div class="manage-account-container__options__button-group">
        <b-icon-ui-checks-grid
          class="btn-group-options"
          variant="success"
          font-scale="2.5"
          :class="checkSelectedAll ? '': '-disable'"
          @click="selectAllRows"
        >
        </b-icon-ui-checks-grid>
        <b-icon-arrow-counterclockwise
          class="btn-group-options"
          variant="success"
          font-scale="2.5"
          :class="checkClearAll ? '' : '-disable'"
          @click="clearSelectedRows"
        >
        </b-icon-arrow-counterclockwise>
        <b-icon-trash
          class="btn-group-options"
          variant="danger"
          font-scale="2.5"
          :class="checkCanDelete ? '' : '-disable'"
          v-b-modal.modal-delete-account
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
    <div class="manage-account-container__table">
      <b-table
        ref="selectableTable"
        sticky-header
        selectable
        show-empty
        small
        Striped
        hover
        stacked="md"
        :items="setItemsTable"
        :fields="fields"
        responsive="sm"
        empty-text="không có bản ghi"
        @row-selected="onRowSelected"
      >
        <template #cell(actions)="row">
          <div class="show-detail">
            <b-icon-pencil-square
              variant="light"
              @click="getDetailAccount(row)"
              v-b-modal.modal-detail-account
            ></b-icon-pencil-square>
            <b-icon-trash
              variant="light"
              class="rounded-circle bg-danger p-2"
              v-b-modal.modal-delete-account
            ></b-icon-trash>
          </div>
        </template>
      </b-table>
    </div>

    <div>
      <b-modal id="modal-detail-account" no-close-on-backdrop size="lg" :title="userDetail.full_name">
        <PopupDetailAccount :userDetail="userDetail" @update="updateData"/>
        <template #modal-footer="">
          <b-button size="sm" variant="danger" @click="cancel">
            Hủy bỏ
          </b-button>
          <b-button size="sm" variant="success" @click="submit" :disabled="!canUpdate">
            Thay đổi
          </b-button>
        </template>
      </b-modal>
    </div>

    <div>
      <PopupDeleteAccount
        :titleModal="constants.TITLE_POPUP_DELETE"
        :idModal="constants.ID_POPUP_DELETE_ACCOUNT"
        :contentModal="constants.CONTENT_POPUP_DELETE"
        :selectedListId="selectedListId"
      />
    </div>

    <div>
      <PopupAddAccount
        :titleModal="constants.TITLE_POPUP_ADD_ACCOUNT"
        :idModal="constants.ID_POPUP_ADD_ACCOUNT"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from '../../components/ManageAccountAdmin/Headers/Header.vue';
import PopupDetailAccount from '../../components/ManageAccountAdmin/Popups/PopupDetailAccount.vue';
import PopupDeleteAccount from '../../components/ManageAccountAdmin/Popups/PopupDeleteAccount.vue';
import PopupAddAccount from '../../components/ManageAccountAdmin/Popups/PopupAddAccount.vue';
import constants from '../../constants/index';

export default {
  name: 'ManageAccountAdmin',
  components: {
    Header,
    PopupDetailAccount,
    PopupDeleteAccount,
    PopupAddAccount,
  },
  data() {
    return {
      title: 'Thêm tài khoản',
      styleCss: 'background: #FFFFFF;color:#333333;',
      userDetail: {},
      fields: [
        { key: 'username', label: 'Tài khoản' },
        { key: 'email', label: 'Email ' },
        { key: 'gender', label: 'Gioi tinh' },
        { key: 'birthday', label: 'Ngay sinh' },
        { key: 'is_active', label: 'Trang thai' },
        { key: 'created_at', label: 'Created_at' },
      ],
      canUpdate: false,
      dataChanged: {},
      selectedList: [],
      constants,
      inputSearch: '',
    };
  },
  computed: {
    ...mapGetters(['getListAccount', 'getErrorCode']),
    setItemsTable() {
      const items = [];
      this.getListAccount.forEach((item) => {
        items.push({
          id: item.id,
          username: item.username,
          email: item.email,
          gender: item.gender,
          birthday: item.birthday,
          is_active: item.is_active,
          created_at: item.created_at,
        });
      });
      return items;
    },
    selectedListId() {
      const result = [];
      this.selectedList.forEach((item) => {
        result.push(item.id);
      });
      return result;
    },
    checkSelectedAll() {
      let result;
      if (this.selectedListId.length < this.getListAccount.length) result = true;
      else result = false;
      return result;
    },
    checkClearAll() {
      let result;
      if (this.selectedListId.length > 0) result = true;
      else result = false;
      return result;
    },
    checkCanDelete() {
      let result;
      if (this.selectedListId.length > 0) result = true;
      else result = false;
      return result;
    },
  },
  methods: {
    getDetailAccount(row) {
      this.userDetail = this.getListAccount.find((item) => item.username === row.item.username);
      // this.$store.dispatch('getTenant', '');
    },
    onRowSelected(items) {
      this.selectedList = items;
    },
    selectAllRows() {
      this.$refs.selectableTable.selectAllRows();
    },
    clearSelectedRows() {
      this.$refs.selectableTable.clearSelected();
    },
    convertRole(role) {
      // change role to number
      let result;
      if (role === 'Admin') {
        result = 1;
      } else if (role === 'View') {
        result = 2;
      } else {
        result = 3;
      }
      return result;
    },
    updateData(newData) {
      // data before is changed
      const oldData = {
        full_name: this.userDetail.full_name,
        role: this.userDetail.role,
        staff_code: this.userDetail.staff_code,
        tenant: this.userDetail.tenant.id,
      };

      // check data is changed -> active button submit
      if (JSON.stringify(oldData) === JSON.stringify(newData.data)) {
        this.canUpdate = false;
      } else {
        this.canUpdate = true;
      }

      // data to submit api
      this.dataChanged = {
        data: {
          full_name: newData.data.full_name,
          role: this.convertRole(newData.data.role),
          staff_code: newData.data.staff_code,
          tenant: newData.data.tenant,
        },
        id: newData.id,
      };
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
      // update account
      await this.$store.dispatch('updateAccount', this.dataChanged);
      if (this.getErrorCode === 0) {
        this.$bvModal.hide(`${constants.ID_POPUP_DETAIL_ACCOUNT}`);
        await this.$store.dispatch('getAccount');
        this.makeToastMessage(constants.MESSAGE_UPDATE_SUCCEED, 'success');
      } else {
        this.makeToastMessage(constants.MESSAGE_UPDATE_FAILED, 'danger');
      }
    },
    searchAccount(event) {
      event.preventDefault();
      this.$store.dispatch('getAccount', this.inputSearch);
    },
    cancel() {
      this.$bvModal.hide(`${constants.ID_POPUP_DETAIL_ACCOUNT}`);
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
</style>
<style lang='scss'>
thead {
  background: linear-gradient(to bottom left, #6600cc 0%, #ff99cc 100%);
  opacity: 0.7;
  color: #ffffff;
}
td {
  vertical-align: middle !important;
}
</style>
