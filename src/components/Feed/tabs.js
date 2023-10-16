import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
// 
import styles from 'config/styles';
// 
export default () =>
{
    const { onFeed } = useSelector((state) => state.models);
    // 
    const dispatch = useDispatch();
    // 
    return <View>
        <View style={[{flexDirection:'row'}, styles.bf]}>
            {(['You', 'Following']).map((v,k)=>(
                <TouchableWithoutFeedback 
                    key={k}
                    onPress={()=> dispatch.models.SET({onFeed:v})}>
                    <View style={[{ flex:1, paddingVertical:10}, v==onFeed ? {borderBottomWidth: 1, borderColor: '#FF8C00'} :{}]}>
                        <Text style={[{textAlign:'center'}, v==onFeed ? {fontWeight:'bold'} : {}]}>{v =='You' ? 'For you' : "Following"}</Text>
                    </View>
                </TouchableWithoutFeedback>
            ))}
        </View>
    </View>
}