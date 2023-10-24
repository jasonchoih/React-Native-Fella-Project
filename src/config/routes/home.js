import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button, Image } from "native-base";
import { useSelector, useDispatch } from 'react-redux';
// 
import Home from 'pages/home';
// 
import Login from 'pages/auth/login';
import Register from 'pages/auth/register';
import Forgot from 'pages/auth/forgot';
// 
export default () =>
{
    const Auth = useSelector((state) => state.auths);
    // 
    const Stack = createNativeStackNavigator();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    // 
    // const UserMode = (e) => 
    // {
    //     switch(e)
    //     {
    //         case 1: return <View style={{flexDirection:'row', columnGap:10, alignItems:'center'}}>
    //                 <Text>{Auth&&Auth.id}</Text>
    //                 <Button 
    //                     onPress={()=>{
    //                         dispatch.auths.DEL({});
    //                         navigation.navigate('home');
    //                     }}
    //                     size='xs'
    //                 >
    //                     退出
    //                 </Button>
    //             </View>
    //         case 2: return <View style={{flexDirection:'row', columnGap:10}}>
    //                 <Text>{Auth&&Auth.nick}</Text>
    //                 <Text>{Auth&&Auth.id}</Text>
    //                 <Button 
    //                     onPress={()=>{
    //                         dispatch.auths.DEL({});
    //                         navigation.navigate('home');
    //                     }}
    //                 >
    //                     退出
    //                 </Button>
    //             </View>
    //         default: return <View style={{flexDirection:'row', columnGap:10}}>
    //             <Stack.Screen
    //                 name="news"
    //                 component={News}
    //                 options={{ 
    //                     // headerShown: false
    //                 }}
    //             />
    //             <Button 
    //                 size="xs"
    //                 variant="solid"
    //                 action="primary"
    //                 isDisabled={false}
    //                 isFocusVisible={false}
    //                 onPress={()=>navigation.navigate('login')}
    //             >
    //                 Login
    //             </Button>
    //             <Button 
    //                 size="xs"
    //                 variant="solid"
    //                 action="primary"
    //                 isDisabled={false}
    //                 isFocusVisible={false}
    //                 onPress={()=>navigation.navigate('register')}
    //             >
    //                 Register
    //             </Button>
    //         </View>
    //     }
    // }
    // 
    return <Stack.Navigator>
        <Stack.Screen
            name="index"
            component={Home}
            options={{ 
                headerTitle: () => <Image
                    alt="Header Logo"
                    style={{width:35, height:35}} 
                    source={require('../../../assets/shiba.png')} 
                />,
                headerStyle: {
                    // backgroundColor: '#bcefff'
                }
            }}
        />
        <Stack.Screen 
            name="login" 
            component={Login} 
            options={({ route, navigation }) => ({
                headerShown: false 
            })}
        />
        <Stack.Screen 
            name="register" 
            component={Register} 
            options={({ route, navigation }) => ({
                // title: 'Registration',
                // headerLeft: () => <TouchableOpacity onPress={()=>navigation.pop(2)}>
                //     <Text>Back</Text>
                // </TouchableOpacity>
                headerShown: false 
              })}
        />
        <Stack.Screen 
            name="forgot" 
            component={Forgot} 
            options={{ 
                headerTitle:'Account Recovery'
                // headerShown: false 
            }}
        />
    </Stack.Navigator>
  }