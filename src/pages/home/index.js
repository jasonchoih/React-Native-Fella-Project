import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, ScrollView, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Text } from 'native-base';
import { SEND } from 'store';
// 
import Slider from 'components/Home/carousel';
import Nav from 'components/Home/nav';
import Games from 'components/Home/games';
import Not from 'components/Notification'
// 
import styles from 'config/styles';
// 
export default () =>
{
    const { async } = useSelector((state) => state.models);
    // 
    const dispatch = useDispatch();
    const navigation = useNavigation();
    // 
    // useEffect(()=>{
    //   SEND('home/index',{});
    //   // SEND('test/nuts', {})
    // },[])
    // 
    // useFocusEffect(
    //   useCallback(() => {
    //     SEND('test/nuts', {})
    //     // SEND('home/index',{});
    //   }, [])
    // );
    // 
    return <View>
      <Slider />
      {/* <Text>{async&&async}</Text> */}
      <Not />
    </View>
}
// 
