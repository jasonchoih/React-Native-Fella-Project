import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import styles from 'config/styles';
import { SEND } from 'store';
// 
export default (d) => 
{
    const { isLiked, likes, tweet_id } = d;
    // 
    const [_isLiked, setIsLiked] = useState(isLiked);
    const [ likeCount, setLikeCount ] = useState(likes);

    return <TouchableOpacity style={styles.actionButton}>
        {isLiked ? 
            <FontAwesome 
                onPress={()=>{
                    setIsLiked(0);
                    setLikeCount(likeCount-1);
                    SEND('tweet/unlike',{tweet_id});
                }}
                name="heart" 
                size={14} 
                color="#E0245E" 
            />
        : 
            <AntDesign 
                onPress={()=>{
                    setIsLiked(1);
                    setLikeCount(likeCount+1); 
                    SEND('tweet/like',{tweet_id});
                }}
                name="hearto" 
                size={14} 
                color="#808080" 
            />
        
        }
        <Text style={[styles.actionButtonText, isLiked ? {color:'#E0245E'}:{}]}>{likes}</Text>
    </TouchableOpacity>
};