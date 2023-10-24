import { extendTheme } from 'native-base';

export default theme = extendTheme({
  config: {
    useSystemColorMode: true,
  },
  colors: {

  },
  components: {
    Button: {
      baseStyle: {
        // borderRadius: 'full'
      },
      defaultProps:{
        _dark:{
          bg:"#007acc"
        },
        _light:{
          bg:"#ffac42"
        }
      },
    },
    Box: {
      // defaultProps:{
      //   _dark:{
      //     bg:"#252526"
      //   },
      //   _light:{
      //     bg:"#fff"
      //   }
      // }
    },
    // Input: {
    //   baseStyle: {
    //     border: 0
    //   },
    //   defaultProps: {
    //     _dark:{
    //       bg:"#fff"
    //     },
    //     _light:{
    //       bg:"#fff",
    //     }
    //   },
    // },
    // FormControl:{
    //   baseStyle: {
    //     style:{
    //       color: '#ff0000'
    //     }
    //   },
    //   defaultProps:{
    //     _dark:{
    //       color:"#ff0000"
    //     },
    //     _light:{
    //       color:"#ff0000"
    //     }
    //   }
    // },
    Text: {
      defaultProps: {
        fontSize:13,
        // fontFamily:'Helvetica Neue',
        _dark:{
          color:"#fff"
        },
        _light:{
          color:"#000"
        }
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
