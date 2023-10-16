import { extendTheme } from 'native-base';

export default theme = extendTheme({
  colors: {
    // primary: {
    //   50: '#E5F4FF',
    //   100: '#B3E0FF',
    //   200: '#80C7FF',
    //   300: '#4EA3FF',
    //   400: '#1B7FFF',
    //   500: '#0063E8', // Twitter blue
    //   600: '#0056CC',
    //   700: '#0049B3',
    //   800: '#003C99',
    //   900: '#002E7F',
    // },
    // secondary: {
    //   50: '#FFF0E5',
    //   100: '#FFD9B3',
    //   200: '#FFBF80',
    //   300: '#FFA04E',
    //   400: '#FF810B',
    //   500: '#FF7200', // Twitter orange
    //   600: '#CC5D00',
    //   700: '#994800',
    //   800: '#663300',
    //   900: '#331E00',
    // },
  },
  components: {
    Button: {
      baseStyle: {
        // borderRadius: 'full', 
      },
      defaultProps:{
        _dark:{
          bg:"#fff"
        },
        _light:{
          bg:"#ffac42"
        }
      },
    },
    Box: {
      defaultProps:{
        // _dark:{
        //   bg:"#000"
        // },
        // _light:{
        //   bg:"#002E7F"
        // }
      }
    },
    Input: {
      defaultProps: {
        // variant: 'underlined',
        // size: 'lg',
      },
    },
    Text: {
      defaultProps: {
        fontSize: 'md',
        // _dark:{
        //   color:"#0063E8"
        // },
        // _light:{
        //   color:"#fff"
        // }
      },
      // variants: {
      //   heading: {
      //     fontSize: 'xl',
      //     fontWeight: 'bold',
      //     lineHeight: 'short',
      //   },
      //   subheading: {
      //     fontSize: 'md',
      //     fontWeight: 'semibold',
      //   },
      // },
    },
    InputLeftAddon:{
        baseStyle:{
          w: 120
        },
    }
  },
});
