import { StyleSheet } from 'react-native';
// 
export default styles = StyleSheet.create({
    container: {
      // flex: 1,
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 50,
      position:'absolute', 
      bottom:-40,
      left:10
    },
    editBtn:{
      position:'absolute',
      bottom:-40,
      right: 10
    },
    tag: {
      fontSize: 11,
      color:'#808080'
    },
    userInfo: {
      paddingTop:50,
      paddingBottom: 10,
      backgroundColor:'#fff',
      paddingHorizontal:10
    },
    nick: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    bio: {
      fontSize: 12,
      marginTop: 8,
      lineHeight: 18,
    },
    tweetContainer: {
      borderBottomWidth:1,
      borderColor: '#eee',
      padding: 10,
      backgroundColor: 'white',
    },
    infoContainer: {
      // borderBottomWidth:1,
      // borderColor: '#eee',
      paddingLeft: 10,
      paddingRight:10,
      paddingTop:10,
      // backgroundColor: 'white',
    },
    tweetText: {
      fontSize: 16,
    },
    actionsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems:'center',
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    actionButtonText: {
      marginLeft: 4,
    },
    image: {
      width: '100%',
      height: 200,
      resizeMode: 'cover',
      borderRadius: 8,
      marginTop: 8,
    },
    video: {
      width: 300,
      height: 200,
      borderRadius: 8,
      marginTop: 8,
    },
    mediaPreviewContainer: {
      flexDirection: 'row'
    },
    mediaPreview: {
      marginTop: 8
    },
    mediaItem: {
      width: "100%",
      height: 100,
      borderRadius: 8
    },
  });