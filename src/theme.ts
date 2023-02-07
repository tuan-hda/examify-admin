import { createTheme } from '@mui/material/styles';

export const colors = {
  primary: {
    100: '#cfdaf4',
    200: '#9fb5e9',
    300: '#6e90dd',
    400: '#3e6bd2',
    500: '#0e46c7',
    600: '#0b389f',
    700: '#082a77',
    800: '#061c50',
    900: '#030e28',
  },
  grey: {
    100: '#fdfdfd',
    200: '#fcfcfc',
    300: '#fafafa',
    400: '#f9f9f9',
    500: '#f7f7f7',
    600: '#c6c6c6',
    700: '#949494',
    800: '#636363',
    900: '#313131',
    light: '#D2D0D5',
    light2: '#A9A7AC',
    bitDark: '#3F3F3F',
    quiteDark: '#323335',
  },
  greenAccent: {
    100: '#0f2922',
    200: '#1e5245',
    300: '#2e7c67',
    400: '#3da58a',
    500: '#4cceac',
    600: '#70d8bd',
    700: '#94e2cd',
    800: '#b7ebde',
    900: '#dbf5ee',
  },
  orange: {
    100: '#ffeecc',
    200: '#ffdc99',
    300: '#ffcb66',
    400: '#ffb933',
    500: '#ffa800',
    600: '#cc8600',
    700: '#996500',
    800: '#664300',
    900: '#332200',
  },
  red: {
    100: '#fdd9d7',
    200: '#fbb4af',
    300: '#f88e86',
    400: '#f6695e',
    500: '#f44336',
    600: '#c3362b',
    700: '#922820',
    800: '#621b16',
    900: '#310d0b',
  },
  blue: {
    100: '#d2e7fa',
    200: '#a5cff5',
    300: '#78b8ef',
    400: '#4ba0ea',
    500: '#1e88e5',
    600: '#186db7',
    700: '#125289',
    800: '#0c365c',
    900: '#061b2e',
  },
  components: {
    MuiButton: {
      variants: [],
    },
  },
};

const theme = createTheme({
  typography: {
    fontFamily: 'Inter, Helvetica, sans-serif',
  },
  palette: {
    primary: {
      main: colors.primary[500],
    },
    secondary: {
      main: colors.greenAccent[500],
    },
    background: {
      default: colors.grey[100],
    },
  },
});

export default theme;
