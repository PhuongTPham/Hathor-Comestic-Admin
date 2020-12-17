<template>
  <div class="manage-service-container">
    <div class="manage-service-container__header">
      <Header />
    </div>
    <div class="manage-service-container__search-form" v-show="true">
      <b-form-input placeholder="Tên căn hộ, username, ..." v-model="search"></b-form-input>
      <!-- <div class="date-picker-warpper">
        <b-form-datepicker id="example-datepicker" v-model="value" class="mb-2"></b-form-datepicker>
        <b-form-datepicker id="example-datepicker" v-model="value" class="mb-2"></b-form-datepicker>
      </div> -->
      <div class="manage-service-container__search-form__button">
        <!-- <Button :title="'Tìm kiếm'" :styleCss="styleCss" @click.native="setItemsTableWithSearch"/> -->
        <b-button variant="info">Tìm kiếm</b-button>

      </div>
    </div>
    <div class="manage-service-container__table">
      <b-table show-empty small stacked="md" :items="setItemsTable" :fields="fields">
        <template #cell(dinhky)="row">
          <div style="padding-left:15%">
            <b-icon :icon="row.item.dinhky ? 'check-circle' : 'x-circle'" scale="2" :variant="row.item.dinhky ? 'primary' : 'danger'" style="margin-top:7px;"></b-icon>
          </div>
        </template>
        <template #cell(actions)="">
          <div class="show-detail">
            <inline-svg
              src="media/svg/icons/Design/Edit.svg"
              class="edit-svg"
            />
             <inline-svg
              src="media/svg/icons/General/Trash.svg"
              class="delete-svg"
            />
          </div>
        </template>
      </b-table>
    </div>

    <!-- <div>
      <b-modal id="modal-detail-account" no-close-on-backdrop size="lg" :title="userDetail.full_name">
        <PopupDetailAccount :userDetail="userDetail" @update="updateData"/>
        <template #modal-footer="">
          <b-button size="sm" variant="danger" @click="cancel">
            Hủy bỏ
          </b-button>
          <b-button size="sm" variant="success" @click="submit" :disabled="!canUpdate">
            Thay đổi
          </b-button>
        </template>
      </b-modal>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from '../../components/ManageToaNha/Headers/Header.vue';
import Button from '../../components/ManageToaNha/Buttons/Button.vue';
import PopupDetailAccount from '../../components/ManageAccount/Popups/PopupDetailAccount.vue';

export default {
  name: 'ManageToaNha',
  components: {
    Header,
    PopupDetailAccount,
    Button,
  },
  data() {
    return {
      styleCss: 'background: #FFFFFF;color:#333333;',
      userDetail: {},
      fields: [
        { key: 'name', label: 'Tên dịch vụ' },
        { key: 'donvi', label: 'Đơn vị' },
        { key: 'code', label: 'Mã dịch vụ' },
        { key: 'dinhky', label: 'Thanh toán định kỳ' },
        { key: 'actions', label: 'Tùy chọn' },
      ],
      canUpdate: false,
      search: '',
    };
  },
  computed: {
    ...mapGetters(['getlistService']),
    setItemsTable() {
      const items = [];
      this.getlistService.forEach((item) => {
        items.push({
          name: item.name,
          donvi: item.don_vi,
          code: item.code,
          dinhky: item.dinh_ky,
        });
      });
      return items;
    },
    // getToken() {
    //   return window.sessionStorage.jwtToken;
    // },
  },
  methods: {
    // getDetailAccount(row) {
    //   this.userDetail = this.getListAccount.find((item) => item.username === row.item.username);
    //   this.$store.dispatch('getTenant', this.getToken);
    // },
    // updateData(newData) {
    //   const oldData = {
    //     full_name: this.userDetail.full_name,
    //     role: this.userDetail.role,
    //     staff_code: this.userDetail.staff_code,
    //     tenant: this.userDetail.tenant.id,
    //   };

    //   // check data is changed -> active button submit
    //   if (JSON.stringify(oldData) === JSON.stringify(newData)) {
    //     this.canUpdate = false;
    //   } else {
    //     this.canUpdate = true;
    //   }
    // },
    setItemsTableWithSearch() {
      this.$store.dispatch('getService', this.search);
    },
    submit() {
      // console.log('ok');
    },
    cancel() {
      this.$bvModal.hide('modal-detail-account');
    },
  },
};
</script>

<style lang='scss' scoped>
.manage-service-container {
  &__header {
    margin-bottom: 12px;
  }
  &__search-form {
    display: grid;
    grid-template-columns: 80% 20%;
    padding: 12px 0px;
    &__button {
      display: flex;
      justify-content: flex-end;
    }
  }
  &__table {
    .show-detail {
      svg {
        border-radius: 50%;
        background: #1a9fed;
        padding: 5px;
        width: 32px;
        height: 32px;
        margin-right: 5px;
        cursor: pointer;
      }
    }
  }
  table td {
    vertical-align: middle !important;
  }
//   .date-picker-warpper {
//     display: flex;
//     justify-content: space-between;
//     .b-form-datepicker {
//       width: 350px;
//     }
//   }
// table, th, td {
//   padding: 15px !important;
//   color: red i !important;
// }
}
</style>
<style lang='scss'>
thead {
  background: linear-gradient(to bottom right, #9966ff 0%, #ff3300 100%);
  opacity: 0.7;
  color: #ffffff;
}
</style>
