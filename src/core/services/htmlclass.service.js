/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
import objectPath from 'object-path';
import {
  ADD_BODY_CLASSNAME,
  REMOVE_BODY_CLASSNAME,
  ADD_CLASSNAME,
} from '@/core/services/store/htmlclass.module';
import store from '@/core/services/store';

const HtmlClass = {
  config: null,

  init(config) {
    if (typeof config !== 'undefined') {
      this.config = config;
    }

    // init base layout
    this.initLayout();

    // init header and subheader menu

    // init aside and aside menu
    this.initAside();
  },

  /**
   * Init Layout
   */
  initLayout() {
    if (objectPath.has(this.config, 'self.body.class')) {
      const _selfBodyClass = objectPath
        .get(this.config, 'self.body.class')
        .toString();
      if (_selfBodyClass) {
        const bodyClasses = _selfBodyClass.split(' ');
        bodyClasses.forEach((cssClass) => {
          store.dispatch(ADD_BODY_CLASSNAME, cssClass);
        });
      }
    }

    const bgImage = objectPath.get(this.config, 'self.body.background-image');
    if (typeof bgImage !== 'undefined') {
      document.body.style.backgroundImage = `url(${bgImage})`;
    }

    // Properly close mobile header menu
    store.dispatch(REMOVE_BODY_CLASSNAME, 'header-menu-wrapper-on');
  },

  /**
   * Init Aside
   */
  initAside() {
    // Reset aside class in body
    store.dispatch(REMOVE_BODY_CLASSNAME, 'aside-enabled');
    store.dispatch(REMOVE_BODY_CLASSNAME, 'aside-fixed');
    store.dispatch(REMOVE_BODY_CLASSNAME, 'aside-static');
    store.dispatch(REMOVE_BODY_CLASSNAME, 'aside-minimize');

    if (objectPath.get(this.config, 'aside.self.display') !== true) {
      return;
    }

    // Add aside class enabled in body
    store.dispatch(ADD_BODY_CLASSNAME, 'aside-enabled');

    // Fixed Aside
    if (objectPath.get(this.config, 'aside.self.fixed')) {
      store.dispatch(ADD_BODY_CLASSNAME, 'aside-fixed');
      store.dispatch(ADD_CLASSNAME, {
        position: 'aside',
        className: 'aside-fixed',
      });
    } else {
      store.dispatch(ADD_BODY_CLASSNAME, 'aside-static');
    }

    // Aside Secondary
    if (objectPath.get(this.config, 'aside.secondary.display')) {
      store.dispatch(ADD_BODY_CLASSNAME, 'aside-secondary-enabled');
    } else {
      store.dispatch(ADD_BODY_CLASSNAME, 'aside-secondary-disabled');
    }

    // Default fixed
    if (objectPath.get(this.config, 'aside.self.minimize.default')) {
      store.dispatch(ADD_BODY_CLASSNAME, 'aside-minimize');
    }

    // Dropdown Submenu
    if (objectPath.get(this.config, 'aside.menu.dropdown')) {
      store.dispatch(ADD_CLASSNAME, {
        position: 'aside_menu',
        className: 'aside-menu-dropdown',
      });
    }
  },

  /**
   * Init Footer
   */
  initFooter() {
    // Fixed header
    if (objectPath.get(this.config, 'footer.fixed')) {
      store.dispatch(ADD_BODY_CLASSNAME, 'footer-fixed');
    }
  },
};

export default HtmlClass;
