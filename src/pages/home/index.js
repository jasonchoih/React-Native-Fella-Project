import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, ScrollView } from 'react-native';
import { SEND } from 'store';
// 
import Slider from 'components/Home/carousel';
import Nav from 'components/Home/nav';
import Games from 'components/Home/games';
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
    useEffect(()=>{
      SEND('home/index',{});
    },[])
    // 
    return <ScrollView>
      <Slider />
    </ScrollView>
}
// 
