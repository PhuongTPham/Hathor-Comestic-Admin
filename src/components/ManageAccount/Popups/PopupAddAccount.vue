<template>
  <b-modal :id="idModal" no-close-on-backdrop size="lg" :title="titleModal">
    <div class="popup-add-account">
      <div class="form-input">
        <label for="username">Tài khoản:</label>
        <b-form-input placeholder="" id="username" v-model="userName" ></b-form-input>
      </div>
      <div class="form-input">
        <label for="password">Mật khẩu:</label>
        <b-form-input type="password" placeholder="" id="password" v-model="password" ></b-form-input>
      </div>
      <div class="form-input">
        <label for="confirmPassword">Xác nhận mật khẩu:</label>
        <b-form-input type="password" placeholder="" id="confirmPassword" v-model="confirmPassword" ></b-form-input>
      </div>
      <div class="form-input">
        <label for="fullName">Tên nhân viên:</label>
        <b-form-input placeholder="" id="fullName" v-model="fullName" ></b-form-input>
      </div>
      <div class="form-input">
        <label for="role">Vai trò:</label>
        <select id="role" class="b-dropdown" v-model="role" >
          <option :value="1">ADMIN</option>
          <option :value="2">VIEW</option>
          <option :value="3">DISABLED</option>
        </select>
      </div>
      <div class="form-input">
        <label for="staffCode">Mã nhân viên:</label>
        <b-form-input placeholder="" id="staffCode" v-model="staffCode" ></b-form-input>
      </div>
      <div class="form-input">
        <label for="company">Tên công ty:</label>
        <select id="company" class="b-dropdown" v-model="company" >
          <option v-for="company in getListTenant" :key="company.id" :value="company.id">{{
            company.name
          }}</option>
        </select>
      </div>
    </div>
    <template #modal-footer="">
      <b-button size="sm" variant="danger" @click="cancel" >
        Hủy bỏ
      </b-button>
      <b-button size="sm" variant="success" @click="submit" >
        Tạo
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    idModal: {
      type: String
    },
    titleModal: {
      type: String
    }
  },
  data() {
    return {
      userName: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      role: 1,
      staffCode: '',
      company: 1,
    };
  },
  computed: {
    ...mapGetters(['getListTenant'])
  },
  methods: {
    clearData() {
      this.userName = '';
      this.password = '';
      this.confirmPassword = '';
      this.fullName = '';
      this.role = 1;
      this.staffCode = '';
      this.company = 1;
    },
    cancel() {
      this.$bvModal.hide(this.idModal);
    },
    async submit() {
      const payload = {
        username: this.userName,
        password: this.password,
        full_name: this.fullName,
        role: this.role,
        staff_code: this.staffCode,
        tenant: this.company,
      };
      await this.$store.dispatch('addAccount', payload);
      this.$bvModal.hide(this.idModal);
      this.clearData();
      await this.$store.dispatch('getAccount');
    },
  },
};
</script>

<style lang='scss' scoped>
.popup-add-account {
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
