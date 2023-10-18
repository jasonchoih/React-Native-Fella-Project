import { TouchableOpacity, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
// 
import styles from 'config/styles';
// 
export default props =>
{
    const { comments, tweetInfo } = props;
    const navigation =  useNavigation();
    // 
    return <TouchableOpacity 
        style={styles.actionButton} 
        onPress={()=>navigation.navigate('feedInfo', tweetInfo)}
    >
        <FontAwesome5 name="comment" size={14} color="#808080" />
        <Text style={styles.actionButtonText}>{comments}</Text>
    </TouchableOpacity>
}