const ROUTER = {
  dashboard: {
    name: 'Dashboard',
    path: '/dashboard',
  },
  manage: {
    name: 'Manage',
    path: '/manage',
    children: {
      ManageGuest: {
        name: 'ManageGuest',
        path: '/manage-guest',
      },
      ManageHost: {
        name: 'ManageHost',
        path: '/manage-host',
      },
    },
  },
  login: {
    name: 'Login',
    path: '/login',
  },
  register: {
    name: 'Register',
    path: '/register',
  },
};
// eslint-disable-next-line import/prefer-default-export
export { ROUTER };
