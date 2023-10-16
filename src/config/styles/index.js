import { StyleSheet } from 'react-native';
// 
export default styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: useTheme().colors.card,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'#bcefff'
    },
    // 
    // General
    p5: {padding:5},
    p10: {padding:10},
    mb10: {marginBottom:10},
    tc: {textAlign:'center'},
    be: {backgroundColor:"yellow"},
    bb: {backgroundColor:"#000"},
    bf:{backgroundColor:'#fff'},
    br5: {borderRadius:5},
    br10: {borderRadius:10},
    cf:{color:"#fff"},
    c8:{color:'#808080'},
    fb:{fontWeight:'bold'},
    f16:{fontSize:16},
    h100:{height:"100%"},
    w100:{width:"100%"},
    mini: {
      fontSize: 11,
      color:'#808080'
    },
    // 
    // Flex
    span6: {
      width: '25%'
    },
    span8:{
      width:"33.33%"
    },
    span12: {
      width: '50%'
    },
    span24:{
      width:"100%"
    },
    // 
    // Components
    input: {
      backgroundColor: 'white',
      borderColor: 'transparent',
      height: 40,
      padding: 10,
      borderRadius: 4,
    },
    // 
    tweetContainer: {
      borderBottomWidth:1,
      borderColor: '#eee',
      padding: 10,
      backgroundColor:"#fff"
    },
    mediaPreview: {
      marginTop: 8
    },
    media:{
      width:"auto", 
      height: 200, 
      borderRadius:10
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    addBtn:{
      backgroundColor:"#f4511e", 
      position:'absolute', 
      zIndex:10, 
      bottom:20, 
      right:15, 
      width:50, 
      height:50, 
      borderRadius:25, 
      justifyContent: 'center'
    },
    addTxt:{
      fontSize:30, 
      color:"#fff", 
      textAlign:'center'
    },
    // 
    // Comments
    infoContainer: {
      borderBottomWidth:1,
      borderColor: '#eee',
      paddingLeft: 10,
      paddingRight:10,
      paddingTop:10,
      backgroundColor: 'white',
    },
    actionsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems:'center',
    },
    // 
});