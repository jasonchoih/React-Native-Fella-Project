import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'native-base';
// 
import ChannelList from 'pages/message';
import Screen from 'pages/message/screen';
import Thread from 'pages/message/thread';
// 
export default () =>
{
    const Stack = createNativeStackNavigator();
    // 
    return <Stack.Navigator>
        <Stack.Screen
            name="Messages"
            component={ChannelList}
            options={{ 
                headerStyle: {
                    // backgroundColor: '#bcefff',
                    height: 93
                  },
                headerTitle: () => <Image
                    alt="chat_header"
                    style={{width:35, height:35}} 
                    source={require('../../../assets/shiba.png')} 
                />
                // headerShown: false ,
                // headerTitle: 'Message',
                // headerTitle: ()=><></>,
                // headerRight: () => UserMode(Auth&&Auth.role)
            }}
        />
        <Stack.Screen
            name="screen"
            component={Screen}
            options={{ 
                // headerShown: false ,
                // headerTitle: 'Message',
                headerTitle: ()=><></>,
                // headerRight: () => UserMode(Auth&&Auth.role)
            }}
        />
        <Stack.Screen
            name="thread"
            component={Thread}
            options={{ 
                // headerShown: false ,
                // headerTitle: 'Message',
                headerTitle: ()=><></>,
                // headerRight: () => UserMode(Auth&&Auth.role)
            }}
        />
    </Stack.Navigator>
  }