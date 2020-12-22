<template>
  <div class="popup-detail-account">
  <div>Bạn có muốn chuyển tài khoản {{ userDetail.username }} thành quản trị viên không ?</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PopupDetailAccount',
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
        email: this.userDetail.email,
        gender: this.userDetail.gender,
        birtday: this.userDetail.birthday,
      },
    };
  },
  watch: {
    dataSubmit: {
      handler(val) {
        this.$emit('update', {
          data: val,
          id: this.userDetail.id,
        });
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters(['getListTenant']),
  },
  methods: {},
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
