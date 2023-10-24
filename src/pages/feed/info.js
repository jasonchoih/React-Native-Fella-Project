import { useEffect } from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { FlashList } from "@shopify/flash-list";
import { Image, Text, Center } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { Video } from 'expo-av';
import { useSelector, useDispatch } from 'react-redux';
import { SEND } from 'store';
import { toNow } from 'utils/tool';
// 
import HandleLike from 'components/Feed/tweetLike';
import CommmentLike from 'components/Feed/commentLike';
import { Mention } from 'components/Tool/Mention';
import Empty from 'components/Empty';
// 
import styles from 'config/styles';
// 
export default ({route}) =>
{
  if (!route.params.tweetInfo) return <></>;
  const { tweetInfo } = route.params;
  //
  const { CommentList, Comment, CommentLike, isCommentLazyButtonLoading, comments_lazy_final, commentPage, comments_lazy } = useSelector((state) => state.models);
  const Auth = useSelector((state) => state.auths);
  const pageSize = 50;
  // 
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // 
  const getUserInfo = (user_id) => navigation.navigate('userInfo', { user_id });
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
  useEffect(() => {
    if(!comments_lazy) return;
    if(CommentList)
    {
      dispatch.models.SET({ 
        CommentList: [ ...CommentList, ...comments_lazy ],
        comments_lazy:'',
      });
    }
  }, [comments_lazy]);
  // 
  const handleComment = () => navigation.navigate('feedComment', tweetInfo);
  // 
  const Info = ({item}) =>
  {
    return <View key={item.comment_id} style={[styles.boe, styles.p10]}>
      <View style={{flexDirection:'row'}}>
        <View style={{flexBasis:50}}>
          <TouchableWithoutFeedback onPress={()=>getUserInfo(item.user_id)}>
            <Image 
              style={{height:40, width:40, alignContent:'center'}}
              borderRadius={20}
              alt={item.image_profile || 'Profile Picture'}
              source={{
                uri: item.image_profile&&("https://s3.amazonaws.com/fella-storage.com/Users/profile/"+item.image_profile)  || 'https://assets.wfcdn.com/im/62631921/compr-r85/2137/213721793/cute-shiba-inu-dog-paws-up-over-wall-dog-face-cartoon-vector-illustration-on-canvas-by-chayapoll-tummakorn-print.jpg'
              }}
            />
            </TouchableWithoutFeedback>
          </View>
          <View style={{flex:1, flexBasis:'auto'}}>
            <View style={{flexDirection:'row', columnGap:5}}>
              <TouchableWithoutFeedback onPress={()=>getUserInfo(item.user_id)}>
                  <Text style={styles.fb}>{item.nick}</Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={()=>getUserInfo(item.user_id)}>
                  <Text style={styles.c8}>@{`${item.tag} ${toNow(item.created)} ago`}</Text>
              </TouchableWithoutFeedback>
            </View>
            
            <Text style={styles.tweetText}>
              {Mention(item.content, navigation)}
            </Text>

            {item.media['type'] && 
              <View style={styles.mediaPreview}>
                  {item.media['type']== 'video' ? (
                      <Video
                          style={styles.media} 
                          source={{ uri: 'https://s3.amazonaws.com/fella-storage.com/Comments/' + item.media['uri']}} 
                          useNativeControls
                      />
                  ) : (
                      <Image 
                          alt={item.media['uri']}
                          style={styles.media} 
                          source={{ uri:'https://s3.amazonaws.com/fella-storage.com/Comments/' + item.media['uri']}} 
                      />
                  )}
              </View>}

          <View>
            <View style={{ flexDirection: 'row', alignItems:'center', columnGap:10, paddingTop:10}}>
              <CommmentLike isLiked={item.isLiked} likes={item.likes} tweet_id={tweetInfo.tweet_id} comment_id={item.comment_id} />
            </View>
          </View>

        </View>
      </View>
    </View>
    }
    // 
    const Footer = () =>
    {
        if(comments_lazy_final) return <Center>
            <Text>You reached the end</Text>
        </Center>
        if(isCommentLazyButtonLoading) return <Center py={3}>
            <ActivityIndicator size="large" />
        </Center>
    }
    // 
    const onEndReached = () =>
    {
        if(!CommentList || CommentList&&CommentList.length < 49) return;
        // 
        if(isCommentLazyButtonLoading) return;
        SEND('comment/list',{tweet_id: tweetInfo.tweet_id, offset:(commentPage||1)*pageSize});
        dispatch.models.SET({ 
          commentPage: (commentPage||1)+1,
          isCommentLazyButtonLoading:true
        });
    }
    //
    const keyExtractor = item => item.comment_id;
    // 
    return <>
      <View style={[{flexDirection:'row', columnGap:5}, styles.infoContainer]}>
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

          <Text style={[styles.tweetText, styles.ph10]}>{Mention(tweetInfo.content, navigation)}</Text>

          {tweetInfo.media['type']&& 
            <View style={[styles.mediaPreview, styles.ph10]}>
              {tweetInfo.media['type'] == 'video' ? (
                <Video
                style={styles.media} 
                  source={{ uri: 'https://s3.amazonaws.com/fella-storage.com/Tweets/' + tweetInfo.media['uri']}} 
                  useNativeControls
                  resizeMode="contain"
                />
              ) : (
                <Image 
                  alt={tweetInfo.media['uri'] }
                  style={styles.media} 
                  source={{ uri: 'https://s3.amazonaws.com/fella-storage.com/Tweets/' + tweetInfo.media['uri']}} 
                  />
              )}
            </View>}

          <View style={[{flexDirection:'row', columnGap:10, paddingVertical:5}, styles.ph10, styles.boe]}>
            <View><Text>{tweetInfo.likes} <Text style={styles.c8}>Likes</Text></Text></View>
            <View><Text>{tweetInfo.comments} <Text style={styles.c8}>Comments</Text></Text></View>
            <View><Text style={styles.c8}>{toNow(tweetInfo.created)} ago</Text></View>
          </View>

          <View style={[styles.actionsContainer, styles.boe, styles.pv10]}>
            <HandleLike tweet_id={tweetInfo.tweet_id} isLiked={tweetInfo.active} likes={tweetInfo.likes} />
            <TouchableOpacity onPress={() => handleComment()} style={styles.actionButton}>
              <FontAwesome name="comment-o" size={16} color="#808080" />
            </TouchableOpacity>
          </View>

        </View>

      

    </View>
      
    <FlashList
      data={CommentList&&CommentList}
      keyExtractor={keyExtractor}
      renderItem={Info}    
      extraData={keyExtractor}
      ListFooterComponent={Footer}
      ListEmptyComponent={<Empty data={CommentList&&CommentList} />} 
      // refreshControl={<RefreshControl refreshing={isRefreshingFeed || false} onRefresh={onRefresh} />}
      // 
      initialNumToRender={10}
      maxToRenderPerBatch={50}
      windowSize={10}
      removeClippedSubviews={true}
      estimatedItemSize={1000}
      // 
      onEndReached={onEndReached}
    />

  </>
}