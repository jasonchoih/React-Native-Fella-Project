import { useEffect, useCallback, useState } from 'react';
import { View, TouchableWithoutFeedback, SafeAreaView, RefreshControl, ActivityIndicator } from 'react-native';
import { Text, Center } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { SEND } from 'store';
// 
import Main from 'components/Feed/main';
// 
import styles from 'config/styles';
import { ScrollView } from 'native-base';
// 
export default ({navigation}) =>
{
  const { Feed_you, Feed, FeedComment, FeedLike, Feed_following, isRefreshingFeed, isLoading } = useSelector((state) => state.models);
  const Auth = useSelector((state) => state.auths);
  const [ onFeedTab, setTab ] = useState('you');
  const [ page, setPage ] = useState(1);
  const [loading, setLoading] = useState(false);
  // 
  const dispatch = useDispatch();
  // 
  useFocusEffect(
    useCallback(() => {
      dispatch.models.SET({
        CommentList:''
      })
    }, [])
  );
  // 
  useEffect(()=>{
    if(!Feed_you) return;
    if(FeedComment)
    {
      const index = (Feed_you.findIndex(x => x.tweet_id == FeedComment.tweet_id));
      let newFeed = Feed_you;
      let newFollowingFeed;
      newFeed[index].comments = FeedComment.comments;
      // 
      if(Feed_following){
        const index = (Feed_following.findIndex(x => x.tweet_id == FeedComment.tweet_id));
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
      const index = (Feed_you.findIndex(x => x.tweet_id == FeedLike.tweet_id));
      if(index==-1) return;
      let newFeed = Feed_you;
      let newFollowingFeed;
      newFeed[index].likes = FeedLike.likes;
      if(FeedLike.isLiked_user_id == Auth.id) newFeed[index].active = FeedLike.active;
      // 
      if(Feed_following){
        const index = (Feed_following.findIndex(x => x.tweet_id == FeedLike.tweet_id));
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
  const onRefresh = () => {
    dispatch.models.SET({
        isRefreshingFeed: true
    });
    SEND(`tweet/${onFeedTab}`, {});
  };
  // 
  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 10;
    if (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    ) {
      if (!isLoading) {
        dispatch.models.SET({isLoading:true})
        setPage(page+1)
        SEND(`tweet/${onFeedTab}`, {page:page});
      }
    }
  };
  // 
  return <SafeAreaView style={{flex:1}}>
    <TouchableWithoutFeedback 
      onPress={()=>{
        navigation.navigate('feedAdd');
        dispatch.models.SET({media:{loaded:1}})
    }}>
      <View style={styles.addBtn}>
        <Text style={styles.addTxt}>+</Text>
      </View>
    </TouchableWithoutFeedback>
    <View>
      <ScrollView 
        stickyHeaderIndices={[0]}
        refreshControl={<RefreshControl refreshing={isRefreshingFeed || false} onRefresh={onRefresh} />}
        scrollEventThrottle={400}
        onScroll={handleScroll}
      >
        <>
          <View style={[{flexDirection:'row', justifyContent:'space-evenly'}, styles.tweetContainer]}>
            {['you', 'following'].map((v,k) => (
                <TouchableWithoutFeedback key={k} onPress={()=>setTab(v)}>
                    <View style={onFeedTab==v ? {borderBottomWidth:1, borderColor:'#007acc'}: {}}>
                        <Text style={{textTransform: 'capitalize'}}>{v=='you' ? 'For You' : v}</Text>
                    </View>
                </TouchableWithoutFeedback>
            ))} 
          </View>
        </>
        <Main onFeedTab={onFeedTab} />
        {isLoading&&<Center> <ActivityIndicator size="large" /> </Center>}
      </ScrollView>
      
    </View>
   
  </SafeAreaView>
}