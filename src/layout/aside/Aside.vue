/* eslint-disable no-plusplus */ /* eslint-disable radix */ /* eslint-disable radix */
<template>
  <div class="aside aside-left d-flex aside-fixed" id="aside" ref="aside">
    <div class="aside-primary d-flex flex-column align-items-center flex-row-auto">
      <Brand></Brand>
      <div
        class="aside-nav position-relative d-flex flex-column align-items-center flex-column-fluid py-5 scroll scroll-pull ps"
        style="height: 528px; overflow: hidden;"
      >
        <ul class="nav flex-column" role="tablist" v-for="(nav, index) in listNav" :key="index">
          <li
            class="nav-item mb-3"
            data-placement="right"
            data-container="body"
            data-boundary="window"
            v-b-tooltip.hover.right="nav.name"
          >
            <div
              :aria-current-value="`${index}`"
              :class="['nav-link btn btn-icon btn-clean btn-lg', activeTab === index && 'active']"
              data-toggle="tab"
              @click="setActiveTab(index)"
            >
              <span class="svg-icon svg-icon-xl">
                <inline-svg :src="nav.icon" />
              </span>
            </div>
          </li>
        </ul>
        <div class="btn-logout" @click="logoutAction">
          <span class="svg-icon-xl">
            <inline-svg src="media/svg/icons/Navigation/Sign-out.svg" />
          </span>
        </div>
      </div>
      <div
        class="aside-footer d-flex flex-column align-items-center flex-column-auto py-4 py-lg-10"
      >
        <span
          class="aside-toggle btn btn-icon btn-primary btn-hover-primary shadow-sm"
          id="aside_toggle"
          ref="aside_toggle"
          data-placement="right"
          data-container="body"
          data-boundary="window"
          v-b-tooltip.hover.right="'Toggle Aside'"
          @click="minimizedAside"
        >
          <inline-svg
            src="media/svg/icons/Navigation/Angle-left.svg"
            :style="{ transform: asideExpand ? 'rotate(0deg)' : 'rotate(180deg)' }"
          />
        </span>
      </div>
    </div>
    <div class="aside-secondary d-flex flex-row-fluid">
      <div
        class="aside-workspace scroll scroll-push my-2 ps"
        style="height: 824px; overflow: hidden;"
      >
        <b-tabs class="hide-tabs">
          <b-tab>
            <div class="aside-menu-wrapper flex-column-fluid px-10 py-5" id="aside_menu_wrapper">
              <div
                ref="aside_menu"
                id="aside_menu"
                class="aside-menu min-h-lg-800px"
                data-menu-vertical="1"
                data-menu-scroll="1"
              >
                <Menu :subMenu="listNav[activeTab].child"></Menu>
              </div>
            </div>
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
/* hide default vue-bootstrap tab links */
.hide-tabs > div:not(.tab-content) {
  display: none;
}
</style>

<script>
import { mapGetters } from 'vuex';
import Brand from '@/layout/brand/Brand.vue';
import Menu from '@/layout/aside/Menu.vue';
// import MenuManage from '@/components/Manage/MenuManage.vue';

export default {
  name: 'Aside',
  data() {
    return {
      insideTm: 0,
      outsideTm: 0,
      tabIndex: 0,
      asideExpand: true,
      activeTab: 0,
      listNav: [
        {
          name: 'Dashboard',
          icon: 'media/svg/icons/Media/Equalizer.svg',
          child: [
            {
              nameSubNav: 'Analytics',
              router: '/dashboard',
              icon: 'media/svg/icons/Design/Select.svg',
            },
          ],
        },
        {
          name: 'Account',
          icon: 'media/svg/icons/Communication/Group.svg',
          child: [
            {
              nameSubNav: 'Danh sách tài khoản ',
              router: '/manage-account/admin',
              icon: 'media/svg/icons/Communication/Address-card.svg',
            },
          ],
        },
        {
          name: 'Shop',
          icon: 'media/svg/icons/Layout/Layout-4-blocks.svg',
          router: '/manage',
          child: [
            {
              nameSubNav: 'Category',
              router: '/manage-category',
              icon: 'media/svg/icons/Map/Marker1.svg',
            },
            {
              nameSubNav: 'Product',
              router: '/manage-product',
              icon: 'media/svg/icons/Map/Marker1.svg',
            },
          ],
        },
        {
          name: 'Supplier',
          icon: 'media/svg/icons/General/Clip.svg',
          child: [
            {
              nameSubNav: 'Danh sách nhà cung cấp',
              router: '/manage-supplier',
              icon: 'media/svg/icons/Communication/Clipboard-list.svg',
            },
          ],
        },
        {
          name: 'Billing',
          icon: 'media/svg/icons/Design/PenAndRuller.svg',
          child: [
            {
              nameSubNav: 'Danh sách đơn mua',
              router: '/manage-order',
              icon: 'media/svg/icons/Code/Compiling.svg',
            },
            {
              nameSubNav: 'Đơn hàng đang xử lý',
              router: '/manage-order',
              icon: 'media/svg/icons/Code/Compiling.svg'
            },
          ],
        },
        {
          name: 'Contact',
          icon: 'media/svg/icons/Home/Mailbox.svg',
          child: [
            {
              nameSubNav: 'Contact',
              router: '/manage-contact',
              icon: 'media/svg/icons/General/User.svg',
            },
            {
              nameSubNav: 'Comment',
              router: '/manage-comment',
              icon: 'media/svg/icons/Files/Selected-file.svg',
            },
            {
              nameSubNav: 'Subscriber',
              router: '/manage-subscriber',
              icon: 'media/svg/icons/General/User.svg',
            },
            {
              nameSubNav: 'Blog/review sản phẩm',
              router: '/manage-blog',
              icon: 'media/svg/icons/General/Folder.svg',
            },
          ],
        },
        {
          name: 'Cài đặt',
          icon: 'media/svg/icons/Navigation/Exchange.svg',
          child: [
            {
              nameSubNav: 'Thay đổi mật khẩu',
              router: '/change-password',
              icon: 'media/svg/icons/General/Settings-2.svg',
            },
          ],
        },
      ],
    };
  },
  components: {
    Brand,
    Menu,
    // MenuManage,
  },
  computed: {
    ...mapGetters(['layoutConfig', 'getClasses']),

    asideMenuClass() {
      const classes = this.getClasses('aside_menu');
      if (typeof classes !== 'undefined') {
        return classes.join(' ');
      }
      return null;
    },
  },
  methods: {
    setActiveTab(index) {
      this.activeTab = index;
      document.body.classList.remove('aside-minimize');
      this.asideExpand = true;
    },
    minimizedAside() {
      if (this.asideExpand) {
        document.body.classList.add('aside-minimize');
        this.asideExpand = false;
      } else {
        document.body.classList.remove('aside-minimize');
        this.asideExpand = true;
      }
    },
    logoutAction() {
      sessionStorage.removeItem('jwtToken');
      this.$router.push('/login');
    },
  },
};
</script>
