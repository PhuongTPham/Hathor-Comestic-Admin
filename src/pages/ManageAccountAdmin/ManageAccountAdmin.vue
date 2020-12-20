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
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">
              <input type="checkbox" :checked="isSelectedAll" @click="setIsSelectedAll" />
            </th>
            <th scope="col">Tài khoản</th>
            <th scope="col">Email</th>
            <th scope="col">Giới tính</th>
            <th scope="col">Ngày sinh</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(account, index) in listAccount" :key="index">
            <td>
              <input type="checkbox" :value="account.id" v-model="selectedListAccount" />
            </td>
            <td>{{ account.username }}</td>
            <td>{{ account.email }}</td>
            <td>{{ account.gender }}</td>
            <td>{{ account.birthday }}</td>
            <td>{{ account.is_active }}</td>
            <td>
              <div class="show-detail">
                <b-icon-pencil-square
                  variant="light"
                  @click="getDetailAccount(account.id)"
                  v-b-modal.modal-detail-account
                ></b-icon-pencil-square>
                <b-icon-trash
                  variant="light"
                  class="rounded-circle bg-danger p-2"
                  v-b-modal.modal-delete-account
                  @click="getSingleIdAccount(account.id)"
                ></b-icon-trash>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      <b-modal id="modal-detail-account" no-close-on-backdrop size="lg" :title="userDetail.full_name">
        <PopupDetailAccount :userDetail="userDetail" @update="updateData"/>
        <template #modal-footer="">
          <b-button size="sm" variant="danger" @click="cancel">
            Hủy bỏ
          </b-button>
          <b-button ref="btn_update_account" size="sm" variant="success" @click="submit" :disabled="!canUpdate" :class="{ '-disable': !canUpdate }">
            Thay đổi
          </b-button>
        </template>
      </b-modal>
    </div>

    <div>
      <PopupDeleteAccount
        :titleModal="constants.ACCOUNT_CONST.TITLE_POPUP_DELETE_ACCOUNT"
        :idModal="constants.ACCOUNT_CONST.ID_POPUP_DELETE_ACCOUNT"
        :contentModal="constants.ACCOUNT_CONST.CONTENT_POPUP_DELETE_ACCOUNT"
        :selectedListId="selectedListAccount"
        @updateSelectedListId="updateSelectedListId"
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
      userDetail: {},
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
        if (this.selectedListAccount.length === this.listIdAccount.length) {
          this.isSelectedAll = true;
        } else {
          this.isSelectedAll = false;
        }
      },
    },
  },
  computed: {
    ...mapGetters(['getListAccount', 'getErrorCode']),
    listAccount() {
      // set list account
      const result = [];
      this.getListAccount.forEach((item) => {
        result.push({
          username: item.username,
          email: item.email,
          gender: item.gender,
          birthday: item.birthday,
          is_active: item.is_active,
          id: item.id,
        });
      });
      return result;
    },
    listIdAccount() {
      // set list id account
      const result = [];
      this.listAccount.forEach((item) => {
        result.push(item.id);
      });
      return result;
    },
    checkCanDelete() {
      // check enable button delete
      let result;
      if (this.selectedListAccount.length > 0) result = true;
      else result = false;
      return result;
    },
  },
  methods: {
    setIsSelectedAll() {
      // change status select box all
      this.isSelectedAll = !this.isSelectedAll;
      if (this.isSelectedAll) {
        this.selectedListAccount = this.listIdAccount;
      } else {
        this.selectedListAccount = [];
      }
    },
    getDetailAccount(id) {
      this.selectedListAccount = [id];
      this.userDetail = this.getListAccount.find((item) => item.id === id);
      // this.$store.dispatch('getTenant', '');
    },
    getSingleIdAccount(id) {
      // set id when delete single
      this.selectedListAccount = [id];
    },
    convertGender(gender) {
      let result;
      if (gender === 1) {
        result = 'Nu';
      } else if (gender === 2) {
        result = 'Nam';
      } else {
        result = 'Other';
      }
      return result;
    },
    updateData(newData) {
      const oldData = {
        email: this.userDetail.email,
        gender: this.userDetail.gender,
        birthday: this.userDetail.birthday,
      };
      if (JSON.stringify(oldData) === JSON.stringify(newData.data)) {
        this.canUpdate = false;
      } else {
        this.canUpdate = true;
      }
      this.dataChanged = {
        data: {
          email: newData.data.email,
          gender: this.convertGender(newData.data.gender),
          birthday: newData.data.birthday,
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
      const submitButton = this.$refs.btn_update_account;
      submitButton.classList.add('spinner', 'spinner-light', 'spinner-right');
      await this.$store.dispatch('updateAccount', this.dataChanged);
      if (this.getErrorCodeAccount === 0) {
        this.$bvModal.hide(constants.ACCOUNT_CONST.ID_POPUP_DETAIL_ACCOUNT);
        await this.$store.dispatch('getAccount', '');
        this.makeToastMessage(constants.COMMON_CONST.MESSAGE_UPDATE_SUCCEED, 'success');
        this.canUpdate = false;
      } else {
        this.makeToastMessage(constants.COMMON_CONST.MESSAGE_UPDATE_FAILED, 'danger');
      }
      submitButton.classList.remove(
        'spinner',
        'spinner-light',
        'spinner-right',
      );
    },
    searchAccount(event) {
      // call api search account
      event.preventDefault();
      this.$store.dispatch('getAccount', this.inputSearch);
    },
    cancel() {
      // close popup detail
      this.$bvModal.hide(constants.ACCOUNT_CONST.ID_POPUP_DETAIL_ACCOUNT);
      this.canUpdate = false;
    },
    updateSelectedListId(value) {
      this.selectedListAccount = value;
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
