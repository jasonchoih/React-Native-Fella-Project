import { useEffect, useCallback, useState, useRef  } from 'react';
import { useFocusEffect } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { TouchableOpacity, ScrollView, Button } from 'react-native';
import { Heading, Box, useColorMode, Center, Text, View, Image } from 'native-base';
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
    // const { colorMode, toggleColorMode } = useColorMode();
    // const scheme = useColorScheme();
    const { colorMode, toggleColorMode } = useColorMode();
    // 
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    // 
    useFocusEffect(
      useCallback(() => {
        SEND('home/index',{});
      }, [])
    );
    // 
    return <ScrollView>
      <Slider />
      {/* <Box height={300} maxW="300">
        <Text fontSize="lg" display="flex" mb="20">
          The active color mode is {' '+colorMode}
        </Text>
      </Box>
      <Button onPress={toggleColorMode}>
        Toggle
      </Button> */}
    </ScrollView>
}
// 
