<template>
  <div class="popup-detail-account">
    <div class="form-input">
      <label for="blog_id">Mã bài viết:</label>
      <b-form-input placeholder="" id="blog_id" v-model="dataSubmit.blog_id" disabled></b-form-input>
    </div>
    <div class="form-input">
      <label for="title">Tên tiêu đề bài viết:</label>
      <b-form-input placeholder="" id="title" v-model="dataSubmit.title"></b-form-input>
    </div>
    <div class="form-input">
      <label for="description">Nội dung:</label>
      <b-form-textarea placeholder="" id="description" v-model="dataSubmit.description"></b-form-textarea>
    </div>
     <div class="form-input">
        <label for="author">Tác giả:</label>
        <b-form-input placeholder="" id="author" v-model="dataSubmit.author" ></b-form-input>
      </div>
      <div class="form-input">
        <label for="image">Ảnh:</label>
        <b-form-input placeholder="" id="image" v-model="dataSubmit.image" ></b-form-input>
      </div>
      <div class="form-input">
        <label for="like">Like:</label>
        <b-form-input placeholder="" id="like" v-model="dataSubmit.like" ></b-form-input>
      </div>
  </div>
</template>

<script>
export default {
  name: 'PopupDetailCategory',
  props: {
    userDetail: {
      type: Object,
    },
  },
  components: {
  },
  data() {
    return {
      dataSubmit: {
        blog_id: this.userDetail.id,
        title: this.userDetail.title,
        description: this.userDetail.description,
        author: this.userDetail.author,
        image: this.userDetail.image,
        like: this.userDetail.like,
      },
    };
  },
  watch: {
    dataSubmit: {
      handler(val) {
        this.$emit('update', val);
      },
      deep: true,
    },
  },
  computed: {
  },
  methods: {
    submit() {
    },
    cancel() {
      this.$bvModal.hide('modal-detail-blog');
    },
  },
};
</script>

<style lang='scss' scoped>
.popup-detail-account {
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
