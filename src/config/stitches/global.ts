export const global: { [key: string]: any } = {
  '*': {
    margin: '0',
    padding: '0',
    boxSizing: 'border-box',
    '&:focus-visible': {
      outline: 'none',
      textDecoration: 'none',
    },
    textDecoration: 'none',
  },
  html: {
    scrollBehavior: 'smooth',
    height: '100%',
  },
  body: {
    fontFamily: 'Inter',
    fontSize: '16px',
    fontWeight: '$1',
    height: '100%',
  },
  '#__next': {
    height: '100%',
  },
  '.ScrollBar__hidden': {
    '--ms-overflow-style': 'none',
    '--scrollbar-width': 'none',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  '@font-face': [
    {
      fontFamily: 'Inconsolata',
      fontStyle: 'normal',
      fontWeight: '1 999',
      fontDisplay: 'block',
      src: 'url(assets/fonts/inconsolata/inconsolata.ttf)',
    },
    {
      fontFamily: 'Inter',
      fontStyle: 'normal',
      fontWeight: '1 999',
      fontDisplay: 'block',
      src: 'url(assets/fonts/inter/Inter.ttf)',
    },
  ],
};
