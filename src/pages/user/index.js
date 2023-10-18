import { useEffect, useState, useCallback } from 'react';
import { View, RefreshControl, TouchableWithoutFeedback, Linking } from 'react-native';
import { Image, ScrollView, Text } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { SEND } from 'store';
//
import Main from 'components/User/main';
import ActionButton from 'components/User/followBtn';
import styles from 'config/styles';
// 
export default ({route}) => 
{
  const { userInfo, isRefreshingUser, userFollowReload, User_replies } = useSelector((state) => state.models);
  const Auth = useSelector((state) => state.auths);
  const [ onProfileTab, setTab ] = useState('posts');
  // 
  const user_id = route.params&&route.params.user_id || Auth.id;
  // 
  const dispatch = useDispatch();
  // 
  useFocusEffect(
    useCallback(() => {
      if(user_id==Auth.id){
        dispatch.models.SET({
          userInfo: {...Auth}
        })
        return;
      }
      SEND('user/user_info', {user_id, following_id:Auth.id});
    }, [Auth])
  );
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
  const onRefresh = () => {
    dispatch.models.SET({
      isRefreshingUser: true
    })
    SEND(`user/${onProfileTab}`, {user_id, following_id:Auth.id});
  };
  // 
  return <ScrollView refreshControl={<RefreshControl refreshing={isRefreshingUser || false} onRefresh={onRefresh} />}>
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
      <Text style={[styles.mini, {color:'blue'}]} onPress={() => Linking.openURL(userInfo&&userInfo.website )}>{userInfo&&userInfo.website || 'No website set'}</Text>
      <Text style={styles.mini}>Joined {userInfo&&userInfo.joined}</Text>
      <View style={{flexDirection:'row', columnGap:10}}>
        <Text>{userInfo&&userInfo.following} <Text style={styles.tag}>Following</Text></Text>
        <Text>{userInfo&&userInfo.followers} <Text style={styles.tag}>Followers</Text></Text>
      </View>
    </View>

    <View>
        <View style={[{flexDirection:'row', justifyContent:'space-evenly'}, styles.tweetContainer]}>
            {['posts', 'replies', 'media', 'likes'].map((v,k) => (
                <TouchableWithoutFeedback key={k} onPress={()=>setTab(v)}>
                    <View style={onProfileTab==v ? {borderBottomWidth:1, borderColor:'#007acc'}: {}}>
                        <Text style={{textTransform: 'capitalize'}}>{v}</Text>
                    </View>
                </TouchableWithoutFeedback>
            ))} 
        </View>
        <Main onProfileTab={onProfileTab} user_id={user_id} Auth={Auth.id} userInfo={userInfo} />
    </View>

  </ScrollView>
}