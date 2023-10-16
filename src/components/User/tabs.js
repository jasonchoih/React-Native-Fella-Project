import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
// 
import styles from 'config/styles';
// 
import Posts from './posts';
import Replies from './replies';
import Media from './media';
import Likes from './likes';
// 
export default () =>
{
    const { onTab } = useSelector((state) => state.models);
    // 
    const dispatch = useDispatch();
    // 
    const arr = {
        'Posts' : <Posts />,
        'Replies': <Replies />,
        'Media': <Media />,
        'Likes': <Likes />
    }
    // 
    return <View>
        <View style={[{flexDirection:'row'}, styles.bf]}>
            {Object.keys(arr).map(k=>(
                <TouchableWithoutFeedback 
                    key={k}
                    onPress={()=> dispatch.models.SET({
                        onTab:k,
                        Tab: arr[k]
                })}>
                    <View style={[{ flex:1, paddingVertical:10}, k==onTab ? {borderBottomWidth: 1, borderColor: '#FF8C00'} :{}]}>
                        <Text style={{textAlign:'center'}}>{k}</Text>
                    </View>
                </TouchableWithoutFeedback>
            ))}
        </View>
        <View>
            {arr[onTab]}
        </View>
    </View>
}