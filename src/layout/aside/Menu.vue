<template>
  <ul class="menu-nav">
    <router-link
      v-for="item of subMenu"
      :key="item.router"
      :to="item.router"
      v-slot="{ href, navigate, isActive, isExactActive }"
    >
      <li
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item"
        :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active'
        ]"
      >
        <a :href="href" class="menu-link" @click="navigate">
          <i class="menu-icon flaticon2-architecture-and-city"></i>
          <span class="svg-icon svg-icon-lg">
              <!--begin::Svg Icon-->
              <inline-svg :src="item.icon" />
              <!--end::Svg Icon-->
          </span>
          <span class="menu-text ml-5">{{item.nameSubNav}}</span>
        </a>
      </li>
    </router-link>

    <!-- <ItemMenuExpand routeParent="/error/error" :routeChild="[{route: '/error/error-1', name: 'error1'}]"></ItemMenuExpand> -->

  </ul>
</template>

<script>
// import ItemMenuExpand from './ItemMenuExpand.vue';

export default {
  name: 'Menu',
  components: {
    // ItemMenuExpand,
  },
  props: {
    subMenu: {
      type: Array,
      required: true,
    },
  },
  methods: {
    hasActiveChildren(match) {
      return this.$route.path.indexOf(match) !== -1;
    },
  },
};
</script>
