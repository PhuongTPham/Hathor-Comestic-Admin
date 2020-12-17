module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'max-len': 'off',
    'no-unused-vars': 'warn',
    'radix': 'off',
    'no-plusplus': 'off',
    'vue/no-unused-components': 'warn',
    'no-trailing-spaces': 'warn',
    'semi': 'warn',
    'comma-dangle': 'warn',
    'no-multiple-empty-lines': 'warn',
    'object-curly-newline': 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'linebreak-style': 0,
    'vue/no-unused-vars': 'warn'
  },
};
