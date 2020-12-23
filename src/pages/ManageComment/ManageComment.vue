<template>
  <div class="manage-comment-container">
    <div class="manage-comment-container__header">
      <Header />
    </div>
    <div class="manage-comment-container__options">
      <b-form @submit="searchComment" >
        <div class="manage-comment-container__options__search-form" >
          <b-form-input class="search-form-input" placeholder="Tìm kiếm" v-model="inputSearch" ></b-form-input>
          <b-icon-search class="search-form-icon" :font-scale="1.5" @click="searchComment"></b-icon-search>
        </div>
      </b-form>
      <div class="manage-comment-container__options__button-group">
        <b-icon-trash
          class="btn-group-options"
          variant="danger"
          font-scale="2.5"
          :class="checkCanDelete ? '' : '-disable'"
          v-b-modal.modal-delete-comment
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
    <div class="manage-comment-container__table">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">
              <input type="checkbox" :checked="isSelectedAll" @click="setIsSelectedAll" />
            </th>
            <th scope="col">Nội dung bình luận</th>
            <th scope="col">Mã sản phẩm</th>
            <th scope="col">Mã người bình luận</th>
            <th scope="col">Đánh giá</th>
            <th scope="col">Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(comment, index) in listComment" :key="index">
            <td>
              <input type="checkbox" :value="comment.id" v-model="selectedListComment" />
            </td>
            <td>{{ comment.comment }}</td>
            <td>{{ comment.item_id }}</td>
            <td>{{ comment.user_id }}</td>
            <td>{{ comment.rating }}</td>
            <td>
              <div class="show-detail">
                <b-icon-trash
                  variant="light"
                  class="rounded-circle bg-danger p-2"
                  v-b-modal.modal-delete-comment
                  @click="getListIdComment(comment.id)"
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
        :selectedListId="selectedListComment"
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
  name: 'ManageComment',
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
      selectedListComment: [],
      constants,
    };
  },
  watch: {
    selectedListComment: {
      handler() {
        if (this.selectedListComment.length === this.listIdComment.length) {
          this.isSelectedAll = true;
        } else {
          this.isSelectedAll = false;
        }
      },
    },
  },
  computed: {
    ...mapGetters(['getlistComment']),
    listComment() {
      const items = [];
      this.getlistComment.forEach((item) => {
        items.push({
          comment: item.comment,
          item_id: item.item_id,
          user_id: item.user_id,
          rating: item.rating,
          id: item.id,
        });
      });
      return items;
    },
    listIdComment() {
      const result = [];
      this.listComment.forEach((item) => {
        result.push(item.id);
      });
      return result;
    },
    checkCanDelete() {
      let result;
      if (this.selectedListComment.length > 0) result = true;
      else result = false;
      return result;
    },
  },
  methods: {

    setIsSelectedAll() {
      this.isSelectedAll = !this.isSelectedAll;
      if (this.isSelectedAll) {
        this.selectedListComment = this.listIdComment;
      } else {
        this.selectedListComment = [];
      }
    },
    searchComment(event) {
      event.preventDefault();
      this.$store.dispatch('getListComment', this.inputSearch);
    },
    updateSelectedListId(value) {
      this.selectedListComment = value;
    },
    getListIdComment(id) {
      this.selectedListComment = [id];
    },
    submit() {
      // console.log('ok');
    },
    cancel() {
      this.$bvModal.hide(constants.COMMENT_CONST.ID_POPUP_DETAIL);
      this.canUpdate = false;
    },
  },
};
</script>

<style lang='scss' scoped>
.manage-comment-container {
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
