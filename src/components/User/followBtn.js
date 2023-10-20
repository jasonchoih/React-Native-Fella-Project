import { useSelector } from 'react-redux';
import { Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import styles from 'config/styles';
import { SEND } from 'store';
// 
export default (d) =>
{
    const { user_id, isFollowed } = d;
    const Auth = useSelector((state) => state.auths);
    const navigation = useNavigation();
    // 
    if(user_id ==Auth.id) return (
        <Button 
            size='xs' 
            style={styles.editBtn}
            onPress={()=>navigation.navigate('userEdit')}
        >
            Edit profile
        </Button>
    )

    return<Button 
        size='xs' 
        style={styles.editBtn}
        onPress={()=>SEND( isFollowed ? 'user/unfollow' :'user/follow' , {following_id: user_id})}
    >
        {isFollowed ? 'Unfollow' : 'Follow'}
    </Button> 
}