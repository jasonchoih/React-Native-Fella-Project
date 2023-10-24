import { useState, useEffect } from 'react';
import { View, TouchableWithoutFeedback, RefreshControl, ActivityIndicator } from 'react-native';
import { Center, Image, Text, Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
// import * as Sharing from 'expo-sharing';
import { Video } from 'expo-av';
import { SEND } from 'store';
import { toNow } from 'utils/tool';
//
import { FlashList } from "@shopify/flash-list";
//
import styles from 'config/styles';
// 
import Empty from 'components/Empty';
// 
import HandleLike from 'components/Feed/tweetLike';
import HandleComment from 'components/Feed/tweetComment';
import { Mention } from 'components/Tool/Mention';
// 
export default props =>
{
    const { userData, userInfo, onProfileTab, user_id, isUserDataLazyFinal, Auth, userPage } = props;
    const DATA = useSelector((state) => state.models);
    const { isRefreshingUser, isUserLazyButtonLoading } = DATA&&DATA;
    const pageSize = 50;
    // 
    const navigation = useNavigation();
    const dispatch = useDispatch();
    // 
    const handleComment = (tweetInfo) => navigation.navigate('feedInfo', tweetInfo)
    // 
    const getUserInfo = (user_id) => {
        if(userInfo.user_id==user_id) return;
        navigation.push('user', {user_id, headerLeft:'Back'});
    }
    // 
    const UserPosts = ({item}) =>
    {
        return <View key={item.tweet_id} style={styles.tweetContainer}>
            <View style={{flexDirection:'row', columnGap:10}}>
                <View style={{flexBasis:40}}>
                    <Center>
                        <TouchableWithoutFeedback onPress={()=>getUserInfo(item.user_id)}>
                            <Image 
                                size="xs"
                                borderRadius={150}
                                alt={item.profile_image || 'Profile Picture'}
                                source={{
                                    uri: item.profile_image&&"https://s3.amazonaws.com/fella-storage.com/Users/profile/"+item.profile_image  || 'https://assets.wfcdn.com/im/62631921/compr-r85/2137/213721793/cute-shiba-inu-dog-paws-up-over-wall-dog-face-cartoon-vector-illustration-on-canvas-by-chayapoll-tummakorn-print.jpg'
                                }}
                            />
                        </TouchableWithoutFeedback>
                    </Center>
                </View>

                <View style={{flex:1, flexBasis:'auto'}}>

                    <View style={{flexDirection:'row', columnGap:5}}>
                        <TouchableWithoutFeedback onPress={()=>{navigation.navigate('users', { screen: 'userInfo', params: {user_id: item.user_id} })}}>
                            <Text style={styles.fb}>{item.nick}</Text>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={()=>{navigation.navigate('users', { screen: 'userInfo', params: {user_id: item.user_id} })}}>
                            <Text style={styles.c8}>@{`${item.tag} ${toNow(item.created)} ago`}</Text>
                        </TouchableWithoutFeedback>
                    </View>
                    <TouchableWithoutFeedback onPress={()=>handleComment({tweetInfo:item})}>
                        <Text numberOfLines={5}>
                            {Mention(item.content, navigation)}
                        </Text>
                    </TouchableWithoutFeedback>

                    {item.media['type'] && 
                        <View style={styles.mediaPreview}>
                            {item.media['type']== 'video' ? (
                                <Video
                                    style={styles.media} 
                                    source={{ uri: 'https://s3.amazonaws.com/fella-storage.com/Tweets/' + item.media['uri']}} 
                                    useNativeControls
                                />
                            ) : (
                                <TouchableWithoutFeedback onPress={()=> handleComment({tweetInfo:item})}>
                                    <Image 
                                        alt={item.media['uri']}
                                        style={styles.media} 
                                        source={{ uri:'https://s3.amazonaws.com/fella-storage.com/Tweets/' + item.media['uri']}} 
                                    /> 
                                </TouchableWithoutFeedback>
                            )}
                        </View>
                    }

                    <View style={{flexDirection: 'row', alignItems:'center', columnGap:10, paddingTop:10}}>
                        <HandleLike tweet_id={item.tweet_id} isLiked={item.isLiked} likes={item.likes} />
                        <HandleComment comments={item.comments} tweetInfo={{tweetInfo:item}} />
                    </View>

                </View>
            </View>
        </View>
    }
    useEffect(()=>{
        if(!isUserDataLazyFinal) return;
        switch(onProfileTab){
            case 'posts':
              dispatch.models.SET({ 
                User_posts_page: 1
              });
              break;
            case 'replies':
              dispatch.models.SET({ 
                User_replies_page: 1
              });
              break;
            case 'media':
              dispatch.models.SET({ 
                User_media_page: 1
              });
              break;
            case 'likes':
              dispatch.models.SET({ 
                User_likes_page: 1
              });
              break;
        }
    },[isUserDataLazyFinal])
    // 
    const Footer = () =>
    {
        if(isUserDataLazyFinal) return <Center>
            <Text>No more data</Text>
        </Center>
        if(isUserLazyButtonLoading) return <Center py={3}>
            <ActivityIndicator size="large" />
        </Center>
    }
    // 
    const onEndReached = () =>
    {
        if(!userData || userData&&userData.length < 49) return;
        // 
        if(isUserLazyButtonLoading) return;
        SEND(`user/${onProfileTab}`, {user_id, following_id:Auth, offset:(userPage||1)*pageSize});
        // setPage(page+1)
        switch(onProfileTab){
            case 'posts':
              dispatch.models.SET({ 
                User_posts_page: (userPage||1)+1,
                isUserLazyButtonLoading:true
              });
              break;
            case 'replies':
              dispatch.models.SET({ 
                User_replies_page:(userPage||1)+1,
                isUserLazyButtonLoading:true
              });
              break;
            case 'media':
              dispatch.models.SET({ 
                User_media_page: (userPage||1)+1,
                isUserLazyButtonLoading:true
              });
              break;
            case 'likes':
              dispatch.models.SET({ 
                User_likes_page: (userPage||1)+1,
                isUserLazyButtonLoading:true
              });
              break;
        }
    }
    // 
    const onRefresh = () => {
        dispatch.models.SET({
          isRefreshingUser: true
        })
        SEND(`user/${onProfileTab}`, {user_id, following_id:Auth.id});
      };
    // 
    const keyExtractor = item => item.tweet_id;
    // 
    return <FlashList
        data={userData}
        keyExtractor={keyExtractor}
        extraData={keyExtractor}
        renderItem={UserPosts}    
        ListFooterComponent={Footer}
        ListEmptyComponent={<Empty data={userData} />} 
        // 
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        removeClippedSubviews={true}
        estimatedItemSize={200}
        // 
        refreshControl={<RefreshControl refreshing={isRefreshingUser || false} onRefresh={onRefresh} />}
        // 
        onEndReached={onEndReached}
    />
}