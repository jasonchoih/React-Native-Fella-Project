import { View, ScrollView } from 'react-native';
import styles from 'config/styles';
// 
import HelpUA from 'components/Support/helpUA';
import NafoStore from 'components/Support/nafoStore';
import FundRaising from 'components/Support/fundRaising';
// 
export default () =>
{
    return <ScrollView>
        <View style={styles.p10}>
            <HelpUA />
            <NafoStore />
            <FundRaising />
        </View>
    </ScrollView>
}