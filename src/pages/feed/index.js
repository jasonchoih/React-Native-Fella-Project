import { useEffect, useCallback, useState } from 'react';
import { View, TouchableWithoutFeedback, SafeAreaView, RefreshControl } from 'react-native';
import { Text } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { SEND } from 'store';
import { findArrIndex } from 'utils/tool';
// 
import Main from 'components/Feed/main';
// 
import styles from 'config/styles';
import { ScrollView } from 'native-base';
// 
export default ({navigation}) =>
{
  const { Feed_you, Feed, FeedComment, FeedLike, Feed_following, isRefreshingFeed } = useSelector((state) => state.models);
  const [ onFeedTab, setTab ] = useState('you');
  const [ isEnd, setEnd ] = useState(false);
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
      const index = findArrIndex(Feed_you, FeedComment[0]);
      let newFeed = Feed_you;
      let newFollowingFeed;
      newFeed[index][9] = FeedComment[1];
      // 
      if(Feed_following){
        const index = findArrIndex(Feed_following, FeedComment[0]);
        if(!index) return;
        newFollowingFeed = Feed_following;
        newFollowingFeed[index][9] = FeedComment[1];
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
      const index = findArrIndex(Feed_you, FeedLike[0]);
      let newFeed = Feed_you;
      let newFollowingFeed;
      newFeed[index][8] = FeedLike[1];
      newFeed[index][7] = FeedLike[2];
      // 
      if(Feed_following){
        const index = findArrIndex(Feed_following, FeedLike[0]);
        if(!index) return;
        newFollowingFeed= Feed_following;
        newFollowingFeed[index][8] = FeedLike[1];
        newFollowingFeed[index][7] = FeedLike[2];
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
  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
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
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            // enableSomeButton();
            if(isEnd) return;
            console.log('reached End')
            setEnd(true)
          }
        }}
        scrollEventThrottle={400}
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
      </ScrollView>
    </View>
  </SafeAreaView>
}