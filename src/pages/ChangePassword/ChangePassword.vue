<template>
  <div class="change-password-container">
    <h1 class="text-center">THAY ĐỔI MẬT KHẨU</h1>
    <div class="d-grid">
      <div></div>
      <div class="mt-10">
        <div class="form-input d-flex">
          <div class="form-group w-100">
            <label>Mật khẩu hiện tại</label>
            <div>
              <b-form-input
                type="password"
                class="form-control form-control-solid form-control-lg"
                placeholder="Nhập mật khẩu hiện tại"
                v-model="$v.oldPassword.$model"
                :state="validateState('oldPassword')"
                aria-describedby="input-oldPassword-feedback"
              ></b-form-input>
              <b-form-invalid-feedback id="input-oldPassword-feedback" v-if="!$v.oldPassword.required" >
                Xin hãy nhập mật khẩu hiện tại
              </b-form-invalid-feedback>
            </div>
          </div>
        </div>

        <div class="form-input d-flex">
          <div class="form-group w-100">
            <label>Mật khẩu mới</label>
            <div>
              <b-form-input
                type="password"
                class="form-control form-control-solid form-control-lg"
                placeholder="Nhập mật khẩu mới"
                v-model="$v.newPassword.$model"
                :state="validateState('newPassword')"
                aria-describedby="input-newPassword-feedback"
              ></b-form-input>
              <b-form-invalid-feedback id="input-newPassword-feedback" v-if="!$v.newPassword.required" >
                Xin hãy nhập mật khẩu hiện mới
              </b-form-invalid-feedback>
            </div>
          </div>
        </div>

        <div class="form-input d-flex">
          <div class="form-group w-100">
            <label>Xác nhận mật khẩu mới</label>
            <div>
              <b-form-input
                type="password"
                class="form-control form-control-solid form-control-lg"
                placeholder="Nhập mật khẩu mới"
                v-model="$v.confirmNewPassword.$model"
                :state="validateState('confirmNewPassword')"
                aria-describedby="input-confirmNewPassword-feedback"
              ></b-form-input>
              <b-form-invalid-feedback id="input-confirmNewPassword-feedback" v-if="!$v.confirmNewPassword.required" >
                Xin hãy xác nhận mật khẩu mới
              </b-form-invalid-feedback>
              <b-form-invalid-feedback id="input-confirmNewPassword-feedback" v-else-if="!$v.confirmNewPassword.sameAsPassword" >
                Mật khẩu mới không khớp nhau
              </b-form-invalid-feedback>
            </div>
          </div>
        </div>

        <div>
          <b-button ref="btn_change_password" variant="success" @click="submit">Thay đổi</b-button>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, sameAs } from 'vuelidate/lib/validators';
import api from '../../core/services/api/api';
import constants from '../../constants/index';

export default {
  mixins: [validationMixin],
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      constants,
    };
  },
  validations: {
    oldPassword: {
      required,
    },
    newPassword: {
      required,
    },
    confirmNewPassword: {
      required,
      sameAsPassword: sameAs('newPassword'),
    },
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v[name];
      return $dirty ? !$error : null;
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
      this.$v.$touch();
      if (this.$v.$anyError) {
        return;
      }
      const payload = {
        old_password: this.oldPassword,
        new_password: this.newPassword,
      };
      const submitButton = this.$refs.btn_change_password;
      submitButton.classList.add('spinner', 'spinner-light', 'spinner-right');
      const response = await api('changePassword', payload);
      if (response?.data?.error_code === 0) {
        this.makeToastMessage(constants.COMMON_CONST.MESSAGE_CHANGE_PASSWORD_SUCCEED, 'success');
        sessionStorage.clear();
        this.$router.push('/login');
      } else {
        this.makeToastMessage(constants.COMMON_CONST.MESSAGE_CHANGE_PASSWORD_FAILED, 'danger');
      }
      submitButton.classList.remove(
        'spinner',
        'spinner-light',
        'spinner-right',
      );
    },
  },
};
</script>

<style lang='scss' scoped>
.change-password-container {
  .d-grid {
    display: grid;
    grid-template-columns: 25% 50% 25%;
  }
  input {
    background: #ffffff;
  }
  .spinner.spinner-right {
    padding-right: 3.5rem !important;
  }
}
</style>

<style lang="scss">
.text-color-required {
  color: red;
}
</style>
