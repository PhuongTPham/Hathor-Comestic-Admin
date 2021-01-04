import Vue from 'vue';
import VueRouter from 'vue-router';
import { ROUTER } from '../config/const';
import store from '../core/services/store/index';

Vue.use(VueRouter);

const routes = [
  // auth
  {
    path: '/dashboard',
    component: () => import('@/layout/Layout'),
    children: [
      {
        name: 'Analytics',
        path: '/',
        component: () => import('@/pages/Dashboard/Analytics'),
      },
    ],
  },
  {
    path: ROUTER.login.path,
    component: () => import('@/pages/auth/Auth'),
    children: [
      {
        name: ROUTER.login.name,
        path: ROUTER.login.path,
        component: () => import('@/pages/auth/Login'),
      },
      {
        name: ROUTER.register.name,
        path: ROUTER.register.path,
        component: () => import('@/pages/auth/Register'),
      },
    ],
  },
  // nav bar
  {
    path: ROUTER.dashboard.path,
    component: () => import('@/layout/Layout'),
    children: [
      {
        name: 'ManageAccountAdmin',
        path: '/manage-account/admin',
        beforeEnter: async (to, from, next) => {
          await store.dispatch('getAccount', '');
          next();
        },
        component: () => import('@/pages/ManageAccountAdmin/ManageAccountAdmin'),
      },
      {
        name: 'ManageProduct',
        path: '/manage-product',
        beforeEnter: async (to, from, next) => {
          await store.dispatch('getProduct', '');
          next();
        },
        component: () => import('@/pages/ManageProduct/ManageProduct'),
      },
      {
        name: 'ManageOrder',
        path: '/manage-order',
        beforeEnter: async (to, from, next) => {
          await store.dispatch('getOrders', '');
          next();
        },
        component: () => import('@/pages/ManageOrder/ManageOrder'),
      },
      {
        name: 'ManageCategory',
        path: '/manage-category',
        beforeEnter: async (to, from, next) => {
          await store.dispatch('getListCategory', '');
          next();
        },
        component: () => import('@/pages/ManageCategory/ManageCategory'),
      },
      {
        name: 'ManageSupplier',
        path: '/manage-supplier',
        beforeEnter: async (to, from, next) => {
          await store.dispatch('getListSupplier', '');
          next();
        },
        component: () => import('@/pages/ManageSupplier/ManageSupplier'),
      },
      {
        name: 'Manage',
        path: '/manage',
        component: () => import('@/pages/Manage'),
      },
      {
        name: 'ChangePassword',
        path: '/change-password',
        beforeEnter: async (to, from, next) => {
          next();
        },
        component: () => import('@/pages/ChangePassword/ChangePassword'),
      },
      {
        name: 'ManageContact',
        path: '/manage-contact',
        beforeEnter: async (to, from, next) => {
          await store.dispatch('getListContact', '');
          next();
        },
        component: () => import('@/pages/ManageContact/ManageContact'),
      },
      {
        name: 'ManageComment',
        path: '/manage-comment',
        beforeEnter: async (to, from, next) => {
          await store.dispatch('getListComment', '');
          next();
        },
        component: () => import('@/pages/ManageComment/ManageComment'),
      },
      {
        name: 'ManageSubscriber',
        path: '/manage-subscriber',
        beforeEnter: async (to, from, next) => {
          await store.dispatch('getListSubscriber', '');
          next();
        },
        component: () => import('@/pages/ManageSubscribers/ManageSubscriber'),
      },
      {
        name: 'ManageBlog',
        path: '/manage-blog',
        beforeEnter: async (to, from, next) => {
          await store.dispatch('getListBlog', '');
          next();
        },
        component: () => import('@/pages/ManageBlog/ManageBlog'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
