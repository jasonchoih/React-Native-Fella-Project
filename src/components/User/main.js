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
        if(userData) return;
        SEND(`user/${onProfileTab}`, {user_id, following_id:Auth});
    },[onProfileTab])
    // 
    return <View>
      {userData ? userData.map((v,k)=>(
          <Box key={k} style={styles.tweetContainer}>
              <View style={{flexDirection:'row', columnGap:10}}>
                  <View style={{flexBasis:40}}>
                      <Center>
                          <TouchableWithoutFeedback onPress={()=>getUserInfo(v[2])}>
                              <Image 
                                  size="xs"
                                  borderRadius={150}
                                  alt={v[4] || 'Profile Picture'}
                                  source={{
                                      uri: (v[4]&&"https://s3.amazonaws.com/fella-storage.com/Users/profile/"+v[4])  || 'https://assets.wfcdn.com/im/62631921/compr-r85/2137/213721793/cute-shiba-inu-dog-paws-up-over-wall-dog-face-cartoon-vector-illustration-on-canvas-by-chayapoll-tummakorn-print.jpg'
                                  }}
                              />
                          </TouchableWithoutFeedback>
                      </Center>
                  </View>

                  <View style={{flex:1, flexBasis:'auto'}}>

                      <View style={{flexDirection:'row', columnGap:5}}>
                          <TouchableWithoutFeedback onPress={()=>{navigation.navigate('users', { screen: 'userInfo', params: {user_id: v[2]} })}}>
                              <Text style={styles.fb}>{v[1]}</Text>
                          </TouchableWithoutFeedback>
                          <TouchableWithoutFeedback onPress={()=>{navigation.navigate('users', { screen: 'userInfo', params: {user_id: v[2]} })}}>
                              <Text style={styles.c8}>@{`${v[3]} ${v[10]} ago`}</Text>
                          </TouchableWithoutFeedback>
                      </View>
                      <TouchableWithoutFeedback onPress={()=>handleComment({tweetInfo:v})}>
                          <Text numberOfLines={5}>
                              {Mention(v[5], navigation)}
                          </Text>
                      </TouchableWithoutFeedback>

                      {v[6]['type'] && 
                          <View style={styles.mediaPreview}>
                              {v[6]['type']== 'video' ? (
                                  <Video
                                      style={styles.media} 
                                      source={{ uri: 'https://s3.amazonaws.com/fella-storage.com/Tweets/' + v[6]['uri']}} 
                                      useNativeControls
                                  />
                              ) : (
                                  <TouchableWithoutFeedback onPress={()=> handleComment({tweetInfo:v})}>
                                      <Image 
                                          alt={v[6]['uri']}
                                          style={styles.media} 
                                          source={{ uri:'https://s3.amazonaws.com/fella-storage.com/Tweets/' + v[6]['uri']}} 
                                      /> 
                                  </TouchableWithoutFeedback>
                              )}
                          </View>
                      }

                      <View style={{flexDirection: 'row', alignItems:'center', columnGap:10, paddingTop:10}}>
                          <HandleLike tweet_id={v[0]} isLiked={v[7]} likes={v[8]} />
                          <HandleComment comments={v[9]} tweetInfo={{tweetInfo:v}} />
                      </View>

                  </View>
              </View>
          </Box>
      )) : ( <Center> <ActivityIndicator size="large" /> </Center> )}
    </View>
}