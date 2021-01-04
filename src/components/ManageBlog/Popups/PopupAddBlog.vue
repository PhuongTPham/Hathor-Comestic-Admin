<template>
  <b-modal :id="idModal" no-close-on-backdrop size="lg" :title="titleModal">
    <div class="popup-add-blog">
      <div class="form-input">
        <label for="title">Tiêu đề bài viết:</label>
        <b-form-input placeholder="" id="title" v-model="title"></b-form-input>
      </div>
      <div class="form-input">
        <label for="description">Nội dung:</label>
        <b-form-textarea
          placeholder=""
          id="description"
          v-model="description"
        ></b-form-textarea>
      </div>
      <div class="form-input">
        <label for="author">Tác giả:</label>
        <b-form-input
          placeholder=""
          id="author"
          v-model="author"
        ></b-form-input>
      </div>
      <div class="form-input">
        <label for="image">Ảnh:</label>
        <b-form-input placeholder="" id="image" v-model="image"></b-form-input>
      </div>
      <div class="form-input">
        <label for="like">Like:</label>
        <b-form-input placeholder="" id="like" v-model="like"></b-form-input>
      </div>
    </div>
    <template #modal-footer="">
      <b-button size="sm" variant="danger" @click="cancel"> Hủy bỏ </b-button>
      <b-button size="sm" variant="success" @click="submit">
        Thêm bài viết
      </b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  props: {
    idModal: {
      type: String,
    },
    titleModal: {
      type: String,
    },
  },
  data() {
    return {
      title: '',
      description: '',
      author: '',
      image: '',
      like: '',
    };
  },
  computed: {},
  methods: {
    clearData() {
      this.title = '';
      this.description = '';
      this.author = '';
      this.image = '';
      this.like = '';
    },
    cancel() {
      this.$bvModal.hide(this.idModal);
    },
    async submit() {
      const payload = {
        title: this.title,
        description: this.description,
        author: this.author,
        image: this.image,
        like: this.like,
      };
      await this.$store.dispatch('addBlog', payload);
      this.$bvModal.hide(this.idModal);
      this.clearData();
      await this.$store.dispatch('getListBlog');
    },
  },
};
</script>

<style lang='scss' scoped>
.popup-add-blog {
  .form-input {
    display: grid;
    grid-template-columns: 20% 80%;
    margin-bottom: 12px;
    .b-dropdown {
      width: 130px;
      border: 1px solid #dcdcdc;
      outline: none;
    }
  }
  &__button-wrapper {
    display: flex;
    justify-content: flex-end;
    button {
      margin-right: 7px;
    }
    button:last-child {
      margin-right: 0px;
    }
  }
}
</style>
