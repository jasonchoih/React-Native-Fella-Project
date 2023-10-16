import { View, TouchableOpacity, Text } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';
// 
import styles from 'config/styles';
// 
export default () =>
{
    const navigation = useNavigation();
    // 
    const navs = {
        'news': '新闻',
        'rank': '排行榜',
        'vip': '贵宾',
    }
    // 
    return <View style={[{flexDirection: 'row', flexWrap:'wrap', columnGap:10, justifyContent:'center'}, styles.mb10]}>
        {Object.keys(navs).map(k=>(
            <TouchableOpacity 
                key={k}
                style={[styles.span6, styles.br10, styles.bb, styles.p10]} 
                onPress={()=>navigation.navigate(k)}
            >
                <Text style={[styles.cf, styles.tc]}>
                    {navs[k]}
                </Text>
            </TouchableOpacity>
        ))}
    </View>
}