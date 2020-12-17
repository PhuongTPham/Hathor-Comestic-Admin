<template>
  <div>
    <!--begin::Content header-->
    <!-- <div
      class="position-absolute top-0 right-0 text-right mt-5 mb-15 mb-lg-0 flex-column-auto justify-content-center py-5 px-10"
    >
      <span class="font-weight-bold font-size-3 text-dark-60">
        Don't have an account yet?
      </span>
      <router-link
        class="font-weight-bold font-size-3 ml-2"
        :to="{ name: 'register' }"
      >
        Sign Up!
      </router-link>
    </div> -->
    <!--end::Content header-->

    <!--begin::Signin-->
    <div class="login-form login-signin">
      <div class="text-center mb-10 mb-lg-20">
        <h3 class="font-size-h1">Sign In</h3>
        <p class="text-muted font-weight-semi-bold">
          Enter your username and password
        </p>
      </div>

      <!--begin::Form-->
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
          id="example-input-group-1"
          label=""
          label-for="example-input-1"
        >
          <b-form-input
            class="form-control form-control-solid h-auto py-5 px-6"
            id="example-input-1"
            name="example-input-1"
            @focus="resetMessageError"
            v-model="$v.form.username.$model"
            :state="validateState('username')"
            aria-describedby="input-1-live-feedback"
          ></b-form-input>

          <b-form-invalid-feedback id="input-1-live-feedback" v-if="!$v.form.username.required">
            Xin hãy nhập tên đăng nhập
          </b-form-invalid-feedback>
          <b-form-invalid-feedback id="input-1-live-feedback" v-else-if="!$v.form.username.minLength">
            Độ dài tối thiểu của tên đăng nhập là 4
          </b-form-invalid-feedback>
          <b-form-invalid-feedback id="input-1-live-feedback" v-else-if="!$v.form.username.maxLength">
            Độ dài tối đa của tên đăng nhập là 32
          </b-form-invalid-feedback>
          <div id="input-1-live-feedback" v-else style="height: 1.4rem"/>
        </b-form-group>

        <b-form-group
          id="example-input-group-2"
          label=""
          label-for="example-input-2"
        >
          <b-form-input
            class="form-control form-control-solid h-auto py-5 px-6"
            type="password"
            id="example-input-2"
            name="example-input-2"
            @focus="resetMessageError"
            v-model="$v.form.password.$model"
            :state="validateState('password')"
            aria-describedby="input-2-live-feedback"
          ></b-form-input>

          <b-form-invalid-feedback id="input-2-live-feedback"  v-if="!$v.form.password.required">
            Xin hãy nhập mật khẩu
          </b-form-invalid-feedback>
          <b-form-invalid-feedback id="input-1-live-feedback" v-else-if="!$v.form.password.minLength">
            Độ dài tối thiểu của tên đăng nhập là 6
          </b-form-invalid-feedback>
          <div id="input-1-live-feedback" v-else style="height: 1.6rem"/>
        </b-form-group>

        <!--begin::Action-->
        <div
          class="form-group d-flex flex-wrap justify-content-end align-items-center"
        >
          <!-- <a
            href="#"
            class="text-dark-60 text-hover-primary my-3 mr-2"
            id="login_forgot"
          >
            Forgot Password ?
          </a> -->
          <button
            ref="kt_login_signin_submit"
            class="btn btn-primary font-weight-bold px-9 py-4 my-3 font-size-3"
          >
            Sign In
          </button>
        </div>
        <!--end::Action-->
      </b-form>
      <!--end::Form-->
    </div>
    <!--end::Signin-->
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
  minLength, required, maxLength,
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
        username: 'admin@demo.com',
        password: 'demo',
      },
      errors: [],
    };
  },
  validations: {
    form: {
      username: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(30),
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
        username: null,
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
      const res = await api('loginApi', { username: this.form.username, password: this.form.password });
      if (res.success) {
        this.errors = [];
        sessionStorage.setItem('jwtToken', res?.data?.data?.token);
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
