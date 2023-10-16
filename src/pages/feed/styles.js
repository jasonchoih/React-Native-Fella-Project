import { StyleSheet } from 'react-native';
// 
export default styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  mediaButton: {
    backgroundColor: '#1DA1F2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  mediaButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  tweetButton: {
    backgroundColor: '#1DA1F2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom:20
  },
  tweetButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  tweetContainer: {
    borderBottomWidth:1,
    borderColor: '#eee',
    padding: 10,
    backgroundColor:"#fff"
  },
  infoContainer: {
    borderBottomWidth:1,
    borderColor: '#eee',
    paddingLeft: 10,
    paddingRight:10,
    paddingTop:10,
    backgroundColor: 'white',
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
  }
});