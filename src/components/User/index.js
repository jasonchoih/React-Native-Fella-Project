import { useEffect, useCallback } from 'react';
import { View, RefreshControl } from 'react-native';
import { Image, ScrollView, Text } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SEND } from 'store';
//
import MyTabs from './tabs';
import Upload from 'components/Upload';
// 
import EmptyComponent from 'components/Tool/Empty';
import ActionButton from './followBtn';
import styles from './style';
// 
export default ({route}) => 
{
  const { isRefreshingUser, userInfo, userFollowReload, media } = useSelector((state) => state.models);
  const Auth = useSelector((state) => state.auths);
  const user_id = route.params&&route.params.user_id || Auth.id;
  // 
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // 
  useFocusEffect(
    useCallback(() => {
      dispatch.models.SET({
        onTab: 'Posts'
      })
      SEND('user/list',{ user_id, following_id:Auth.id});
    }, [])
  );
  // 
  const onRefresh = () => {
    dispatch.models.SET({
      isRefreshingUser: true
    })
    SEND('user/list',{ user_id, following_id:Auth.id});
  };
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
  return <ScrollView
    refreshControl={<RefreshControl refreshing={isRefreshingUser || false} onRefresh={onRefresh} />}
  >
    <View style={{position:'relative', zIndex:10}}>
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
      <Text style={styles.tag}>@{userInfo&&userInfo.tag || 'tag'}</Text>
      <Text style={styles.bio}>{userInfo&&userInfo.bio || 'No bio set'}</Text>
      <Text style={styles.bio}>{userInfo&&userInfo.website || 'No website set'}</Text>
      <Text style={styles.tag}>Joined {userInfo&&userInfo.joined}</Text>
      <View style={{flexDirection:'row', columnGap:10}}>
        <Text>{userInfo&&userInfo.following} <Text style={styles.tag}>Following</Text></Text>
        <Text>{userInfo&&userInfo.followers} <Text style={styles.tag}>Followers</Text></Text>
      </View>
    </View>
    <MyTabs />
  </ScrollView>
}