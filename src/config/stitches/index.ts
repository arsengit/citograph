import { createStitches } from '@stitches/react';

import { utils } from './utils';
import { media } from './media';
import { primaryTheme, darkTheme as dark } from './theme';
import { global } from './global';

export const {
  styled,
  css,
  theme,
  createTheme,
  getCssText,
  globalCss,
  keyframes,
  config,
  reset,
} = createStitches({
  prefix: 'citograph',
  theme: primaryTheme,
  media,
  utils,
});

const injectGlobalStyles = globalCss(global);
injectGlobalStyles();

export const darkTheme = createTheme('dark-theme', dark);
export * from './stitches.d';
