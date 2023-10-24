import { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from 'pages/feed/styles';
import { SEND } from 'store';
// 
export default (d) => 
{
    const { isLiked, likes, tweet_id, comment_id } = d;
    const [ _isLiked, setIsLiked ] = useState(isLiked);
    // 
    return <TouchableOpacity style={styles.actionButton}>
        <AntDesign 
            onPress={()=>{  
                SEND(_isLiked ? 'comment/unlike' : 'comment/like', {tweet_id, comment_id});
                _isLiked ? setIsLiked(false) : setIsLiked(true);
            }}
            name={ _isLiked ? "heart" : "hearto"}
            size={16}
            color={_isLiked ? "#E0245E" : "#808080" }
        />
        <Text style={[styles.actionButtonText, _isLiked ? {color:'#E0245E'}:{color:"#808080"}]}>{likes}</Text>
    </TouchableOpacity>
};