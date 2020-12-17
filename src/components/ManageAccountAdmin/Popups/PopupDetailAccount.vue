<template>
  <div class="popup-detail-account">
    <div class="form-input">
      <label for="username">Tài khoản:</label>
      <b-form-input placeholder="" id="username" v-model="userDetail.username" disabled></b-form-input>
    </div>
    <div class="form-input">
      <label for="fullName">Nhân viên:</label>
      <b-form-input placeholder="" id="fullName" v-model="dataSubmit.full_name"></b-form-input>
    </div>
    <div class="form-input">
      <label for="role">Vai trò:</label>
      <select id="role" v-model="dataSubmit.role" class="b-dropdown">
        <option value="Admin">ADMIN</option>
        <option value="View">VIEW</option>
        <option value="Disable">DISABLED</option>
      </select>
    </div>
    <div class="form-input">
      <label for="staffCode">Mã nhân viên:</label>
      <b-form-input placeholder="" id="staffCode" v-model="dataSubmit.staff_code"></b-form-input>
    </div>
    <div class="form-input">
      <label for="company">Tên công ty:</label>
      <select id="company" class="b-dropdown" v-model="dataSubmit.tenant">
        <option v-for="company in getListTenant" :key="company.id" :value="company.id">{{ company.name }}</option>
      </select>
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
        full_name: this.userDetail.full_name,
        role: this.userDetail.role,
        staff_code: this.userDetail.staff_code,
        tenant: this.userDetail.tenant.id,
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
