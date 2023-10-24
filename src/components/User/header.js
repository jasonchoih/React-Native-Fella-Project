import { useEffect, useState, useCallback, useRef } from 'react';
import { View, RefreshControl, TouchableWithoutFeedback, SafeAreaView, Animated, ScrollView } from 'react-native';
import { Image, Text } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { SEND } from 'store';
// 
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from 'config/styles';
// 
import ActionButton from 'components/User/followBtn';
// 
const HEADER_HEIGHT = 260;
// 
export default props =>
{
    const { userInfo, user_id, animatedValue } = props;
    const insets = useSafeAreaInsets();
    // 
    const headerHeight = animatedValue.interpolate({
        // inputRange: [0, HEADER_HEIGHT],
        // outputRange: [0, -200],
        inputRange: [0, HEADER_HEIGHT + insets.top],
        outputRange: [HEADER_HEIGHT + insets.top, insets.top + 44],
        extrapolate: 'clamp'
    });
    // 
    return <Animated.View
        style={{
            width: '100%',
            backgroundColor: 'lightblue',
            // for animation
            // height: headerHeight,
            // height:70,
            // transform: [{translateY: translateY}],
            height:headerHeight,
            // position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            overflow: 'hidden',
            elevation: 4,
            zIndex: 1,
        }}
    >
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

    </Animated.View>
        
}