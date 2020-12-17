<template>
  <li
    aria-haspopup="true"
    data-menu-toggle="hover"
    class="menu-item menu-item-submenu"
    v-bind:class="{ 'menu-item-open': hasActiveChildren(routeParent) || expand }"
  >
    <a href="#" class="menu-link menu-toggle" @click="expand=!expand">
      <i class="menu-icon flaticon2-list-2"></i>
      <span class="menu-text">Error Pages</span>
      <inline-svg
        src="media/svg/icons/Navigation/Angle-double-right.svg"
        :style="{transform: expand ? 'rotate(90deg)' :  'rotate(0deg)',width: '16px' }"
      />
    </a>
    <div class="menu-submenu">
      <ul class="menu-subnav">
        <router-link :to="child.route" v-slot="{ href, navigate, isActive, isExactActive }" v-for="(child,index) in routeChild" :key="index">
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
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">{{child.name}}</span>
            </a>
          </li>
        </router-link>
      </ul>
    </div>
  </li>
</template>

<script>
export default {
  name: 'ItemMenuExpand',
  props: {
    routeParent: {
      require: false,
      type: String,
    },
    routeChild: {
      require: false,
      default: () => [],
      type: Array,
    },
  },
  data() {
    return {
      expand: true,
    };
  },
  methods: {
    hasActiveChildren(match) {
      return this.$route.path.indexOf(match) !== -1;
    },
  },
};
</script>
