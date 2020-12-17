<template>
  <ul class="menu-nav">
    <router-link to="/dashboard" v-slot="{ href, navigate, isActive, isExactActive }">
      <li
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item"
        :class="[isActive && 'menu-item-active', isExactActive && 'menu-item-active']"
      >
        <a :href="href" class="menu-link" @click="navigate">
          <i class="menu-icon flaticon2-architecture-and-city"></i>
          <span class="menu-text">Dashboard</span>
        </a>
      </li>
    </router-link>

    <router-link to="/builder" v-slot="{ href, navigate, isActive, isExactActive }">
      <li
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item"
        :class="[isActive && 'menu-item-active', isExactActive && 'menu-item-active']"
      >
        <a :href="href" class="menu-link" @click="navigate">
          <i class="menu-icon flaticon2-expand"></i>
          <span class="menu-text">Layout Builder</span>
        </a>
      </li>
    </router-link>

    <li class="menu-section">
      <h4 class="menu-text">Custom</h4>
      <i class="menu-icon flaticon-more-v2"></i>
    </li>

    <li
      aria-haspopup="true"
      data-menu-toggle="hover"
      class="menu-item menu-item-submenu"
      v-bind:class="{ 'menu-item-open': hasActiveChildren('/wizard/wizard') }"
    >
      <a href="#" class="menu-link menu-toggle">
        <i class="menu-icon flaticon2-mail-1"></i>
        <span class="menu-text">Wizard</span>
        <i class="menu-arrow"></i>
      </a>
      <div class="menu-submenu">
        <span class="menu-arrow"></span>
        <ul class="menu-subnav">
          <li aria-haspopup="true" class="menu-item menu-item-parent">
            <span class="menu-link">
              <span class="menu-text">Wizard</span>
            </span>
          </li>

          <router-link to="/wizard/wizard-1" v-slot="{ href, navigate, isActive, isExactActive }">
            <li
              aria-haspopup="true"
              data-menu-toggle="hover"
              class="menu-item"
              :class="[isActive && 'menu-item-active', isExactActive && 'menu-item-active']"
            >
              <a :href="href" class="menu-link" @click="navigate">
                <i class="menu-bullet menu-bullet-dot">
                  <span></span>
                </i>
                <span class="menu-text">Wizard 1</span>
              </a>
            </li>
          </router-link>

          <router-link to="/wizard/wizard-2" v-slot="{ href, navigate, isActive, isExactActive }">
            <li
              aria-haspopup="true"
              data-menu-toggle="hover"
              class="menu-item"
              :class="[isActive && 'menu-item-active', isExactActive && 'menu-item-active']"
            >
              <a :href="href" class="menu-link" @click="navigate">
                <i class="menu-bullet menu-bullet-dot">
                  <span></span>
                </i>
                <span class="menu-text">Wizard 2</span>
              </a>
            </li>
          </router-link>

          <router-link to="/wizard/wizard-3" v-slot="{ href, navigate, isActive, isExactActive }">
            <li
              aria-haspopup="true"
              data-menu-toggle="hover"
              class="menu-item"
              :class="[isActive && 'menu-item-active', isExactActive && 'menu-item-active']"
            >
              <a :href="href" class="menu-link" @click="navigate">
                <i class="menu-bullet menu-bullet-dot">
                  <span></span>
                </i>
                <span class="menu-text">Wizard 3</span>
              </a>
            </li>
          </router-link>

          <router-link to="/wizard/wizard-4" v-slot="{ href, navigate, isActive, isExactActive }">
            <li
              aria-haspopup="true"
              data-menu-toggle="hover"
              class="menu-item"
              :class="[isActive && 'menu-item-active', isExactActive && 'menu-item-active']"
            >
              <a :href="href" class="menu-link" @click="navigate">
                <i class="menu-bullet menu-bullet-dot">
                  <span></span>
                </i>
                <span class="menu-text">Wizard 4</span>
              </a>
            </li>
          </router-link>
        </ul>
      </div>
    </li>

    <li
      aria-haspopup="true"
      data-menu-toggle="hover"
      class="menu-item menu-item-submenu"
      v-bind:class="{
        'menu-item-active': hasActiveChildren('/plugins/plugins')
      }"
    >
      <a href="#" class="menu-link menu-toggle">
        <i class="menu-icon flaticon2-image-file"></i>
        <span class="menu-text"> Plugins </span>
        <i class="menu-arrow"></i>
      </a>
      <div class="menu-submenu menu-submenu-classic menu-submenu-right">
        <ul class="menu-subnav">
          <router-link to="/plugins/cropper" v-slot="{ href, navigate, isActive, isExactActive }">
            <li
              aria-haspopup="true"
              data-menu-toggle="hover"
              class="menu-item"
              :class="[isActive && 'menu-item-active', isExactActive && 'menu-item-active']"
            >
              <a :href="href" class="menu-link" @click="navigate">
                <i class="menu-bullet menu-bullet-dot"><span></span></i>
                <span class="menu-text"> Cropper </span>
              </a>
            </li>
          </router-link>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'MenuManage',
  components: {},
  methods: {
    hasActiveChildren(match) {
      return this.$route.path.indexOf(match) !== -1;
    },
  },
};
</script>
