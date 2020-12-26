<template>
  <div class="manage-blog-container">
    <div class="manage-blog-container__header">
      <Header />
    </div>
    <div class="manage-blog-container__options">
      <b-form @submit="searchBlog" >
        <div class="manage-blog-container__options__search-form" >
          <b-form-input class="search-form-input" placeholder="Tìm kiếm" v-model="inputSearch" ></b-form-input>
          <b-icon-search class="search-form-icon" :font-scale="1.5" @click="searchBlog"></b-icon-search>
        </div>
      </b-form>
      <div class="manage-blog-container__options__button-group">
        <b-icon-trash
          class="btn-group-options"
          variant="danger"
          font-scale="2.5"
          :class="checkCanDelete ? '' : '-disable'"
          v-b-modal.modal-delete-blog
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
    <div class="manage-blog-container__table">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">
              <input type="checkbox" :checked="isSelectedAll" @click="setIsSelectedAll" />
            </th>
            <th scope="col">Tiêu đề</th>
            <th scope="col">Nội dung</th>
            <th scope="col">Tác giả</th>
            <th scope="col">Image</th>
            <th scope="col">Like</th>
            <th scope="col">Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(blog, index) in listBlog" :key="index">
            <td>
              <input type="checkbox" :value="blog.id" v-model="selectedListBlog" />
            </td>
            <td>{{ blog.title }}</td>
            <template>
              <td v-if="blog.description.length <= 50">{{ blog.description }}</td>
              <td v-else>{{ blog.description.substr(0, 50) + '...' }}</td>
            </template>
            <td>{{ blog.author }}</td>
            <template>
              <td>
                <img :src="blog.image" style="width: 50px; height: 50px" /></td>
            </template>
            <td>{{ blog.like }}</td>
            <td>
              <div class="show-detail">
                <b-icon-pencil-square
                  variant="light"
                  @click="getDetailBlog(blog.id)"
                  v-b-modal.modal-detail-blog
                ></b-icon-pencil-square>
                <b-icon-trash
                  variant="light"
                  class="rounded-circle bg-danger p-2"
                  v-b-modal.modal-delete-blog
                  @click="getSingleIdBlog(blog.id)"
                ></b-icon-trash>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      <b-modal id="modal-detail-blog" no-close-on-backdrop size="lg" :title="userDetail.title">
        <PopupDetailBlog :userDetail="userDetail" @update="updateData"/>
        <template #modal-footer="">
          <b-button size="sm" variant="danger" @click="cancel">
            Hủy bỏ
          </b-button>
          <b-button ref="btn_update_blog" size="sm" variant="success" @click="submit" :disabled="!canUpdate" :class="{ '-disable': !canUpdate }">
            Thay đổi
          </b-button>
        </template>
      </b-modal>
    </div>

    <div>
      <PopupDeleteBlog
        :titleModal="constants.BLOG_CONST.TITLE_POPUP_DELETE"
        :idModal="constants.BLOG_CONST.ID_POPUP_DELETE"
        :contentModal="constants.BLOG_CONST.CONTENT_POPUP_DELETE"
        :selectedListId="selectedListBlog"
        @updateSelectedListId="updateSelectedListId"
      />
    </div>

    <div>
      <PopupAddBlog
        :titleModal="constants.BLOG_CONST.TITLE_POPUP_ADD"
        :idModal="constants.BLOG_CONST.ID_POPUP_ADD"
      />
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from '../../components/ManageBlog/Headers/Header.vue';
import PopupDeleteBlog from '../../components/ManageBlog/Popups/PopupDeleteBlog.vue';
import PopupDetailBlog from '../../components/ManageBlog/Popups/PopupDetailBlog.vue';
import PopupAddBlog from '../../components/ManageBlog/Popups/PopupAddBlog.vue';
import constants from '../../constants/index';

export default {
  name: 'ManageBlog',
  components: {
    Header,
    PopupDeleteBlog,
    PopupDetailBlog,
    PopupAddBlog,
  },
  data() {
    return {
      styleCss: 'background: #FFFFFF;color:#333333;',
      canUpdate: false,
      isSelectedAll: false,
      inputSearch: '',
      selectedListBlog: [],
      constants,
      userDetail: {},
    };
  },
  watch: {
    selectedListBlog: {
      handler() {
        if (this.selectedListBlog.length === this.listIdBlog.length) {
          this.isSelectedAll = true;
        } else {
          this.isSelectedAll = false;
        }
      },
    },
  },
  computed: {
    ...mapGetters(['getlistBlog']),
    listBlog() {
      const items = [];
      this.getlistBlog.forEach((item) => {
        items.push({
          title: item.title,
          description: item.description,
          author: item.author,
          image: item.image,
          like: item.like,
          id: item.id,
        });
      });
      return items;
    },
    listIdBlog() {
      const result = [];
      this.listBlog.forEach((item) => {
        result.push(item.id);
      });
      return result;
    },
    checkCanDelete() {
      let result;
      if (this.selectedListBlog.length > 0) result = true;
      else result = false;
      return result;
    },
  },
  methods: {

    setIsSelectedAll() {
      this.isSelectedAll = !this.isSelectedAll;
      if (this.isSelectedAll) {
        this.selectedListBlog = this.listIdBlog;
      } else {
        this.selectedListBlog = [];
      }
    },
    searchBlog(event) {
      event.preventDefault();
      this.$store.dispatch('getListBlog', this.inputSearch);
    },
    updateSelectedListId(value) {
      this.selectedListBlog = value;
    },
    getSingleIdBlog(id) {
      this.selectedListBlog = [id];
    },
    getDetailBlog(id) {
      this.selectedListBlog = [id];
      this.userDetail = this.getlistBlog.find((item) => item.id === id);
    },
    updateData(newData) {
      const oldData = {
        blog_id: this.userDetail.id,
        title: this.userDetail.title,
        description: this.userDetail.description,
        author: this.userDetail.author,
        image: this.userDetail.image,
        like: this.userDetail.like,
      };
      if (JSON.stringify(oldData) === JSON.stringify(newData)) {
        this.canUpdate = false;
      } else {
        this.canUpdate = true;
      }
      this.dataChanged = {
        data: {
          blog_id: newData.blog_id,
          title: newData.title,
          description: newData.description,
          author: newData.author,
          image: newData.image,
          like: newData.like,
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
      // update blog
      const submitButton = this.$refs.btn_update_blog;
      submitButton.classList.add('spinner', 'spinner-light', 'spinner-right');
      await this.$store.dispatch('updateBlog', this.dataChanged);
      if (this.getErrorCodeBlog === 0) {
        this.$bvModal.hide(constants.BLOG_CONST.ID_POPUP_DETAIL);
        await this.$store.dispatch('getListBlog', '');
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
    cancel() {
      this.$bvModal.hide('modal-detail-blog');
      this.canUpdate = false;
    },
  },
};
</script>

<style lang='scss' scoped>
.manage-blog-container {
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
