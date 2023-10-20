import { useState} from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from 'config/styles';
import { SEND } from 'store';
// 
export default (d) => 
{
    const { isLiked, likes, tweet_id } = d;
    const [ _isLiked, setIsLiked ] = useState(isLiked);
    // 
    return <TouchableOpacity style={styles.actionButton}>
        <AntDesign 
            onPress={()=>{  
                SEND(_isLiked ? 'tweet/unlike' : 'tweet/like', {tweet_id});
                _isLiked ? setIsLiked(false) : setIsLiked(true);
            }}
            name={ _isLiked ? "heart" : "hearto"}
            size={16}
            color={_isLiked ? "#E0245E" : "#808080" }
        />
        <Text style={[styles.actionButtonText, _isLiked ? {color:'#E0245E'}:{}]}>{likes}</Text>
    </TouchableOpacity>
};