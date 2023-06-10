// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase, { defaultConfig }) => {
  const config = {
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    /* config options for all phases except development here */
    env: {
      API_ROOT: process.env.API_ROOT,
    },
  };
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    /* development only config options here */
    config.env.phase = phase;
  }

  return config;
};
