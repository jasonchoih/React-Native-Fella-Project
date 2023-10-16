import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import { TabActions } from '@react-navigation/native';
import { TouchableWithoutFeedback, Image, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { Button } from 'native-base';
// 
import User from 'components/User';
import UserEdit from 'pages/user/edit';
// 
export default () =>
{
    const { subUserEdit, media } = useSelector((state) => state.models);
    const dispatch = useDispatch();
    const Stack = createNativeStackNavigator();
    // 
    return <Stack.Navigator>
        <Stack.Group> 
            <Stack.Screen
                name="user"
                component={User}
                options={({ route, navigation }) => ({
                    headerTitle: () => <Image
                        style={{width:35, height:35}} 
                        source={require('../../../assets/shiba.png')} 
                    />,
                    headerStyle: {
                        backgroundColor: '#bcefff'
                    },
                    headerRight: () => <TouchableWithoutFeedback 
                        onPress={()=>{
                            dispatch.auths.DEL();
                            dispatch.models.SET({ M:{ c: "You are succesfully logged out"}});
                            navigation.reset({
                                index: 0,
                                key:null,
                                routes: [{ name: 'home' }]
                           });
                           navigation.dispatch(TabActions.jumpTo('home'));
                        }}>
                        <Ionicons name="exit-outline" size={24} color="black" />
                    </TouchableWithoutFeedback>
                })}
            />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'modal'}}>
            <Stack.Screen
                name="userEdit"
                component={UserEdit}
                options={({ route, navigation }) => ({
                    title: null,
                    headerLeft: ()=> <TouchableWithoutFeedback onPress={()=>navigation.pop()}>
                        <Text>Cancel</Text>
                    </TouchableWithoutFeedback>,
                    headerRight:() => <Button size='xs' isDisabled={media?.loaded}
                        onPress={()=>subUserEdit&&subUserEdit()}>
                        <Text>Save</Text>
                    </Button>
                  })}
            />
        </Stack.Group>
    </Stack.Navigator>
  }