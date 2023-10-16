import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
// 
import styles from 'config/styles';
// 
export default () =>
{
    const { } = useSelector((state) => state.models);
    // 
    const navigation = useNavigation();
    // 
    return <View style={[{flexDirection: 'row', flexWrap:'wrap', rowGap:10}]}>
       
    </View>
}