<template>
 <div class="manage-account-container">
    <div class="manage-account-container__header">
      <Header />
    </div>
    <div class="manage-account-container__options">
      <b-form @submit="searchCategory" >
        <div class="manage-account-container__options__search-form" >
          <b-form-input class="search-form-input" placeholder="Tìm kiếm" v-model="inputSearch" ></b-form-input>
          <b-icon-search class="search-form-icon" :font-scale="1.5" @click="searchCategory"></b-icon-search>
        </div>
      </b-form>
      <div class="manage-account-container__options__button-group">
        <b-icon-trash
          class="btn-group-options"
          variant="danger"
          font-scale="2.5"
          :class="checkCanDelete ? '' : '-disable'"
          v-b-modal.modal-delete-category
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
            <th scope="col">ID</th>
            <th scope="col">NAME</th>
            <th scope="col">DESCRIPTION</th>
            <th scope="col">Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(account, index) in listAccount" :key="index">
            <td>
              <input type="checkbox" :value="account.id" v-model="selectedListAccount" />
            </td>
            <td>{{ account.id }}</td>
            <td>{{ account.name }}</td>
            <td>{{ account.description }}</td>
            <td>
              <div class="show-detail">
                <b-icon-pencil-square
                  variant="light"
                  @click="getDetailCategory(account.id)"
                  v-b-modal.modal-detail-category
                ></b-icon-pencil-square>
                <b-icon-trash
                  variant="light"
                  class="rounded-circle bg-danger p-2"
                  v-b-modal.modal-delete-category
                  @click="getSingleIdCategory(account.id)"
                ></b-icon-trash>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      <b-modal id="modal-detail-category" no-close-on-backdrop size="lg" :title="userDetail.name">
        <PopupDetaillCategory :userDetail="userDetail" @update="updateData"/>
        <template #modal-footer="">
          <b-button size="sm" variant="danger" @click="cancel">
            Hủy bỏ
          </b-button>
          <b-button ref="btn_update_category" size="sm" variant="success" @click="submit" :disabled="!canUpdate" :class="{ '-disable': !canUpdate }">
            Thay đổi
          </b-button>
        </template>
      </b-modal>
    </div>

    <div>
      <PopupDeleteCategory
        :titleModal="constants.CATEGORY_CONST.TITLE_POPUP_DELETE"
        :idModal="constants.CATEGORY_CONST.ID_POPUP_DELETE"
        :contentModal="constants.CATEGORY_CONST.CONTENT_POPUP_DELETE"
        :selectedListId="selectedListAccount"
        @updateSelectedListId="updateSelectedListId"
      />
    </div>

     <div>
      <PopupAddCategory
        :titleModal="constants.CATEGORY_CONST.TITLE_POPUP_ADD"
        :idModal="constants.CATEGORY_CONST.ID_POPUP_ADD"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from '../../components/ManageCategory/Headers/Header.vue';
import PopupDetaillCategory from '../../components/ManageCategory/Popups/PopupDetaillCategory.vue';
import PopupDeleteCategory from '../../components/ManageCategory/Popups/PopupDeleteCategory.vue';
import PopupAddCategory from '../../components/ManageCategory/Popups/PopupAddCategory.vue';

import constants from '../../constants/index';

export default {
  name: 'ManageCategory',
  components: {
    Header,
    PopupDetaillCategory,
    PopupAddCategory,
    PopupDeleteCategory,
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
    ...mapGetters(['getlistCategory', 'getErrorCodeCategory']),
    listAccount() {
      // set list account
      const result = [];
      this.getlistCategory.forEach((item) => {
        result.push({
          id: item.id,
          name: item.name,
          description: item.description,
        });
      });
      return result;
    },
    listIdAccount() {
      const result = [];
      this.listAccount.forEach((item) => {
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
        this.selectedListAccount = this.listIdAccount;
      } else {
        this.selectedListAccount = [];
      }
    },
    getDetailCategory(id) {
      this.selectedListAccount = [id];
      this.userDetail = this.getlistCategory.find((item) => item.id === id);
    },
    getSingleIdCategory(id) {
      // set id when delete single
      this.selectedListAccount = [id];
    },
    updateData(newData) {
      const oldData = {
        category_id: this.userDetail.id,
        name: this.userDetail.name,
        description: this.userDetail.description,
      };
      if (JSON.stringify(oldData) === JSON.stringify(newData)) {
        this.canUpdate = false;
      } else {
        this.canUpdate = true;
      }
      this.dataChanged = {
        data: {
          category_id: newData.category_id,
          name: newData.name,
          description: newData.description,
        },
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
      // update category
      const submitButton = this.$refs.btn_update_category;
      submitButton.classList.add('spinner', 'spinner-light', 'spinner-right');
      await this.$store.dispatch('updateCategory', this.dataChanged);
      if (this.getErrorCodeCategory === 0) {
        this.$bvModal.hide(constants.CATEGORY_CONST.ID_POPUP_DETAIL);
        await this.$store.dispatch('getListCategory', '');
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
    searchCategory(event) {
      event.preventDefault();
      this.$store.dispatch('getListCategory', this.inputSearch);
    },
    cancel() {
      this.$bvModal.hide(constants.CATEGORY_CONST.ID_POPUP_DETAIL);
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
