import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Button, Image } from 'react-native';
import { Menu, HamburgerIcon, Box, Pressable, Center, NativeBaseProvider } from "native-base";
// 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { AntDesign, Ionicons } from '@expo/vector-icons'; 
// 
import Wrapper from 'components/Authorization';
// 
import Home from 'pages/home';
import Promo from 'pages/home/promo';
import Game from 'pages/game';
import Shop from 'pages/home/shop';
import Profile from 'pages/user';
// 
import News from 'pages/home/news';
import Rank from 'pages/home/rank';
import Vip from 'pages/home/vip';
// 
import Dl from 'pages/auth/dl';
import Zc from 'pages/auth/zc';
// 
export default () =>
{
  const Auth = useSelector((state) => state.auths);
  const dispatch = useDispatch();
  // 
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  // 
  function getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? '首页';
  
    switch (routeName) {
      case 'news': return '新闻';
      case 'rank': return '排行';
      case 'vip': return '贵宾';
    }
  }
  // 
  const HomeRoutes = () =>
  {
    return <Stack.Navigator>
      <Stack.Screen
            name="index"
            component={Home}
            options={{ 
              header: () => <View style={{ height: 200, backgroundColor:'salmon'}}>
                <View style={[{flexDirection: 'row', flexWrap:'wrap', justifyContent:'space-between', rowGap:0,  bottom:0, position:'absolute', height:25 }]}>
                  <View style={{width: '33.33%', backgroundColor:'yellow'}}>
                    <Menu w="190" trigger={triggerProps => {
                      return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                        <HamburgerIcon />
                      </Pressable>
                      }}
                    >
                      <Menu.Item>Menu 1</Menu.Item>
                      <Menu.Item>Menu 2</Menu.Item>
                      <Menu.Item>Menu 3</Menu.Item>
                      <Menu.Item isDisabled>Menu 4</Menu.Item>
                    </Menu>
                  </View>
                  <View style={{width: '33.33%', backgroundColor:'green'}}>
                    <Text style={{textAlign:'center'}}>2</Text>
                  </View>
                  <View style={{width: '33.33%', backgroundColor:'blue'}}><Text>3</Text></View>
                </View>
              </View>,
              // headerTitle: () => <View>
              //   <Image
              //     source={{
              //       uri: 'https://reactnative.dev/img/tiny_logo.png',
              //     }}
              //     style={{
              //       width: 66,
              //       height: 58,
              //       }}
              //   />
              // </View>,
              headerLeft: () => <Menu w="190" trigger={triggerProps => {
                return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                  <HamburgerIcon />
                </Pressable>
                }}
              >
                <Menu.Item>Menu 1</Menu.Item>
                <Menu.Item>Menu 2</Menu.Item>
                <Menu.Item>Menu 3</Menu.Item>
                <Menu.Item isDisabled>Menu 4</Menu.Item>
              </Menu>
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
    </Stack.Navigator>
  }
  // 
  return <>
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63'
      }}
    >
      <Tab.Screen 
        name="home" 
        component={HomeRoutes} 
        options={({ route }) => ({
          headerShown: false ,
          // headerTitle: getHeaderTitle(route),
          title: '首页',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={24} />
          ),
          headerRight: (props) => (
            <View style={{paddingRight:10}}>
              <Text>Text</Text>
            </View>
          ),
        })}
      />
      <Tab.Screen 
        name="activity" 
        component={Promo} 
        options={{
          title: '活动',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="gift" size={24} />
          ),
        }}
      />
      <Tab.Screen 
        name="game" 
        component={Game}
        options={{
          title: '游戏',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-game-controller-outline" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen 
        name="shop" 
        component={Shop} 
        options={{
          title: '兑换',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="shoppingcart" size={24} />
          ),
        }}
      />
      <Tab.Screen 
        name="user"
        options={{
          title: '我的',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={24} />
          ),
        }}
        children={()=><Wrapper children={<Profile/>} />}
      />
    </Tab.Navigator>
  </>
}