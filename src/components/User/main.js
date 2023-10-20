import { useEffect } from 'react';
import { View, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { Box, Center, Image, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
// import * as Sharing from 'expo-sharing';
import { Video } from 'expo-av';
//
import styles from 'config/styles';
// 
import HandleLike from 'components/Feed/tweetLike';
import HandleComment from 'components/Feed/tweetComment';
import { Mention } from 'components/Tool/Mention';
import { SEND } from 'store';
// 
export default props =>
{
    const { onProfileTab, user_id, Auth, userInfo } = props;
    const DATA = useSelector((state) => state.models);
    const userData = DATA&&DATA['User_'+onProfileTab];
    // 
    const navigation = useNavigation();
    // 
    const handleComment = (tweetInfo) => navigation.navigate('feedInfo', tweetInfo)
    // 
    const getUserInfo = (user_id) => {
        if(userInfo.id==user_id) return;
        navigation.push('user', {user_id, headerLeft:'Back'});
    }
    // 
    useEffect(()=>{
        // if(userData) return;
        SEND(`user/${onProfileTab}`, {user_id, following_id:Auth});
    },[onProfileTab])
    // 
    if(userData&&userData.length === 0) return <View>
        <Text>No data Bitch</Text>
    </View>
    // 
    return <View>
      {userData ? userData.map((v,k)=>(
          <Box key={v.tweet_id} style={styles.tweetContainer}>
              <View style={{flexDirection:'row', columnGap:10}}>
                  <View style={{flexBasis:40}}>
                      <Center>
                          <TouchableWithoutFeedback onPress={()=>getUserInfo(v.user_id)}>
                              <Image 
                                  size="xs"
                                  borderRadius={150}
                                  alt={v.profile_image || 'Profile Picture'}
                                  source={{
                                      uri: v.profile_image&&"https://s3.amazonaws.com/fella-storage.com/Users/profile/"+v.profile_image  || 'https://assets.wfcdn.com/im/62631921/compr-r85/2137/213721793/cute-shiba-inu-dog-paws-up-over-wall-dog-face-cartoon-vector-illustration-on-canvas-by-chayapoll-tummakorn-print.jpg'
                                  }}
                              />
                          </TouchableWithoutFeedback>
                      </Center>
                  </View>

                  <View style={{flex:1, flexBasis:'auto'}}>

                      <View style={{flexDirection:'row', columnGap:5}}>
                          <TouchableWithoutFeedback onPress={()=>{navigation.navigate('users', { screen: 'userInfo', params: {user_id: v.user_id} })}}>
                              <Text style={styles.fb}>{v.nick}</Text>
                          </TouchableWithoutFeedback>
                          <TouchableWithoutFeedback onPress={()=>{navigation.navigate('users', { screen: 'userInfo', params: {user_id: v.user_id} })}}>
                              <Text style={styles.c8}>@{`${v.tag} ${v.created} ago`}</Text>
                          </TouchableWithoutFeedback>
                      </View>
                      <TouchableWithoutFeedback onPress={()=>handleComment({tweetInfo:v})}>
                          <Text numberOfLines={5}>
                              {Mention(v.content, navigation)}
                          </Text>
                      </TouchableWithoutFeedback>

                      {v.media['type'] && 
                          <View style={styles.mediaPreview}>
                              {v.media['type']== 'video' ? (
                                  <Video
                                      style={styles.media} 
                                      source={{ uri: 'https://s3.amazonaws.com/fella-storage.com/Tweets/' + v.media['uri']}} 
                                      useNativeControls
                                  />
                              ) : (
                                  <TouchableWithoutFeedback onPress={()=> handleComment({tweetInfo:v})}>
                                      <Image 
                                          alt={v.media['uri']}
                                          style={styles.media} 
                                          source={{ uri:'https://s3.amazonaws.com/fella-storage.com/Tweets/' + v.media['uri']}} 
                                      /> 
                                  </TouchableWithoutFeedback>
                              )}
                          </View>
                      }

                      <View style={{flexDirection: 'row', alignItems:'center', columnGap:10, paddingTop:10}}>
                          <HandleLike tweet_id={v.tweet_id} isLiked={v.isLiked} likes={v.likes} />
                          <HandleComment comments={v.comments} tweetInfo={{tweetInfo:v}} />
                      </View>

                  </View>
              </View>
          </Box>
      )) : ( <Center> <ActivityIndicator size="large" /> </Center> )}
    </View>
}