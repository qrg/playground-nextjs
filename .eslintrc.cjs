const base = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  plugins: [],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/warnings',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'airbnb',
    'next/core-web-vitals',
  ],
  rules: {
    // off
    'import/prefer-default-export': 'off',
    'react/require-default-props': 'off',
    'react/display-name': 'off',

    // error
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        pathGroups: [
          {
            pattern: '{react,react-dom/**,react-router-dom}',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '@src/**',
            group: 'parent',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: {
          order: 'asc',
        },
        'newlines-between': 'always',
      },
    ],
    'react/function-component-definition': [
      'error',
      { namedComponents: 'arrow-function' },
    ],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
  },
  overrides: [
    // Only uses Testing Library lint rules in test files
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      plugins: ['jest', 'testing-library', 'jest-dom'],
      extends: [
        'plugin:jest/recommended',
        'plugin:jest-dom/recommended',
        'plugin:testing-library/dom',
        'plugin:testing-library/react',
      ],
      env: {
        'jest/globals': true,
      },
    },
  ],
};

const tsConfig = {
  files: ['**/*.ts', '**/*.tsx'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: [...base.plugins, '@typescript-eslint'],
  extends: [
    ...base.extends,
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'airbnb-typescript',
  ],
  rules: {
    ...base.rules,
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        format: [
          'strictCamelCase',
          'StrictPascalCase',
          'snake_case',
          'UPPER_CASE',
        ],
      },
    ],
  },
};

module.exports = {
  ...base,
  extends: [...base.extends, 'prettier'],
  overrides: [
    {
      ...tsConfig,
      extends: [...tsConfig.extends, 'prettier'],
    },
  ],
};
