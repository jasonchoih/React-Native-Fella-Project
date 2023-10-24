import { useEffect, useState, useCallback } from 'react';
import { View, RefreshControl, TouchableWithoutFeedback } from 'react-native';
import { Image, Text } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { SEND } from 'store';
//
import Main from 'components/User/main';
// 
import styles from 'config/styles';
import ActionButton from 'components/User/followBtn';
// 
export default ({route}) => 
{
  const DATA = useSelector((state) => state.models);
  const { userInfo, isRefreshingUser, userFollowReload, isUserLoading, FeedLike, FeedComment } = DATA&&DATA;
  const Auth = useSelector((state) => state.auths);

  const [ onProfileTab, setTab ] = useState('posts');
  const userData = DATA&&DATA['User_'+onProfileTab];
  const userDataLazy = DATA&&DATA['User_'+onProfileTab+'_lazy'];
  const isUserDataLazyFinal = DATA&&DATA['User_'+onProfileTab+'_lazy_final'];
  const userPage = DATA&&DATA['User_'+onProfileTab+'_page'];
  // 
  const user_id = (route.params&&route.params.user_id) || Auth.id;
  // 
  const dispatch = useDispatch();
  // 
  useFocusEffect(
    useCallback(() => {
      SEND('user/user_info', {user_id, following_id:Auth.id});
    }, [])
  );
  // 
  useEffect(()=>{
    if(user_id==Auth.id){
        dispatch.models.SET({
          userInfo: {...Auth}
        })
        return;
      }
  },[Auth])
  // 
  useEffect(()=>{
    if(userData) return;
    SEND(`user/${onProfileTab}`, {user_id, following_id:Auth.id});
  },[onProfileTab]);
  // 
  useEffect(()=>{
    if(!userInfo) return;
    if(userFollowReload)
    {
      let newFollow = {
        ...userInfo,
        ...userFollowReload
      };
      // 
      dispatch.models.SET({ 
        userInfo: newFollow,
        userFollowReload:'',
      });
      return;
    }
  },[userFollowReload]);
  // 
  useEffect(()=>{
    if(!userData) return;
    if(FeedLike){
      const index = userData.findIndex(x => x.tweet_id == FeedLike.tweet_id);
      if(index==-1) return;
      let newFeed = userData;
      newFeed[index].likes = FeedLike.likes;
      if(FeedLike.isLiked_user_id == Auth.id) newFeed[index].active = FeedLike.active;
      // 
      switch(onProfileTab){
        case 'posts':
          dispatch.models.SET({ 
            User_posts: newFeed,
            FeedLike:'',
          });
          break;
        case 'replies':
          dispatch.models.SET({ 
            User_replies: newFeed,
            FeedLike:'',
          });
          break;
        case 'media':
          dispatch.models.SET({ 
            User_media: newFeed,
            FeedLike:'',
          });
          break;
        case 'likes':
          dispatch.models.SET({ 
            User_likes: newFeed,
            FeedLike:'',
          });
          break;
      }
      return;
    }
  },[FeedLike]);
  // 
  useEffect(()=>{
    if(!userData) return;
    if(FeedComment)
    {
      const index = userData.findIndex(x => x.tweet_id == FeedComment.tweet_id);
      let newFeed = userData;
      newFeed[index].comments = FeedComment.comments;
      // 
      switch(onProfileTab){
        case 'posts':
          dispatch.models.SET({ 
            User_posts: newFeed,
            FeedComment:'',
          });
          break;
        case 'replies':
          dispatch.models.SET({ 
            User_replies: newFeed,
            FeedComment:'',
          });
          break;
        case 'media':
          dispatch.models.SET({ 
            User_media: newFeed,
            FeedComment:'',
          });
          break;
        case 'likes':
          dispatch.models.SET({ 
            User_likes: newFeed,
            FeedComment:'',
          });
          break;
      }
      // 
      return;
    }
  },[FeedComment]);
  // 
  useEffect(() => {
    if(!userDataLazy) return;
    if(userData)
    {
      switch(onProfileTab){
        case 'posts':
          dispatch.models.SET({ 
            User_posts: [ ...userData, ...userDataLazy ],
            User_posts_lazy:'',
          });
          break;
        case 'replies':
          dispatch.models.SET({ 
            User_replies: [ ...userData, ...userDataLazy ],
            User_replies_lazy:'',
          });
          break;
        case 'media':
          dispatch.models.SET({ 
            User_media: [ ...userData, ...userDataLazy ],
            User_media_lazy:'',
          });
          break;
        case 'likes':
          dispatch.models.SET({ 
            User_likes: [ ...userData, ...userDataLazy ],
            User_likes_lazy:'',
          });
          break;
      }
    }
  }, [userDataLazy]);
  // 
  
  // 
  return <>
    {/* // refreshControl={<RefreshControl refreshing={isRefreshingUser || false} onRefresh={onRefresh} />} */}
    <View style={{zIndex:100}}>
      <Image
          alt={userInfo&&userInfo.profile_image_bg || 'Profile Background'}
          style={{width:"auto", height: 125}} 
          source={{uri: ( userInfo&&userInfo.profile_image_bg&&"https://s3.amazonaws.com/fella-storage.com/Users/background/"+userInfo.profile_image_bg ) || 'https://img.freepik.com/free-vector/three-shiba-inu-characters-scene_603843-3529.jpg?size=626&ext=jpg&ga=GA1.1.1448711260.1696291200&semt=ais'}}
      />
      <Image
          alt={userInfo&&userInfo.profile_image || 'Profile Picture'}
          source={{uri: (userInfo&&userInfo.profile_image&&"https://s3.amazonaws.com/fella-storage.com/Users/profile/"+userInfo.profile_image)  || 'https://assets.wfcdn.com/im/62631921/compr-r85/2137/213721793/cute-shiba-inu-dog-paws-up-over-wall-dog-face-cartoon-vector-illustration-on-canvas-by-chayapoll-tummakorn-print.jpg'}}
          style={styles.avatar}
      />
      <ActionButton user_id={user_id} isFollowed={userInfo&&userInfo.isFollowed} />
  </View>
  
      <View style={styles.userInfo}>
          <Text style={styles.nick}>{userInfo&&userInfo.nick || '-'}</Text>
          <Text style={styles.mini}>@{userInfo&&userInfo.tag || 'tag'}</Text>
          <Text style={styles.bio}>{userInfo&&userInfo.bio || 'No bio set'}</Text>
          <Text style={styles.mini}>{userInfo&&userInfo.website || 'No website set'}</Text>
          <Text style={styles.mini}>Joined {userInfo&&userInfo.joined}</Text>
          <View style={{flexDirection:'row', columnGap:10}}>
          <Text>{userInfo&&userInfo.following} <Text style={styles.tag}>Following</Text></Text>
          <Text>{userInfo&&userInfo.followers} <Text style={styles.tag}>Followers</Text></Text>
      </View>
  </View> 
  
    <View style={[{flexDirection:'row', justifyContent:'space-evenly'}, styles.tweetContainer]}>
        {['posts', 'replies', 'media', 'likes'].map((v,k) => (
            <TouchableWithoutFeedback key={k} onPress={()=>setTab(v)}>
                <View style={onProfileTab==v ? {borderBottomWidth:1, borderColor:'#007acc'}: {}}>
                    <Text style={{textTransform: 'capitalize'}}>{v}</Text>
                </View>
            </TouchableWithoutFeedback>
        ))} 
    </View>

    <Main 
      userData={userData} 
      onProfileTab={onProfileTab} 
      user_id={user_id} 
      Auth={Auth.id} 
      userInfo={userInfo} 
      isUserDataLazyFinal={isUserDataLazyFinal}
      userPage={userPage}
    />  

  </>
}