import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Image } from 'react-native';
// 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, FontAwesome } from '@expo/vector-icons'; 
// 
import { Chat, OverlayProvider } from 'stream-chat-expo'; 
import { StreamChat } from 'stream-chat';
import { chatApiKey, chatUserId, chatUserName } from 'config/chat';
// 
import Wrapper from 'components/Authorization';
import HomeRoutes from './home';
import MessageRoutes from './message';
import FeedRoutes from './feed';
import UserRoutes from './user';
// 
import Support from 'pages/support';
// 
export default () =>
{
  const { Auth, AuthDel, A } = useSelector((state) => state.models);
  // const chatClient = StreamChat.getInstance(chatApiKey);
  // 
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // 
  const Tab = createBottomTabNavigator();
  // 
  useEffect(() => {
    if(!Auth) return;
    dispatch.auths.AUT({ ...Auth });
  }, [Auth]);
  //
  useEffect(() => {
    if(!AuthDel) return;
    dispatch.auths.DEL();
  }, [AuthDel]);
  // 
  useEffect(() => {
    if(!A||!A.u) return;
    navigation.navigate(A.u);
    // dispatch.models.SET({A:''})
  }, [A]);
  // 
  useEffect(() => {
    async function chats() {
      try {
        // 
        // await chatClient.connectUser(
        //     {
        //       id: chatUserId,
        //       name: chatUserName,
        //       image: 'https://i.imgur.com/fR9Jz14.png',
        //     },
        //     chatClient.devToken(chatUserId)
        //   );
      } catch (e) {
        // console.warn(e);
        console.log(e)
      } finally {
        // 
      }
    }
    // chats();
}, []);
  // 
  return <OverlayProvider>
    {/* <Chat client={chatClient}> */}
      <Tab.Navigator
        initialRouteName="home"      
        screenOptions={{
          tabBarActiveTintColor: '#FF8C00'
        }}
      >
        <Tab.Screen 
          name="home" 
          component={HomeRoutes} 
          options={({ route }) => ({
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="home" size={24} />
            ),
          })}
        />
        <Tab.Screen 
          name="support" 
          component={Support} 
          options={{
            title: 'Support',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="hearto" size={24} />
            ),
            headerStyle: {
              backgroundColor: '#bcefff',
              height: 95
            },
            headerTitle: () => <Image
                style={{width:35, height:35, marginBottom:2}} 
                source={require('../../../assets/shiba.png')} 
            />
          }}
        />
        <Tab.Screen 
          name="feeds" 
          children={()=><Wrapper children={<FeedRoutes/>} />}
          options={{
            headerShown: false ,
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="group" size={24} />
            ),
          }}
        />
        <Tab.Screen 
          name="message"
          options={{
            title: 'Messages',
            headerShown: false ,
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="message1" size={24} />
            ),
          }}
          children={()=><Wrapper children={<MessageRoutes/>} />}
        />
        <Tab.Screen 
          name="users"
          options={{
            headerShown: false ,
            title: 'Me',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="user" size={24} />
            ), 
            // headerStyle: {
            //   backgroundColor: '#bcefff',
            //   height: 95
            // },
            headerTitle: () => <Image
              style={{width:35, height:35, marginBottom:2}} 
              source={require('../../../assets/shiba.png')} 
            />
          }}
          children={()=><Wrapper children={<UserRoutes/>} />}
        />
      </Tab.Navigator>
    {/* </Chat> */}
  </OverlayProvider>
}