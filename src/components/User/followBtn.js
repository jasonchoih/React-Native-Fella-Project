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

    return <>
        {isFollowed ? <Button 
            size='xs' 
            style={styles.editBtn}
            onPress={()=>SEND('user/unfollow', {following_id: user_id})}
        >
            Unfollow
        </Button> :
        <Button 
            size='xs' 
            style={styles.editBtn}
            onPress={()=>SEND('user/follow', {following_id: user_id})}
        >
            Follow
        </Button>
    }
    </>
}