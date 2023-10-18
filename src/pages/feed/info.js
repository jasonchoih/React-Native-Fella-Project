import { useEffect } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Image, Text, Box } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { Video } from 'expo-av';
import { useSelector, useDispatch } from 'react-redux';
import { SEND } from 'store';
import { findArrIndex } from 'utils/tool';
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
    const tweetInfo = route.params.tweetInfo;
    //
    const { CommentList, Comment, CommentLike } = useSelector((state) => state.models);
    const Auth = useSelector((state) => state.auths);
    // 
    const dispatch = useDispatch();
    const navigation = useNavigation();
    // 
    useEffect(()=>{
      SEND('comment/list',{tweet_id: tweetInfo[0]});
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
        const index = findArrIndex(CommentList, CommentLike[0]);
        let newComment = CommentList;
        newComment[index][5] = CommentLike[1];
        newComment[index][7] = CommentLike[2];
        // 
        dispatch.models.SET({ 
          CommentList: newComment, 
          CommentLike: '',
        });
      }
    }, [CommentLike]);
    // 
    const handleComment = () => {
      navigation.navigate('feedComment', { tweetInfo } )
    }
    // 
    return <ScrollView>
      <Box style={styles.infoContainer}>

        <View style={{flexDirection:'row', columnGap:5}}>

          <View style={{marginBottom:5}}>
              <Image 
                alt={tweetInfo[4] || 'Profile Picture'}
                style={{height:40, width:40, alignContent:'center'}}
                borderRadius={20}
                source={{
                  uri: tweetInfo[4]&&("https://s3.amazonaws.com/fella-storage.com/Users/profile/"+tweetInfo[4])  || 'https://assets.wfcdn.com/im/62631921/compr-r85/2137/213721793/cute-shiba-inu-dog-paws-up-over-wall-dog-face-cartoon-vector-illustration-on-canvas-by-chayapoll-tummakorn-print.jpg'
                }}
              />
          </View>
          <View style={{flexDirection:'column'}}>
              <Text style={styles.fb}>{tweetInfo[1]}</Text>
              <Text style={styles.c8}>@{tweetInfo[3]}</Text>
          </View>
        </View>

        <View style={{flexDirection:'row'}}>
          <View style={{flex:1, flexBasis:'auto'}}>
            <Text style={styles.tweetText}>
              {Mention(tweetInfo[5], navigation)}
            </Text>

            {tweetInfo[6]['type']&& 
              <View style={styles.mediaPreview}>
                {tweetInfo[6]['type'] == 'video' ? (
                  <Video
                    style={{width:"auto", height: 200, borderRadius:10}} 
                    source={{ uri: 'https://s3.amazonaws.com/fella-storage.com/Tweets/' + tweetInfo[6]['uri']}} 
                    useNativeControls
                    resizeMode="contain"
                  />
                ) : (
                  <Image 
                    alt={tweetInfo[6]['uri'] }
                    resizeMode='cover' 
                    style={{width:"auto", height: 200, borderRadius:10}} 
                    source={{ uri: 'https://s3.amazonaws.com/fella-storage.com/Tweets/' + tweetInfo[6]['uri']}} 
                    />
                )}
              </View>}

            <View style={[{flexDirection:'row', columnGap:10, paddingVertical:5}, styles.boe]}>
                <View>
                    <Text>{tweetInfo[8]} <Text style={styles.c8}>Likes</Text></Text>
                </View>
                <View>
                  <Text>{tweetInfo[9]} <Text style={styles.c8}>Comments</Text></Text>
                </View>
                <View>
                  <Text style={styles.c8}>{tweetInfo[10]} ago</Text>
                </View>
            </View>
            

            <View style={[styles.actionsContainer, styles.boe, {paddingVertical:10}]}>
              <HandleLike tweet_id={tweetInfo[0]} isLiked={tweetInfo[7]} likes={tweetInfo[8]} />
              <TouchableOpacity onPress={() => handleComment()} style={styles.actionButton}>
                <FontAwesome name="comment-o" size={14} color="#808080" />
              </TouchableOpacity>
            </View>

          </View>
        </View>

        {CommentList&&CommentList.map((v,k)=>(
          <View key={k} style={[{paddingVertical:10}, styles.boe]}>
              <View style={{flexDirection:'row'}}>
                <View style={{flexBasis:50}}>
                  <Image 
                    style={{height:40, width:40, alignContent:'center'}}
                    borderRadius={20}
                    alt="prof_pic"
                    source={{
                      uri: v[4]&&("https://s3.amazonaws.com/fella-storage.com/Users/profile/"+v[4])  || 'https://assets.wfcdn.com/im/62631921/compr-r85/2137/213721793/cute-shiba-inu-dog-paws-up-over-wall-dog-face-cartoon-vector-illustration-on-canvas-by-chayapoll-tummakorn-print.jpg'
                    }}
                  />
                </View>
                <View style={{flex:1, flexBasis:'auto'}}>
                  <View style={{flexDirection:'row', columnGap:5}}>
                    <View>
                      <Text style={styles.fb}>{v[2]}</Text>
                    </View>
                    <View>
                      <Text style={styles.c8}>@{`${v[3]}`}</Text>
                    </View>
                    
                  </View>
                  
                  <Text style={styles.tweetText}>
                    {Mention(v[1], navigation)}
                  </Text>

                  {v[8]['type'] && 
                    <View style={styles.mediaPreview}>
                        {v[8]['type']== 'video' ? (
                            <Video
                                style={styles.media} 
                                source={{ uri: 'https://s3.amazonaws.com/fella-storage.com/Comments/' + v[8]['uri']}} 
                                useNativeControls
                            />
                        ) : (
                            <Image 
                                alt={v[8]['uri']}
                                style={styles.media} 
                                source={{ uri:'https://s3.amazonaws.com/fella-storage.com/Comments/' + v[8]['uri']}} 
                            />
                        )}
                    </View>}

                  <View>
                    <View style={{ flexDirection: 'row', alignItems:'center', columnGap:10, paddingTop:10}}>
                      <CommmentLike isLiked={v[7]} likes={v[5]} tweet_id={tweetInfo[0]} comment_id={v[0]} user_id={Auth.id} />
                    </View>
                  </View>

                </View>
              </View>
            </View>
          ))}
        
      </Box>
    </ScrollView>
}