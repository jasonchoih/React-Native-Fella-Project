import { View, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { SEND } from 'store';
// 
import styles from 'config/styles';
// 
export default () =>
{
    const {  } = useSelector((state) => state.models);
    // 
    const dispatch = useDispatch();
    // 
    return <View>
        <Text>
            Default
        </Text>
    </View>
}