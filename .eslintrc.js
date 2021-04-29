const configs = ['standard', 'eslint:recommended', 'prettier'];
const configsTs = [
  'standard',
  'eslint:recommended',
  'plugin:@typescript-eslint/eslint-recommended',
  'plugin:@typescript-eslint/recommended',
  'plugin:@typescript-eslint/recommended-requiring-type-checking',
  'plugin:react/recommended',
  'plugin:jsx-a11y/recommended',
  'prettier'
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
  ],
  'jsx-a11y/anchor-is-valid': [
    'error',
    {
      components: ['Link'],
      aspects: ['invalidHref', 'preferButton']
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
  'no-use-before-define': 'off',
  '@typescript-eslint/no-use-before-define': 'error',
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/restrict-plus-operands': 'error',
  '@typescript-eslint/no-extra-non-null-assertion': 'error',
  '@typescript-eslint/prefer-nullish-coalescing': 'error',
  '@typescript-eslint/prefer-optional-chain': 'error'
};

module.exports = {
  root: true,
  plugins: ['@typescript-eslint', 'jsx-a11y'],
  extends: configs,
  parserOptions,
  rules,
  settings: {
    react: {
      version: 'detect'
    }
  },
  overrides: [
    {
      files: ['**/*.js'],
      env: {
        node: true,
        browser: false
      }
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      env: {
        node: true,
        browser: true
      },
      parser: '@typescript-eslint/parser',
      parserOptions: parserOptionsTs,
      extends: configsTs,
      rules: rulesTs
    }
  ]
};
