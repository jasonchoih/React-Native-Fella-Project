import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import { TabActions } from '@react-navigation/native';
import { TouchableWithoutFeedback, Image } from 'react-native';
import { Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons'; 
import { Button } from 'native-base';
// 
import User from 'pages/user';
import FeedInfo from 'pages/feed/info';
import FeedComment from 'pages/feed/comment';
import UserEdit from 'pages/user/edit';
// 
export default () =>
{
    const { subUserEdit, subComment, media } = useSelector((state) => state.models);
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
                        // backgroundColor: '#bcefff'
                    },
                    headerLeft:() => <TouchableWithoutFeedback onPress={()=>navigation.pop()}>
                        <Text>{route&&route.params&&route.params.headerLeft}</Text>
                    </TouchableWithoutFeedback>,
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
                        <Ionicons name="exit-outline" size={20} color="#808080" />
                    </TouchableWithoutFeedback>
                })}
            />
            <Stack.Screen
                name="feedInfo"
                component={FeedInfo}
                options={({ route, navigation }) => ({
                    title:null,
                    headerLeft: ()=> <TouchableWithoutFeedback onPress={()=>navigation.pop()}>
                        <Text>Back</Text>
                    </TouchableWithoutFeedback>
                })}
            />
            <Stack.Screen
                name="feedComment"
                component={FeedComment}
                options={({ route, navigation }) => ({
                    title: null,
                    headerLeft: ()=> <TouchableWithoutFeedback onPress={()=>navigation.pop()}>
                        <Text>Cancel</Text>
                    </TouchableWithoutFeedback>,
                    headerRight:() => <Button size='xs' isDisabled={media&&!media.loaded}
                        onPress={()=>subComment&&subComment()}>
                        <Text>Post</Text>
                    </Button>
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
                    headerRight:() => <Button size='xs' isDisabled={media&&!media.loaded}
                        onPress={()=>subUserEdit&&subUserEdit()}>
                        <Text>Save</Text>
                    </Button>
                  })}
            />
        </Stack.Group>
    </Stack.Navigator>
  }