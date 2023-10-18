import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { Image, TouchableWithoutFeedback } from 'react-native';
import { Text, Button } from 'native-base';
// 
import Feed from 'pages/feed';
import FeedAdd from 'pages/feed/add';
import FeedInfo from 'pages/feed/info';
import FeedComment from 'pages/feed/comment';
// 
import UserInfo from 'pages/user';
// 
export default () =>
{
    const { subFeedAdd, subComment, media } = useSelector((state) => state.models);
    const Stack = createNativeStackNavigator();
    // 
    return <Stack.Navigator>
        <Stack.Group> 
            <Stack.Screen
                name="feed"
                component={Feed}
                options={{ 
                    headerTitle: () => <Image
                        style={{width:35, height:35}} 
                        source={require('../../../assets/shiba.png')} 
                    />,
                    headerStyle: {
                        backgroundColor: '#bcefff'
                    },
                }}
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
                name="userInfo"
                component={UserInfo}
                options={({ route, navigation }) => ({
                    title: null,
                    headerLeft: ()=> <TouchableWithoutFeedback onPress={()=>navigation.pop()}>
                        <Text>Back</Text>
                    </TouchableWithoutFeedback>
                })}
            />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'modal'}}>
            <Stack.Screen
                name="feedAdd"
                component={FeedAdd}
                options={({ route, navigation }) => ({
                    title: null,
                    headerLeft: ()=> <TouchableWithoutFeedback onPress={()=>navigation.pop()}>
                        <Text>Cancel</Text>
                    </TouchableWithoutFeedback>,
                    headerRight:() => <Button size='xs' isDisabled={media&&!media.loaded}
                        onPress={async()=>subFeedAdd&&subFeedAdd()}>
                            Post
                        </Button>
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
    </Stack.Navigator>
  }