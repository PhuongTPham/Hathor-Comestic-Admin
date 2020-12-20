/* eslint-disable no-plusplus */ /* eslint-disable radix */ /* eslint-disable radix */
<template>
  <!-- begin:: Aside -->
  <div class="aside aside-left d-flex aside-fixed" id="aside" ref="aside">
    <!--begin::Primary-->
    <div class="aside-primary d-flex flex-column align-items-center flex-row-auto">
      <!--begin::Brand-->
      <Brand></Brand>
      <!--end::Brand-->
      <!--begin::Nav Wrapper-->
      <div
        class="aside-nav position-relative d-flex flex-column align-items-center flex-column-fluid py-5 scroll scroll-pull ps"
        style="height: 528px; overflow: hidden;"
      >
        <!--begin::Nav-->
        <ul class="nav flex-column" role="tablist" v-for="(nav, index) in listNav" :key="index">
          <!--begin::Item-->
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
                <!--begin::Svg Icon-->
                <inline-svg :src="nav.icon" />
                <!--end::Svg Icon-->
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
        <!--begin::Aside Toggle-->
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
        <!--end::Aside Toggle-->
      </div>
      <!--end::Footer-->
    </div>
    <!--end::Primary-->
    <!--begin::Secondary-->
    <div class="aside-secondary d-flex flex-row-fluid">
      <!--begin::Workspace-->
      <div
        class="aside-workspace scroll scroll-push my-2 ps"
        style="height: 824px; overflow: hidden;"
      >
        <!--begin::Tab Content-->
        <b-tabs class="hide-tabs">
          <!--begin::Tab Pane-->
          <b-tab>
            <!--begin::Aside Menu-->
            <div class="aside-menu-wrapper flex-column-fluid px-10 py-5" id="aside_menu_wrapper">
              <!--begin::Menu Container-->
              <div
                ref="aside_menu"
                id="aside_menu"
                class="aside-menu min-h-lg-800px"
                data-menu-vertical="1"
                data-menu-scroll="1"
              >
                <!-- example static menu here -->
                <Menu :subMenu="listNav[activeTab].child"></Menu>
                <!-- <MenuManage v-if="activeTab == 2"></MenuManage> -->
              </div>
              <!--end::Menu Container-->
            </div>
            <!--end::Aside Menu-->
          </b-tab>
          <!--end::Tab Pane-->
        </b-tabs>
        <!--end::Tab Content-->
        <!--end::Workspace-->
      </div>
      <!--end::Secondary-->
    </div>
  </div>
  <!-- end:: Aside -->
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
              router: '/summary',
            },
          ],
        },
        {
          name: 'Account',
          icon: 'media/svg/icons/Communication/Group.svg',
          child: [
            {
              nameSubNav: 'Danh sách admin',
              router: '/manage-account/admin',
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
            },
            {
              nameSubNav: 'Product',
              router: '/manage-product',
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
            },
          ],
        },
        {
          name: 'Billing',
          icon: 'media/svg/icons/Home/Book.svg',
          child: [
            {
              nameSubNav: 'Danh sách đơn mua',
              router: '/manage-order',
            },
            {
              nameSubNav: 'Đơn hàng đanh xử lý',
              router: '/manage-order',
            },
          ],
        },
        {
          name: 'Contact',
          icon: 'media/svg/icons/Home/Mailbox.svg',
          child: [
            {
              nameSubNav: 'Contact',
              router: '/manage-order',
            },
            {
              nameSubNav: 'Comment',
              router: '/manage-order',
            },
            {
              nameSubNav: 'Blog/review sản phẩm',
              router: '/manage-order',
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

    /**
     * Get extra classes for menu based on the options
     */
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
      // set active menu
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
