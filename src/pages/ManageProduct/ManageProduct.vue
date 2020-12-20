<template>
  <div class="manage-chunha-container">
    <div class="manage-chunha-container__header">
      <Header />
    </div>
    <div class="manage-chunha-container__search-form" v-show="true">
      <b-form-input placeholder="Họ tên, username, ..." v-model="search"></b-form-input>
      <div class="manage-chunha-container__search-form__button">
        <Button :title="'Tìm kiếm'" :styleCss="styleCss" @click.native="setItemsTableWithSearch"/>
      </div>
    </div>
    <div class="manage-chunha-container__table">
      <b-table show-empty small stacked="md" :items="setItemsTable" :fields="fields">
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
import Header from '../../components/ManageProduct/Headers/Header.vue';
import Button from '../../components/ManageProduct/Buttons/Button.vue';
import PopupDetailAccount from '../../components/ManageAccountAdmin/Popups/PopupDetailAccount.vue';

export default {
  name: 'ManageProduct',
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
        { key: 'name', label: 'Tên chủ nhà' },
        { key: 'phone', label: 'Số điện thoại' },
        { key: 'email', label: 'Email' },
        { key: 'identity', label: 'Giấy tờ tùy thân' },
        { key: 'actions', label: 'Tùy chọn' },
      ],
      canUpdate: false,
      search: '',
    };
  },
  computed: {
    ...mapGetters(['getlistChuNha']),
    setItemsTable() {
      const items = [];
      this.getlistChuNha.forEach((item) => {
        items.push({
          name: item.name,
          phone: item.phone,
          email: item.email,
          identity: item.cmt ?? item.cccd ?? item.passport_no ?? '-',

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
      this.$store.dispatch('getHost', this.search);
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
.manage-chunha-container {
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
}
</style>
<style lang='scss'>
thead {
  background: #28c5bd;
  opacity: 0.7;
  color: #ffffff;
}
</style>
