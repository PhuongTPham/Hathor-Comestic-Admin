<template>
  <div>
    <div class="login-form login-signin">
      <div class="text-center mb-10 mb-lg-20">
        <h3 class="font-size-h1">Đăng nhập</h3>
      </div>
      <b-form class="form" @submit.stop.prevent="onSubmit">

        <div style="height: 60px">
          <div
          role="alert"
          v-bind:class="{ show: errors.length }"
          class="alert fade alert-danger"
        >
          <div class="alert-text" v-for="(error, i) in errors" :key="i">
            {{ error }}
          </div>
        </div>
        </div>

        <b-form-group
          id="email"
          label=""
          label-for="email"
        >
          <b-form-input
            class="form-control form-control-solid h-auto py-5 px-6"
            id="email"
            name="email"
            placeholder="Email"
            @focus="resetMessageError"
            v-model="$v.form.email.$model"
            :state="validateState('email')"
            aria-describedby="email"
          ></b-form-input>

          <b-form-invalid-feedback id="email" v-if="!$v.form.email.required">
            Xin hãy nhập tên đăng nhập
          </b-form-invalid-feedback>
          <b-form-invalid-feedback id="email" v-else-if="!$v.form.email.email">
           Xin hãy nhập đúng định dạng email
          </b-form-invalid-feedback>
          <div id="email" v-else style="height: 1.4rem"/>
        </b-form-group>

        <b-form-group
          id="password"
          label=""
          label-for="password"
        >
          <b-form-input
            class="form-control form-control-solid h-auto py-5 px-6"
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            @focus="resetMessageError"
            v-model="$v.form.password.$model"
            :state="validateState('password')"
            aria-describedby="password"
          ></b-form-input>

          <b-form-invalid-feedback id="password"  v-if="!$v.form.password.required">
            Xin hãy nhập mật khẩu
          </b-form-invalid-feedback>
          <b-form-invalid-feedback id="password" v-else-if="!$v.form.password.minLength">
            Độ dài tối thiểu của tên đăng nhập là 6
          </b-form-invalid-feedback>
          <div id="password" v-else style="height: 1.6rem"/>
        </b-form-group>
        <div
          class="form-group d-flex flex-wrap justify-content-end align-items-center"
        >
          <button
            ref="kt_login_signin_submit"
            class="btn btn-primary font-weight-bold px-9 py-4 my-3 font-size-3"
          >
            Đăng nhập
          </button>
        </div>
      </b-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.spinner.spinner-right {
  padding-right: 3.5rem !important;
}
</style>

<script>
import { validationMixin } from 'vuelidate';
import {
  minLength, required, maxLength, email,
} from 'vuelidate/lib/validators';
import { ROUTER } from '../../config/const';
import api from '../../core/services/api/api';

export default {
  name: 'login',
  mixins: [validationMixin],
  data() {
    return {
      // Remove this dummy login info
      form: {
        email: '',
        password: '',
      },
      errors: [],
    };
  },
  validations: {
    form: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
    },
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    resetForm() {
      this.form = {
        email: null,
        password: null,
      };

      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    async onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // const username = this.$v.form.username.$model;
      // const password = this.$v.form.password.$model;
      const submitButton = this.$refs.kt_login_signin_submit;
      submitButton.classList.add('spinner', 'spinner-light', 'spinner-right');
      const res = await api('loginApi', { email: this.form.email, password: this.form.password });
      if (res.success) {
        this.errors = [];
        sessionStorage.setItem('jwtToken', res?.data?.data?.token);
        sessionStorage.setItem('myAccount', res?.data?.data?.profile?.id);
        this.$router.push(ROUTER.dashboard.path);
      } else {
        this.errors = [res.data.response.data.message];
      }
      // set spinner to submit button

      submitButton.classList.remove(
        'spinner',
        'spinner-light',
        'spinner-right',
      );
    },
    resetMessageError() {
      this.errors = [];
    },
  },
};
</script>
