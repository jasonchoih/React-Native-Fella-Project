import { View, Text, Image } from 'react-native';
import styles from 'config/styles';
import { Heading } from 'native-base';
// 
import drone from '../../../assets/support/drone.jpeg'
// 
export default () =>
{
    // const supports = [
    //     [
    //         'NAFO', 
    //         'https://nafo-ofan.org/collections/all', 
    //         'https://nafo-ofan.org/cdn/shop/products/kiss-cut-stickers-5.5x5.5-default-63d5702f345ab.png?v=1674932590'
    //     ],
    //     [
    //         'Saint Javelin', 
    //         'https://www.saintjavelin.com/en-ua/collections/fellas-of-nafo', 
    //         'https://www.saintjavelin.com/cdn/shop/files/SJ-Web-Home-Image-1_540x.png?v=1646293503'
    //     ]
    // ];
    // 
    return <View>
        <Heading mb={3}>Start your Fund Raising</Heading>
        <Image 
            source={drone} 
            style={{ 
                height: undefined, 
                width: '100%',
                aspectRatio: 3/2,
                borderRadius:5
            }} 
            resizeMode='contain'
        />
       
    </View>
}