const prettierConfig = require('@reacttrpc-starter/prettier-config');

module.exports = {
  ...prettierConfig,
  plugins: [ "prettier-plugin-prisma"]
};
