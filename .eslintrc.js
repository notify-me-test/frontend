module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  overrides: [
    {
      files: ['**/__tests__/**/*', '**/*.test.*'],
      rules: {
        'testing-library/no-node-access': 'off',
        'testing-library/no-wait-for-multiple-assertions': 'off'
      }
    }
  ]
};