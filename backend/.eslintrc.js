module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  extends: [
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': ['error', { 
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^(Sequelize|queryInterface)$'
    }],
  },
  overrides: [
    {
      files: ['**/*.js'],
      parserOptions: {
        sourceType: 'commonjs',
      },
    },
  ],
};

