module.exports = {
  root: true,
  extends: 'airbnb-base',
  env: {
    browser: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    allowImportExportEverywhere: true,
    sourceType: 'module',
    requireConfigFile: false,
  },
  rules: {
    'import/extensions': ['error', { js: 'always' }], // require js file extensions in imports
    'linebreak-style': ['error', 'unix'], // enforce unix linebreaks
    'no-param-reassign': [2, { props: false }], // allow modifying properties of param
  },
  overrides: [
    {
      files: ['tools/*.mjs'],
      env: { node: true, browser: false },
      rules: {
        'import/extensions': 'off',
        // CLI tools log progress to stdout/stderr — that's their output channel.
        'no-console': 'off',
        // Sequential async loops are intentional in CLI batch tools
        // (paginated APIs, polite rate-limiting).
        'no-await-in-loop': 'off',
        'no-restricted-syntax': 'off',
        'no-continue': 'off',
      },
    },
  ],
};
