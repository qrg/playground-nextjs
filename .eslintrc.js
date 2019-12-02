const configs = ['standard', 'eslint:recommended', 'prettier'];
const configsTs = [
  'standard',
  'eslint:recommended',
  'plugin:@typescript-eslint/eslint-recommended',
  'plugin:@typescript-eslint/recommended',
  'plugin:@typescript-eslint/recommended-requiring-type-checking',
  'plugin:react/recommended',
  'plugin:jsx-a11y/recommended',
  'prettier',
  'prettier/react',
  'prettier/@typescript-eslint'
];

const parserOptions = {
  ecmaVersion: 2019,
  sourceType: 'module'
};
const parserOptionsTs = {
  ...parserOptions,
  project: './tsconfig.json'
};

const rules = {
  'prettier/prettier': 'error',
  'no-console': 'warn',
  'no-var': 'error',
  'prefer-const': 'error',
  'prefer-rest-params': 'error',
  'prefer-spread': 'error',
  'prefer-template': 'warn',
  'prefer-arrow-callback': 'error',
  camelcase: 'warn',
  'no-unused-vars': [
    'error',
    {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_'
    }
  ]
};

const rulesTs = {
  ...rules,
  'react/prop-types': 'off',
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_'
    }
  ],
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/restrict-plus-operands': 'error',
  '@typescript-eslint/no-extra-non-null-assertion': 'error',
  '@typescript-eslint/prefer-nullish-coalescing': 'error',
  '@typescript-eslint/prefer-optional-chain': 'error'
};

module.exports = {
  root: true,
  plugins: ['@typescript-eslint', 'prettier', 'jsx-a11y'],
  extends: configs,
  parserOptions,
  rules,
  overrides: [
    {
      files: ['./*.js'],
      env: {
        node: true,
        browser: false
      }
    },
    {
      files: ['src/**/*.ts', 'src/**/*.tsx'],
      env: {
        node: false,
        browser: true
      },
      parser: '@typescript-eslint/parser',
      parserOptions: parserOptionsTs,
      extends: configsTs,
      rules: rulesTs
    },
    {
      files: ['tasks/**/*.ts'],
      env: {
        node: true,
        browser: false
      },
      parser: '@typescript-eslint/parser',
      parserOptions: parserOptionsTs,
      extends: configsTs,
      rules: rulesTs
    }
  ]
};
