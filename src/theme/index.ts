import { extendTheme } from 'native-base';

const theme = extendTheme({
  colors: {
    primary: {
      200: '#AF7400',
      400: '#9C6907',
      600: '#9C6907',
      700: '#654303',
      800: '#694603',
      900: '#362401',
    },
    light: {
      50: '#FFFFFF',
      200: '#ECECEC',
    },
    dark: {
      50: '#000000'
    },
  },
  fontConfig: {
    Poppins: {
      400: {
        normal: 'PoppinsRegular',
      },
      500: {
        normal: 'PoppinsMedium',
      },
      600: {
        normal: 'PoppinsSemiBold',
      },
      800: {
        normal: 'PoppinsBold',
      },
    },
  },
  fonts: {
    heading: "Poppins",
    body: "Poppins",
    mono: "Poppins",
  },
});

export default theme;
