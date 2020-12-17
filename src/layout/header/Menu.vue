<template>
  <ul class="menu-nav">
    <router-link
      to="/dashboard"
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
          <span class="menu-text"> Dashboard </span>
        </a>
      </li>
    </router-link>

    <router-link
      to="/builder"
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
          <span class="menu-text"> Builder </span>
        </a>
      </li>
    </router-link>

    <li
      aria-haspopup="true"
      data-menu-toggle="click"
      class="menu-item menu-item-submenu menu-item-open-dropdown"
      v-bind:class="{ 'menu-item-active': hasActiveChildren('/error/error') }"
    >
      <a href="#" class="menu-link menu-toggle">
        <span class="menu-text"> Custom </span>
      </a>
      <div class="menu-submenu menu-submenu-classic">
        <ul class="menu-subnav">
          <li
            aria-haspopup="true"
            data-menu-toggle="hover"
            class="menu-item menu-item-submenu"
          >
            <a href="#" class="menu-link menu-toggle">
              <i class="menu-icon flaticon2-list-2"></i>
              <span class="menu-text"> Error Pages </span>
              <i class="menu-arrow"></i>
            </a>
            <div class="menu-submenu menu-submenu-classic menu-submenu-right">
              <ul class="menu-subnav">
                <router-link
                  to="/error/error-1"
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
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Error 1 </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  to="/error/error-2"
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
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Error 2 </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  to="/error/error-3"
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
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Error 3 </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  to="/error/error-4"
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
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Error 4 </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  to="/error/error-5"
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
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Error 5 </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  to="/error/error-6"
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
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Error 6 </span>
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
              'menu-item-active': hasActiveChildren('/wizard/wizard')
            }"
          >
            <a href="#" class="menu-link menu-toggle">
              <i class="menu-icon flaticon2-mail-1"></i>
              <span class="menu-text"> Wizard </span>
              <i class="menu-arrow"></i>
            </a>
            <div class="menu-submenu menu-submenu-classic menu-submenu-right">
              <ul class="menu-subnav">
                <router-link
                  to="/wizard/wizard-1"
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
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Wizard 1 </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  to="/wizard/wizard-2"
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
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Wizard 2 </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  to="/wizard/wizard-3"
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
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Wizard 3 </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  to="/wizard/wizard-4"
                  v-slot="{ href, navigate, isActive, isExactActive }"
                >
                  <li
                    aria-haspopup="true"
                    data-menu-toggle="hover"
                    class="menu-item"
                  >
                    <a href="#/wizard/wizard-4" class="menu-link">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Wizard 4 </span>
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
                <router-link
                  to="/plugins/cropper"
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
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Cropper </span>
                    </a>
                  </li>
                </router-link>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Menu',
  methods: {
    hasActiveChildren(match) {
      return this.$route.path.indexOf(match) !== -1;
    },
  },
};
</script>
