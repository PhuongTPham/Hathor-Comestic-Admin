<template>
  <div class="manage-toanha-container">
    <div class="manage-toanha-container__header">
      <Header />
    </div>
    <div class="manage-toanha-container__options">
      <b-form @submit="searchBuilding" >
        <div class="manage-toanha-container__options__search-form" >
          <b-form-input class="search-form-input" placeholder="Tìm kiếm" v-model="inputSearch" ></b-form-input>
          <b-icon-search class="search-form-icon" :font-scale="1.5" @click="searchBuilding"></b-icon-search>
        </div>
      </b-form>
      <div class="manage-toanha-container__options__button-group">
        <b-icon-trash
          class="btn-group-options"
          variant="danger"
          font-scale="2.5"
          :class="checkCanDelete ? '' : '-disable'"
          v-b-modal.modal-delete-toanha
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
    <div class="manage-toanha-container__table">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">
              <input type="checkbox" :checked="isSelectedAll" @click="setIsSelectedAll" />
            </th>
            <th scope="col">Tên tòa nhà</th>
            <th scope="col">Địa chỉ</th>
            <th scope="col">Phường</th>
            <th scope="col">Quận</th>
            <th scope="col">Thành phố</th>
            <th scope="col">Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(building, index) in listBuilding" :key="index">
            <td>
              <input type="checkbox" :value="building.id" v-model="selectedListBuilding" />
            </td>
            <td>{{ building.name }}</td>
            <td>{{ building.address }}</td>
            <td>{{ building.phuong }}</td>
            <td>{{ building.district }}</td>
            <td>{{ building.city }}</td>
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
                  v-b-modal.modal-delete-toanha
                  @click="getSingleIdBuilding(building.id)"
                ></b-icon-trash>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <PopupDeleteComment
        :titleModal="constants.COMMENT_CONST.TITLE_POPUP_DELETE"
        :idModal="constants.COMMENT_CONST.ID_POPUP_DELETE"
        :contentModal="constants.COMMENT_CONST.CONTENT_POPUP_DELETE"
        :selectedListId="selectedListBuilding"
        @updateSelectedListId="updateSelectedListId"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from '../../components/ManageComment/Headers/Header.vue';
import PopupDeleteComment from '../../components/ManageComment/Popups/PopupDeleteComment.vue';
import constants from '../../constants/index';

export default {
  name: 'ManageToaNha',
  components: {
    Header,
    PopupDeleteComment,
  },
  data() {
    return {
      styleCss: 'background: #FFFFFF;color:#333333;',
      canUpdate: false,
      isSelectedAll: false,
      inputSearch: '',
      selectedListBuilding: [],
      constants,
    };
  },
  watch: {
    selectedListBuilding: {
      handler() {
        if (this.selectedListBuilding.length === this.listIdBuilding.length) {
          this.isSelectedAll = true;
        } else {
          this.isSelectedAll = false;
        }
      },
    },
  },
  computed: {
    ...mapGetters(['getlistToaNha']),
    listBuilding() {
      const items = [];
      this.getlistToaNha.forEach((item) => {
        items.push({
          name: item.name,
          address: item.address,
          phuong: item.phuong,
          district: item.district.name,
          city: item.city,
          id: item.id,
        });
      });
      return items;
    },
    listIdBuilding() {
      const result = [];
      this.listBuilding.forEach((item) => {
        result.push(item.id);
      });
      return result;
    },
    checkCanDelete() {
      // check enable button delete
      let result;
      if (this.selectedListBuilding.length > 0) result = true;
      else result = false;
      return result;
    },
  },
  methods: {

    setIsSelectedAll() {
      this.isSelectedAll = !this.isSelectedAll;
      if (this.isSelectedAll) {
        this.selectedListBuilding = this.listIdBuilding;
      } else {
        this.selectedListBuilding = [];
      }
    },
    searchBuilding(event) {
      event.preventDefault();
      this.$store.dispatch('getBuilding', this.inputSearch);
    },
    updateSelectedListId(value) {
      this.selectedListBuilding = value;
    },
    getSingleIdBuilding(id) {
      this.selectedListBuilding = [id];
    },
    submit() {
      // console.log('ok');
    },
    cancel() {
      this.$bvModal.hide('modal-detail-account');
    },
  },
};
</script>

<style lang='scss' scoped>
.manage-toanha-container {
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
</style>
