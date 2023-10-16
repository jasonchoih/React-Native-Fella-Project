import { useEffect, useCallback } from 'react';
import { View, Text, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { SEND } from 'store';
import { findArrIndex } from 'utils/tool';
// 
import ForYou from 'components/Feed/forYou';
import Following from 'components/Feed/following';
// 
import styles from 'config/styles';
// 
export default () =>
{
  const { FeedList, Feed, FeedComment, FeedLike, FollowList, onFeed } = useSelector((state) => state.models);
  // 
  const dispatch = useDispatch();
  const navigation =  useNavigation();
  // 
  useEffect(()=>{
    SEND('tweet/list',{});
    dispatch.models.SET({onFeed:'You'})
  },[]);
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
    if(!FeedList) return;
    if(FeedComment)
    {
      const index = findArrIndex(FeedList, FeedComment[0]);
      let newFeed = FeedList;
      let newFollowingFeed;
      newFeed[index][9] = FeedComment[1];
      // 
      if(FollowList){
        const index = findArrIndex(FollowList, FeedComment[0]);
        if(!index) return;
        newFollowingFeed = FollowList;
        newFollowingFeed[index][9] = FeedComment[1];
      }
      // 
      dispatch.models.SET({ 
          FeedList: newFeed,
          FollowList: newFollowingFeed || FollowList,
          FeedComment:'',
      });
      return;
    }
  },[FeedComment]);
    // 
  useEffect(()=>{
    if(!FeedList) return;
    if(FeedLike){
      const index = findArrIndex(FeedList, FeedLike[0]);
      let newFeed = FeedList;
      let newFollowingFeed;
      newFeed[index][8] = FeedLike[1];
      newFeed[index][7] = FeedLike[2];
      // 
      if(FollowList){
        const index = findArrIndex(FollowList, FeedLike[0]);
        if(!index) return;
        newFollowingFeed= FollowList;
        newFollowingFeed[index][8] = FeedLike[1];
        newFollowingFeed[index][7] = FeedLike[2];
      }
      // 
      dispatch.models.SET({ 
        FeedList: newFeed,
        FollowList: newFollowingFeed || FollowList,
        FeedLike:'',
      });
      return;
    }
  },[FeedLike]);
    // 
  useEffect(() => {
    if(!Feed) return;
    if(FeedList)
    {
      dispatch.models.SET({ 
        FeedList: [ Feed, ...FeedList],
        Feed:'',
      });
      return;
    }
    dispatch.models.SET({ 
      FeedList: Feed, 
      Feed: '',
    });
  }, [Feed]);
  // 
  return <SafeAreaView style={{flex:1}}>
    <TouchableWithoutFeedback onPress={()=>{
      navigation.navigate('feedAdd');
      dispatch.models.SET({media:{loaded:1}})
    }}>
      <View style={styles.addBtn}>
        <Text style={styles.addTxt}>+</Text>
      </View>
    </TouchableWithoutFeedback>
    {onFeed=='You' ? <ForYou /> : <Following />}
  </SafeAreaView>
}