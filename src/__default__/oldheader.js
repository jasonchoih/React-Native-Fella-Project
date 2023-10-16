import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { Button } from "native-base";
// 
import Home from 'pages/home';
import News from 'pages/home/news';
import Rank from 'pages/home/rank';
import Vip from 'pages/home/vip';
// 
import Dl from 'pages/auth/dl';
import Zc from 'pages/auth/zc';
import Wj from 'pages/auth/wj';
// 
export default () =>
{
    const Stack = createNativeStackNavigator();
    const navigation = useNavigation();
    // 
    return <Stack.Navigator>
        <Stack.Screen
            name="index"
            component={Home}
            options={{ 
            headerTitle: '首页',
            // headerLeft: () => <View style={{flexDirection:'row', alignItems:'center', columnGap:10}}>
            //   <Menu w="190" trigger={triggerProps => {
            //     return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
            //       <HamburgerIcon />
            //     </Pressable>
            //     }}
            //   >
            //     <Menu.Item onPress={()=>navigation.navigate('activity')}>Menu 1</Menu.Item>
            //     <Menu.Item>Menu 2</Menu.Item>
            //     <Menu.Item>Menu 3</Menu.Item>
            //     <Menu.Item isDisabled>Menu 4</Menu.Item>
            //   </Menu>
            //   <View>
            //     <Image
            //       source={{
            //         uri: 'https://reactnative.dev/img/tiny_logo.png',
            //       }}
            //       style={{
            //         width: 33,
            //         height: 26,
            //         }}
            //     />
            //   </View>
            // </View>,
            headerRight: () => <View style={{flexDirection:'row', columnGap:10}}>
                <Stack.Screen
                    name="news"
                    component={News}
                    options={{ 
                        // headerShown: false
                    }}
                />
                <Button 
                    size="xs"
                    variant="solid"
                    action="primary"
                    isDisabled={false}
                    isFocusVisible={false}
                    onPress={()=>navigation.navigate('login')}
                >
                    登录
                </Button>
                <Button 
                    size="xs"
                    variant="solid"
                    action="primary"
                    isDisabled={false}
                    isFocusVisible={false}
                    onPress={()=>navigation.navigate('register')}
                >
                注册
                </Button>
            </View>
            }}
        />
        <Stack.Screen
            name="news"
            component={News}
            options={{ 
                // headerShown: false
            }}
        />
        <Stack.Screen 
            name="rank" 
            component={Rank} 
            options={{ 
                // headerShown: false 
            }}
        />
        <Stack.Screen 
            name="vip" 
            component={Vip} 
            options={{ 
                // headerShown: false 
            }}
        />
        <Stack.Screen 
            name="dl" 
            component={Dl} 
            screenOptions={{
                tabBarStyle: {display:'none'}
            }}
            options={{ 
                headerTitle:'登录',
                // headerShown: false 
                // headerLeft: () => <View><Text>Back</Text></View>
            }}
        />
        <Stack.Screen 
            name="zc" 
            component={Zc} 
            options={{ 
                headerTitle:'注册',
                // unmountOnBlur: false,
                // tabBarStyle: (route) => {
                //   return { display: "none" }
                // }
                // headerShown: false 
            }}
        />
        <Stack.Screen 
            name="wj" 
            component={Wj} 
            options={{ 
                headerTitle:'忘记密码'
                // headerShown: false 
            }}
        />
    </Stack.Navigator>
  }