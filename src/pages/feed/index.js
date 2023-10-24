import { useEffect, useState, useCallback } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Text } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { SEND } from 'store';
// 
import Main from 'components/Feed/main';
// 
import styles from 'config/styles';
// 
export default ({navigation}) =>
{
  const DATA = useSelector((state) => state.models);
  const { Feed_you, Feed, FeedComment, FeedLike, Feed_following, Feed_you_lazy, Feed_following_lazy } = DATA&&DATA;
  const Auth = useSelector((state) => state.auths);
  // 
  const [ onFeedTab, setFeedTab ] = useState('you');
  const feedData = DATA&&DATA['Feed_'+onFeedTab];
  //
  const dispatch = useDispatch();
  // 
  useEffect(()=>{
      if(feedData) return;
      SEND(`tweet/${onFeedTab}`, {});
  },[onFeedTab])
  //
  useFocusEffect(
    useCallback(() => {
      if(feedData) return; 
      dispatch.models.SET({
        CommentList:'',
        userInfo:'',
        User_posts:'',
        User_replies:'',
        User_media:'',
        User_likes:'',
        commentPage:1
      })
    }, [])
  );
  // 
  useEffect(()=>{
    if(!Feed_you) return;
    if(FeedComment)
    {
      const index = Feed_you.findIndex(x => x.tweet_id == FeedComment.tweet_id);
      let newFeed = Feed_you;
      let newFollowingFeed;
      newFeed[index].comments = FeedComment.comments;
      // 
      if(Feed_following){
        const index = Feed_following.findIndex(x => x.tweet_id == FeedComment.tweet_id);
        if(index==-1) return;
        newFollowingFeed = Feed_following;
        newFollowingFeed[index].comments = FeedComment.comments;
      }
      // 
      dispatch.models.SET({ 
          Feed_you: newFeed,
          Feed_following: newFollowingFeed || Feed_following,
          FeedComment:'',
      });
      return;
    }
  },[FeedComment]);
    // 
  useEffect(()=>{
    if(!Feed_you) return;
    if(FeedLike){
      const index = Feed_you.findIndex(x => x.tweet_id == FeedLike.tweet_id);
      if(index==-1) return;
      let newFeed = Feed_you;
      let newFollowingFeed;
      newFeed[index].likes = FeedLike.likes;
      if(FeedLike.isLiked_user_id == Auth.id) newFeed[index].active = FeedLike.active;
      // 
      if(Feed_following){
        const index = Feed_following.findIndex(x => x.tweet_id == FeedLike.tweet_id);
        if(index==-1) return;
        newFollowingFeed= Feed_following;
        newFollowingFeed[index].likes = FeedLike.likes;
        if(FeedLike.isLiked_user_id == Auth.id) newFollowingFeed[index].active = FeedLike.active;
      }
      // 
      dispatch.models.SET({ 
        Feed_you: newFeed,
        Feed_following: newFollowingFeed || Feed_following,
        FeedLike:'',
      });
      return;
    }
  },[FeedLike]);
    // 
  useEffect(() => {
    if(!Feed) return;
    if(Feed_you)
    {
      dispatch.models.SET({ 
        Feed_you: [ Feed, ...Feed_you],
        Feed:'',
      });
      return;
    }
    dispatch.models.SET({ 
      Feed_you: Feed, 
      Feed: '',
    });
  }, [Feed]);
  // 
  useEffect(() => {
    if(!Feed_you_lazy) return;
    if(Feed_you)
    {
      dispatch.models.SET({ 
        Feed_you: [ ...Feed_you, ...Feed_you_lazy ],
        Feed_you_lazy:''
      });
    }
  }, [Feed_you_lazy]);
  // 
  useEffect(() => {
    if(!Feed_following_lazy) return;
    if(Feed_following)
    {
      dispatch.models.SET({ 
        Feed_following: [ ...Feed_following, ...Feed_following_lazy ],
        Feed_following_lazy:''
      });
    }
  }, [Feed_following_lazy]);
  // 
  return <>
    <TouchableWithoutFeedback 
      onPress={()=>{
        navigation.navigate('feedAdd');
        dispatch.models.SET({media:{loaded:1}})
    }}>
      <View style={styles.addBtn}>
        <Text style={styles.addTxt}>+</Text>
      </View>
    </TouchableWithoutFeedback>
    <View style={[{flexDirection:'row', justifyContent:'space-evenly'}, styles.tweetContainer]}>
      {['you', 'following'].map((v,k) => (
        <TouchableWithoutFeedback key={k} onPress={()=>setFeedTab(v)}>
            <View style={onFeedTab==v ? {borderBottomWidth:1, borderColor:'#007acc'}: {}}>
                <Text style={{textTransform: 'capitalize'}}>{v=='you' ? 'For You' : v}</Text>
            </View>
        </TouchableWithoutFeedback>
      ))} 
    </View>
    <Main feedData={feedData} onFeedTab={onFeedTab} />
  </>
}