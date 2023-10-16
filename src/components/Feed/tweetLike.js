import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import styles from 'pages/feed/styles';
import { SEND } from 'store';
// 
export default (d) => 
{
    const { isLiked, likes, tweet_id } = d;
    // 
    const [_isLiked, setIsLiked] = useState(isLiked);
    const [ likeCount, setLikeCount ] = useState(likes);

    return <TouchableOpacity style={styles.actionButton}>
        {_isLiked ? 
            <FontAwesome 
                onPress={()=>{
                    setIsLiked(false);
                    setLikeCount(likeCount-1);
                    SEND('tweet/unlike',{tweet_id});
                }}
                name="heart" 
                size={20} 
                color="#E0245E" 
            />
        : 
            <AntDesign 
                onPress={()=>{
                    setIsLiked(true);
                    setLikeCount(likeCount+1); 
                    SEND('tweet/like',{tweet_id});
                }}
                name="hearto" 
                size={20} 
                color="black" 
            />
        
        }
        <Text style={styles.actionButtonText}>{likeCount}</Text>
    </TouchableOpacity>
};