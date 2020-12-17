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
        name: 'ManageAccount',
        path: '/manage-account',
        beforeEnter: async (to, from, next) => {
          await store.dispatch('getAccount', '');
          next();
        },
        component: () => import('@/pages/ManageAccount/ManageAccount'),
      },
      {
        name: 'ManageChuNha',
        path: '/manage-host',
        beforeEnter: async (to, from, next) => {
          await store.dispatch('getHost', '');
          next();
        },
        component: () => import('@/pages/ManageChuNha/ManageChuNha'),
      },
      {
        name: 'ManageKhachThue',
        path: '/manage-guest',
        beforeEnter: async (to, from, next) => {
          await store.dispatch('getGuest', '');
          next();
        },
        component: () => import('@/pages/ManageKhachThue/ManageKhachThue'),
      },
      {
        name: 'ManageCanHo',
        path: '/manage-appartment',
        beforeEnter: async (to, from, next) => {
          await store.dispatch('getAppartment', '');
          next();
        },
        component: () => import('@/pages/ManageCanHo/ManageCanHo'),
      },
      {
        name: 'ManageToaNha',
        path: '/manage-building',
        beforeEnter: async (to, from, next) => {
          await store.dispatch('getBuilding', '');
          next();
        },
        component: () => import('@/pages/ManageToaNha/ManageToaNha'),
      },
      {
        name: 'ManageTenant',
        path: '/manage-company',
        beforeEnter: async (to, from, next) => {
          await store.dispatch('getTenant', '');
          next();
        },
        component: () => import('@/pages/ManageTenant/ManageTenant'),
      },
      {
        name: 'ManageService',
        path: '/manage-service',
        beforeEnter: async (to, from, next) => {
          await store.dispatch('getService', '');
          next();
        },
        component: () => import('@/pages/ManageService/ManageService'),
      },
      {
        name: 'Manage',
        path: '/manage',
        component: () => import('@/pages/Manage'),
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
