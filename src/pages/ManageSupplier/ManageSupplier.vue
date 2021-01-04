<template>
  <div class="manage-account-container">
    <div class="manage-account-container__header">
      <Header />
    </div>
    <div class="manage-account-container__options">
      <b-form @submit="searchSupplier">
        <div class="manage-account-container__options__search-form">
          <b-form-input
            class="search-form-input"
            placeholder="Tìm kiếm"
            v-model="inputSearch"
          ></b-form-input>
          <b-icon-search
            class="search-form-icon"
            :font-scale="1.5"
            @click="searchSupplier"
            @keyup.enter="searchSupplier"
          ></b-icon-search>
        </div>
      </b-form>
      <div class="manage-account-container__options__button-group">
        <b-icon-trash
          class="btn-group-options"
          variant="danger"
          font-scale="2.5"
          :class="checkCanDelete ? '' : '-disable'"
          v-b-modal.modal-delete-supplier
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
              <input
                type="checkbox"
                :checked="isSelectedAll"
                @click="setIsSelectedAll"
              />
            </th>
            <th scope="col">ID</th>
            <th scope="col">NAME</th>
            <th scope="col">DESCRIPTION</th>
            <th scope="col">ADDRESS</th>
            <th scope="col">Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(account, index) in listSupplier" :key="index">
            <td>
              <input
                type="checkbox"
                :value="account.id"
                v-model="selectedListSupplier"
              />
            </td>
            <td>{{ account.id }}</td>
            <td>{{ account.name }}</td>
            <td>{{ account.description }}</td>
            <td>{{ account.address }}</td>
            <td>
              <div class="show-detail">
                <b-icon-pencil-square
                  variant="light"
                  @click="getDetailSupplier(account.id)"
                  v-b-modal.modal-detail-supplier
                ></b-icon-pencil-square>
                <b-icon-trash
                  variant="light"
                  class="rounded-circle bg-danger p-2"
                  v-b-modal.modal-delete-supplier
                  @click="getSingleIdSupplier(account.id)"
                ></b-icon-trash>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      <b-modal
        id="modal-detail-supplier"
        no-close-on-backdrop
        size="lg"
        :title="userSupplier.name"
      >
        <PopupDetaillSupplier
          :userSupplier="userSupplier"
          @update="updateData"
        />
        <template #modal-footer="">
          <b-button size="sm" variant="danger" @click="cancel">
            Hủy bỏ
          </b-button>
          <b-button
            ref="btn_update_supplier"
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

    <div>
      <PopupDeleteSupplier
        :titleModal="constants.SUPPLIER_CONST.TITLE_POPUP_DELETE"
        :idModal="constants.SUPPLIER_CONST.ID_POPUP_DELETE"
        :contentModal="constants.SUPPLIER_CONST.CONTENT_POPUP_DELETE"
        :selectedListId="selectedListSupplier"
        @updateSelectedListId="updateSelectedListId"
      />
    </div>

    <div>
      <PopupAddSupplier
        :titleModal="constants.SUPPLIER_CONST.TITLE_POPUP_ADD"
        :idModal="constants.SUPPLIER_CONST.ID_POPUP_ADD"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from '../../components/ManageSupplier/Headers/Header.vue';
import PopupDetaillSupplier from '../../components/ManageSupplier/Popups/PopupDetaillSupplier.vue';
import PopupDeleteSupplier from '../../components/ManageSupplier/Popups/PopupDeleteSupplier.vue';
import PopupAddSupplier from '../../components/ManageSupplier/Popups/PopupAddSupplier.vue';

import constants from '../../constants/index';

export default {
  name: 'ManageSupplier',
  components: {
    Header,
    PopupDetaillSupplier,
    PopupAddSupplier,
    PopupDeleteSupplier,
  },
  data() {
    return {
      userSupplier: {},
      canUpdate: false,
      dataChanged: {},
      isSelectedAll: false,
      selectedListSupplier: [],
      constants,
      inputSearch: '',
    };
  },
  watch: {
    selectedListSupplier: {
      handler() {
        if (this.selectedListSupplier.length === this.listIdSupplier.length) {
          this.isSelectedAll = true;
        } else {
          this.isSelectedAll = false;
        }
      },
    },
  },
  computed: {
    ...mapGetters(['getlistSupplier', 'getErrorCodeSupplier']),
    listSupplier() {
      const result = [];
      this.getlistSupplier.forEach((item) => {
        result.push({
          id: item.id,
          name: item.name,
          description: item.description,
          address: item.address,
        });
      });
      return result;
    },
    listIdSupplier() {
      const result = [];
      this.listSupplier.forEach((item) => {
        result.push(item.id);
      });
      return result;
    },
    checkCanDelete() {
      let result;
      if (this.selectedListSupplier.length > 0) result = true;
      else result = false;
      return result;
    },
  },
  methods: {
    setIsSelectedAll() {
      this.isSelectedAll = !this.isSelectedAll;
      if (this.isSelectedAll) {
        this.selectedListSupplier = this.listIdSupplier;
      } else {
        this.selectedListSupplier = [];
      }
    },
    getDetailSupplier(id) {
      this.selectedListSupplier = [id];
      this.userSupplier = this.getlistSupplier.find((item) => item.id === id);
    },
    getSingleIdSupplier(id) {
      this.selectedListSupplier = [id];
    },
    updateData(newData) {
      const oldData = {
        supplier_id: this.userSupplier.id,
        name: this.userSupplier.name,
        description: this.userSupplier.description,
        address: this.userSupplier.address,
      };
      if (JSON.stringify(oldData) === JSON.stringify(newData)) {
        this.canUpdate = false;
      } else {
        this.canUpdate = true;
      }
      this.dataChanged = {
        data: {
          supplier_id: newData.supplier_id,
          name: newData.name,
          description: newData.description,
          address: newData.address,
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
      const submitButton = this.$refs.btn_update_supplier;
      submitButton.classList.add('spinner', 'spinner-light', 'spinner-right');
      await this.$store.dispatch('updateSupplier', this.dataChanged);
      if (this.getErrorCodeSupplier === 0) {
        this.$bvModal.hide(constants.SUPPLIER_CONST.ID_POPUP_DETAIL);
        await this.$store.dispatch('getListSupplier', '');
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
    searchSupplier(event) {
      event.preventDefault();
      this.$store.dispatch('getListSupplier', this.inputSearch);
    },
    cancel() {
      this.$bvModal.hide(constants.SUPPLIER_CONST.ID_POPUP_DETAIL);
      this.canUpdate = false;
    },
    updateSelectedListId(value) {
      this.selectedListSupplier = value;
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
