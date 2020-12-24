<template>
  <div class="popup-detail-account">
    <div class="form-input">
      <label for="comment_id">Mã binh luan:</label>
      <b-form-input placeholder="" id="comment_id" v-model="dataSubmit.comment_id" disabled></b-form-input>
    </div>
    <div class="form-input">
      <label for="comment">Comment:</label>
      <b-form-textarea placeholder="" id="comment" v-model="dataSubmit.comment" disabled></b-form-textarea>
    </div>
    <div class="form-input">
      <label for="item">Mã sản phẩm:</label>
      <b-form-input placeholder="" id="item" v-model="dataSubmit.item" disabled></b-form-input>
    </div>
     <div class="form-input">
      <label for="user">Người bình luận:</label>
      <b-form-input placeholder="" id="user" v-model="dataSubmit.user" disabled></b-form-input>
    </div>
     <div class="form-input">
      <label for="rating">Rating:</label>
     <b-form-rating v-model="dataSubmit.rating" variant="warning" class="mb-2" readonly precision="2"></b-form-rating>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupDetailComment',
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
        comment_id: this.userDetail.id,
        comment: this.userDetail.comment,
        item: this.userDetail.item,
        user: this.userDetail.user,
        rating: this.userDetail.rating,
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
      this.$bvModal.hide('modal-detail-comment');
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
