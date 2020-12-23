<template>
  <div class="manage-subscriber-container">
    <div class="manage-subscriber-container__header">
      <Header />
    </div>
    <div class="manage-subscriber-container__options">
      <b-form @submit="searchSubscriber" >
        <div class="manage-subscriber-container__options__search-form" >
          <b-form-input class="search-form-input" placeholder="Tìm kiếm" v-model="inputSearch" ></b-form-input>
          <b-icon-search class="search-form-icon" :font-scale="1.5" @click="searchSubscriber"></b-icon-search>
        </div>
      </b-form>
      <div class="manage-subscriber-container__options__button-group">
        <b-icon-trash
          class="btn-group-options"
          variant="danger"
          font-scale="2.5"
          :class="checkCanDelete ? '' : '-disable'"
          v-b-modal.modal-delete-subscriber
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
    <div class="manage-subscriber-container__table">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">
              <input type="checkbox" :checked="isSelectedAll" @click="setIsSelectedAll" />
            </th>
            <th scope="col">Email</th>
            <th scope="col">Ngày đăng kí</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(sub, index) in listSubscriber" :key="index">
            <td>
              <input type="checkbox" :value="sub.id" v-model="selectedListSubscriber" />
            </td>
            <td>{{ sub.email }}</td>
            <td>{{ sub.created_at }}</td>
            <td>True</td>
            <td>
              <div class="show-detail">
                <b-icon-trash
                  variant="light"
                  class="rounded-circle bg-danger p-2"
                  v-b-modal.modal-delete-subscriber
                  @click="getSingleIdSubscriber(sub.id)"
                ></b-icon-trash>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <PopupDeleteSubscriber
        :titleModal="constants.SUBSCRIBER_CONST.TITLE_POPUP_DELETE"
        :idModal="constants.SUBSCRIBER_CONST.ID_POPUP_DELETE"
        :contentModal="constants.SUBSCRIBER_CONST.CONTENT_POPUP_DELETE"
        :selectedListId="selectedListSubscriber"
        @updateSelectedListId="updateSelectedListId"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from '../../components/ManageComment/Headers/Header.vue';
import PopupDeleteSubscriber from '../../components/ManageSubscriber/Popups/PopupDeleteSubscriber.vue';
import constants from '../../constants/index';

export default {
  name: 'ManageSubscriber',
  components: {
    Header,
    PopupDeleteSubscriber,
  },
  data() {
    return {
      styleCss: 'background: #FFFFFF;color:#333333;',
      canUpdate: false,
      isSelectedAll: false,
      inputSearch: '',
      selectedListSubscriber: [],
      constants,
    };
  },
  watch: {
    selectedListSubscriber: {
      handler() {
        if (this.selectedListSubscriber.length === this.listIdSubscriber.length) {
          this.isSelectedAll = true;
        } else {
          this.isSelectedAll = false;
        }
      },
    },
  },
  computed: {
    ...mapGetters(['getlistSubscriber']),
    listSubscriber() {
      const items = [];
      this.getlistSubscriber.forEach((item) => {
        items.push({
          email: item.email,
          created_at: item.created_at,
          id: item.id,
        });
      });
      return items;
    },
    listIdSubscriber() {
      const result = [];
      this.listSubscriber.forEach((item) => {
        result.push(item.id);
      });
      return result;
    },
    checkCanDelete() {
      // check enable button delete
      let result;
      if (this.selectedListSubscriber.length > 0) result = true;
      else result = false;
      return result;
    },
  },
  methods: {

    setIsSelectedAll() {
      this.isSelectedAll = !this.isSelectedAll;
      if (this.isSelectedAll) {
        this.selectedListSubscriber = this.listIdSubscriber;
      } else {
        this.selectedListSubscriber = [];
      }
    },
    searchSubscriber(event) {
      event.preventDefault();
      this.$store.dispatch('getListSubscriber', this.inputSearch);
    },
    updateSelectedListId(value) {
      this.selectedListSubscriber = value;
    },
    getSingleIdSubscriber(id) {
      this.selectedListSubscriber = [id];
    },
    submit() {
      // console.log('ok');
    },
    cancel() {
      this.$bvModal.hide(constants.SUBSCRIBER_CONST.ID_POPUP_DETAIL);
      this.canUpdate = false;
    },
  },
};
</script>

<style lang='scss' scoped>
.manage-subscriber-container {
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
