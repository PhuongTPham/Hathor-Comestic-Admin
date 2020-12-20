<template>
  <div class="popup-detail-account">
    <div class="form-input">
      <label for="username">Tài khoản:</label>
      <b-form-input placeholder="" id="username" v-model="userDetail.username" disabled></b-form-input>
    </div>
    <div class="form-input">
      <label for="fullName">Email:</label>
      <b-form-input placeholder="" id="email" v-model="dataSubmit.email"></b-form-input>
    </div>
    <div class="form-input">
      <label for="role">Gioi tinh</label>
      <select id="role" v-model="dataSubmit.role" class="b-dropdown">
        <option value="Nam">Nam</option>
        <option value="Nu">Nu</option>
      </select>
    </div>
    <div class="form-input">
      <label for="birthday">Ngày sinh:</label>
      <b-form-input placeholder="" id="birthday" v-model="dataSubmit.birthday"></b-form-input>
    </div>
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
