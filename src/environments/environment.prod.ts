import dotenvVariables from './.env.js';

export const environment = {
  production: true,
  ...dotenvVariables,
};
