module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2015,
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
  },
  extends: ['plugin:vue/essential'],
  plugins: ['prettier', 'vue'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
        useTabs: false,
        tabWidth: 2,
        printWidth: 80,
        bracketSpacing: true,
        arrowParens: 'avoid',
      },
    ],
    'no-new': 0,
  },
};
