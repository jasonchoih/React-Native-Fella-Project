import { useEffect } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Image, Text, Box } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { Video } from 'expo-av';
import { useSelector, useDispatch } from 'react-redux';
import { SEND } from 'store';
// 
import HandleLike from 'components/Feed/tweetLike';
import CommmentLike from 'components/Feed/commentLike';
import { Mention } from 'components/Tool/Mention';
// 
import styles from 'config/styles';
// 
export default ({route}) =>
{
    if (!route.params.tweetInfo) return <></>;
    const { tweetInfo } = route.params;
    //
    const { CommentList, Comment, CommentLike } = useSelector((state) => state.models);
    const Auth = useSelector((state) => state.auths);
    // 
    const dispatch = useDispatch();
    const navigation = useNavigation();
    // 
    useEffect(()=>{
      SEND('comment/list',{tweet_id: tweetInfo.tweet_id});
    },[])
    // 
    useEffect(() => {
      if(!Comment) return;
      if(CommentList)
      {
        dispatch.models.SET({ 
          CommentList:[ Comment, ...CommentList ],
          Comment:'',
        });
        return;
      }
      dispatch.models.SET({ 
        CommentList: Comment, 
        Comment: '',
      });
    }, [Comment]);
    // 
    useEffect(() => {
      if(!CommentLike) return;
      if(CommentList)
      {
        const index = (CommentList.findIndex(x => x.comment_id == CommentLike.comment_id));
        let newComment = CommentList;
        newComment[index].likes = CommentLike.likes;
        if(CommentLike.isLiked_user_id == Auth.id) newComment[index].isLiked = CommentLike.active;
        // 
        dispatch.models.SET({ 
          CommentList: newComment, 
          CommentLike: '',
        });
      }
    }, [CommentLike]);
    // 
    const handleComment = () => {
      navigation.navigate('feedComment', tweetInfo )
    }
    // 
    return <ScrollView>
      <Box style={styles.infoContainer}>

        <View style={{flexDirection:'row', columnGap:5}}>

          <View style={{marginBottom:5}}>
              <Image 
                alt={tweetInfo.image_profile || 'Profile Picture'}
                style={{height:40, width:40, alignContent:'center'}}
                borderRadius={20}
                source={{
                  uri: tweetInfo.image_profile&&("https://s3.amazonaws.com/fella-storage.com/Users/profile/"+tweetInfo.image_profile)  || 'https://assets.wfcdn.com/im/62631921/compr-r85/2137/213721793/cute-shiba-inu-dog-paws-up-over-wall-dog-face-cartoon-vector-illustration-on-canvas-by-chayapoll-tummakorn-print.jpg'
                }}
              />
          </View>
          <View style={{flexDirection:'column'}}>
              <Text style={styles.fb}>{tweetInfo.nick}</Text>
              <Text style={styles.c8}>@{tweetInfo.tag}</Text>
          </View>
        </View>

        <View style={{flexDirection:'row'}}>
          <View style={{flex:1, flexBasis:'auto'}}>
            <Text style={styles.tweetText}>
              {Mention(tweetInfo.content, navigation)}
            </Text>

            {tweetInfo.media['type']&& 
              <View style={styles.mediaPreview}>
                {tweetInfo.media['type'] == 'video' ? (
                  <Video
                    style={{width:"auto", height: 200, borderRadius:10}} 
                    source={{ uri: 'https://s3.amazonaws.com/fella-storage.com/Tweets/' + tweetInfo.media['uri']}} 
                    useNativeControls
                    resizeMode="contain"
                  />
                ) : (
                  <Image 
                    alt={tweetInfo.media['uri'] }
                    resizeMode='cover' 
                    style={{width:"auto", height: 200, borderRadius:10}} 
                    source={{ uri: 'https://s3.amazonaws.com/fella-storage.com/Tweets/' + tweetInfo.media['uri']}} 
                    />
                )}
              </View>}

            <View style={[{flexDirection:'row', columnGap:10, paddingVertical:5}, styles.boe]}>
                <View>
                    <Text>{tweetInfo.likes} <Text style={styles.c8}>Likes</Text></Text>
                </View>
                <View>
                  <Text>{tweetInfo.comments} <Text style={styles.c8}>Comments</Text></Text>
                </View>
                <View>
                  <Text style={styles.c8}>{tweetInfo.created} ago</Text>
                </View>
            </View>
            

            <View style={[styles.actionsContainer, styles.boe, {paddingVertical:10}]}>
              <HandleLike tweet_id={tweetInfo.tweet_id} isLiked={tweetInfo.active} likes={tweetInfo.likes} />
              <TouchableOpacity onPress={() => handleComment()} style={styles.actionButton}>
                <FontAwesome name="comment-o" size={16} color="#808080" />
              </TouchableOpacity>
            </View>

          </View>
        </View>

        {CommentList&&CommentList.map((v,k)=>(
          <View key={v.comment_id} style={[{paddingVertical:10}, styles.boe]}>
              <View style={{flexDirection:'row'}}>
                <View style={{flexBasis:50}}>
                  <Image 
                    style={{height:40, width:40, alignContent:'center'}}
                    borderRadius={20}
                    alt={v.image_profile || 'Profile Picture'}
                    source={{
                      uri: v.image_profile&&("https://s3.amazonaws.com/fella-storage.com/Users/profile/"+v.image_profile)  || 'https://assets.wfcdn.com/im/62631921/compr-r85/2137/213721793/cute-shiba-inu-dog-paws-up-over-wall-dog-face-cartoon-vector-illustration-on-canvas-by-chayapoll-tummakorn-print.jpg'
                    }}
                  />
                </View>
                <View style={{flex:1, flexBasis:'auto'}}>
                  <View style={{flexDirection:'row', columnGap:5}}>
                    <View>
                      <Text style={styles.fb}>{v.nick}</Text>
                    </View>
                    <View>
                      <Text style={styles.c8}>@{`${v.tag}`}</Text>
                    </View>
                    
                  </View>
                  
                  <Text style={styles.tweetText}>
                    {Mention(v.content, navigation)}
                  </Text>

                  {v.media['type'] && 
                    <View style={styles.mediaPreview}>
                        {v.media['type']== 'video' ? (
                            <Video
                                style={styles.media} 
                                source={{ uri: 'https://s3.amazonaws.com/fella-storage.com/Comments/' + v.media['uri']}} 
                                useNativeControls
                            />
                        ) : (
                            <Image 
                                alt={v.media['uri']}
                                style={styles.media} 
                                source={{ uri:'https://s3.amazonaws.com/fella-storage.com/Comments/' + v.media['uri']}} 
                            />
                        )}
                    </View>}

                  <View>
                    <View style={{ flexDirection: 'row', alignItems:'center', columnGap:10, paddingTop:10}}>
                      <CommmentLike isLiked={v.isLiked} likes={v.likes} tweet_id={tweetInfo.tweet_id} comment_id={v.comment_id} />
                    </View>
                  </View>

                </View>
              </View>
            </View>
          ))}
        
      </Box>
    </ScrollView>
}