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
    mb20:  {marginBottom:20},
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
    por:{position:'relative'},
    boe:{
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: '#A8A8A8'
    },
    ph10:{
      paddingHorizontal:10
    },
    pv10:{
      paddingVertical:10
    },
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
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: '#A8A8A8',
      padding: 10
    },
    mediaPreview: {
      marginTop: 8
    },
    media:{
      height: undefined, 
      width: '100%',
      aspectRatio: 3/2,
      borderRadius:5
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
      paddingTop:12,
      textAlign:'center'
    },
    // 
    // Comments
    infoContainer: {
      paddingHorizontal:10,
      paddingTop:10
    },
    actionsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems:'center',
    },
    actionButtonText: {
      marginLeft: 4,
      color:'#808080'
    },
    // 
    // User
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 50,
      position:'absolute', 
      bottom:-40,
      left:10
    },
    userInfo: {
      paddingTop:40,
      zIndex:20,
      paddingHorizontal:10,
      paddingBottom:10,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: '#A8A8A8'
    },
    nick: {
      paddingTop:10,
      fontSize: 24,
      fontWeight: 'bold'
    },
    bio: {
      fontSize: 12,
      marginTop: 6,
      lineHeight: 18,
    },
    tag: {
      fontSize: 11,
      color:'#808080'
    },
    editBtn:{
      position:'absolute',
      bottom:-40,
      right: 10
    },
});