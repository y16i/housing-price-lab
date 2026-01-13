const js = require('@eslint/js');
const ts = require('typescript-eslint');
const nextPlugin = require('@next/eslint-plugin-next');

module.exports = [
  {
    ignores: [
      'node_modules/',
      '.next/',
      'out/',
      'dist/',
      'build/',
      '.git/',
      'coverage/'
    ]
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@next/next': nextPlugin,
      '@typescript-eslint': ts.plugin
    },
    languageOptions: {
      parser: ts.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        fetch: 'readonly',
        URLSearchParams: 'readonly',
        // Node.js globals
        process: 'readonly',
        global: 'readonly',
        Buffer: 'readonly',
        console: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly'
      }
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error']
        }
      ],
      'no-undef': 'off'
    }
  },
  {
    files: ['scripts/**/*.{js,ts}'],
    rules: {
      'no-console': 'off'
    }
  }
];



