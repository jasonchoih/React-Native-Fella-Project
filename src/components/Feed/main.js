import { useState, useRef } from 'react';
import { View, TouchableWithoutFeedback, ActivityIndicator, RefreshControl } from 'react-native';
import { Center, Image, Text, useToast } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
// import * as Sharing from 'expo-sharing';
import { Video } from 'expo-av';
import { SEND } from 'store';
import { FlashList } from "@shopify/flash-list";
import { toNow } from 'utils/tool';
//
import Empty from 'components/Empty';
// 
import styles from 'config/styles';
// 
import HandleLike from 'components/Feed/tweetLike';
import HandleComment from 'components/Feed/tweetComment';
import { Mention } from 'components/Tool/Mention';
// 
export default props =>
{
    const { feedData, onFeedTab } = props;
    const { isRefreshingFeed, isLazyLoading, isFinal } = useSelector((state) => state.models);
    const Auth = useSelector((state) => state.auths);
    const flatListRef = useRef();
    // 
    const [ page, setPage ] = useState(2);
    // 
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const toast = useToast();
    // 
    const handleComment = (tweetInfo) => navigation.navigate('feedInfo', tweetInfo);
    // 
    const getUserInfo = (user_id) => navigation.navigate('userInfo', { user_id });
    // 
    // const handleShare = async (tweet) => {
    //     if (tweet.media) {
    //       try {
    //         const sharingOptions = {
    //           message: tweet.text,
    //           url: tweet.media,
    //         };
    //         await Sharing.shareAsync(sharingOptions);
    //       } catch (error) {
    //         console.error('Error sharing:', error);
    //       }
    //     } else {
    //       alert('Cannot share this tweet without media.');
    //     }
    // };
    // // 
    // 
    const Footer = () =>
    {
        if(page>5 || isFinal) return <Center>
            <Text>You reached the end bro</Text>
        </Center>
        if(!feedData || feedData&&feedData.length < 9) return;
        return <Center py={3}>
            <ActivityIndicator size="large" />
        </Center>
    }
    // 
    const onEndReached = () =>{
        if(!feedData || feedData&&feedData.length < 10 || isLazyLoading) return;
        if(page<5) dispatch.models.SET({isLazyLoading:true});
        setPage(page+1);
        SEND(`tweet/${onFeedTab}_lazy`, {page:page});
        // 
        if (page > 2&&!toast.isActive('toast')) {
            toast.show({
              id:'toast',
              placement: "top",
              duration:null,
              onCloseComplete: ()=>{
                setPage(2);
                SEND(`tweet/${onFeedTab}`, {});
              },
              render: () => {
                return <Center pt={90}>
                    <TouchableWithoutFeedback 
                        size='sm'
                        onPress={()=>{
                            flatListRef.current.scrollToOffset({ offset: 0, animated: true })
                            toast.close('toast');
                        }} 
                    >
                        <Text>New Posts</Text>
                    </TouchableWithoutFeedback>
                </Center>
              }
            })
        };
    }
    // 
    const onRefresh = () => {
        dispatch.models.SET({
            isRefreshingFeed: true
        });
        setPage(2);
        SEND(`tweet/${onFeedTab}`, {});
    };
    // 
    const Tweet = ({item}) =>
    {
        return <View key={item.tweet_id} style={styles.tweetContainer}>
            <TouchableWithoutFeedback>
                <View style={{flexDirection:'row', columnGap:10}}>
                    <View style={{flexBasis:40}}>
                        <Center>
                            <TouchableWithoutFeedback onPress={()=>getUserInfo(item.user_id)}>
                                <Image 
                                    size="xs"
                                    borderRadius={150}
                                    alt={item[4] || 'Profile Picture'}
                                    fadeDuration={0}
                                    source={{
                                        uri: (item.image_profile&&"https://s3.amazonaws.com/fella-storage.com/Users/profile/"+item.image_profile)  || 'https://assets.wfcdn.com/im/62631921/compr-r85/2137/213721793/cute-shiba-inu-dog-paws-up-over-wall-dog-face-cartoon-vector-illustration-on-canvas-by-chayapoll-tummakorn-print.jpg'
                                    }}
                                />
                            </TouchableWithoutFeedback>
                        </Center>
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
                                        resizeMode="contain"
                                        // isMuted={true}
                                        shouldPlay
                                        source={{ uri: 'https://s3.amazonaws.com/fella-storage.com/Tweets/' + item.media['uri']}} 
                                        useNativeControls
                                    />
                                ) : (
                                    <TouchableWithoutFeedback onPress={()=> handleComment({tweetInfo:v})}>
                                        <Image 
                                            alt={item.media['uri']}
                                            fadeDuration={0}
                                            style={styles.media} 
                                            source={{ uri:'https://s3.amazonaws.com/fella-storage.com/Tweets/' + item.media['uri']}} 
                                        /> 
                                    </TouchableWithoutFeedback>
                                )}
                            </View>
                        }

                        <View style={{flexDirection: 'row', alignItems:'center', columnGap:10, paddingTop:10}}>
                            <HandleLike tweet_id={item.tweet_id} isLiked={item.active} likes={item.likes} />
                            <HandleComment comments={item.comments} tweetInfo={{tweetInfo:item}} />
                        </View>

                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    }
    // 
    // const Empty = () =>
    // {
    //     if(!feedData) return <Center pt={2}><ActivityIndicator size="large" /></Center>
    //     return <Center height="275">
    //         <Image 
    //             alt="Empty"
    //             size={200}
    //             resizeMode='center'
    //             source={(require('../../../assets/empty/no_data.png'))}
    //         />
    //     <Text fontSize='md' bold>No Data Found</Text>
    // </Center>
    // }
    //
    const keyExtractor = item => item.tweet_id;
    // 
    return <FlashList
        data={feedData}
        keyExtractor={keyExtractor}
        renderItem={Tweet}    
        extraData={keyExtractor}
        ListFooterComponent={Footer}
        ListEmptyComponent={<Empty data={feedData} />} 
        refreshControl={<RefreshControl refreshing={isRefreshingFeed || false} onRefresh={onRefresh} />}
        // 
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        removeClippedSubviews={true}
        estimatedItemSize={200}
        // 
        onEndReached={onEndReached}
        ref={flatListRef}
    />
}