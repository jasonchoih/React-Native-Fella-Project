import { useEffect } from 'react';
import { View, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { Box, Center, Image, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
// import * as Sharing from 'expo-sharing';
import { Video } from 'expo-av';
import { SEND } from 'store';
//
import styles from 'config/styles';
// 
import HandleLike from 'components/Feed/tweetLike';
import HandleComment from 'components/Feed/tweetComment';
import { Mention } from 'components/Tool/Mention';
import Empty from 'components/Empty';
// 
export default props =>
{
    const { onFeedTab } = props;
    // 
    const DATA = useSelector((state) => state.models);
    const feedData = DATA&&DATA['Feed_'+onFeedTab];
    // 
    const navigation = useNavigation();
    const dispatch = useDispatch();
    // 
    const handleComment = (tweetInfo) => navigation.navigate('feedInfo', tweetInfo);
    // 
    const getUserInfo = (user_id) => navigation.navigate('userInfo', { user_id })
    // 
    useEffect(()=>{
        if(feedData) return;
        SEND(`tweet/${onFeedTab}`, {});
    },[onFeedTab])
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
    // 
    // 
    if(feedData&&feedData.length === 0) return <Empty />
    // 
    return <View>
        {feedData ? feedData.map((v,k)=>(
            <Box key={v.tweet_id} style={styles.tweetContainer}>
                <TouchableWithoutFeedback>
                    <View style={{flexDirection:'row', columnGap:10}}>
                        <View style={{flexBasis:40}}>
                            <Center>
                                <TouchableWithoutFeedback onPress={()=>getUserInfo(v.user_id)}>
                                    <Image 
                                        size="xs"
                                        borderRadius={150}
                                        alt={v[4] || 'Profile Picture'}
                                        source={{
                                            uri: (v.image_profile&&"https://s3.amazonaws.com/fella-storage.com/Users/profile/"+v.image_profile)  || 'https://assets.wfcdn.com/im/62631921/compr-r85/2137/213721793/cute-shiba-inu-dog-paws-up-over-wall-dog-face-cartoon-vector-illustration-on-canvas-by-chayapoll-tummakorn-print.jpg'
                                        }}
                                    />
                                </TouchableWithoutFeedback>
                            </Center>
                        </View>

                        <View style={{flex:1, flexBasis:'auto'}}>

                            <View style={{flexDirection:'row', columnGap:5}}>
                                <TouchableWithoutFeedback onPress={()=>getUserInfo(v.user_id)}>
                                    <Text style={styles.fb}>{v.nick}</Text>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={()=>getUserInfo(v.user_id)}>
                                    <Text style={styles.c8}>@{`${v.tag} ${v.created} ago`}</Text>
                                </TouchableWithoutFeedback>
                            </View>
                            <TouchableWithoutFeedback onPress={()=>handleComment({tweetInfo:v})}>
                                <Text numberOfLines={5}>
                                    {Mention(v.content, navigation)}
                                </Text>
                            </TouchableWithoutFeedback>

                            {v.media['type'] && 
                                <View style={styles.mediaPreview}>
                                    {v.media['type']== 'video' ? (
                                        <Video
                                            style={styles.media} 
                                            resizeMode="contain"
                                            // isMuted={true}
                                            shouldPlay
                                            source={{ uri: 'https://s3.amazonaws.com/fella-storage.com/Tweets/' + v.media['uri']}} 
                                            useNativeControls
                                        />
                                    ) : (
                                        <TouchableWithoutFeedback onPress={()=> handleComment({tweetInfo:v})}>
                                            <Image 
                                                alt={v.media['uri']}
                                                style={styles.media} 
                                                source={{ uri:'https://s3.amazonaws.com/fella-storage.com/Tweets/' + v.media['uri']}} 
                                            /> 
                                        </TouchableWithoutFeedback>
                                    )}
                                </View>
                            }

                            <View style={{flexDirection: 'row', alignItems:'center', columnGap:10, paddingTop:10}}>
                                <HandleLike tweet_id={v.tweet_id} isLiked={v.active} likes={v.likes} />
                                <HandleComment comments={v.comments} tweetInfo={{tweetInfo:v}} />
                            </View>

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Box>
        )): ( <Center> <ActivityIndicator size="large" /> </Center> )}
    </View>
}