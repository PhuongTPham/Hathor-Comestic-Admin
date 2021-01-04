<template>
  <div class="popup-detail-order">
    <div class="form-input">
      <label for="order_id">Tài khoản:</label>
      <b-form-input
        placeholder=""
        id="order_id"
        v-model="dataSubmit.order_id"
        disabled
      ></b-form-input>
    </div>
    <div class="form-input">
      <label for="status">Vai trò:</label>
      <b-form-select
        v-model="dataSubmit.status"
        :options="options"
        class="mb-3"
      >
        <template #first>
          <b-form-select-option :value="null" disabled
            >-- Please select an option --</b-form-select-option
          >
        </template>
      </b-form-select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupDetailOrder',
  props: {
    userDetail: {
      type: Object,
    },
    options: {
      type: Array,
    },
  },
  components: {},
  data() {
    return {
      dataSubmit: {
        order_id: this.userDetail.id,
        status: this.userDetail.status,
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
};
</script>

<style lang='scss' scoped>
.popup-detail-order {
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
