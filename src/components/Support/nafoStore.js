import { View, Text, Image } from 'react-native';
import { Center } from 'native-base';
import styles from 'config/styles';
import { Heading } from 'native-base';
// 
export default () =>
{
    const supports = [
        [
            'NAFO', 
            'https://nafo-ofan.org/collections/all', 
            'https://nafo-ofan.org/cdn/shop/products/kiss-cut-stickers-5.5x5.5-default-63d5702f345ab.png?v=1674932590'
        ],
        [
            'Saint Javelin', 
            'https://www.saintjavelin.com/en-ua/collections/fellas-of-nafo', 
            'https://www.saintjavelin.com/cdn/shop/files/SJ-Web-Home-Image-1_540x.png?v=1646293503'
        ]
    ];
    // 
    return <View style={styles.mb20}>
        <Heading mb={2}>Buy & promote Products</Heading>
        <View style={[{flexDirection:'row',justifyContent:'space-evenly'}]}>
            {supports.map((v,k)=>(
                <View style={[{borderRadius:5}]} key={k}>
                    <Center>
                        <Image 
                            source={{uri:v[2]}} 
                            // style={[{minHeight:80, width:'auto', height:undefined}, styles.mb10, styles.br10]}
                            style={{ 
                                height: undefined, 
                                width: '60%%',
                                aspectRatio: 3/2,
                                borderRadius:5
                            }} 
                            resizeMode='contain'
                        />
                    </Center>
                    {/* <Text style={{textAlign:'center', fontWeight: 'bold'}}>{v[0]}</Text> */}
                </View>
            ))}
        </View>
       
    </View>
}