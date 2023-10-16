import { useEffect, useCallback } from 'react';
import { View, Text, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { SEND } from 'store';
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
      const index = FeedList.findIndex(obj => {
          return obj.id === FeedComment.id;
      });
      let newFeed = FeedList;
      let newFollowingFeed;
      newFeed[index].comments = FeedComment.comments;
      // 
      if(FollowList){
        const index = FollowList.findIndex(obj => {
          return obj.id === FeedComment.id;
        });
        newFollowingFeed = FollowList;
        newFollowingFeed[index].comments = FeedComment.comments;
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
    if(FeedLike)
    {
      const index = FeedList.findIndex(obj => {
        return obj.id === FeedLike.id;
      });
      let newFeed = FeedList;
      let newFollowingFeed;
      newFeed[index].likes = FeedLike.likes;
      newFeed[index].isLiked = FeedLike.isLiked;
      // 
      if(FollowList){
        const index = FollowList.findIndex(obj => {
          return obj.id === FeedLike.id;
        });
        newFollowingFeed= FollowList;
        newFollowingFeed[index].likes = FeedLike.likes;
        newFollowingFeed[index].isLiked = FeedLike.isLiked;
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