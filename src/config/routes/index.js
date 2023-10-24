import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Image } from 'react-native';
// 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, FontAwesome } from '@expo/vector-icons'; 
import * as Notifications from 'expo-notifications';
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
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
// 
export default () =>
{
  const { Auth, AuthDel, A, Notify } = useSelector((state) => state.models);
  const NotifyAuth = useSelector((state) => state.auths);
  const chatClient = StreamChat.getInstance(chatApiKey);
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
    if(!Notify) return;
    if(NotifyAuth.id!=Notify.user_id) return;
    const { title, body, data, sound } = Notify;
    async function notify() {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('You need to grant notification permissions to use this feature.');
        return;
      }
      await Notifications.scheduleNotificationAsync({
        content: { title, body, data, sound },
        trigger: null
      });
      dispatch.models.SET({Notify:''})
    }
    notify();
    
}, [Notify]);
  // 
  useEffect(() => {
    async function chats() {
      try {
        // 
        await chatClient.connectUser(
            {
              id: chatUserId,
              name: chatUserName,
              image: 'https://i.imgur.com/fR9Jz14.png',
            },
            chatClient.devToken(chatUserId)
          );
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
    <Chat client={chatClient}>
      <Tab.Navigator
        initialRouteName="home"      
        screenOptions={{
          tabBarActiveTintColor: '#FF8C00'
        }}
      >
        <Tab.Screen 
          name="home" 
          component={HomeRoutes} 
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: () => <AntDesign name="home" color="#808080" size={18} />
          }}
        />
        <Tab.Screen 
          name="support" 
          component={Support} 
          options={{
            title: 'Support',
            tabBarIcon: () => <AntDesign name="hearto" color="#808080" size={18} />,
            headerStyle: {
              // backgroundColor: '#bcefff',
              height: 95
            },
            headerTitle: () => <Image
                style={{width:35, height:35, marginBottom:2}} 
                source={require('../../../assets/shiba.png')} 
            />
          }}
        />
        <Tab.Group>
          <Tab.Screen 
            name="feeds" 
            children={()=><Wrapper children={<FeedRoutes/>} />}
            options={{
              headerShown: false ,
              title: 'Bonk',
              tabBarIcon: () => <FontAwesome name="group" color="#808080" size={18} />,
              lazy:true,
              unmountOnBlur: true
            }}
          />
          <Tab.Screen 
            name="message"
            options={{
              title: 'Messages',
              headerShown: false ,
              tabBarIcon: () => <AntDesign name="message1" color="#808080" size={18} />,
              lazy:true
            }}
            children={()=><Wrapper children={<MessageRoutes/>} />}
          />
          <Tab.Screen 
            name="users"
            options={{
              headerShown: false,
              title:'My Profile',
              tabBarIcon: () => <AntDesign name="user" color="#808080" size={18} />,
              lazy:true,
              unmountOnBlur: true     
            }}
            children={()=><Wrapper children={<UserRoutes/>} />}
          />
        </Tab.Group>
      </Tab.Navigator>
    </Chat>
  </OverlayProvider>
}