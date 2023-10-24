import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Text, Box, Button } from 'native-base';
import { SEND } from 'store';
// 
import Slider from 'components/Home/carousel';
import Nav from 'components/Home/nav';
import Games from 'components/Home/games';
import Latest from 'components/Home/latest';
// 
import styles from 'config/styles';
// 
export default () =>
{
    const {  } = useSelector((state) => state.models);
    // 
    const dispatch = useDispatch();
    const navigation = useNavigation();
    // 
    // useEffect(()=>{
    //   SEND('home/index',{});
    //   // SEND('test/nuts', {})
    // },[])
    // 
    useFocusEffect(
      useCallback(() => {
        // SEND('test/nuts', {})
        // SEND('home/index',{});
        // SEND('home/index',{});
      }, [])
    );
    // 
    return <ScrollView>
        <Slider />
      <Box px={2}>
        <Latest />
      </Box>
    </ScrollView>
}
// 
